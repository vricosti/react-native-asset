"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPlist;
var _plist = _interopRequireDefault(require("plist"));
var _getPlistPath = _interopRequireDefault(require("./getPlistPath.js"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns Info.plist located in the iOS project
 *
 * Returns `null` if INFOPLIST_FILE is not specified.
 */
function getPlist(project, sourceDir) {
  var plistPath = (0, _getPlistPath.default)(project, sourceDir);
  if (!plistPath || !_fs.default.existsSync(plistPath)) {
    return null;
  }
  return _plist.default.parse(_fs.default.readFileSync(plistPath, 'utf-8'));
}
;