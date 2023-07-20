import { Test, TestingModule } from '@nestjs/testing';
import { RadcheckService } from './radcheck.service';

describe('RadcheckService', () => {
  let service: RadcheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadcheckService],
    }).compile();

    service = module.get<RadcheckService>(RadcheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
