import fs from 'fs';
import path from 'path';
export default (function (_ref) {
  var rootPath = _ref.rootPath,
    iosSourceDir = _ref.iosSourceDir,
    androidSourceDir = _ref.androidSourceDir;
  // Use provided sourceDir or fall back to default
  var iosPath = iosSourceDir ? path.resolve(rootPath, iosSourceDir) : path.resolve(rootPath, 'ios');
  var androidPath = androidSourceDir ? path.resolve(rootPath, androidSourceDir) : path.resolve(rootPath, 'android');
  var iosExists = fs.existsSync(iosPath);
  var xcodeprojName = iosExists ? fs.readdirSync(iosPath).find(function (file) {
    return path.extname(file) === '.xcodeproj';
  }) : null;
  var pbxprojPath = xcodeprojName !== null ? path.resolve(iosPath, xcodeprojName, 'project.pbxproj') : null;
  return {
    ios: {
      exists: iosExists,
      path: iosPath,
      pbxprojPath: pbxprojPath,
      sourceDir: iosPath // Include for consistency
    },
    android: {
      exists: fs.existsSync(androidPath),
      path: androidPath,
      sourceDir: androidPath // Include for consistency
    }
  };
});