import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Select extends Document {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Select' })
  patternId: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date = new Date();
}

export const SelectEntitySchema = SchemaFactory.createForClass(Select);
