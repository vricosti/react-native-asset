import fs from 'fs-extra';
import path from 'path';
import xcode from 'xcode';
import createGroupWithMessage from '../react-native-lib/ios/createGroupWithMessage.js';
import getPlist from '../react-native-lib/ios/getPlist.js';
import writePlist from '../react-native-lib/ios/writePlist.js';

/**
 * This function works in a similar manner to its Android version,
 * except it does not delete assets but removes Xcode Group references
 */
export default function cleanAssetsIOS(files, projectConfig, _ref) {
  var addFont = _ref.addFont;
  var project = xcode.project(projectConfig.pbxprojPath).parseSync();
  var plist = getPlist(project, projectConfig.sourceDir);
  createGroupWithMessage(project, 'Resources');
  function removeResourceFile(f) {
    return (f || []).map(function (asset) {
      return project.removeResourceFile(path.relative(projectConfig.sourceDir, asset), {
        target: project.getFirstTarget().uuid
      });
    }).filter(function (file) {
      return file;
    }) // xcode returns false if file is already there
    .map(function (file) {
      return file.basename;
    });
  }
  var removedFiles = removeResourceFile(files);
  if (addFont) {
    var existingFonts = plist.UIAppFonts || [];
    var allFonts = existingFonts.filter(function (file) {
      return removedFiles.indexOf(file) === -1;
    });
    plist.UIAppFonts = Array.from(new Set(allFonts)); // use Set to dedupe w/existing
  }
  fs.writeFileSync(projectConfig.pbxprojPath, project.writeSync());
  writePlist(project, projectConfig.sourceDir, plist);
}
;