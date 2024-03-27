import { Controller, Get, Query } from '@nestjs/common';
import { SelectService } from './select.service';
import { ContractingEntitiesService } from 'src/contracting-entities/contracting-entities.service';

@Controller('select')
export class SelectController {
  constructor(
    private readonly selectService: SelectService,
    private contractingEntitiesService: ContractingEntitiesService,
  ) {}

  @Get('register-all')
  async registerAllSelect() {
    const contracts = await this.contractingEntitiesService.findAll();
    console.log({ numeroDeRegistros: contracts.length });
    this.selectService.registerAllSelect(contracts);
    return 'Se envio a registrar todos los contratos';
  }

  @Get('options')
  getOptionsSelect(@Query('selected') selected: string) {
    return this.selectService.getOptionsSelect(selected);
  }
}
