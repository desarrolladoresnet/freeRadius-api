import { Test, TestingModule } from '@nestjs/testing';
import { RadgroupreplyController } from './radgroupreply.controller';

describe('RadgroupreplyController', () => {
  let controller: RadgroupreplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadgroupreplyController],
    }).compile();

    controller = module.get<RadgroupreplyController>(RadgroupreplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
