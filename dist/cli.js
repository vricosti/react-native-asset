#!/usr/bin/env node
var _reactNativeConfig$de, _reactNativeConfig$de2, _reactNativeConfig$de3;
import path from 'path';
import linkAssets from './index.js';
import getCliArgs from './cli-args.js';
var options = {
  assets: {
    cliParams: ['-a', '--assets'],
    type: 'array'
  },
  iosAssets: {
    cliParams: ['-ios-a', '--ios-assets'],
    type: 'array'
  },
  androidAssets: {
    cliParams: ['-android-a', '--android-assets'],
    type: 'array'
  },
  rootPath: {
    cliParams: ['-p', '--path'],
    type: 'value',
    "default": process.cwd()
  },
  noUnlink: {
    cliParams: ['-n-u', '--no-unlink'],
    type: 'bool'
  }
};
var cliArgs = getCliArgs(process.argv, options);
var rootPath = cliArgs.rootPath,
  noUnlink = cliArgs.noUnlink,
  assets = cliArgs.assets,
  iosAssets = cliArgs.iosAssets,
  androidAssets = cliArgs.androidAssets;
var reactNativeConfig = await import(path.resolve(rootPath, 'react-native.config.js'));
var mutualAssets = (((_reactNativeConfig$de = reactNativeConfig["default"]) === null || _reactNativeConfig$de === void 0 ? void 0 : _reactNativeConfig$de.assets) || []).concat(assets || []);
var mergediOSAssets = mutualAssets.concat(((_reactNativeConfig$de2 = reactNativeConfig["default"]) === null || _reactNativeConfig$de2 === void 0 ? void 0 : _reactNativeConfig$de2.iosAssets) || [], iosAssets || []);
var mergedAndroidAssets = mutualAssets.concat(((_reactNativeConfig$de3 = reactNativeConfig["default"]) === null || _reactNativeConfig$de3 === void 0 ? void 0 : _reactNativeConfig$de3.androidAssets) || [], androidAssets || []);
linkAssets({
  rootPath: rootPath,
  shouldUnlink: !noUnlink,
  platforms: {
    ios: {
      enabled: !(androidAssets && !iosAssets),
      assets: mergediOSAssets
    },
    android: {
      enabled: !(iosAssets && !androidAssets),
      assets: mergedAndroidAssets
    }
  }
});