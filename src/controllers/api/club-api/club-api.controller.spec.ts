import { Test, TestingModule } from '@nestjs/testing';
import { ClubApiController } from './club-api.controller';

describe('ClubApi Controller', () => {
  let controller: ClubApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubApiController],
    }).compile();

    controller = module.get<ClubApiController>(ClubApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
