import { promises as fsp } from 'fs';
import * as fs from 'fs';
import { join } from 'path';
import { TenorPerson } from './tenor-person.model';

type SubDirNames = 'tenor' | 'synthea' | 'prosessed';

const pathFn = (folder: SubDirNames) =>
  join(__dirname, '..', '..', 'data', folder);
const tenorPath = pathFn('tenor');
const syntheaPath = pathFn('synthea');
const prosessedPath = pathFn('prosessed');

export class Util {
  static isDefined(item: any) {
    if (typeof item === null || typeof item === undefined) {
      return false;
    }
    return true;
  }

  static isTrue(value: boolean): value is true {
    return typeof value === 'boolean' && value === true;
  }
}

export const readAllFileNamesIn = async (subDir: SubDirNames) => {
  const path = pathFn(subDir);
  const files = await fsp.readdir(path);
  return files;
};

export const readData = async (subDir: SubDirNames) => {
  const allFileNames = await readAllFileNamesIn(subDir);
  const allFiles: Promise<any>[] = [];
  allFileNames.forEach(f => {
    allFiles.push(readFile(f, subDir));
  });
  const result = await Promise.all(allFiles);
  return result;
};

const readFile = async (fileName: string, folder: SubDirNames) => {
  const path = join(__dirname, '..', '..', 'data', folder, fileName);

  try {
    const rawData = await fsp.readFile(path, 'utf-8');
    return JSON.parse(rawData) as TenorPerson;
  } catch (error) {
    console.error('Could not read file: ', fileName);
    console.error('In folder: ', folder);
    process.exit(1);
  }
};

export const writeTenorSync = (fileName: string, data: any) => {
  const path = join(prosessedPath, fileName);
  createDirIfDontExcist('prosessed');
  fs.writeFile(path, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('Did write do file');
  });
};

export const cleanProsessed = () => {
  return fsp.rmdir(prosessedPath, { recursive: true });
};

const createDirIfDontExcist = (dir: SubDirNames) => {
  const path = pathFn(dir);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log('Created non excisting folder: ', dir);
  }
};
