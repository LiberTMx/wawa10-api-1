import { Test, TestingModule } from '@nestjs/testing';
import { InterclubsApiController } from './interclubs-api.controller';

describe('InterclubsApi Controller', () => {
  let controller: InterclubsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterclubsApiController],
    }).compile();

    controller = module.get<InterclubsApiController>(InterclubsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
