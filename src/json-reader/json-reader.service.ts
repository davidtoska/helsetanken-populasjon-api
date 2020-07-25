import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
@Injectable()
export class JsonReaderService {
  async personNumberList() {
    try {
      const syntheaFiles = await this.readDir('synthea');
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
    const allFileNames = await this.readDir(folder);
    const allFiles: Promise<any>[] = [];
    allFileNames.forEach(f => {
      allFiles.push(this.readFile(f, folder));
    });

    const result = await Promise.all(allFiles);
    return result;
  }

  private async readFile(
    fileName: string,
    folder: 'tenor' | 'synthea',
  ): Promise<any> {
    const path = join(__dirname, '..', '..', 'data', folder, fileName);

    try {
      const rawData = await fs.readFile(path, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      return { error: 'Error while parsing file', fileName };
    }
  }

  private async readDir(dir: string) {
    const path = join(__dirname, '..', '..', 'data', dir);
    const files = await fs.readdir(path);
    return files;
  }
}
