import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
@Injectable()
export class JsonReaderService {
  tenor(fileName: string): Promise<any> {
    return this.read(fileName, 'tenor');
  }

  synthea(fileName: string): Promise<any> {
    return this.read(fileName, 'synthea');
  }

  private async read(
    fileName: string,
    folder: 'tenor' | 'synthea',
  ): Promise<any> {
    const path = join(__dirname, '..', '..', 'data', folder, fileName);

    try {
      const rawData = await fs.readFile(path, 'utf-8');
      return JSON.stringify(rawData);
    } catch (error) {
      return { error: 'Error while parsing file' };
    }
  }
}
