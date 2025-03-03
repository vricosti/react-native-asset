export default (function (assets) {
  return assets.map(function (_ref) {
    var assetPath = _ref.path,
      sha1 = _ref.sha1;
    return {
      sha1: sha1,
      path: "./".concat(assetPath) // Doesn't really matter which relative path, will be cleaned anyway
    };
  });
});