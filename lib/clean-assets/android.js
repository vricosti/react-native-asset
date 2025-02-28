import fs from 'fs-extra';
import path from 'path';

export default function cleanAssetsAndroid(files = [], _, options) {
  const { path: assetPath, embedFolderNoFlattening = false } = options;

  files.forEach(asset => {
    const targetPath = embedFolderNoFlattening 
      ? assetPath // When true, remove the entire folder
      : path.join(assetPath, path.basename(asset)); // When false, remove individual files
    fs.removeSync(targetPath);
  });
}