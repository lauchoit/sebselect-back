import { Test, TestingModule } from '@nestjs/testing';
import { ContractingEntitiesController } from './contracting-entities.controller';
import { ContractingEntitiesService } from './contracting-entities.service';

describe('ContractingEntitiesController', () => {
  let controller: ContractingEntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractingEntitiesController],
      providers: [ContractingEntitiesService],
    }).compile();

    controller = module.get<ContractingEntitiesController>(
      ContractingEntitiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
