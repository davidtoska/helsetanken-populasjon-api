import { Injectable } from '@nestjs/common';
import { JsonReaderService } from './json-reader/json-reader.service';

@Injectable()
export class AppService {
  constructor(private readonly jsonReader: JsonReaderService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getTenorFile(id: string) {
    return this.jsonReader.tenor(id);
  }

  getSyntheaFile(id: string) {
    return this.jsonReader.synthea(id);
  }
}
