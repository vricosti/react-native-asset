import fs from 'fs-extra';
import path from 'path';

export default function cleanAssetsAndroid(files = [], _, { path: assetPath }) {
  files.forEach(asset => (
    fs.removeSync(path.join(assetPath, path.basename(asset)))
  ));
};