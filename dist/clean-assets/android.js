"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanAssetsAndroid;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function cleanAssetsAndroid() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ = arguments.length > 1 ? arguments[1] : undefined;
  var {
    path: assetPath
  } = arguments.length > 2 ? arguments[2] : undefined;
  files.forEach(asset => _fsExtra.default.removeSync(_path.default.join(assetPath, _path.default.basename(asset))));
}
;