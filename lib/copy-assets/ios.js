const fs = require('fs-extra');
const path = require('path');
const xcode = require('xcode');
const createGroupWithMessage = require('../react-native-lib/ios/createGroupWithMessage');
const getPlist = require('../react-native-lib/ios/getPlist');
const writePlist = require('../react-native-lib/ios/writePlist');

module.exports = function copyAssetsIOS(files, projectConfig, { addFont }) {
  const project = xcode.project(projectConfig.pbxprojPath).parseSync();
  const plist = getPlist(project, projectConfig.sourceDir);

  createGroupWithMessage(project, 'Resources');

  function addResourceFile(f) {
    const assets = (f || []).map(asset => {
      const stats = fs.lstatSync(asset);
      const relativePath = path.relative(projectConfig.sourceDir, asset);

      if (stats.isDirectory()) {
        // Add the folder as a reference group instead of individual files
        return project.addFile(relativePath, null, {
          isGroup: true, // Ensures it’s added as a folder reference
          target: project.getFirstTarget().uuid,
        });
      } else {
        // Handle individual files as before
        return project.addResourceFile(relativePath, {
          target: project.getFirstTarget().uuid,
        });
      }
    });

    return assets
      .filter(file => file) // Filter out duplicates or failures
      .map(file => file.basename);
  }

  const addedFiles = addResourceFile(files);

  if (addFont) {
    const existingFonts = (plist.UIAppFonts || []);
    const allFonts = [...existingFonts, ...addedFiles];
    plist.UIAppFonts = Array.from(new Set(allFonts)); // Deduplicate with existing fonts
  }

  fs.writeFileSync(projectConfig.pbxprojPath, project.writeSync());
  writePlist(project, projectConfig.sourceDir, plist);
};