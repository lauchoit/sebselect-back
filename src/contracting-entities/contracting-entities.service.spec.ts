import { Test, TestingModule } from '@nestjs/testing';
import { ContractingEntitiesService } from './contracting-entities.service';

describe('ContractingEntitiesService', () => {
  let service: ContractingEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractingEntitiesService],
    }).compile();

    service = module.get<ContractingEntitiesService>(ContractingEntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
