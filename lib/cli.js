#!/usr/bin/env node
import path from 'path';
import linkAssets from './index.js';
import getCliArgs from './cli-args.js';

const options = {
  assets: {
    cliParams: ['-a', '--assets'],
    type: 'array',
  },
  iosAssets: {
    cliParams: ['-ios-a', '--ios-assets'],
    type: 'array',
  },
  androidAssets: {
    cliParams: ['-android-a', '--android-assets'],
    type: 'array',
  },
  rootPath: {
    cliParams: ['-p', '--path'],
    type: 'value',
    default: process.cwd(),
  },
  noUnlink: {
    cliParams: ['-n-u', '--no-unlink'],
    type: 'bool',
  },
};

const cliArgs = getCliArgs(process.argv, options);

const { rootPath, noUnlink, assets, iosAssets, androidAssets } = cliArgs;

const reactNativeConfig = await import(path.resolve(rootPath, 'react-native.config.js'));
const mutualAssets = (reactNativeConfig.default?.assets || []).concat(assets || []);
const mergediOSAssets = mutualAssets.concat(
  reactNativeConfig.default?.iosAssets || [],
  iosAssets || [],
);
const mergedAndroidAssets = mutualAssets.concat(
  reactNativeConfig.default?.androidAssets || [],
  androidAssets || [],
);

linkAssets({
  rootPath,
  shouldUnlink: !noUnlink,
  platforms: {
    ios: {
      enabled: !(androidAssets && !iosAssets),
      assets: mergediOSAssets,
    },
    android: {
      enabled: !(iosAssets && !androidAssets),
      assets: mergedAndroidAssets,
    },
  },
});