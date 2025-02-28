import fs from 'fs';
import path from 'path';
import copyAssetsIos from './copy-assets/ios.js';
import cleanAssetsIos from './clean-assets/ios.js';
import copyAssetsAndroid from './copy-assets/android.js';
import cleanAssetsAndroid from './clean-assets/android.js';
import getManifest from './manifest/index.js';
import log from 'npmlog';
import { sha1File } from 'sha1-file';
import _ from 'lodash';
import getConfig from './get-config.js';

const cwd = process.cwd();

const unl = (val, otherwise) => (val !== undefined ? val : otherwise);

const clearDuplicated = files => _.uniqBy(files, f => path.parse(f.path).base);

const filesToIgnore = [
  '.DS_Store',
  'Thumbs.db',
];
const filterFilesToIgnore = ({ path: asset }) => filesToIgnore.indexOf(path.basename(asset)) === -1;

const getAbsolute = ({ filePath, dirPath }) => (
  path.isAbsolute(filePath) ? filePath : path.resolve(dirPath, filePath)
);
const getRelative = ({ filePath, dirPath }) => (
  path.isAbsolute(filePath) ? path.relative(dirPath, filePath) : filePath
);

const filterFileByFilesWhichNotExists = (files, { normalizeAbsolutePathsTo }) => (file) => {
  const { path: filePath, sha1: fileSha1 } = file;
  const relativeFilePath = getRelative({ filePath, dirPath: normalizeAbsolutePathsTo });

  return files
    .map(otherFile => Object.assign({}, otherFile, {
      path: getRelative({ filePath: otherFile.path, dirPath: normalizeAbsolutePathsTo }),
    }))
    .findIndex((otherFile) => {
      const { path: otherFileRelativePath, sha1: otherFileSha1 } = otherFile;
      return (relativeFilePath === otherFileRelativePath && fileSha1 === otherFileSha1);
    }) === -1;
};

const linkPlatform = ({
  rootPath,
  shouldUnlink,
}) => async ({
  name,
  manifest,
  config,
  linkOptionsPerExt,
  otherLinkOptions,
  cleanAssets,
  copyAssets,
  assets: assetsPaths,
}) => {
  let prevRelativeAssets = [];
  try {
    prevRelativeAssets = (await manifest.read()).map(asset => Object.assign(
      {},
      asset,
      {
        path: asset.path.split('/').join(path.sep), // Convert path to system-specific separator
      },
    ));
  } catch (e) {
    // Manifest not found, no need to clean
  }

  let assets = [];

  const loadAsset = async (assetMightNotAbsolute) => {
    const asset = getAbsolute({ filePath: assetMightNotAbsolute, dirPath: rootPath });
    const stats = fs.lstatSync(asset);
    if (stats.isDirectory()) {
      const subFiles = fs.readdirSync(asset).map(file => path.resolve(asset, file));
      await Promise.all(subFiles.map(loadAsset)); // Recursively load sub-files
    } else {
      const sha1 = await sha1File(asset); // Async sha1-file
      assets = assets.concat({
        path: asset,
        sha1,
      });
    }
  };

  await Promise.all(assetsPaths.map(loadAsset));

  assets = clearDuplicated(assets);

  const fileFilters = []
    .concat(Object.keys(linkOptionsPerExt).map(fileExt => ({
      name: fileExt,
      filter: ({ path: filePath }) => path.extname(filePath) === `.${fileExt}`,
      options: linkOptionsPerExt[fileExt],
    })))
    .concat({
      name: 'custom',
      filter: ({ path: filePath }) => Object.keys(linkOptionsPerExt)
        .indexOf(path.extname(filePath).substr(1)) === -1,
      options: otherLinkOptions,
    });

  fileFilters.forEach(({ name: fileConfigName, filter: fileConfigFilter, options }) => {
    const prevRelativeAssetsWithExt = prevRelativeAssets
      .filter(fileConfigFilter)
      .filter(filterFileByFilesWhichNotExists(assets, { normalizeAbsolutePathsTo: rootPath }));

    const assetsWithExt = assets
      .filter(fileConfigFilter)
      .filter(filterFileByFilesWhichNotExists(prevRelativeAssets, { normalizeAbsolutePathsTo: rootPath }))
      .filter(filterFilesToIgnore);

    if (shouldUnlink && prevRelativeAssetsWithExt.length > 0) {
      log.info(`Cleaning previously linked ${fileConfigName} assets from ${name} project`);
      cleanAssets(
        prevRelativeAssetsWithExt.map(({ path: filePath }) => getAbsolute({ filePath, dirPath: rootPath })),
        config,
        options,
      );
    }

    if (assetsWithExt.length > 0) {
      log.info(`Linking ${fileConfigName} assets to ${name} project`);
      copyAssets(
        assetsWithExt.map(({ path: assetPath }) => assetPath),
        config,
        options,
      );
    }
  });

  manifest.write(assets
    .filter(filterFilesToIgnore)
    .map(asset => Object.assign(
      {},
      asset,
      {
        path: path.relative(rootPath, asset.path).split(path.sep).join('/'), // Convert to POSIX for manifest
      },
    )));
};

export default async ({
  rootPath: rootPathMightNotAbsolute = cwd,
  shouldUnlink = true,
  platforms: mergePlatforms,
}) => {
  if (!fs.lstatSync(rootPathMightNotAbsolute).isDirectory()) {
    throw new Error(`'rootPath' must be a valid path, got ${rootPathMightNotAbsolute}`);
  }
  if (typeof shouldUnlink !== 'boolean') {
    throw new Error(`'shouldUnlink' must be a boolean, got ${typeof shouldUnlink}`);
  }
  if ([mergePlatforms.ios, mergePlatforms.android].find(({ assets }) => !Array.isArray(assets))) {
    throw new Error('\'platforms["platform"].assets\' must be an array');
  }

  const rootPath = path.isAbsolute(rootPathMightNotAbsolute)
    ? rootPathMightNotAbsolute
    : path.resolve(cwd, rootPathMightNotAbsolute);

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

  const config = getConfig({ rootPath });
  const {
    android: { path: androidPath },
    ios: { path: iosPath },
  } = config;

  const fontOptions = {
    android: {
      path: path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'fonts'),
    },
    ios: {
      addFont: true,
    },
  };

  const fontTypes = ['otf', 'ttf'];
  const fontsLinkOptions = fontTypes.reduce(
    (result, fontFiles) => ({ ...result, [fontFiles]: fontOptions }),
    {},
  );

  const imageOptions = {
    android: {
      path: path.resolve(androidPath, 'app', 'src', 'main', 'res', 'drawable'),
    },
    ios: {
      addFont: false,
    },
  };

  const imageTypes = ['png', 'jpg', 'gif'];
  const imageLinkOptions = imageTypes.reduce(
    (result, imageFiles) => ({ ...result, [imageFiles]: imageOptions }),
    {},
  );

  const linkOptionsPerExt = {
    ...fontsLinkOptions,
    ...imageLinkOptions,
    mp3: {
      android: {
        path: path.resolve(androidPath, 'app', 'src', 'main', 'res', 'raw'),
      },
      ios: {
        addFont: false,
      },
    },
  };

  const otherLinkOptions = {
    android: {
      path: path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'custom'),
    },
    ios: {
      addFont: false,
    },
  };

  const platformConfigs = [
    {
      name: 'iOS',
      enabled: platforms.ios.enabled,
      assets: platforms.ios.assets,
      manifest: getManifest(iosPath),
      config: config.ios,
      cleanAssets: cleanAssetsIos,
      copyAssets: copyAssetsIos,
      linkOptionsPerExt: {
        otf: linkOptionsPerExt.otf.ios,
        ttf: linkOptionsPerExt.ttf.ios,
        mp3: linkOptionsPerExt.mp3.ios,
      },
      otherLinkOptions: otherLinkOptions.ios,
    },
    {
      name: 'Android',
      enabled: platforms.android.enabled,
      assets: platforms.android.assets,
      manifest: getManifest(androidPath),
      config: config.android,
      cleanAssets: cleanAssetsAndroid,
      copyAssets: copyAssetsAndroid,
      linkOptionsPerExt: {
        otf: linkOptionsPerExt.otf.android,
        ttf: linkOptionsPerExt.ttf.android,
        png: linkOptionsPerExt.png.android,
        jpg: linkOptionsPerExt.jpg.android,
        gif: linkOptionsPerExt.gif.android,
        mp3: linkOptionsPerExt.mp3.android,
      },
      otherLinkOptions: otherLinkOptions.android,
    },
  ];

  await Promise.all(
    platformConfigs
      .filter(({ enabled, config: platformConfig }) => enabled && platformConfig.exists)
      .map(linkPlatform({ rootPath, shouldUnlink }))
  );
};