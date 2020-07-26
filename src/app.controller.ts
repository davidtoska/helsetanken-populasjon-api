import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test-personnummer')
  @ApiOperation({
    summary: 'List containing all (30 stk) personnummer',
    description: '',
  })
  @ApiTags('Tenor')
  getAllTestPersonNumbers() {
    return this.appService.getTestPersonNummers();
  }

  @Get('tenor-data')
  @ApiOperation({
    summary: 'List containing all datasets from tenor',
    description: '',
  })
  @ApiTags('Tenor')
  getAllTenorFiles() {
    return this.appService.getAllTenorFiles();
  }

  @Get('tenor-data/:personnummer')
  @ApiParam({ name: 'personnummer', type: 'string' })
  @ApiTags('Tenor')
  getTenorFile(@Param('personnummer') pnr) {
    return this.appService.getTenorFile(pnr);
  }

  @Get('synthea-data/:personnummer')
  @ApiParam({ name: 'personnummer', type: 'string' })
  @ApiOperation({
    summary: 'Fhir bundle containing all healt-records.',
    description: '',
  })
  @ApiTags('Synthea')
  getSyntheaData(@Param('personnummer') pnr) {
    return this.appService.getSyntheaFile(pnr);
  }

  @Get('hospital-info')
  @ApiOperation({
    summary: 'Fhir bundle containing hospitals',
    description: 'Contains all hospitals userd in patients dataset.',
  })
  @ApiTags('Universe')
  getHospitalInfo() {
    return this.appService.getHospitalInfo();
  }

  @Get('practitioner-info')
  @ApiOperation({
    summary: 'Fhir bundle containing practitioners',
    description: 'Contains all practitioners used in patients dataset.',
  })
  @ApiTags('Universe')
  getPractitionerInfo() {
    return this.appService.getPractitionerInfo();
  }
}
