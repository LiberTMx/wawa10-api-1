import { Test, TestingModule } from '@nestjs/testing';
import { StageApiController } from './stage-api.controller';

describe('StageApi Controller', () => {
  let controller: StageApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageApiController],
    }).compile();

    controller = module.get<StageApiController>(StageApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
