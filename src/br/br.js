import path from 'path';
import fs from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compress = async (currentPath, pathToFile, pathToDestination) => {
  const oldFile = path.resolve(currentPath, pathToFile);
  const newFile = path.resolve(currentPath, pathToDestination);

  const readable = fs.createReadStream(oldFile);
  const writable = fs.createWriteStream(newFile);
  readable.on('error', (err) => {
    console.error('Operation failed');
  });
  writable.on('error', (err) => {
    console.error('Operation failed');
  });
  readable.pipe(createBrotliCompress()).pipe(writable);
};

export const decompress = async (
  currentPath,
  pathToFile,
  pathToDestination
) => {
  const oldFile = path.resolve(currentPath, pathToFile);
  const newFile = path.resolve(currentPath, pathToDestination);

  const readable = fs.createReadStream(oldFile);
  const writable = fs.createWriteStream(newFile);
  readable.on('error', (err) => {
    console.error('Operation failed');
  });
  writable.on('error', (err) => {
    console.error('Operation failed');
  });
  readable.pipe(createBrotliDecompress()).pipe(writable);
};
