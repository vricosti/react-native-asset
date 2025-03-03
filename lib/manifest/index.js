import fs from 'fs-extra';
import path from 'path';
import migrations from './migration/index.js';

const migrationsLength = migrations.length;

const readManifest = folderPath => fs.readJsonSync(path.resolve(folderPath, 'link-assets-manifest.json'));
const writeManifest = (folderPath, obj) => fs.writeJsonSync(path.resolve(folderPath, 'link-assets-manifest.json'), obj, { spaces: 2 });

export default folderPath => ({
  read: async () => {
    const initialData = readManifest(folderPath);

    const data = await migrations
      .filter((_, i) => i > (initialData.migIndex || -1))
      .reduce(async (currDataPromise, mig, i) => {
        const currData = await currDataPromise;
        const nextData = await mig(currData.data || currData); // Handle async migrations
        return {
          migIndex: i,
          data: nextData,
        };
      }, Promise.resolve(initialData));

    return data.data;
  },
  write: data => writeManifest(folderPath, { migIndex: migrationsLength - 1, data }),
});