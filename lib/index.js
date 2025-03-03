import fs from 'fs';
import path from 'path';
import log from 'npmlog';
import copyAssetsIos from './copy-assets/ios.js';
import cleanAssetsIos from './clean-assets/ios.js';
import copyAssetsAndroid from './copy-assets/android.js';
import cleanAssetsAndroid from './clean-assets/android.js';
import getManifest from './manifest/index.js';
import { sha1File } from 'sha1-file';
import _ from 'lodash';
import getConfig from './get-config.js';

const cwd = process.cwd();
const configPath = path.join(cwd, 'react-native.config.js');

let defaultConfig = {};
let defaultEmbedFolderNoFlattening = false;

const configPromise = (async () => {
  if (fs.existsSync(configPath)) {
    try {
      const configModule = await import(`file://${configPath}`);
      defaultConfig = configModule.default || {};
      defaultEmbedFolderNoFlattening = defaultConfig.embedFolderNoFlattening || false;
    } catch (err) {
      log.error(`Failed to load config from ${configPath}: ${err.message}`);
    }
  }
  //log.info(`Default config loaded: ${JSON.stringify(defaultConfig)}`);
  //log.info(`Default embedFolderNoFlattening: ${defaultEmbedFolderNoFlattening}`);
})();

const unl = (val, otherwise) => (val !== undefined ? val : otherwise);

const getAbsolute = ({ filePath, dirPath }) => {
  if (!filePath) {
    log.warn('getAbsolute received undefined filePath');
    return null;
  }
  return path.isAbsolute(filePath) ? filePath : path.resolve(dirPath, filePath);
};

const clearDuplicated = files => _.uniqBy(files, f => path.parse(f.path).base);

const filesToIgnore = ['.DS_Store', 'Thumbs.db'];
const filterFilesToIgnore = ({ path: asset }) => filesToIgnore.indexOf(path.basename(asset)) === -1;

const filterFileByFilesWhichNotExists = (files, { normalizeAbsolutePathsTo }) => (file) => {
  if (!file || !file.path) {
    log.warn('filterFileByFilesWhichNotExists received invalid file object');
    return false; // Skip invalid files
  }
  const { path: filePath, sha1: fileSha1 } = file;
  const relativeFilePath = path.isAbsolute(filePath) ? path.relative(normalizeAbsolutePathsTo, filePath) : filePath;

  return files
    .map(otherFile => Object.assign({}, otherFile, {
      path: otherFile.path && (path.isAbsolute(otherFile.path) ? path.relative(normalizeAbsolutePathsTo, otherFile.path) : otherFile.path),
    }))
    .findIndex((otherFile) => {
      const { path: otherFileRelativePath, sha1: otherFileSha1 } = otherFile;
      return (relativeFilePath === otherFileRelativePath && fileSha1 === otherFileSha1);
    }) === -1;
};

const calculateDirSha1 = async (dirPath) => {
  const files = fs.readdirSync(dirPath);
  let combinedSha1 = '';

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.lstatSync(filePath);
    
    if (stats.isDirectory()) {
      combinedSha1 += await calculateDirSha1(filePath);
    } else {
      combinedSha1 += await sha1File(filePath);
    }
  }
  
  let hash = 0;
  for (let i = 0; i < combinedSha1.length; i++) {
    const char = combinedSha1.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return hash.toString(16);
};

const linkPlatform = ({
  rootPath,
  shouldUnlink,
  fullConfig,
}) => async ({
  name,
  manifest,
  config,
  linkOptionsPerExt,
  otherLinkOptions: baseOtherLinkOptions,
  cleanAssets,
  copyAssets,
  assets: assetsPaths,
  embedFolderNoFlattening,
  myLog,
}) => {

  myLog.info(`Processing platform: ${name}`);
  myLog.info(`Assets paths: ${JSON.stringify(assetsPaths)}`);
  myLog.info(`embedFolderNoFlattening for ${name}: ${embedFolderNoFlattening}`);
  myLog.info(`Config in linkPlatform: ${JSON.stringify(fullConfig)}`);

  let prevRelativeAssets = [];
  try {
    prevRelativeAssets = (await manifest.read()).map(asset => Object.assign(
      {},
      asset,
      {
        path: asset.path.split('/').join(path.sep),
      },
    ));
    myLog.info(`Previous assets: ${JSON.stringify(prevRelativeAssets)}`);
  } catch (e) {
    myLog.info('No previous manifest found');
  }

  let assets = [];

  const loadAsset = async (assetMightNotAbsolute, platformName, embedFolderNoFlattening) => {
    const asset = getAbsolute({ filePath: assetMightNotAbsolute, dirPath: rootPath });
    if (!fs.existsSync(asset)) {
      myLog.warn(`Asset not found: ${asset}`);
      return;
    }
    
    const stats = fs.lstatSync(asset);
    let sha1;
    if (stats.isDirectory()) {
      try {
        sha1 = await calculateDirSha1(asset);
      } catch (e) {
        sha1 = `dir-${Date.now()}`;
      }
    } else {
      sha1 = await sha1File(asset);
    }

    assets.push({
      path: asset,
      sha1,
      isDirectory: stats.isDirectory(),
    });

    myLog.info(`Loaded asset: ${asset} (isDirectory: ${stats.isDirectory()})`);

    if (platformName === 'Android' || !embedFolderNoFlattening) {
      if (stats.isDirectory()) {
        const subFiles = fs.readdirSync(asset).map(file => path.resolve(asset, file));
        await Promise.all(subFiles.map(file => loadAsset(file, platformName, embedFolderNoFlattening)));
      }
    }
  };

  await Promise.all(assetsPaths.map(asset => loadAsset(asset, name, name === 'iOS' && embedFolderNoFlattening)));

  assets = clearDuplicated(assets);
  myLog.info(`Assets after deduplication: ${JSON.stringify(assets)}`);

  // Filter assets to only directories when embedFolderNoFlattening is true
  let filteredAssets = assets;
  if (embedFolderNoFlattening) {
    filteredAssets = assets.filter(asset => 
      assetsPaths.some(topLevelPath => 
        getAbsolute({ filePath: topLevelPath, dirPath: rootPath }) === asset.path
      )
    );
    myLog.info(`Filtered ${name} assets (embedFolderNoFlattening): ${JSON.stringify(filteredAssets)}`);
  }

  // Dynamically compute otherLinkOptions or use previous path for cleanup
  const assetPath = assetsPaths[0];
  const androidBasePath = fullConfig.android && fullConfig.android.path 
    ? path.resolve(fullConfig.android.path, 'app', 'src', 'main', 'assets') 
    : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'assets');
  const relativeAssetPath = assetPath ? path.relative(rootPath, getAbsolute({ filePath: assetPath, dirPath: rootPath })) : '';
  const folderName = assetPath ? path.basename(relativeAssetPath) : prevRelativeAssets.length > 0 ? path.basename(prevRelativeAssets[0].path) : 'remotes'; // Fallback to manifest or default
  const otherLinkOptions = {
    android: {
      path: embedFolderNoFlattening 
        ? path.join(androidBasePath, folderName) // e.g., assets/remotes
        : path.resolve(androidBasePath, 'custom'), // Original: assets/custom
    },
    ios: baseOtherLinkOptions.ios,
  };

  const fileFilters = [];
  myLog.info(`linkOptionsPerExt for ${name}: ${JSON.stringify(linkOptionsPerExt)}`);
  if (name === 'Android' && embedFolderNoFlattening) {
    fileFilters.push({
      name: 'directory',
      filter: ({ isDirectory }) => isDirectory === true,
      options: otherLinkOptions,
    });
  } else if (name === 'iOS' && embedFolderNoFlattening) {
    fileFilters.push({
      name: 'directory',
      filter: ({ isDirectory }) => isDirectory === true,
      options: otherLinkOptions,
    });
  } else {
    fileFilters.push(...Object.keys(linkOptionsPerExt).map(fileExt => ({
      name: fileExt,
      filter: ({ path: filePath }) => !fs.lstatSync(filePath).isDirectory() && path.extname(filePath) === `.${fileExt}`,
      options: linkOptionsPerExt[fileExt],
    })));
    fileFilters.push({
      name: 'custom',
      filter: ({ path: filePath }) => 
        !fs.lstatSync(filePath).isDirectory() && 
        Object.keys(linkOptionsPerExt).indexOf(path.extname(filePath).substr(1)) === -1,
      options: otherLinkOptions,
    });
  }

  myLog.info(`fileFilters for ${name}: ${JSON.stringify(fileFilters.map(f => ({ name: f.name })))}`);

  fileFilters.forEach(({ name: fileConfigName, filter: fileConfigFilter, options }) => {
    const prevRelativeAssetsWithExt = prevRelativeAssets
      .filter(fileConfigFilter)
      .filter(filterFileByFilesWhichNotExists(filteredAssets, { normalizeAbsolutePathsTo: rootPath }));

    const assetsWithExt = filteredAssets
      .filter(fileConfigFilter)
      .filter(filterFileByFilesWhichNotExists(prevRelativeAssets, { normalizeAbsolutePathsTo: rootPath }))
      .filter(filterFilesToIgnore);

    myLog.info(`Assets to clean for ${fileConfigName}: ${JSON.stringify(prevRelativeAssetsWithExt)}`);
    myLog.info(`${fileConfigName} assets to process: ${JSON.stringify(assetsWithExt)}`);

    if (shouldUnlink && prevRelativeAssetsWithExt.length > 0) {
      log.info(`Cleaning previously linked ${fileConfigName} assets from ${name} project`);
      const pathsToClean = prevRelativeAssetsWithExt
        .map(({ path: filePath }) => getAbsolute({ filePath, dirPath: rootPath }))
        .filter(p => p !== null); // Filter out null paths
      if (pathsToClean.length > 0) {
        // Use the target path from options or compute it based on previous asset
        const cleanOptions = {
          ...options,
          path: embedFolderNoFlattening && name === 'Android'
            ? path.join(androidBasePath, path.basename(pathsToClean[0]))
            : options.path || (name === 'Android' ? path.resolve(androidBasePath, 'custom') : undefined),
          embedFolderNoFlattening,
          myLog,
        };
        cleanAssets(pathsToClean, config, cleanOptions);
      }
    }

    if (assetsWithExt.length > 0) {
      log.info(`Linking ${fileConfigName} assets to ${name} project`);
      const copyOptions = {
        ...options,
        embedFolderNoFlattening,
        myLog,
      };
      myLog.info(`Copy options for ${fileConfigName}: ${JSON.stringify(copyOptions)}`);
      copyAssets(
        assetsWithExt.map(({ path: assetPath }) => assetPath),
        config,
        copyOptions,
      );
    }
  });

  myLog.info(`Writing manifest with assets: ${JSON.stringify(filteredAssets)}`);
  await manifest.write(filteredAssets
    .filter(filterFilesToIgnore)
    .map(asset => Object.assign(
      {},
      asset,
      {
        path: path.relative(rootPath, asset.path).split(path.sep).join('/'),
      },
    )));
};

export default async ({
  rootPath: rootPathMightNotAbsolute = cwd,
  shouldUnlink = true,
  platforms: mergePlatforms,
  embedFolderNoFlattening,
  debug,
}) => {
  //log.info(`Debug value: ${debug}`);
  await configPromise;

  const effectiveDebug = debug !== undefined ? debug : defaultConfig.debug || false;
  const effectiveEmbedFolderNoFlattening = embedFolderNoFlattening !== undefined ? embedFolderNoFlattening : defaultEmbedFolderNoFlattening;

  //log.info(`Effective debug: ${effectiveDebug}`);

  const myLog = {
    info: effectiveDebug ? (...args) => log.info(...args) : () => {},
    warn: effectiveDebug ? (...args) => log.warn(...args) : () => {},
    verbose: effectiveDebug ? (...args) => log.verbose(...args) : () => {},
  };
  
  const rootPath = path.isAbsolute(rootPathMightNotAbsolute)
    ? rootPathMightNotAbsolute
    : path.resolve(cwd, rootPathMightNotAbsolute);

  myLog.info(`embedFolderNoFlattening at entry: ${effectiveEmbedFolderNoFlattening}`);

  if (!fs.lstatSync(rootPath).isDirectory()) {
    throw new Error(`'rootPath' must be a valid path, got ${rootPathMightNotAbsolute}`);
  }
  if (typeof shouldUnlink !== 'boolean') {
    throw new Error(`'shouldUnlink' must be a boolean, got ${typeof shouldUnlink}`);
  }
  if ([mergePlatforms.ios, mergePlatforms.android].find(({ assets }) => !Array.isArray(assets))) {
    throw new Error('\'platforms["platform"].assets\' must be an array');
  }

  const platforms = {
    ios: {
      enabled: unl(mergePlatforms.ios.enabled, true),
      assets: mergePlatforms.ios.assets,
    },
    android: {
      enabled: unl(mergePlatforms.android.enabled, true),
      assets: mergePlatforms.android.assets,
    },
  };

  // Get custom source directories from config
  const iosSourceDir = defaultConfig?.project?.ios?.sourceDir;
  const androidSourceDir = defaultConfig?.project?.android?.sourceDir;

  const config = getConfig({ rootPath, iosSourceDir, androidSourceDir });
  myLog.info(`Config from getConfig: ${JSON.stringify(config)}`);
  const { android: { path: androidPath } = {}, ios: { path: iosPath } = {} } = config;

  const fontOptions = {
    android: { path: androidPath ? path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'fonts') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'assets', 'fonts') },
    ios: { addFont: true },
  };

  const fontTypes = ['otf', 'ttf'];
  const fontsLinkOptions = fontTypes.reduce(
    (result, fontFiles) => ({ ...result, [fontFiles]: fontOptions }),
    {},
  );

  const imageOptions = {
    android: { path: androidPath ? path.resolve(androidPath, 'app', 'src', 'main', 'res', 'drawable') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'res', 'drawable') },
    ios: { addFont: false },
  };

  const imageTypes = ['png', 'jpg', 'gif'];
  const imageLinkOptions = imageTypes.reduce(
    (result, imageFiles) => ({ ...result, [imageFiles]: imageOptions }),
    {},
  );

  const commonLinkOptionsPerExt = {
    ...fontsLinkOptions,
    ...imageLinkOptions,
    mp3: {
      android: { path: androidPath ? path.resolve(androidPath, 'app', 'src', 'main', 'res', 'raw') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'res', 'raw') },
      ios: { addFont: false },
    },
  };

  const baseOtherLinkOptions = {
    ios: { addFont: false },
  };

  const platformConfigs = [
    {
      name: 'iOS',
      enabled: platforms.ios.enabled,
      assets: platforms.ios.assets,
      manifest: getManifest(iosPath),
      config: config.ios || {},
      cleanAssets: cleanAssetsIos,
      copyAssets: copyAssetsIos,
      linkOptionsPerExt: {
        otf: commonLinkOptionsPerExt.otf.ios,
        ttf: commonLinkOptionsPerExt.ttf.ios,
        mp3: commonLinkOptionsPerExt.mp3.ios,
      },
      otherLinkOptions: baseOtherLinkOptions,
      embedFolderNoFlattening: effectiveEmbedFolderNoFlattening,
      myLog,
    },
    {
      name: 'Android',
      enabled: platforms.android.enabled,
      assets: platforms.android.assets,
      manifest: getManifest(androidPath),
      config: config.android || {},
      cleanAssets: cleanAssetsAndroid,
      copyAssets: copyAssetsAndroid,
      linkOptionsPerExt: effectiveEmbedFolderNoFlattening ? {} : {
        otf: commonLinkOptionsPerExt.otf.android,
        ttf: commonLinkOptionsPerExt.ttf.android,
        png: commonLinkOptionsPerExt.png.android,
        jpg: commonLinkOptionsPerExt.jpg.android,
        gif: commonLinkOptionsPerExt.gif.android,
        mp3: commonLinkOptionsPerExt.mp3.android,
      },
      otherLinkOptions: baseOtherLinkOptions,
      embedFolderNoFlattening: effectiveEmbedFolderNoFlattening,
      myLog,
    },
  ];

  await Promise.all(
    platformConfigs
      .filter(({ enabled, config: platformConfig }) => enabled && platformConfig.exists !== false)
      .map(linkPlatform({ rootPath, shouldUnlink, fullConfig: config }))
  );
};

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const configPath = path.join(cwd, 'react-native.config.js');
    let config = {};
    if (fs.existsSync(configPath)) {
      config = (await import(`file://${configPath}`)).default || {};
    }
    const finalConfig = {
      rootPath: cwd,
      shouldUnlink: true,
      platforms: {
        ios: { enabled: true, assets: [...(config.assets || []), ...(config.iosAssets || [])] },
        android: { enabled: true, assets: [...(config.assets || []), ...(config.androidAssets || [])] },
      },
      embedFolderNoFlattening: config.embedFolderNoFlattening || false,
      debug: config.debug || false,
    };

    log.info(`Final config before module.exports: ${JSON.stringify(finalConfig)}`);

    global.ReactNativeAssetConfig = {
      embedFolderNoFlattening: finalConfig.embedFolderNoFlattening,
    };

    //myLog.info(`Running with config: ${JSON.stringify(finalConfig)}`);
    //myLog.info(`Passing embedFolderNoFlattening: ${finalConfig.embedFolderNoFlattening}`);
    await module.exports(finalConfig).catch(err => {
      console.error(err);
      process.exit(1);
    });
  })();
}