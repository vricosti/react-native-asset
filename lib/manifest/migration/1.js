export default assets => assets
  .map(({ path: assetPath, sha1 }) => ({
    sha1,
    path: `./${assetPath}`, // Doesn't really matter which relative path, will be cleaned anyway
  }));