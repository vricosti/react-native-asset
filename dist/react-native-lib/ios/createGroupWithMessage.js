"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGroupWithMessage;
var _npmlog = _interopRequireDefault(require("npmlog"));
var _createGroup = _interopRequireDefault(require("./createGroup.js"));
var _getGroup = _interopRequireDefault(require("./getGroup.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Given project and path of the group, it checks if a group exists at that path,
 * and deeply creates a group for that path if its does not already exist.
 *
 * Returns the existing or newly created group
 */
function createGroupWithMessage(project, path) {
  var group = (0, _getGroup.default)(project, path);
  if (!group) {
    group = (0, _createGroup.default)(project, path);
    _npmlog.default.warn('ERRGROUP', "Group '".concat(path, "' does not exist in your Xcode project. We have created it automatically for you."));
  }
  return group;
}
;