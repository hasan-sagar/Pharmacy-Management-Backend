import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String, required: true })
  companyName: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
