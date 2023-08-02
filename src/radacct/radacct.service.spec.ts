import { Test, TestingModule } from '@nestjs/testing';
import { RadacctService } from './radacct.service';

describe('RadacctService', () => {
  let service: RadacctService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadacctService],
    }).compile();

    service = module.get<RadacctService>(RadacctService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
