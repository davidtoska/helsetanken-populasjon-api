import { Test, TestingModule } from '@nestjs/testing';
import { JsonReaderService } from './json-reader.service';

describe('JsonReaderService', () => {
  let service: JsonReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonReaderService],
    }).compile();
    service = module.get<JsonReaderService>(JsonReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error with illegal file', async () => {
    try {
      const file = await service.readTenorFile('p1asdf.json');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('personList should return a list', async () => {
    const list = await service.personNumberList();
    expect(Array.isArray(list)).toBe(true);
  });
});
