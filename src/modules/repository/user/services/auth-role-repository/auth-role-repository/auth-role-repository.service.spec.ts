import { Test, TestingModule } from '@nestjs/testing';
import { AuthRoleRepositoryService } from './auth-role-repository.service';

describe('AuthRoleRepositoryService', () => {
  let service: AuthRoleRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRoleRepositoryService],
    }).compile();

    service = module.get<AuthRoleRepositoryService>(AuthRoleRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
