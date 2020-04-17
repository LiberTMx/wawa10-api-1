import { Test, TestingModule } from '@nestjs/testing';
import { RoiApiController } from './roi-api.controller';

describe('RoiApi Controller', () => {
  let controller: RoiApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoiApiController],
    }).compile();

    controller = module.get<RoiApiController>(RoiApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
