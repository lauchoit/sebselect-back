import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Select } from './entities/select.entities';
import { Model } from 'mongoose';
import { SelectDto } from './dto/select-dto';
import { ContractingEntitiesDto } from 'src/contracting-entities/dto';

@Injectable()
export class SelectService {
  private loggeer = new Logger('SelectService');
  constructor(
    @InjectModel(Select.name) private selectModel: Model<SelectDto>,
  ) {}

  async registerAllSelect(name: string, contracts: ContractingEntitiesDto[]) {
    let totalItems = 0;
    let totalRegistered = 0;
    let totalIteration = 0;

    for (const contract of contracts) {
      totalIteration++;
      this.loggeer.debug(`Iteracion: ${totalIteration}`);
      let iteration = -1;
      let patterWord = null;
      const contractReverse = contract.parentLocatedParty.reverse();
      for (const party of contractReverse) {
        iteration++;
        totalItems++;
        const select = await this.selectModel
          .findOne({ title: party.name })
          .exec();
        if (select) {
          continue;
        }
        if (iteration !== 0) {
          const pattern = contractReverse[iteration - 1];
          patterWord = pattern.name;
        }
        totalRegistered++;
        await this.registerSelect({
          title: party.name,
          patternWord: patterWord,
        });
      }
    }

    return { totalItems, totalRegistered };
  }

  registerSelect(selectDto: SelectDto) {
    const select = new this.selectModel(selectDto);
    return select.save();
  }

  async getOptionsSelect(selected: string) {
    if (!selected) {
      selected = null;
    }
    const items = await this.selectModel.find({ patternWord: selected }).exec();
    return {
      count: items.length,
      data: items,
    };
  }
}
