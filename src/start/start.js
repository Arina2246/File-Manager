const startProgram = () => {
  const usernameArg = process.argv[2];
  const username = usernameArg.slice(11, usernameArg.length);
  console.log(`Welcome to the File Manager, ${username}!`);
  process.stdin.on('data', (txt) => {
    if (txt.toString() === '.exit\r\n' || txt.toString() === '.exit\n') {
      process.exit();
    }

    console.log(txt.toString());
  });

  process.on('exit', () =>
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  );
  process.on('SIGINT', () => {
    process.exit();
  });
};

startProgram();
