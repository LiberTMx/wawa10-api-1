import { Test, TestingModule } from '@nestjs/testing';
import { AuthGroupRepositoryService } from './auth-group-repository.service';

describe('AuthGroupRepositoryService', () => {
  let service: AuthGroupRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGroupRepositoryService],
    }).compile();

    service = module.get<AuthGroupRepositoryService>(AuthGroupRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
