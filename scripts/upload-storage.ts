import * as shell from 'shelljs';
const bucket = 'gs://no-helsetanken.appspot.com';

const uploadFolder = (path: string, outputFolder: string) => {
  const uploadCmd = `gsutil -m cp -r ${path} ${bucket}/${outputFolder}`;
  shell.exec(uploadCmd);
};

const deleteFolder = (bucketFolder: string) => {
  const deleteCmd = `gsutil -m rm -r ${bucket}/${bucketFolder}`;
  shell.exec(deleteCmd);
};

const printDir = (path: string) => {
  const ls = shell.ls(path);
  ls.forEach(f => console.log(f));
};

const program = () => {
  deleteFolder('tenor');
  deleteFolder('synthea');
  uploadFolder('data/tenor', 'tenor');
  uploadFolder('data/synthea', 'synthea');
};

program();
