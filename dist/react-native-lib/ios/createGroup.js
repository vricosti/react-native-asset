"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGroup;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _getGroup = _interopRequireDefault(require("./getGroup.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasGroup = (pbxGroup, name) => pbxGroup.children.find(group => group.comment === name);

/**
 * Given project and path of the group, it deeply creates a given group
 * making all outer groups if necessary
 *
 * Returns newly created group
 */
function createGroup(project, path) {
  return path.split('/').reduce((group, name) => {
    if (!hasGroup(group, name)) {
      var uuid = project.pbxCreateGroup(name, '""');
      group.children.push({
        value: uuid,
        comment: name
      });
    }
    return project.pbxGroupByName(name);
  }, (0, _getGroup.default)(project));
}
;