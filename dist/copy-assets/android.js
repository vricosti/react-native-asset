import fs from 'fs-extra';
import path from 'path';
import log from 'npmlog';
export default function copyAssetsAndroid(files, projectConfig, options) {
  var targetPathFromTop = options.path,
    _options$embedFolderN = options.embedFolderNoFlattening,
    embedFolderNoFlattening = _options$embedFolderN === void 0 ? false : _options$embedFolderN,
    android = options.android,
    _options$myLog = options.myLog,
    myLog = _options$myLog === void 0 ? {
      info: function info() {},
      warn: function warn() {},
      verbose: function verbose() {},
      error: function error() {}
    } : _options$myLog;
  if (!files || !Array.isArray(files) || files.length === 0) {
    myLog.warn('copyAssetsAndroid', 'No files provided for copying');
    return;
  }
  var targetPath = targetPathFromTop || android && android.path || undefined;
  myLog.info("copyAssetsAndroid: targetPath=".concat(targetPath, ", embedFolderNoFlattening=").concat(embedFolderNoFlattening));
  if (!targetPath) {
    myLog.error('copyAssetsAndroid', 'Target path is required');
    throw new Error('Target path is required for copying assets');
  }
  var isDrawableTarget = targetPath.includes('drawable');
  if (isDrawableTarget && embedFolderNoFlattening) {
    myLog.info("Skipping copy to drawable: ".concat(targetPath, " (embedFolderNoFlattening is true)"));
    return;
  }
  fs.ensureDirSync(targetPath);
  try {
    files.forEach(function (file) {
      if (!fs.existsSync(file)) {
        myLog.warn('copyAssetsAndroid', "File not found: ".concat(file));
        return;
      }
      var stats = fs.lstatSync(file);
      if (stats.isDirectory() && embedFolderNoFlattening) {
        // Preserve folder structure by copying the entire directory
        var destPath = targetPath;
        fs.copySync(file, destPath, {
          overwrite: true
        });
        myLog.info("Copied directory ".concat(path.basename(file), " to ").concat(destPath));
      } else if (!stats.isDirectory()) {
        // Copy individual files directly
        var _destPath = path.join(targetPath, path.basename(file));
        fs.copySync(file, _destPath, {
          overwrite: true
        });
        myLog.info("Copied ".concat(path.basename(file), " to ").concat(targetPath));
      } else if (stats.isDirectory()) {
        // Flatten directory contents
        var subFiles = fs.readdirSync(file).map(function (subFile) {
          return path.resolve(file, subFile);
        });
        subFiles.forEach(function (subFile) {
          var subStats = fs.lstatSync(subFile);
          if (!subStats.isDirectory()) {
            var _destPath2 = path.join(targetPath, path.basename(subFile));
            fs.copySync(subFile, _destPath2, {
              overwrite: true
            });
            myLog.info("Copied ".concat(path.basename(subFile), " to ").concat(targetPath));
          }
        });
      }
    });
  } catch (error) {
    myLog.error('copyAssetsAndroid', "Error copying assets: ".concat(error.message));
    throw error;
  }
}