import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum Direction {
  IN = 'in',
  OUT = 'out',
}

@Schema()
export class Transaction {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  user: Types.ObjectId;

  @Prop({ type: String, enum: Direction, required: true })
  direction: Direction;

  @Prop()
  amount: number;

  @Prop({ type: SchemaTypes.Date })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
