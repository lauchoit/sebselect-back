import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'contractingEntities' })
export class contractingEntities extends Document {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  nif: string;

  @Prop()
  contacts: [contactSchema];

  @Prop({
    type: [{ name: { type: String, index: true } }],
    _id: false, // Si no quieres que Mongoose agregue un _id para cada elemento del array
  })
  parentLocatedParty: [parentLocatedSchema];
}

@Schema()
export class contactSchema {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

@Schema()
export class parentLocatedSchema {
  @Prop({})
  name: string;
}

export const contractingEntitiesScheme =
  SchemaFactory.createForClass(contractingEntities);
