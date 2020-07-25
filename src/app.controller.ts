import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { promises as fs } from 'fs';
import { json } from 'express';
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tenor')
  async getTenor() {
    try {
      const p = join(__dirname, '..', 'data', 'tenor', 'p1.json');
      console.log(p);

      const rawData = await fs.readFile(p, 'utf8');
      const j = JSON.parse(rawData);
      return j;
    } catch (error) {
      console.log('Not found');

      return { error: 'No file found' };
    }
  }
}
