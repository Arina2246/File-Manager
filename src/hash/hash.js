import path from 'path';
import fs from 'fs';
import { createHash } from 'crypto';

export const hash = async (currentPath, fileToHash) => {
  const filePath = path.resolve(currentPath, fileToHash);
  await fs.promises
    .readFile(filePath)
    .then((res) => {
      const result = createHash('sha256')
        .update('' + res)
        .digest('hex');
      console.log(result);
    })
    .catch((err) => console.error('Operation failed'));
};
