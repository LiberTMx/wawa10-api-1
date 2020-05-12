import { Test, TestingModule } from '@nestjs/testing';
import { PeriodeRepositoryService } from './periode-repository.service';

describe('PeriodeRepositoryService', () => {
  let service: PeriodeRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodeRepositoryService],
    }).compile();

    service = module.get<PeriodeRepositoryService>(PeriodeRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
