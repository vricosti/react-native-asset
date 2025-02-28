function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var cwd = process.cwd();
var unl = function unl(val, otherwise) {
  return val !== undefined ? val : otherwise;
};
var clearDuplicated = function clearDuplicated(files) {
  return _.uniqBy(files, function (f) {
    return path.parse(f.path).base;
  });
};
var filesToIgnore = ['.DS_Store', 'Thumbs.db'];
var filterFilesToIgnore = function filterFilesToIgnore(_ref) {
  var asset = _ref.path;
  return filesToIgnore.indexOf(path.basename(asset)) === -1;
};
var getAbsolute = function getAbsolute(_ref2) {
  var filePath = _ref2.filePath,
    dirPath = _ref2.dirPath;
  return path.isAbsolute(filePath) ? filePath : path.resolve(dirPath, filePath);
};
var getRelative = function getRelative(_ref3) {
  var filePath = _ref3.filePath,
    dirPath = _ref3.dirPath;
  return path.isAbsolute(filePath) ? path.relative(dirPath, filePath) : filePath;
};
var filterFileByFilesWhichNotExists = function filterFileByFilesWhichNotExists(files, _ref4) {
  var normalizeAbsolutePathsTo = _ref4.normalizeAbsolutePathsTo;
  return function (file) {
    var filePath = file.path,
      fileSha1 = file.sha1;
    var relativeFilePath = getRelative({
      filePath: filePath,
      dirPath: normalizeAbsolutePathsTo
    });
    return files.map(function (otherFile) {
      return Object.assign({}, otherFile, {
        path: getRelative({
          filePath: otherFile.path,
          dirPath: normalizeAbsolutePathsTo
        })
      });
    }).findIndex(function (otherFile) {
      var otherFileRelativePath = otherFile.path,
        otherFileSha1 = otherFile.sha1;
      return relativeFilePath === otherFileRelativePath && fileSha1 === otherFileSha1;
    }) === -1;
  };
};
var linkPlatform = function linkPlatform(_ref5) {
  var rootPath = _ref5.rootPath,
    shouldUnlink = _ref5.shouldUnlink;
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref6) {
      var name, manifest, config, linkOptionsPerExt, otherLinkOptions, cleanAssets, copyAssets, assetsPaths, prevRelativeAssets, assets, _loadAsset, fileFilters;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            name = _ref6.name, manifest = _ref6.manifest, config = _ref6.config, linkOptionsPerExt = _ref6.linkOptionsPerExt, otherLinkOptions = _ref6.otherLinkOptions, cleanAssets = _ref6.cleanAssets, copyAssets = _ref6.copyAssets, assetsPaths = _ref6.assets;
            prevRelativeAssets = [];
            _context2.prev = 2;
            _context2.next = 5;
            return manifest.read();
          case 5:
            prevRelativeAssets = _context2.sent.map(function (asset) {
              return Object.assign({}, asset, {
                path: asset.path.split('/').join(path.sep) // Convert path to system-specific separator
              });
            });
            _context2.next = 10;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
          case 10:
            assets = [];
            _loadAsset = /*#__PURE__*/function () {
              var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(assetMightNotAbsolute) {
                var asset, stats, subFiles, sha1;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      asset = getAbsolute({
                        filePath: assetMightNotAbsolute,
                        dirPath: rootPath
                      });
                      stats = fs.lstatSync(asset);
                      if (!stats.isDirectory()) {
                        _context.next = 8;
                        break;
                      }
                      subFiles = fs.readdirSync(asset).map(function (file) {
                        return path.resolve(asset, file);
                      });
                      _context.next = 6;
                      return Promise.all(subFiles.map(_loadAsset));
                    case 6:
                      _context.next = 12;
                      break;
                    case 8:
                      _context.next = 10;
                      return sha1File(asset);
                    case 10:
                      sha1 = _context.sent;
                      // Async sha1-file
                      assets = assets.concat({
                        path: asset,
                        sha1: sha1
                      });
                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function loadAsset(_x2) {
                return _ref8.apply(this, arguments);
              };
            }();
            _context2.next = 14;
            return Promise.all(assetsPaths.map(_loadAsset));
          case 14:
            assets = clearDuplicated(assets);
            fileFilters = [].concat(Object.keys(linkOptionsPerExt).map(function (fileExt) {
              return {
                name: fileExt,
                filter: function filter(_ref9) {
                  var filePath = _ref9.path;
                  return path.extname(filePath) === ".".concat(fileExt);
                },
                options: linkOptionsPerExt[fileExt]
              };
            })).concat({
              name: 'custom',
              filter: function filter(_ref10) {
                var filePath = _ref10.path;
                return Object.keys(linkOptionsPerExt).indexOf(path.extname(filePath).substr(1)) === -1;
              },
              options: otherLinkOptions
            });
            fileFilters.forEach(function (_ref11) {
              var fileConfigName = _ref11.name,
                fileConfigFilter = _ref11.filter,
                options = _ref11.options;
              var prevRelativeAssetsWithExt = prevRelativeAssets.filter(fileConfigFilter).filter(filterFileByFilesWhichNotExists(assets, {
                normalizeAbsolutePathsTo: rootPath
              }));
              var assetsWithExt = assets.filter(fileConfigFilter).filter(filterFileByFilesWhichNotExists(prevRelativeAssets, {
                normalizeAbsolutePathsTo: rootPath
              })).filter(filterFilesToIgnore);
              if (shouldUnlink && prevRelativeAssetsWithExt.length > 0) {
                log.info("Cleaning previously linked ".concat(fileConfigName, " assets from ").concat(name, " project"));
                cleanAssets(prevRelativeAssetsWithExt.map(function (_ref12) {
                  var filePath = _ref12.path;
                  return getAbsolute({
                    filePath: filePath,
                    dirPath: rootPath
                  });
                }), config, options);
              }
              if (assetsWithExt.length > 0) {
                log.info("Linking ".concat(fileConfigName, " assets to ").concat(name, " project"));
                copyAssets(assetsWithExt.map(function (_ref13) {
                  var assetPath = _ref13.path;
                  return assetPath;
                }), config, options);
              }
            });
            manifest.write(assets.filter(filterFilesToIgnore).map(function (asset) {
              return Object.assign({}, asset, {
                path: path.relative(rootPath, asset.path).split(path.sep).join('/') // Convert to POSIX for manifest
              });
            }));
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[2, 8]]);
    }));
    return function (_x) {
      return _ref7.apply(this, arguments);
    };
  }();
};
export default (/*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref14) {
    var _ref14$rootPath, rootPathMightNotAbsolute, _ref14$shouldUnlink, shouldUnlink, mergePlatforms, rootPath, platforms, config, androidPath, iosPath, fontOptions, fontTypes, fontsLinkOptions, imageOptions, imageTypes, imageLinkOptions, linkOptionsPerExt, otherLinkOptions, platformConfigs;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _ref14$rootPath = _ref14.rootPath, rootPathMightNotAbsolute = _ref14$rootPath === void 0 ? cwd : _ref14$rootPath, _ref14$shouldUnlink = _ref14.shouldUnlink, shouldUnlink = _ref14$shouldUnlink === void 0 ? true : _ref14$shouldUnlink, mergePlatforms = _ref14.platforms;
          if (fs.lstatSync(rootPathMightNotAbsolute).isDirectory()) {
            _context3.next = 3;
            break;
          }
          throw new Error("'rootPath' must be a valid path, got ".concat(rootPathMightNotAbsolute));
        case 3:
          if (!(typeof shouldUnlink !== 'boolean')) {
            _context3.next = 5;
            break;
          }
          throw new Error("'shouldUnlink' must be a boolean, got ".concat(_typeof(shouldUnlink)));
        case 5:
          if (![mergePlatforms.ios, mergePlatforms.android].find(function (_ref16) {
            var assets = _ref16.assets;
            return !Array.isArray(assets);
          })) {
            _context3.next = 7;
            break;
          }
          throw new Error('\'platforms["platform"].assets\' must be an array');
        case 7:
          rootPath = path.isAbsolute(rootPathMightNotAbsolute) ? rootPathMightNotAbsolute : path.resolve(cwd, rootPathMightNotAbsolute);
          platforms = {
            ios: {
              enabled: unl(mergePlatforms.ios.enabled, true),
              assets: mergePlatforms.ios.assets
            },
            android: {
              enabled: unl(mergePlatforms.android.enabled, true),
              assets: mergePlatforms.android.assets
            }
          };
          config = getConfig({
            rootPath: rootPath
          });
          androidPath = config.android.path, iosPath = config.ios.path;
          fontOptions = {
            android: {
              path: path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'fonts')
            },
            ios: {
              addFont: true
            }
          };
          fontTypes = ['otf', 'ttf'];
          fontsLinkOptions = fontTypes.reduce(function (result, fontFiles) {
            return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, fontFiles, fontOptions));
          }, {});
          imageOptions = {
            android: {
              path: path.resolve(androidPath, 'app', 'src', 'main', 'res', 'drawable')
            },
            ios: {
              addFont: false
            }
          };
          imageTypes = ['png', 'jpg', 'gif'];
          imageLinkOptions = imageTypes.reduce(function (result, imageFiles) {
            return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, imageFiles, imageOptions));
          }, {});
          linkOptionsPerExt = _objectSpread(_objectSpread(_objectSpread({}, fontsLinkOptions), imageLinkOptions), {}, {
            mp3: {
              android: {
                path: path.resolve(androidPath, 'app', 'src', 'main', 'res', 'raw')
              },
              ios: {
                addFont: false
              }
            }
          });
          otherLinkOptions = {
            android: {
              path: path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'custom')
            },
            ios: {
              addFont: false
            }
          };
          platformConfigs = [{
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
              mp3: linkOptionsPerExt.mp3.ios
            },
            otherLinkOptions: otherLinkOptions.ios
          }, {
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
              mp3: linkOptionsPerExt.mp3.android
            },
            otherLinkOptions: otherLinkOptions.android
          }];
          _context3.next = 22;
          return Promise.all(platformConfigs.filter(function (_ref17) {
            var enabled = _ref17.enabled,
              platformConfig = _ref17.config;
            return enabled && platformConfig.exists;
          }).map(linkPlatform({
            rootPath: rootPath,
            shouldUnlink: shouldUnlink
          })));
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x3) {
    return _ref15.apply(this, arguments);
  };
}());