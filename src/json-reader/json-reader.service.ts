import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { promises as fsp } from 'fs';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class JsonReaderService {
  async personNumberList() {
    try {
      const syntheaFiles = await this.readFileNamesIn('synthea');
      const filtered = syntheaFiles.filter(arr => arr.includes('syntheadata'));
      const result = filtered.map(filename => {
        const list = filename.split('.');
        const pnr = list[0];
        return pnr;
      });
      return result;
    } catch (error) {
      return ['An error occured'];
    }
  }

  readTenorFile(pnr: string): Promise<any> {
    const fileName = 'freg.' + pnr + '.kildedata.json';
    return this.readFile(fileName, 'tenor');
  }

  readSyntheaFile(pnr: string): Promise<any> {
    const fileName = pnr + '.syntheadata.json';
    return this.readFile(fileName, 'synthea');
  }

  async readAllFilesIndir(folder: 'tenor' | 'synthea') {
    const allFileNames = await this.readFileNamesIn(folder);
    const allFiles: Promise<any>[] = [];
    allFileNames.forEach(f => {
      allFiles.push(this.readFile(f, folder));
    });

    const result = await Promise.all(allFiles);
    return result;
  }

  async readFile(
    fileName: string,
    folder: 'tenor' | 'synthea' | 'prosessed',
  ): Promise<any> {
    const path = join(__dirname, '..', '..', 'data', folder, fileName);
    const fileExcists = fs.existsSync(path);
    if (!fileExcists) {
      throw new NotFoundException('Not found');
    }

    try {
      const rawData = await fsp.readFile(path, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      throw new InternalServerErrorException('Error while parsing json-data');
    }
  }

  async readFileNamesIn(dir: 'tenor' | 'synthea') {
    const path = join(__dirname, '..', '..', 'data', dir);
    const dirExcists = fs.existsSync(path);

    if (!dirExcists) {
      throw new InternalServerErrorException(
        'Directory ' + dir + ' dont excist.',
      );
    }

    try {
      const files = await fsp.readdir(path);
      return files;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
