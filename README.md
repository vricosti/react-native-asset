# @vricosti/react-native-asset
[![npm version](https://badge.fury.io/js/@vricosti/react-native-asset.svg)](https://badge.fury.io/js/@vricosti/react-native-asset)[![Build Status](https://travis-ci.org/vricosti/react-native-asset.svg?branch=master)](https://travis-ci.org/vricosti/react-native-asset)

## Link and unlink assets to your react-native project with ease!

## Update  
  
This package is a fork of `react-native-assets` where I have modified the following:
- **Updated all dependencies** (sha1-file, xcode, fs-extra, ...)
- **Migrated to modern ESM syntax**, transitioning the package from CommonJS to ES modules.
- **Added new options**: `debug` and `embedFolderNoFlattening`
- **Allowed customization of source directories** for Android and iOS.

See **Improvements** section

## Advantages
* `react-native link` only supports font files, this tool supports all assets.
* Unlinking is automatic when you delete an asset, with `react-native link`, you need to unlink the files manually.
* Proper link (and unlink) for `mp3` (to use with [`react-native-sound`](https://github.com/zmxv/react-native-sound#basic-usage)) and `ttf` files.


## Usage
* Install
  ```bash
  npm install -g @vricosti/react-native-asset
  # or yarn
  yarn global add @vricosti/react-native-asset
  ```
* Add assets to your `react-native.config.js` as you would with `react-native link`
  ```js
  ...
   assets: [
      "./src/font",
      "./src/mp3",
    ];
  ```
* Add platform-specific assets to your `react-native.config.js` like so:
  ```js
  ...
  assets: [
    "./src/mp3",
  ],
  iosAssets: [
    "./src/font/ios",
  ],
  androidAssets: [
    "./src/font/android",
  ],
  ```

* Run the command and linking + unlinking is automatic!
  ```bash
  react-native-asset
  ```

## Improvements
The new `embedFolderNoFlattening` option, when set to true, allows copying or referencing the folder as is while preserving its structure:  

```
module.exports = {
  assets: ["./src/assets/remotes"],
  iosAssets: [],
  androidAssets: [],
  embedFolderNoFlattening: true,
  debug: false,
  };
```

On android: it will copy the remotes folder inside android/app/src/main/assets  
On iOS: it will reference the remotes folder inside xcode and will deploy it  
  
`debug` is only used to debug this package and will display some logs inside console.

If your iOS and Android source directories are in non-standard locations, you can specify them as follows:  

```
module.exports = { 
  project: { 
    ios: { sourceDir: "./apps/mobile/ios", }, 
    android: { sourceDir: "./apps/mobile/android", } 
  }, 
  assets: ["./src/assets/remotes"],
  iosAssets: [],
  androidAssets: [],
  embedFolderNoFlattening: false,
}
```

## Explanation
With `react-native link` you have to unlink the files manually, which is hard work.  
Instead this library writes `link-assets-manifest.json` to the root of `android` and `ios` folders to keep track of the files which it added, for later removing it for you if missing from your `assets`!

## Parameters
* `-p, --path` - path to project, defaults to cwd.
* `-a, --assets` - assets paths, for example `react-native-asset -a ./src/font ./src/mp3`.
* `-ios-a, --ios-assets` - ios assets paths, will disable android linking
* `-android-a, --android-assets` - android assets paths, will disable ios linking.
* `-n-u, --no-unlink` - Not to unlink assets which not longer exists, not recommanded.

## Backward compatability
* to use react-native 0.59 and below, use version 1.1.4
