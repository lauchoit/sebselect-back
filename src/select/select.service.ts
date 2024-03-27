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

  async registerAllSelect(contracts: ContractingEntitiesDto[]) {
    let totalItems = 0;
    let totalRegistered = 0;
    let totalIteration = 0;

    for (const contract of contracts) {
      totalIteration++;
      this.loggeer.debug(`Iteracion: ${totalIteration}`);
      let iteration = -1;
      let patternId = null;
      const contractReverse = contract.parentLocatedParty.reverse();
      const lastRegister: any[] = [];
      for (const party of contractReverse) {
        iteration++;
        totalItems++;
        if (iteration == 0) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: null })
            .exec();
          if (select) {
            lastRegister[iteration] = select;
            continue;
          }
          patternId = null;
        }
        if (iteration == 1) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: lastRegister[0]._id })
            .exec();
          if (select?.patternId.toString() === lastRegister[0]._id.toString()) {
            lastRegister[iteration] = select;
            continue;
          }
          patternId = lastRegister[0]._id;
        }
        if (iteration == 2) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: lastRegister[1]._id })
            .exec();
          if (select?.patternId.toString() === lastRegister[1]._id.toString()) {
            lastRegister[iteration] = select;
            continue;
          }
          patternId = lastRegister[1]._id;
        }
        if (iteration == 3) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: lastRegister[2]._id })
            .exec();
          if (select?.patternId.toString() === lastRegister[2]._id.toString()) {
            lastRegister[iteration] = select;
            continue;
          }
          // this.loggeer.log(`No existe ${party.name}`);
          patternId = lastRegister[2]._id;
        }
        if (iteration == 4) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: lastRegister[3]._id })
            .exec();
          if (select?.patternId.toString() === lastRegister[3]._id.toString()) {
            lastRegister[iteration] = select;
            continue;
          }
          patternId = lastRegister[3]._id;
        }
        if (iteration == 5) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: lastRegister[4]._id })
            .exec();
          if (select?.patternId.toString() === lastRegister[4]._id.toString()) {
            lastRegister[iteration] = select;
            continue;
          }
          patternId = lastRegister[4]._id;
        }
        if (iteration == 6) {
          const select = await this.selectModel
            .findOne({ title: party.name, patternId: lastRegister[5]._id })
            .exec();
          if (select?.patternId.toString() === lastRegister[5]._id.toString()) {
            lastRegister[iteration] = select;
            continue;
          }
          patternId = lastRegister[5]._id;
        }
        totalRegistered++;
        lastRegister[iteration] = await this.registerSelect({
          title: party.name,
          patternId: patternId ? patternId.toString() : null,
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
    const parentNames: string[] = [];
    if (!selected) {
      selected = null;
    }
    const items = await this.selectModel.find({ patternId: selected }).exec();
    let parent = await this.selectModel.findOne({ _id: selected }).exec();
    parentNames.push(parent?.title);

    while (parent?.patternId) {
      parent = await this.selectModel.findOne({ _id: parent.patternId }).exec();
      parentNames.push(parent.title);
    }
    return {
      count: items.length,
      parentNames,
      data: items,
    };
  }
}
