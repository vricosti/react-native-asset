import fs from 'fs-extra';
import path from 'path';
export default function copyAssetsAndroid() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ = arguments.length > 1 ? arguments[1] : undefined;
  var _ref = arguments.length > 2 ? arguments[2] : undefined,
    assetPath = _ref.path;
  files.forEach(function (asset) {
    return fs.copySync(asset, path.join(assetPath, path.basename(asset)));
  });
}
;