import fs from 'fs-extra';
import path from 'path';
import log from 'npmlog';

export default function copyAssetsAndroid(files, projectConfig, options) {
  const { path: targetPathFromTop, embedFolderNoFlattening = false, android, myLog = { info: () => {}, warn: () => {}, verbose: () => {}, error: () => {} } } = options;

  if (!files || !Array.isArray(files) || files.length === 0) {
    myLog.warn('copyAssetsAndroid', 'No files provided for copying');
    return;
  }

  const targetPath = targetPathFromTop || (android && android.path) || undefined;
  myLog.info(`copyAssetsAndroid: targetPath=${targetPath}, embedFolderNoFlattening=${embedFolderNoFlattening}`);

  if (!targetPath) {
    myLog.error('copyAssetsAndroid', 'Target path is required');
    throw new Error('Target path is required for copying assets');
  }

  const isDrawableTarget = targetPath.includes('drawable');
  if (isDrawableTarget && embedFolderNoFlattening) {
    myLog.info(`Skipping copy to drawable: ${targetPath} (embedFolderNoFlattening is true)`);
    return;
  }

  fs.ensureDirSync(targetPath);

  try {
    files.forEach(file => {
      if (!fs.existsSync(file)) {
        myLog.warn('copyAssetsAndroid', `File not found: ${file}`);
        return;
      }

      const stats = fs.lstatSync(file);
      
      if (stats.isDirectory() && embedFolderNoFlattening) {
        // Preserve folder structure by copying the entire directory
        const destPath = targetPath;
        fs.copySync(file, destPath, { overwrite: true });
        myLog.info(`Copied directory ${path.basename(file)} to ${destPath}`);
      } else if (!stats.isDirectory()) {
        // Copy individual files directly
        const destPath = path.join(targetPath, path.basename(file));
        fs.copySync(file, destPath, { overwrite: true });
        myLog.info(`Copied ${path.basename(file)} to ${targetPath}`);
      } else if (stats.isDirectory()) {
        // Flatten directory contents
        const subFiles = fs.readdirSync(file).map(subFile => path.resolve(file, subFile));
        subFiles.forEach(subFile => {
          const subStats = fs.lstatSync(subFile);
          if (!subStats.isDirectory()) {
            const destPath = path.join(targetPath, path.basename(subFile));
            fs.copySync(subFile, destPath, { overwrite: true });
            myLog.info(`Copied ${path.basename(subFile)} to ${targetPath}`);
          }
        });
      }
    });
  } catch (error) {
    myLog.error('copyAssetsAndroid', `Error copying assets: ${error.message}`);
    throw error;
  }
}