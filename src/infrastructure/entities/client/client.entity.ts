import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type ClientDocument = client & Document;

@Schema()
export class client{
  @Prop()
  address: string
  @Prop()
  cardCode: number
  @Prop()
  createdAt: Date
  @Prop()
  active: boolean
  @Prop()
  email: string
  @Prop()
  phone: string
  @Prop()
  points: number
  @Prop()
  updatedAt: Date
  @Prop()
  visits: number
  @Prop()
  id: number
}
export const ClientSchema = SchemaFactory.createForClass(client);