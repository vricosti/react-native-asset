import fs from 'fs-extra';
import path from 'path';
import xcode from 'xcode';
import createGroupWithMessage from '../react-native-lib/ios/createGroupWithMessage.js';
import getPlist from '../react-native-lib/ios/getPlist.js';
import writePlist from '../react-native-lib/ios/writePlist.js';

/**
 * This function works in a similar manner to its Android version,
 * except it does not copy assets but creates Xcode Group references
 * Now with support for adding entire directories as folder references
 */
export default function copyAssetsIOS(files, projectConfig, { addFont }) {
  const project = xcode.project(projectConfig.pbxprojPath).parseSync();
  const plist = getPlist(project, projectConfig.sourceDir);

  createGroupWithMessage(project, 'Resources');

  function addResourceFile(f) {
    return (f || [])
      .map(asset => {
        const stats = fs.lstatSync(asset);
        if (stats.isDirectory()) {
          const relativePath = path.relative(projectConfig.sourceDir, asset);
          const file = project.addResourceFile(
            relativePath,
            { 
              target: project.getFirstTarget().uuid,
              lastKnownFileType: 'folder',
              sourceTree: '"<group>"',
              customResourcePath: asset
            }
          );
          return file;
        } else {
          return project.addResourceFile(
            path.relative(projectConfig.sourceDir, asset),
            { target: project.getFirstTarget().uuid }
          );
        }
      })
      .filter(file => file) // xcode returns false if file/folder is already there
      .map(file => file.basename);
  }

  const addedFiles = addResourceFile(files);

  if (addFont) {
    const existingFonts = (plist.UIAppFonts || []);
    const allFonts = [...existingFonts, ...addedFiles];
    plist.UIAppFonts = Array.from(new Set(allFonts));
  }

  fs.writeFileSync(
    projectConfig.pbxprojPath,
    project.writeSync(),
  );

  writePlist(project, projectConfig.sourceDir, plist);
};