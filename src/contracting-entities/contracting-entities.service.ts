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

  async findOneBayPartyName(name: string, parentName: string | null) {
    const result = await this.contractingEntitiesModel
      .aggregate([
        {
          $match: {
            'parentLocatedParty.name': parentName, // Filtrar por el nombre deseado
          },
        },
        {
          $addFields: {
            'parentLocatedParty.previous': {
              $arrayElemAt: [
                '$parentLocatedParty',
                {
                  $subtract: [
                    { $indexOfArray: ['$parentLocatedParty.name', parentName] },
                    1,
                  ],
                },
              ],
            },
          },
        },
        {
          $match: {
            'parentLocatedParty.previous.name': name, // Filtrar por el nombre del elemento anterior
          },
        },
      ])
      .exec();

    return {
      count: result.length,
      data: result,
    };
    // return this.contractingEntitiesModel
    //   .find({
    //     parentLocatedParty: {
    //       $elemMatch: {
    //         name: new RegExp(name, 'i'), // Busca el término insensible a mayúsculas y minúsculas
    //       },
    //     },
    //   })
    //   .exec();
  }
}
