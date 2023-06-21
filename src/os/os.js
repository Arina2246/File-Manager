import os from 'os';

export const getEol = () => {
  console.log(JSON.stringify(os.EOL));
};

export const getCpus = () => {
  const cpus = os.cpus();
  const numOfCpus = cpus.length;
  console.log(`Amount of CPUS: ${numOfCpus}`);
  for (let i = 0; i < cpus.length; i++) {
    console.log(`${i + 1}. ${cpus[i].model}`);
  }
};

export const getHomeDir = () => {
  console.log(`Homedir: ${os.homedir()}`);
};

export const getUsername = () => {
  console.log(os.userInfo().username);
};

export const getArchitecture = () => {
  console.log(process.arch);
};
