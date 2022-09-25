import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type ClientDocument = Client & Document;

@Schema()
export class Client{
  @Prop()
  address: string
  @Prop()
  cardCode: number
  @Prop()
  createAt: Date
  @Prop()
  active: boolean
  @Prop()
  email: string
  @Prop()
  phone: string
  @Prop()
  points: number
  @Prop()
  updateAt: Date
  @Prop()
  visits: number
  @Prop()
  id: number
}
export const ClientSchema = SchemaFactory.createForClass(Client);