import * as shell from 'shelljs';

const synteaTenor = 'https://github.com/andreashvikt/SyntheaTenor';

const cloneRepo = (repoUrl: string, folder: string, branch = 'master') => {
  const cmd = `git clone -b ${branch} ${repoUrl} ${folder}`;
  shell.exec(cmd);
};

const runSynthea = () => {
  // TODO check platform
  shell.cd('data');
  shell.cd('temp');
  shell.exec('run_synthea.bat');
  shell.cd('..');
  shell.cd('..');
};

const copyOutputFiles = () => {
  shell.rm('-Rf', 'data/synthea');
  shell.rm('-Rf', 'data/tenor');
  shell.cp('-Rf', 'data/temp/output/fhir', 'data/synthea');
  shell.cp('-Rf', 'data/temp/src/main/resources/tenor/web30', 'data/tenor');
};

// Delete, Clone, Generate, Copy, and delete synthea

const program = () => {
  shell.rm('-rf', 'data');
  cloneRepo(synteaTenor, 'data/temp', 'develop');
  runSynthea();
  copyOutputFiles();
  shell.rm('-rf', 'data/temp');
};

program();
