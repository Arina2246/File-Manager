import { pathMessage } from '../path-message/path-message.js';
import { up, cd, ls } from '../navigation/navigation.js';
import {
  getArchitecture,
  getCpus,
  getEol,
  getHomeDir,
  getUsername,
} from '../os/os.js';
import os from 'os';
import {
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
} from '../file-operations/file-operations.js';
import { hash } from '../hash/hash.js';
import { compress, decompress } from '../br/br.js';

const startProgram = async () => {
  let currentPath = os.homedir();
  const usernameArg = process.argv[2];
  const username = usernameArg.slice(11, usernameArg.length);
  console.log(`Welcome to the File Manager, ${username}!`);

  pathMessage(currentPath);
  process.stdin.on('data', async (txt) => {
    if (txt.toString() === '.exit\r\n' || txt.toString() === '.exit\n') {
      process.exit();
    } else if (txt.toString() === 'up\r\n' || txt.toString() === 'up\n') {
      const result = up(currentPath);
      currentPath = result;
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 3) === 'cd ') {
      const pathToGo = txt.toString().slice(3, txt.toString().length);
      const cleanPathToGo = pathToGo.replace(/\n/g, '').replace(/\r/g, '');
      const result = await cd(currentPath, cleanPathToGo);
      currentPath = result;
      pathMessage(currentPath);
    } else if (txt.toString() === 'ls\r\n' || txt.toString() === 'ls\n') {
      ls(currentPath);
      pathMessage(currentPath);
    } else if (
      txt.toString() === 'os --EOL\r\n' ||
      txt.toString() === 'os --EOL\n'
    ) {
      getEol();
      pathMessage(currentPath);
    } else if (
      txt.toString() === 'os --cpus\r\n' ||
      txt.toString() === 'os --cpus\n'
    ) {
      getCpus();
      pathMessage(currentPath);
    } else if (
      txt.toString() === 'os --homedir\r\n' ||
      txt.toString() === 'os --homedir\n'
    ) {
      getHomeDir();
      pathMessage(currentPath);
    } else if (
      txt.toString() === 'os --username\r\n' ||
      txt.toString() === 'os --username\n'
    ) {
      getUsername();
      pathMessage(currentPath);
    } else if (
      txt.toString() === 'os --architecture\r\n' ||
      txt.toString() === 'os --architecture\n'
    ) {
      getArchitecture();
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 4) === 'cat ') {
      const filePath = txt.toString().slice(4, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      await cat(currentPath, cleanFilePath);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 4) === 'add ') {
      const filePath = txt.toString().slice(4, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      await add(currentPath, cleanFilePath);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 3) === 'rn ') {
      const filePath = txt.toString().slice(3, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      const arrPath = cleanFilePath.split(' ');
      await rn(currentPath, arrPath[0], arrPath[1]);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 3) === 'cp ') {
      const filePath = txt.toString().slice(3, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      const arrPath = cleanFilePath.split(' ');
      await cp(currentPath, arrPath[0], arrPath[1]);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 3) === 'mv ') {
      const filePath = txt.toString().slice(3, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      const arrPath = cleanFilePath.split(' ');
      await mv(currentPath, arrPath[0], arrPath[1]);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 3) === 'rm ') {
      const filePath = txt.toString().slice(3, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      await rm(currentPath, cleanFilePath);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 5) === 'hash ') {
      const filePath = txt.toString().slice(5, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      await hash(currentPath, cleanFilePath);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 9) === 'compress ') {
      const filePath = txt.toString().slice(9, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      const arrPath = cleanFilePath.split(' ');
      await compress(currentPath, arrPath[0], arrPath[1]);
      pathMessage(currentPath);
    } else if (txt.toString().slice(0, 11) === 'decompress ') {
      const filePath = txt.toString().slice(11, txt.toString().length);
      const cleanFilePath = filePath.replace(/\n/g, '').replace(/\r/g, '');
      const arrPath = cleanFilePath.split(' ');
      await decompress(currentPath, arrPath[0], arrPath[1]);
      pathMessage(currentPath);
    } else console.error('Invalid input');
  });
  process.on('exit', () =>
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  );
  process.on('SIGINT', () => {
    process.exit();
  });
};

startProgram();
