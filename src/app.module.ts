import { Module } from '@nestjs/common';
import { ContractingEntitiesModule } from './contracting-entities/contracting-entities.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';
import { SelectModule } from './select/select.module';

@Module({
  imports: [
    ContractingEntitiesModule,
    MongooseModule.forRoot(envs.databaseUrl),
    SelectModule,
  ],
  providers: [],
})
export class AppModule {}
