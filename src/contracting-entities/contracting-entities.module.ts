import { Module } from '@nestjs/common';
import { ContractingEntitiesService } from './contracting-entities.service';
import { ContractingEntitiesController } from './contracting-entities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  contractingEntities,
  contractingEntitiesScheme,
} from './entities/contracting-entities.entity';

@Module({
  controllers: [ContractingEntitiesController],
  providers: [ContractingEntitiesService],
  imports: [
    MongooseModule.forFeature([
      { name: contractingEntities.name, schema: contractingEntitiesScheme },
    ]),
  ],
  exports: [ContractingEntitiesService],
})
export class ContractingEntitiesModule {}
