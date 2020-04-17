import { Test, TestingModule } from '@nestjs/testing';
import { StatusApiController } from './status-api.controller';

describe('StatusApi Controller', () => {
  let controller: StatusApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusApiController],
    }).compile();

    controller = module.get<StatusApiController>(StatusApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
