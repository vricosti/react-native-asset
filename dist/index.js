function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var cwd = process.cwd();
var configPath = path.join(cwd, 'react-native.config.js');
var defaultConfig = {};
var defaultEmbedFolderNoFlattening = false;
var configPromise = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var configModule;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        if (!fs.existsSync(configPath)) {
          _context.next = 12;
          break;
        }
        _context.prev = 1;
        _context.next = 4;
        return import("file://".concat(configPath));
      case 4:
        configModule = _context.sent;
        defaultConfig = configModule["default"] || {};
        defaultEmbedFolderNoFlattening = defaultConfig.embedFolderNoFlattening || false;
        _context.next = 12;
        break;
      case 9:
        _context.prev = 9;
        _context.t0 = _context["catch"](1);
        log.error("Failed to load config from ".concat(configPath, ": ").concat(_context.t0.message));
      case 12:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[1, 9]]);
}))();
var unl = function unl(val, otherwise) {
  return val !== undefined ? val : otherwise;
};
var getAbsolute = function getAbsolute(_ref2) {
  var filePath = _ref2.filePath,
    dirPath = _ref2.dirPath;
  if (!filePath) {
    log.warn('getAbsolute received undefined filePath');
    return null;
  }
  return path.isAbsolute(filePath) ? filePath : path.resolve(dirPath, filePath);
};
var clearDuplicated = function clearDuplicated(files) {
  return _.uniqBy(files, function (f) {
    return path.parse(f.path).base;
  });
};
var filesToIgnore = ['.DS_Store', 'Thumbs.db'];
var filterFilesToIgnore = function filterFilesToIgnore(_ref3) {
  var asset = _ref3.path;
  return filesToIgnore.indexOf(path.basename(asset)) === -1;
};
var filterFileByFilesWhichNotExists = function filterFileByFilesWhichNotExists(files, _ref4) {
  var normalizeAbsolutePathsTo = _ref4.normalizeAbsolutePathsTo;
  return function (file) {
    if (!file || !file.path) {
      log.warn('filterFileByFilesWhichNotExists received invalid file object');
      return false; // Skip invalid files
    }
    var filePath = file.path,
      fileSha1 = file.sha1;
    var relativeFilePath = path.isAbsolute(filePath) ? path.relative(normalizeAbsolutePathsTo, filePath) : filePath;
    return files.map(function (otherFile) {
      return Object.assign({}, otherFile, {
        path: otherFile.path && (path.isAbsolute(otherFile.path) ? path.relative(normalizeAbsolutePathsTo, otherFile.path) : otherFile.path)
      });
    }).findIndex(function (otherFile) {
      var otherFileRelativePath = otherFile.path,
        otherFileSha1 = otherFile.sha1;
      return relativeFilePath === otherFileRelativePath && fileSha1 === otherFileSha1;
    }) === -1;
  };
};
var _calculateDirSha = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dirPath) {
    var files, combinedSha1, _iterator, _step, file, filePath, stats, hash, i, _char;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          files = fs.readdirSync(dirPath);
          combinedSha1 = '';
          _iterator = _createForOfIteratorHelper(files);
          _context2.prev = 3;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context2.next = 22;
            break;
          }
          file = _step.value;
          filePath = path.join(dirPath, file);
          stats = fs.lstatSync(filePath);
          if (!stats.isDirectory()) {
            _context2.next = 16;
            break;
          }
          _context2.t0 = combinedSha1;
          _context2.next = 13;
          return _calculateDirSha(filePath);
        case 13:
          combinedSha1 = _context2.t0 += _context2.sent;
          _context2.next = 20;
          break;
        case 16:
          _context2.t1 = combinedSha1;
          _context2.next = 19;
          return sha1File(filePath);
        case 19:
          combinedSha1 = _context2.t1 += _context2.sent;
        case 20:
          _context2.next = 5;
          break;
        case 22:
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t2 = _context2["catch"](3);
          _iterator.e(_context2.t2);
        case 27:
          _context2.prev = 27;
          _iterator.f();
          return _context2.finish(27);
        case 30:
          hash = 0;
          for (i = 0; i < combinedSha1.length; i++) {
            _char = combinedSha1.charCodeAt(i);
            hash = (hash << 5) - hash + _char;
            hash = hash & hash;
          }
          return _context2.abrupt("return", hash.toString(16));
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 24, 27, 30]]);
  }));
  return function calculateDirSha1(_x) {
    return _ref5.apply(this, arguments);
  };
}();
var linkPlatform = function linkPlatform(_ref6) {
  var rootPath = _ref6.rootPath,
    shouldUnlink = _ref6.shouldUnlink,
    fullConfig = _ref6.fullConfig;
  return /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref7) {
      var name, manifest, config, linkOptionsPerExt, baseOtherLinkOptions, cleanAssets, copyAssets, assetsPaths, embedFolderNoFlattening, myLog, prevRelativeAssets, assets, _loadAsset, filteredAssets, assetPath, androidBasePath, relativeAssetPath, folderName, otherLinkOptions, fileFilters;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            name = _ref7.name, manifest = _ref7.manifest, config = _ref7.config, linkOptionsPerExt = _ref7.linkOptionsPerExt, baseOtherLinkOptions = _ref7.otherLinkOptions, cleanAssets = _ref7.cleanAssets, copyAssets = _ref7.copyAssets, assetsPaths = _ref7.assets, embedFolderNoFlattening = _ref7.embedFolderNoFlattening, myLog = _ref7.myLog;
            myLog.info("Processing platform: ".concat(name));
            myLog.info("Assets paths: ".concat(JSON.stringify(assetsPaths)));
            myLog.info("embedFolderNoFlattening for ".concat(name, ": ").concat(embedFolderNoFlattening));
            myLog.info("Config in linkPlatform: ".concat(JSON.stringify(fullConfig)));
            prevRelativeAssets = [];
            _context4.prev = 6;
            _context4.next = 9;
            return manifest.read();
          case 9:
            prevRelativeAssets = _context4.sent.map(function (asset) {
              return Object.assign({}, asset, {
                path: asset.path.split('/').join(path.sep)
              });
            });
            myLog.info("Previous assets: ".concat(JSON.stringify(prevRelativeAssets)));
            _context4.next = 16;
            break;
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](6);
            myLog.info('No previous manifest found');
          case 16:
            assets = [];
            _loadAsset = /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(assetMightNotAbsolute, platformName, embedFolderNoFlattening) {
                var asset, stats, sha1, subFiles;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      asset = getAbsolute({
                        filePath: assetMightNotAbsolute,
                        dirPath: rootPath
                      });
                      if (fs.existsSync(asset)) {
                        _context3.next = 4;
                        break;
                      }
                      myLog.warn("Asset not found: ".concat(asset));
                      return _context3.abrupt("return");
                    case 4:
                      stats = fs.lstatSync(asset);
                      if (!stats.isDirectory()) {
                        _context3.next = 17;
                        break;
                      }
                      _context3.prev = 6;
                      _context3.next = 9;
                      return _calculateDirSha(asset);
                    case 9:
                      sha1 = _context3.sent;
                      _context3.next = 15;
                      break;
                    case 12:
                      _context3.prev = 12;
                      _context3.t0 = _context3["catch"](6);
                      sha1 = "dir-".concat(Date.now());
                    case 15:
                      _context3.next = 20;
                      break;
                    case 17:
                      _context3.next = 19;
                      return sha1File(asset);
                    case 19:
                      sha1 = _context3.sent;
                    case 20:
                      assets.push({
                        path: asset,
                        sha1: sha1,
                        isDirectory: stats.isDirectory()
                      });
                      myLog.info("Loaded asset: ".concat(asset, " (isDirectory: ").concat(stats.isDirectory(), ")"));
                      if (!(platformName === 'Android' || !embedFolderNoFlattening)) {
                        _context3.next = 27;
                        break;
                      }
                      if (!stats.isDirectory()) {
                        _context3.next = 27;
                        break;
                      }
                      subFiles = fs.readdirSync(asset).map(function (file) {
                        return path.resolve(asset, file);
                      });
                      _context3.next = 27;
                      return Promise.all(subFiles.map(function (file) {
                        return _loadAsset(file, platformName, embedFolderNoFlattening);
                      }));
                    case 27:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3, null, [[6, 12]]);
              }));
              return function loadAsset(_x3, _x4, _x5) {
                return _ref9.apply(this, arguments);
              };
            }();
            _context4.next = 20;
            return Promise.all(assetsPaths.map(function (asset) {
              return _loadAsset(asset, name, name === 'iOS' && embedFolderNoFlattening);
            }));
          case 20:
            assets = clearDuplicated(assets);
            myLog.info("Assets after deduplication: ".concat(JSON.stringify(assets)));

            // Filter assets to only directories when embedFolderNoFlattening is true
            filteredAssets = assets;
            if (embedFolderNoFlattening) {
              filteredAssets = assets.filter(function (asset) {
                return assetsPaths.some(function (topLevelPath) {
                  return getAbsolute({
                    filePath: topLevelPath,
                    dirPath: rootPath
                  }) === asset.path;
                });
              });
              myLog.info("Filtered ".concat(name, " assets (embedFolderNoFlattening): ").concat(JSON.stringify(filteredAssets)));
            }

            // Dynamically compute otherLinkOptions or use previous path for cleanup
            assetPath = assetsPaths[0];
            androidBasePath = fullConfig.android && fullConfig.android.path ? path.resolve(fullConfig.android.path, 'app', 'src', 'main', 'assets') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'assets');
            relativeAssetPath = assetPath ? path.relative(rootPath, getAbsolute({
              filePath: assetPath,
              dirPath: rootPath
            })) : '';
            folderName = assetPath ? path.basename(relativeAssetPath) : prevRelativeAssets.length > 0 ? path.basename(prevRelativeAssets[0].path) : 'remotes'; // Fallback to manifest or default
            otherLinkOptions = {
              android: {
                path: embedFolderNoFlattening ? path.join(androidBasePath, folderName) // e.g., assets/remotes
                : path.resolve(androidBasePath, 'custom') // Original: assets/custom
              },
              ios: baseOtherLinkOptions.ios
            };
            fileFilters = [];
            myLog.info("linkOptionsPerExt for ".concat(name, ": ").concat(JSON.stringify(linkOptionsPerExt)));
            if (name === 'Android' && embedFolderNoFlattening) {
              fileFilters.push({
                name: 'directory',
                filter: function filter(_ref10) {
                  var isDirectory = _ref10.isDirectory;
                  return isDirectory === true;
                },
                options: otherLinkOptions
              });
            } else if (name === 'iOS' && embedFolderNoFlattening) {
              fileFilters.push({
                name: 'directory',
                filter: function filter(_ref11) {
                  var isDirectory = _ref11.isDirectory;
                  return isDirectory === true;
                },
                options: otherLinkOptions
              });
            } else {
              fileFilters.push.apply(fileFilters, _toConsumableArray(Object.keys(linkOptionsPerExt).map(function (fileExt) {
                return {
                  name: fileExt,
                  filter: function filter(_ref12) {
                    var filePath = _ref12.path;
                    return !fs.lstatSync(filePath).isDirectory() && path.extname(filePath) === ".".concat(fileExt);
                  },
                  options: linkOptionsPerExt[fileExt]
                };
              })));
              fileFilters.push({
                name: 'custom',
                filter: function filter(_ref13) {
                  var filePath = _ref13.path;
                  return !fs.lstatSync(filePath).isDirectory() && Object.keys(linkOptionsPerExt).indexOf(path.extname(filePath).substr(1)) === -1;
                },
                options: otherLinkOptions
              });
            }
            myLog.info("fileFilters for ".concat(name, ": ").concat(JSON.stringify(fileFilters.map(function (f) {
              return {
                name: f.name
              };
            }))));
            fileFilters.forEach(function (_ref14) {
              var fileConfigName = _ref14.name,
                fileConfigFilter = _ref14.filter,
                options = _ref14.options;
              var prevRelativeAssetsWithExt = prevRelativeAssets.filter(fileConfigFilter).filter(filterFileByFilesWhichNotExists(filteredAssets, {
                normalizeAbsolutePathsTo: rootPath
              }));
              var assetsWithExt = filteredAssets.filter(fileConfigFilter).filter(filterFileByFilesWhichNotExists(prevRelativeAssets, {
                normalizeAbsolutePathsTo: rootPath
              })).filter(filterFilesToIgnore);
              myLog.info("Assets to clean for ".concat(fileConfigName, ": ").concat(JSON.stringify(prevRelativeAssetsWithExt)));
              myLog.info("".concat(fileConfigName, " assets to process: ").concat(JSON.stringify(assetsWithExt)));
              if (shouldUnlink && prevRelativeAssetsWithExt.length > 0) {
                log.info("Cleaning previously linked ".concat(fileConfigName, " assets from ").concat(name, " project"));
                var pathsToClean = prevRelativeAssetsWithExt.map(function (_ref15) {
                  var filePath = _ref15.path;
                  return getAbsolute({
                    filePath: filePath,
                    dirPath: rootPath
                  });
                }).filter(function (p) {
                  return p !== null;
                }); // Filter out null paths
                if (pathsToClean.length > 0) {
                  // Use the target path from options or compute it based on previous asset
                  var cleanOptions = _objectSpread(_objectSpread({}, options), {}, {
                    path: embedFolderNoFlattening && name === 'Android' ? path.join(androidBasePath, path.basename(pathsToClean[0])) : options.path || (name === 'Android' ? path.resolve(androidBasePath, 'custom') : undefined),
                    embedFolderNoFlattening: embedFolderNoFlattening,
                    myLog: myLog
                  });
                  cleanAssets(pathsToClean, config, cleanOptions);
                }
              }
              if (assetsWithExt.length > 0) {
                log.info("Linking ".concat(fileConfigName, " assets to ").concat(name, " project"));
                var copyOptions = _objectSpread(_objectSpread({}, options), {}, {
                  embedFolderNoFlattening: embedFolderNoFlattening,
                  myLog: myLog
                });
                myLog.info("Copy options for ".concat(fileConfigName, ": ").concat(JSON.stringify(copyOptions)));
                copyAssets(assetsWithExt.map(function (_ref16) {
                  var assetPath = _ref16.path;
                  return assetPath;
                }), config, copyOptions);
              }
            });
            myLog.info("Writing manifest with assets: ".concat(JSON.stringify(filteredAssets)));
            _context4.next = 37;
            return manifest.write(filteredAssets.filter(filterFilesToIgnore).map(function (asset) {
              return Object.assign({}, asset, {
                path: path.relative(rootPath, asset.path).split(path.sep).join('/')
              });
            }));
          case 37:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[6, 13]]);
    }));
    return function (_x2) {
      return _ref8.apply(this, arguments);
    };
  }();
};
export default (/*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref17) {
    var _ref17$rootPath, rootPathMightNotAbsolute, _ref17$shouldUnlink, shouldUnlink, mergePlatforms, embedFolderNoFlattening, debug, effectiveDebug, effectiveEmbedFolderNoFlattening, myLog, rootPath, platforms, config, _config$android, _config$android2, androidPath, _config$ios, _config$ios2, iosPath, fontOptions, fontTypes, fontsLinkOptions, imageOptions, imageTypes, imageLinkOptions, commonLinkOptionsPerExt, baseOtherLinkOptions, platformConfigs;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _ref17$rootPath = _ref17.rootPath, rootPathMightNotAbsolute = _ref17$rootPath === void 0 ? cwd : _ref17$rootPath, _ref17$shouldUnlink = _ref17.shouldUnlink, shouldUnlink = _ref17$shouldUnlink === void 0 ? true : _ref17$shouldUnlink, mergePlatforms = _ref17.platforms, embedFolderNoFlattening = _ref17.embedFolderNoFlattening, debug = _ref17.debug;
          _context5.next = 3;
          return configPromise;
        case 3:
          effectiveDebug = debug !== undefined ? debug : defaultConfig.debug || false;
          effectiveEmbedFolderNoFlattening = embedFolderNoFlattening !== undefined ? embedFolderNoFlattening : defaultEmbedFolderNoFlattening; //log.info(`Effective debug: ${effectiveDebug}`);
          myLog = {
            info: effectiveDebug ? function () {
              return log.info.apply(log, arguments);
            } : function () {},
            warn: effectiveDebug ? function () {
              return log.warn.apply(log, arguments);
            } : function () {},
            verbose: effectiveDebug ? function () {
              return log.verbose.apply(log, arguments);
            } : function () {}
          };
          rootPath = path.isAbsolute(rootPathMightNotAbsolute) ? rootPathMightNotAbsolute : path.resolve(cwd, rootPathMightNotAbsolute);
          myLog.info("embedFolderNoFlattening at entry: ".concat(effectiveEmbedFolderNoFlattening));
          if (fs.lstatSync(rootPath).isDirectory()) {
            _context5.next = 10;
            break;
          }
          throw new Error("'rootPath' must be a valid path, got ".concat(rootPathMightNotAbsolute));
        case 10:
          if (!(typeof shouldUnlink !== 'boolean')) {
            _context5.next = 12;
            break;
          }
          throw new Error("'shouldUnlink' must be a boolean, got ".concat(_typeof(shouldUnlink)));
        case 12:
          if (![mergePlatforms.ios, mergePlatforms.android].find(function (_ref19) {
            var assets = _ref19.assets;
            return !Array.isArray(assets);
          })) {
            _context5.next = 14;
            break;
          }
          throw new Error('\'platforms["platform"].assets\' must be an array');
        case 14:
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
          myLog.info("Config from getConfig: ".concat(JSON.stringify(config)));
          _config$android = config.android, _config$android2 = _config$android === void 0 ? {} : _config$android, androidPath = _config$android2.path, _config$ios = config.ios, _config$ios2 = _config$ios === void 0 ? {} : _config$ios, iosPath = _config$ios2.path;
          fontOptions = {
            android: {
              path: androidPath ? path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'fonts') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'assets', 'fonts')
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
              path: androidPath ? path.resolve(androidPath, 'app', 'src', 'main', 'res', 'drawable') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'res', 'drawable')
            },
            ios: {
              addFont: false
            }
          };
          imageTypes = ['png', 'jpg', 'gif'];
          imageLinkOptions = imageTypes.reduce(function (result, imageFiles) {
            return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, imageFiles, imageOptions));
          }, {});
          commonLinkOptionsPerExt = _objectSpread(_objectSpread(_objectSpread({}, fontsLinkOptions), imageLinkOptions), {}, {
            mp3: {
              android: {
                path: androidPath ? path.resolve(androidPath, 'app', 'src', 'main', 'res', 'raw') : path.resolve(rootPath, 'android', 'app', 'src', 'main', 'res', 'raw')
              },
              ios: {
                addFont: false
              }
            }
          });
          baseOtherLinkOptions = {
            ios: {
              addFont: false
            }
          };
          platformConfigs = [{
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
              mp3: commonLinkOptionsPerExt.mp3.ios
            },
            otherLinkOptions: baseOtherLinkOptions,
            embedFolderNoFlattening: effectiveEmbedFolderNoFlattening,
            myLog: myLog
          }, {
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
              mp3: commonLinkOptionsPerExt.mp3.android
            },
            otherLinkOptions: baseOtherLinkOptions,
            embedFolderNoFlattening: effectiveEmbedFolderNoFlattening,
            myLog: myLog
          }];
          _context5.next = 29;
          return Promise.all(platformConfigs.filter(function (_ref20) {
            var enabled = _ref20.enabled,
              platformConfig = _ref20.config;
            return enabled && platformConfig.exists !== false;
          }).map(linkPlatform({
            rootPath: rootPath,
            shouldUnlink: shouldUnlink,
            fullConfig: config
          })));
        case 29:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x6) {
    return _ref18.apply(this, arguments);
  };
}());
if (import.meta.url === "file://".concat(process.argv[1])) {
  _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var configPath, config, finalConfig;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          configPath = path.join(cwd, 'react-native.config.js');
          config = {};
          if (!fs.existsSync(configPath)) {
            _context6.next = 9;
            break;
          }
          _context6.next = 5;
          return import("file://".concat(configPath));
        case 5:
          _context6.t0 = _context6.sent["default"];
          if (_context6.t0) {
            _context6.next = 8;
            break;
          }
          _context6.t0 = {};
        case 8:
          config = _context6.t0;
        case 9:
          finalConfig = {
            rootPath: cwd,
            shouldUnlink: true,
            platforms: {
              ios: {
                enabled: true,
                assets: [].concat(_toConsumableArray(config.assets || []), _toConsumableArray(config.iosAssets || []))
              },
              android: {
                enabled: true,
                assets: [].concat(_toConsumableArray(config.assets || []), _toConsumableArray(config.androidAssets || []))
              }
            },
            embedFolderNoFlattening: config.embedFolderNoFlattening || false,
            debug: config.debug || false
          };
          log.info("Final config before module.exports: ".concat(JSON.stringify(finalConfig)));
          global.ReactNativeAssetConfig = {
            embedFolderNoFlattening: finalConfig.embedFolderNoFlattening
          };

          //myLog.info(`Running with config: ${JSON.stringify(finalConfig)}`);
          //myLog.info(`Passing embedFolderNoFlattening: ${finalConfig.embedFolderNoFlattening}`);
          _context6.next = 14;
          return module.exports(finalConfig)["catch"](function (err) {
            console.error(err);
            process.exit(1);
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }))();
}