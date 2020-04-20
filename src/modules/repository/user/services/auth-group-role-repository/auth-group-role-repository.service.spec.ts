import { Test, TestingModule } from '@nestjs/testing';
import { AuthGroupRoleRepositoryService } from './auth-group-role-repository.service';

describe('AuthGroupRoleRepositoryService', () => {
  let service: AuthGroupRoleRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGroupRoleRepositoryService],
    }).compile();

    service = module.get<AuthGroupRoleRepositoryService>(AuthGroupRoleRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
