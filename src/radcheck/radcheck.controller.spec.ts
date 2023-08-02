import { Test, TestingModule } from '@nestjs/testing';
import { RadcheckController } from './radcheck.controller';
import { RadcheckService } from './radcheck.service';

describe('RadcheckController', () => {
  let controller: RadcheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadcheckController],
      providers: [RadcheckService],
    }).compile();

    controller = module.get<RadcheckController>(RadcheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
