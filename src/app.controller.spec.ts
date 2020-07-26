import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonReaderService } from './json-reader/json-reader.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, JsonReaderService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('tenor', () => {
    it('should be able to read all tenor-files', async () => {
      const tenorFile = await appController.getAllTenorFiles();
      expect(tenorFile).toBeDefined();
    });
  });
});
