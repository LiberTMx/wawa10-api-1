import { Test, TestingModule } from '@nestjs/testing';
import { EntrainementApiController } from './entrainement-api.controller';

describe('EntrainementApi Controller', () => {
  let controller: EntrainementApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrainementApiController],
    }).compile();

    controller = module.get<EntrainementApiController>(EntrainementApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
