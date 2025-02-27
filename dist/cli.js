#!/usr/bin/env node
"use strict";

require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _path = _interopRequireDefault(require("path"));
var _index = _interopRequireDefault(require("./index.js"));
var _cliArgs = _interopRequireDefault(require("./cli-args.js"));
var _reactNativeConfig$de, _reactNativeConfig$de2, _reactNativeConfig$de3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    default: process.cwd()
  },
  noUnlink: {
    cliParams: ['-n-u', '--no-unlink'],
    type: 'bool'
  }
};
var cliArgs = (0, _cliArgs.default)(process.argv, options);
var {
  rootPath,
  noUnlink,
  assets,
  iosAssets,
  androidAssets
} = cliArgs;
var reactNativeConfig = await (specifier => new Promise(r => r("".concat(specifier))).then(s => _interopRequireWildcard(require(s))))(_path.default.resolve(rootPath, 'react-native.config.js'));
var mutualAssets = (((_reactNativeConfig$de = reactNativeConfig.default) === null || _reactNativeConfig$de === void 0 ? void 0 : _reactNativeConfig$de.assets) || []).concat(assets || []);
var mergediOSAssets = mutualAssets.concat(((_reactNativeConfig$de2 = reactNativeConfig.default) === null || _reactNativeConfig$de2 === void 0 ? void 0 : _reactNativeConfig$de2.iosAssets) || [], iosAssets || []);
var mergedAndroidAssets = mutualAssets.concat(((_reactNativeConfig$de3 = reactNativeConfig.default) === null || _reactNativeConfig$de3 === void 0 ? void 0 : _reactNativeConfig$de3.androidAssets) || [], androidAssets || []);
(0, _index.default)({
  rootPath,
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