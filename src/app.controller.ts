import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test-personnummer')
  getAllTestPersonNumbers() {
    return this.appService.getTestPersonNummers();
  }

  @Get('synthea-data/:personnummer')
  @ApiParam({ name: 'personnummer', type: 'string' })
  getSyntheaData(@Param('personnummer') pnr) {
    return this.appService.getSyntheaFile(pnr);
  }

  @Get('tenor-data')
  getAllTenorFiles() {
    return this.appService.getAllTenorFiles();
  }

  @Get('tenor-data/:personnummer')
  @ApiParam({ name: 'personnummer', type: 'string' })
  getTenorFile(@Param('personnummer') pnr) {
    return this.appService.getTenorFile(pnr);
  }
}
