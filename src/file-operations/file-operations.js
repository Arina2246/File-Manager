import path from 'path';
import fs from 'fs';

export const cat = async (currentPath, fileToRead) => {
  const filePath = path.resolve(currentPath, fileToRead);
  const readableStream = fs.createReadStream(filePath);
  readableStream.on('error', (error) => console.error('Operation failed'));
  readableStream.on('data', (chunk) => {
    console.log('' + chunk);
  });
};

export const add = async (currentPath, fileName) => {
  const filePath = path.resolve(currentPath, fileName);
  fs.open(filePath, 'wx', (err) => {
    if (err) console.error('Operation failed');
  });
};

export const rn = async (currentPath, filePath, newFileName) => {
  const oldFile = path.resolve(currentPath, filePath);
  const newFile = path.resolve(path.dirname(oldFile), newFileName);
  fs.promises
    .rename(oldFile, newFile)
    .catch(() => console.error('Operation failed'));
};

export const cp = async (currentPath, filePath, newDirectoryPath) => {
  const oldFile = path.resolve(currentPath, filePath);
  const fileName = path.basename(oldFile);
  const copyFileDir = path.resolve(currentPath, newDirectoryPath);

  const readable = fs.createReadStream(oldFile);
  const writable = fs.createWriteStream(path.resolve(copyFileDir, fileName));
  readable.on('error', (err) => {
    console.error('Operation failed');
  });
  writable.on('error', (err) => {
    console.error('Operation failed');
  });
  readable.pipe(writable);
};

export const rm = async (currentPath, fileToDelete) => {
  const filePath = path.resolve(currentPath, fileToDelete);
  fs.promises
    .unlink(filePath)
    .catch((err) => console.error('Operation failed'));
};

export const mv = async (currentPath, filePath, newDirectoryPath) => {
  await cp(currentPath, filePath, newDirectoryPath);
  await rm(currentPath, filePath);
};
