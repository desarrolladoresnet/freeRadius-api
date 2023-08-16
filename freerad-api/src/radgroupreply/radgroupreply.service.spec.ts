import { Test, TestingModule } from '@nestjs/testing';
import { RadgroupreplyService } from './radgroupreply.service';

describe('RadgroupreplyService', () => {
  let service: RadgroupreplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadgroupreplyService],
    }).compile();

    service = module.get<RadgroupreplyService>(RadgroupreplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
