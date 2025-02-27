import fs from 'fs-extra';
import path from 'path';

export default function copyAssetsAndroid(files = [], _, { path: assetPath }) {
  files.forEach(asset => (
    fs.copySync(asset, path.join(assetPath, path.basename(asset)))
  ));
};