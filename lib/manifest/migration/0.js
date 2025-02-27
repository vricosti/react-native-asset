import sha1File from 'sha1-file';

export default async (assets) => {
  const assetsPathsAndSha1 = await assets.reduce(async (arrPromise, path) => {
    const arr = await arrPromise;
    try {
      const sha1 = await sha1File(path); // Async in ESM
      return arr.concat({
        path,
        sha1,
      });
    } catch (err) {
      return arr;
    }
  }, Promise.resolve([]));

  const newData = assetsPathsAndSha1;
  return newData;
};