import { Test, TestingModule } from '@nestjs/testing';
import { EntrainementRepositoryService } from './entrainement-repository.service';

describe('EntrainementRepositoryService', () => {
  let service: EntrainementRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrainementRepositoryService],
    }).compile();

    service = module.get<EntrainementRepositoryService>(EntrainementRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
