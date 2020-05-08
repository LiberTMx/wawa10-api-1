import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeApiController } from './periode-api.controller';

describe('PeriodeApi Controller', () => {
  let controller: PeriodeApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodeApiController],
    }).compile();

    controller = module.get<PeriodeApiController>(PeriodeApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
