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

  it('should read file', async () => {
    const file = await service.readTenorFile('p1.json');
    expect(file).toBeDefined();
  });

  it('should return error with illegal file', async () => {
    const file = await service.readTenorFile('p1asdf.json');
    expect(file.error).toContain('Error');
  });

  it.only('personList should return a list', async () => {
    const list = await service.personNumberList();
    expect(Array.isArray(list)).toBe(true);
  });
});
