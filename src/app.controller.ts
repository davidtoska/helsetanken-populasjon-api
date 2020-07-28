import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

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
  @ApiNotFoundResponse({ description: 'Not found' })
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
  @ApiNotFoundResponse({ description: 'Not found' })
  getSyntheaData(@Param('personnummer') pnr) {
    return this.appService.getSyntheaFile(pnr);
  }

  @Get('hospital-info')
  @ApiOperation({
    summary: 'Fhir bundle containing hospitals',
    description: 'Contains all hospitals userd in patients dataset.',
  })
  @ApiTags('Universe')
  @ApiOkResponse({ description: 'All hospitals' })
  @ApiNotFoundResponse({ description: 'Not found' })
  getHospitalInfo() {
    return this.appService.getHospitalInfo();
  }

  @ApiOkResponse({ description: 'All practitioners' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiOperation({
    summary: 'Fhir bundle containing practitioners',
    description: 'Contains all practitioners used in patients dataset.',
  })
  @ApiTags('Universe')
  @Get('practitioner-info')
  getPractitionerInfo() {
    return this.appService.getPractitionerInfo();
  }
}
