import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Select extends Document {
  @Prop()
  title: string;

  @Prop()
  patternWord: string;

  @Prop()
  createdAt: Date = new Date();
}

export const SelectEntitySchema = SchemaFactory.createForClass(Select);
