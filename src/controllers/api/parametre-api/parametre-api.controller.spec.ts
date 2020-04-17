import { Test, TestingModule } from '@nestjs/testing';
import { ParametreApiController } from './parametre-api.controller';

describe('ParametreApi Controller', () => {
  let controller: ParametreApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParametreApiController],
    }).compile();

    controller = module.get<ParametreApiController>(ParametreApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
