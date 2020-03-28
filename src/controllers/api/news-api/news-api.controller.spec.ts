import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiController } from './news-api.controller';

describe('News Controller', () => {
  let controller: NewsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsApiController],
    }).compile();

    controller = module.get<NewsApiController>(NewsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
