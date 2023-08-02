import { Test, TestingModule } from '@nestjs/testing';
import { RadacctController } from './radacct.controller';
import { RadacctService } from './radacct.service';

describe('RadacctController', () => {
  let controller: RadacctController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadacctController],
      providers: [RadacctService],
    }).compile();

    controller = module.get<RadacctController>(RadacctController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
