import { Injectable } from '@nestjs/common';
import { JsonReaderService } from './json-reader/json-reader.service';

@Injectable()
export class AppService {
  constructor(private readonly jsonReader: JsonReaderService) {}
  getTestPersonNummers(): Promise<string[]> {
    return this.jsonReader.personNumberList();
  }

  async getTenorFile(pnr: string) {
    const tenorFile = await this.jsonReader.readTenorFile(pnr);

    return tenorFile;
  }

  async getAllTenorFiles() {
    const files = await this.jsonReader.readAllFilesIndir('tenor');

    return files;
  }

  async getSyntheaFile(pnr: string) {
    const file = await this.jsonReader.readSyntheaFile(pnr);
    return file;
  }

  async getHospitalInfo() {
    const fileNames = await this.jsonReader.readFileNamesIn('synthea');
    const filtered = fileNames.filter(fn => fn.includes('hospitalInformation'));
    if (filtered.length !== 1) {
      return { error: 'Could not find hospitalFile' };
    }
    const file = filtered[0];
    const result = await this.jsonReader.readFile(file, 'synthea');
    return result;
  }

  async getPractitionerInfo() {
    const fileNames = await this.jsonReader.readFileNamesIn('synthea');

    const filtered = fileNames.filter(fn =>
      fn.includes('practitionerInformation'),
    );

    if (filtered.length !== 1) {
      return { error: 'Could not find PractitionerFile' };
    }
    const file = filtered[0];

    const result = await this.jsonReader.readFile(file, 'synthea');
    return result;
  }
}
