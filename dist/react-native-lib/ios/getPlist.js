/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import plistParser from 'plist';
import getPlistPath from './getPlistPath.js';
import fs from 'fs';

/**
 * Returns Info.plist located in the iOS project
 *
 * Returns `null` if INFOPLIST_FILE is not specified.
 */
export default function getPlist(project, sourceDir) {
  var plistPath = getPlistPath(project, sourceDir);
  if (!plistPath || !fs.existsSync(plistPath)) {
    return null;
  }
  return plistParser.parse(fs.readFileSync(plistPath, 'utf-8'));
}
;