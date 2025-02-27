"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
var _index = _interopRequireDefault(require("./migration/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var migrationsLength = _index.default.length;
var readManifest = folderPath => _fsExtra.default.readJsonSync(_path.default.resolve(folderPath, 'link-assets-manifest.json'));
var writeManifest = (folderPath, obj) => _fsExtra.default.writeJsonSync(_path.default.resolve(folderPath, 'link-assets-manifest.json'), obj, {
  spaces: 2
});
var _default = folderPath => ({
  read: function () {
    var _read = _asyncToGenerator(function* () {
      var initialData = readManifest(folderPath);
      var data = yield _index.default.filter((_, i) => i > (initialData.migIndex || -1)).reduce(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (currDataPromise, mig, i) {
          var currData = yield currDataPromise;
          var nextData = yield mig(currData.data || currData); // Handle async migrations
          return {
            migIndex: i,
            data: nextData
          };
        });
        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }(), Promise.resolve(initialData));
      return data.data;
    });
    function read() {
      return _read.apply(this, arguments);
    }
    return read;
  }(),
  write: data => writeManifest(folderPath, {
    migIndex: migrationsLength - 1,
    data
  })
});
exports.default = _default;