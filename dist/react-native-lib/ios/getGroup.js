"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getGroup;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/web.dom-collections.iterator.js");
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable */

var getFirstProject = project => project.getFirstProject().firstProject;
var findGroup = (group, name) => group.children.find(group => group.comment === name);

/**
 * Returns group from .xcodeproj if one exists, null otherwise
 *
 * Unlike node-xcode `pbxGroupByName` - it does not return `first-matching`
 * group if multiple groups with the same name exist
 *
 * If path is not provided, it returns top-level group
 */
function getGroup(project, path) {
  var firstProject = getFirstProject(project);
  var group = project.getPBXGroupByKey(firstProject.mainGroup);
  if (!path) {
    return group;
  }
  for (var name of path.split('/')) {
    var foundGroup = findGroup(group, name);
    if (foundGroup) {
      group = project.getPBXGroupByKey(foundGroup.value);
    } else {
      group = null;
      break;
    }
  }
  return group;
}
;