import { Test, TestingModule } from '@nestjs/testing';
import { RadusergroupController } from './radusergroup.controller';

describe('RadusergroupController', () => {
  let controller: RadusergroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadusergroupController],
    }).compile();

    controller = module.get<RadusergroupController>(RadusergroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
