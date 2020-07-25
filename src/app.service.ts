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
}
