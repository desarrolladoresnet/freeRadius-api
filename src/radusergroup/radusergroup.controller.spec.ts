import { Test, TestingModule } from '@nestjs/testing';
import { RadusergroupController } from './radusergroup.controller';
import { RadusergroupService } from './radusergroup.service';

describe('RadusergroupController', () => {
  let controller: RadusergroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadusergroupController],
      providers: [RadusergroupService],
    }).compile();

    controller = module.get<RadusergroupController>(RadusergroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
