import { pathMessage } from '../path-message/path-message.js';
import { up, cd, ls } from '../navigation/navigation.js';
import os from 'os';

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
