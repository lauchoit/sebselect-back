import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContractingEntitiesService } from './contracting-entities.service';
import { ContractingEntitiesDto } from './dto';

@Controller('contracting-entities')
export class ContractingEntitiesController {
  constructor(
    private readonly contractingEntitiesService: ContractingEntitiesService,
  ) {}

  @Get()
  findAll() {
    return this.contractingEntitiesService.findAll();
  }

  @Post()
  create(@Body() createContractingEntityDto: ContractingEntitiesDto) {
    return this.contractingEntitiesService.create(createContractingEntityDto);
  }

  @Post('/selected')
  findOneByPartyName(@Body() parentNames: string[]) {
    return this.contractingEntitiesService.findOneBayPartyName(parentNames);
  }
}
