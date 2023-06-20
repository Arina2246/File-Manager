import path from 'path';
import fs, { stat } from 'fs';

export const up = (currentPath) => {
  return path.dirname(currentPath);
};

export const cd = async (currentPath, pathToGo) => {
  if (path.isAbsolute(pathToGo)) {
    let result = currentPath;
    await fs.promises
      .access(pathToGo)
      .then(() => pathToGo)
      .catch(() => console.error('Operation failed'));
    return result;
  } else {
    let result = currentPath;
    await fs.promises
      .access(path.resolve(currentPath, pathToGo))
      .then(() => (result = path.resolve(currentPath, pathToGo)))
      .catch(() => console.error('Operation failed'));
    return result;
  }
};

export const ls = async (currentPath) => {
  fs.promises.readdir(currentPath).then(async (filenames) => {
    let promiseArr = [];
    for await (const filename of filenames) {
      const itemPromise = fs.promises
        .stat(path.resolve(currentPath, filename))
        .then((stats) => {
          const item = {
            name: filename,
            type: stats.isFile() ? 'file' : 'directory',
          };
          return item;
        })
        .catch(() => {
          console.error('Operation failed');
        });
      promiseArr.push(itemPromise);
    }
    Promise.allSettled(promiseArr).then((data) => {
      const table = data.map((el) => el.value);
      const sortedDirList = table
        .filter((obj) => obj.type === 'directory')
        .sort((a, b) => {
          return a.name - b.name;
        });
      const sortedFiles = table
        .filter((obj) => obj.type === 'file')
        .sort((a, b) => {
          return a.name - b.name;
        });
      console.table([...sortedDirList, ...sortedFiles]);
    });
  });
};
