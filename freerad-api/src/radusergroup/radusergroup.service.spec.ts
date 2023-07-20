import { Test, TestingModule } from '@nestjs/testing';
import { RadusergroupService } from './radusergroup.service';

describe('RadusergroupService', () => {
  let service: RadusergroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadusergroupService],
    }).compile();

    service = module.get<RadusergroupService>(RadusergroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
