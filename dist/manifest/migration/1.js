"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _default = assets => assets.map(_ref => {
  var {
    path: assetPath,
    sha1
  } = _ref;
  return {
    sha1,
    path: "./".concat(assetPath) // Doesn't really matter which relative path, will be cleaned anyway
  };
});
exports.default = _default;