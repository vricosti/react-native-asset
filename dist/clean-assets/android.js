import fs from 'fs-extra';
import path from 'path';
export default function cleanAssetsAndroid() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ = arguments.length > 1 ? arguments[1] : undefined;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var assetPath = options.path,
    _options$embedFolderN = options.embedFolderNoFlattening,
    embedFolderNoFlattening = _options$embedFolderN === void 0 ? false : _options$embedFolderN;
  files.forEach(function (asset) {
    var targetPath = embedFolderNoFlattening ? assetPath // When true, remove the entire folder
    : path.join(assetPath, path.basename(asset)); // When false, remove individual files
    fs.removeSync(targetPath);
  });
}