"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _sha1File = _interopRequireDefault(require("sha1-file"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _default = exports.default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (assets) {
    var assetsPathsAndSha1 = yield assets.reduce(/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (arrPromise, path) {
        var arr = yield arrPromise;
        try {
          var sha1 = yield (0, _sha1File.default)(path); // Async in ESM
          return arr.concat({
            path,
            sha1
          });
        } catch (err) {
          return arr;
        }
      });
      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), Promise.resolve([]));
    var newData = assetsPathsAndSha1;
    return newData;
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();