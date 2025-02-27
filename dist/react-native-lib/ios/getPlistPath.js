"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPlistPath;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _path = _interopRequireDefault(require("path"));
var _getBuildProperty = _interopRequireDefault(require("./getBuildProperty.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function getPlistPath(project, sourceDir) {
  var plistFile = (0, _getBuildProperty.default)(project, 'INFOPLIST_FILE');
  if (!plistFile) {
    return null;
  }
  return _path.default.join(sourceDir, plistFile.replace(/"/g, '').replace('$(SRCROOT)', ''));
}
;