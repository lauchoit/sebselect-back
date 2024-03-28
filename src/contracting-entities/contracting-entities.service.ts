import { Injectable } from '@nestjs/common';
import { ContractingEntitiesDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContractingEntitiesService {
  constructor(
    @InjectModel('contractingEntities')
    private readonly contractingEntitiesModel: Model<ContractingEntitiesDto>,
  ) {}

  create(contractingEntitiesService: ContractingEntitiesDto) {
    const createdEntity = new this.contractingEntitiesModel(
      contractingEntitiesService,
    );
    return createdEntity.save();
  }

  async findAll() {
    try {
      return await this.contractingEntitiesModel.find();
    } catch (error) {
      return error;
    }
  }

  async findOneBayPartyName(orderedNames: string[]) {
    const result = await this.contractingEntitiesModel.find({
      parentLocatedParty: { $all: orderedNames },
    });

    return {
      count: result.length,
      orderedNames,
      data: result,
    };
  }
}
