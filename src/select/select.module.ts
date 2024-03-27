import { Module } from '@nestjs/common';
import { SelectService } from './select.service';
import { SelectController } from './select.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Select, SelectEntitySchema } from './entities/select.entities';
import { ContractingEntitiesService } from 'src/contracting-entities/contracting-entities.service';
import {
  contractingEntities,
  contractingEntitiesScheme,
} from 'src/contracting-entities/entities/contracting-entities.entity';

@Module({
  controllers: [SelectController],
  providers: [SelectService, ContractingEntitiesService],
  imports: [
    MongooseModule.forFeature([
      { name: Select.name, schema: SelectEntitySchema },
      { name: contractingEntities.name, schema: contractingEntitiesScheme },
    ]),
  ],
})
export class SelectModule {}
