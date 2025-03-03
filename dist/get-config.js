import fs from 'fs';
import path from 'path';
export default (function (_ref) {
  var rootPath = _ref.rootPath;
  var iosPath = path.resolve(rootPath, 'ios');
  var androidPath = path.resolve(rootPath, 'android');
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
      sourceDir: iosPath
    },
    android: {
      exists: fs.existsSync(androidPath),
      path: androidPath
    }
  };
});