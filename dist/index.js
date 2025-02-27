"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _ios = _interopRequireDefault(require("./copy-assets/ios.js"));
var _ios2 = _interopRequireDefault(require("./clean-assets/ios.js"));
var _android = _interopRequireDefault(require("./copy-assets/android.js"));
var _android2 = _interopRequireDefault(require("./clean-assets/android.js"));
var _index = _interopRequireDefault(require("./manifest/index.js"));
var _npmlog = _interopRequireDefault(require("npmlog"));
var _sha1File = _interopRequireDefault(require("sha1-file"));
var _lodash = _interopRequireDefault(require("lodash"));
var _getConfig = _interopRequireDefault(require("./get-config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var cwd = process.cwd();
var unl = (val, otherwise) => val !== undefined ? val : otherwise;
var clearDuplicated = files => _lodash.default.uniqBy(files, f => _path.default.parse(f.path).base);
var filesToIgnore = ['.DS_Store', 'Thumbs.db'];
var filterFilesToIgnore = _ref => {
  var {
    path: asset
  } = _ref;
  return filesToIgnore.indexOf(_path.default.basename(asset)) === -1;
};
var getAbsolute = _ref2 => {
  var {
    filePath,
    dirPath
  } = _ref2;
  return _path.default.isAbsolute(filePath) ? filePath : _path.default.resolve(dirPath, filePath);
};
var getRelative = _ref3 => {
  var {
    filePath,
    dirPath
  } = _ref3;
  return _path.default.isAbsolute(filePath) ? _path.default.relative(dirPath, filePath) : filePath;
};
var filterFileByFilesWhichNotExists = (files, _ref4) => {
  var {
    normalizeAbsolutePathsTo
  } = _ref4;
  return file => {
    var {
      path: filePath,
      sha1: fileSha1
    } = file;
    var relativeFilePath = getRelative({
      filePath,
      dirPath: normalizeAbsolutePathsTo
    });
    return files.map(otherFile => Object.assign({}, otherFile, {
      path: getRelative({
        filePath: otherFile.path,
        dirPath: normalizeAbsolutePathsTo
      })
    })).findIndex(otherFile => {
      var {
        path: otherFileRelativePath,
        sha1: otherFileSha1
      } = otherFile;
      return relativeFilePath === otherFileRelativePath && fileSha1 === otherFileSha1;
    }) === -1;
  };
};
var linkPlatform = _ref5 => {
  var {
    rootPath,
    shouldUnlink
  } = _ref5;
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(function* (_ref6) {
      var {
        name,
        manifest,
        config,
        linkOptionsPerExt,
        otherLinkOptions,
        cleanAssets,
        copyAssets,
        assets: assetsPaths
      } = _ref6;
      var prevRelativeAssets = [];
      try {
        prevRelativeAssets = (yield manifest.read()).map(asset => Object.assign({}, asset, {
          path: asset.path.split('/').join(_path.default.sep) // Convert path to system-specific separator
        }));
      } catch (e) {
        // Manifest not found, no need to clean
      }
      var assets = [];
      var _loadAsset = /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator(function* (assetMightNotAbsolute) {
          var asset = getAbsolute({
            filePath: assetMightNotAbsolute,
            dirPath: rootPath
          });
          var stats = _fs.default.lstatSync(asset);
          if (stats.isDirectory()) {
            var subFiles = _fs.default.readdirSync(asset).map(file => _path.default.resolve(asset, file));
            yield Promise.all(subFiles.map(_loadAsset)); // Recursively load sub-files
          } else {
            var sha1 = yield (0, _sha1File.default)(asset); // Async sha1-file
            assets = assets.concat({
              path: asset,
              sha1
            });
          }
        });
        return function loadAsset(_x2) {
          return _ref8.apply(this, arguments);
        };
      }();
      yield Promise.all(assetsPaths.map(_loadAsset));
      assets = clearDuplicated(assets);
      var fileFilters = [].concat(Object.keys(linkOptionsPerExt).map(fileExt => ({
        name: fileExt,
        filter: _ref9 => {
          var {
            path: filePath
          } = _ref9;
          return _path.default.extname(filePath) === ".".concat(fileExt);
        },
        options: linkOptionsPerExt[fileExt]
      }))).concat({
        name: 'custom',
        filter: _ref10 => {
          var {
            path: filePath
          } = _ref10;
          return Object.keys(linkOptionsPerExt).indexOf(_path.default.extname(filePath).substr(1)) === -1;
        },
        options: otherLinkOptions
      });
      fileFilters.forEach(_ref11 => {
        var {
          name: fileConfigName,
          filter: fileConfigFilter,
          options
        } = _ref11;
        var prevRelativeAssetsWithExt = prevRelativeAssets.filter(fileConfigFilter).filter(filterFileByFilesWhichNotExists(assets, {
          normalizeAbsolutePathsTo: rootPath
        }));
        var assetsWithExt = assets.filter(fileConfigFilter).filter(filterFileByFilesWhichNotExists(prevRelativeAssets, {
          normalizeAbsolutePathsTo: rootPath
        })).filter(filterFilesToIgnore);
        if (shouldUnlink && prevRelativeAssetsWithExt.length > 0) {
          _npmlog.default.info("Cleaning previously linked ".concat(fileConfigName, " assets from ").concat(name, " project"));
          cleanAssets(prevRelativeAssetsWithExt.map(_ref12 => {
            var {
              path: filePath
            } = _ref12;
            return getAbsolute({
              filePath,
              dirPath: rootPath
            });
          }), config, options);
        }
        if (assetsWithExt.length > 0) {
          _npmlog.default.info("Linking ".concat(fileConfigName, " assets to ").concat(name, " project"));
          copyAssets(assetsWithExt.map(_ref13 => {
            var {
              path: assetPath
            } = _ref13;
            return assetPath;
          }), config, options);
        }
      });
      manifest.write(assets.filter(filterFilesToIgnore).map(asset => Object.assign({}, asset, {
        path: _path.default.relative(rootPath, asset.path).split(_path.default.sep).join('/') // Convert to POSIX for manifest
      })));
    });
    return function (_x) {
      return _ref7.apply(this, arguments);
    };
  }();
};
var _default = exports.default = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(function* (_ref14) {
    var {
      rootPath: rootPathMightNotAbsolute = cwd,
      shouldUnlink = true,
      platforms: mergePlatforms
    } = _ref14;
    if (!_fs.default.lstatSync(rootPathMightNotAbsolute).isDirectory()) {
      throw new Error("'rootPath' must be a valid path, got ".concat(rootPathMightNotAbsolute));
    }
    if (typeof shouldUnlink !== 'boolean') {
      throw new Error("'shouldUnlink' must be a boolean, got ".concat(typeof shouldUnlink));
    }
    if ([mergePlatforms.ios, mergePlatforms.android].find(_ref16 => {
      var {
        assets
      } = _ref16;
      return !Array.isArray(assets);
    })) {
      throw new Error('\'platforms["platform"].assets\' must be an array');
    }
    var rootPath = _path.default.isAbsolute(rootPathMightNotAbsolute) ? rootPathMightNotAbsolute : _path.default.resolve(cwd, rootPathMightNotAbsolute);
    var platforms = {
      ios: {
        enabled: unl(mergePlatforms.ios.enabled, true),
        assets: mergePlatforms.ios.assets
      },
      android: {
        enabled: unl(mergePlatforms.android.enabled, true),
        assets: mergePlatforms.android.assets
      }
    };
    var config = (0, _getConfig.default)({
      rootPath
    });
    var {
      android: {
        path: androidPath
      },
      ios: {
        path: iosPath
      }
    } = config;
    var fontOptions = {
      android: {
        path: _path.default.resolve(androidPath, 'app', 'src', 'main', 'assets', 'fonts')
      },
      ios: {
        addFont: true
      }
    };
    var fontTypes = ['otf', 'ttf'];
    var fontsLinkOptions = fontTypes.reduce((result, fontFiles) => _objectSpread(_objectSpread({}, result), {}, {
      [fontFiles]: fontOptions
    }), {});
    var imageOptions = {
      android: {
        path: _path.default.resolve(androidPath, 'app', 'src', 'main', 'res', 'drawable')
      },
      ios: {
        addFont: false
      }
    };
    var imageTypes = ['png', 'jpg', 'gif'];
    var imageLinkOptions = imageTypes.reduce((result, imageFiles) => _objectSpread(_objectSpread({}, result), {}, {
      [imageFiles]: imageOptions
    }), {});
    var linkOptionsPerExt = _objectSpread(_objectSpread(_objectSpread({}, fontsLinkOptions), imageLinkOptions), {}, {
      mp3: {
        android: {
          path: _path.default.resolve(androidPath, 'app', 'src', 'main', 'res', 'raw')
        },
        ios: {
          addFont: false
        }
      }
    });
    var otherLinkOptions = {
      android: {
        path: _path.default.resolve(androidPath, 'app', 'src', 'main', 'assets', 'custom')
      },
      ios: {
        addFont: false
      }
    };
    var platformConfigs = [{
      name: 'iOS',
      enabled: platforms.ios.enabled,
      assets: platforms.ios.assets,
      manifest: (0, _index.default)(iosPath),
      config: config.ios,
      cleanAssets: _ios2.default,
      copyAssets: _ios.default,
      linkOptionsPerExt: {
        otf: linkOptionsPerExt.otf.ios,
        ttf: linkOptionsPerExt.ttf.ios,
        mp3: linkOptionsPerExt.mp3.ios
      },
      otherLinkOptions: otherLinkOptions.ios
    }, {
      name: 'Android',
      enabled: platforms.android.enabled,
      assets: platforms.android.assets,
      manifest: (0, _index.default)(androidPath),
      config: config.android,
      cleanAssets: _android2.default,
      copyAssets: _android.default,
      linkOptionsPerExt: {
        otf: linkOptionsPerExt.otf.android,
        ttf: linkOptionsPerExt.ttf.android,
        png: linkOptionsPerExt.png.android,
        jpg: linkOptionsPerExt.jpg.android,
        gif: linkOptionsPerExt.gif.android,
        mp3: linkOptionsPerExt.mp3.android
      },
      otherLinkOptions: otherLinkOptions.android
    }];
    yield Promise.all(platformConfigs.filter(_ref17 => {
      var {
        enabled,
        config: platformConfig
      } = _ref17;
      return enabled && platformConfig.exists;
    }).map(linkPlatform({
      rootPath,
      shouldUnlink
    })));
  });
  return function (_x3) {
    return _ref15.apply(this, arguments);
  };
}();