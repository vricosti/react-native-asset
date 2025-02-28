/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getGroup from './getGroup.js';
var hasGroup = function hasGroup(pbxGroup, name) {
  return pbxGroup.children.find(function (group) {
    return group.comment === name;
  });
};

/**
 * Given project and path of the group, it deeply creates a given group
 * making all outer groups if necessary
 *
 * Returns newly created group
 */
export default function createGroup(project, path) {
  return path.split('/').reduce(function (group, name) {
    if (!hasGroup(group, name)) {
      var uuid = project.pbxCreateGroup(name, '""');
      group.children.push({
        value: uuid,
        comment: name
      });
    }
    return project.pbxGroupByName(name);
  }, getGroup(project));
}
;