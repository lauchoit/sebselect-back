import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('/selected')
  findOneByPartyName(
    @Query('name') name: string,
    @Query('parentName') parentName: string,
  ) {
    // return { name, parentName };
    return this.contractingEntitiesService.findOneBayPartyName(
      name,
      parentName,
    );
  }
}
