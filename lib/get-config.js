import fs from 'fs';
import path from 'path';

export default ({ rootPath, iosSourceDir, androidSourceDir }) => {
  // Use provided sourceDir or fall back to default
  const iosPath = iosSourceDir ? path.resolve(rootPath, iosSourceDir) : path.resolve(rootPath, 'ios');
  const androidPath = androidSourceDir ? path.resolve(rootPath, androidSourceDir) : path.resolve(rootPath, 'android');

  const iosExists = fs.existsSync(iosPath);
  const xcodeprojName = iosExists
    ? fs.readdirSync(iosPath).find(file => path.extname(file) === '.xcodeproj')
    : null;
  const pbxprojPath = xcodeprojName !== null
    ? path.resolve(iosPath, xcodeprojName, 'project.pbxproj')
    : null;

  return {
    ios: {
      exists: iosExists,
      path: iosPath,
      pbxprojPath,
      sourceDir: iosPath, // Include for consistency
    },
    android: {
      exists: fs.existsSync(androidPath),
      path: androidPath,
      sourceDir: androidPath, // Include for consistency
    },
  };
};