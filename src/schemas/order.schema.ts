import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, required: true })
  invoiceNo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: {
      name: { type: String, required: true },
      phone: { type: String },
      address: { type: String, required: true },
    },
    _id: false,
  })
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };

  @Prop([
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ])
  cartItems: Array<{
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }>;

  @Prop({ type: Number })
  totalAmount: number;

  @Prop({ type: Number })
  totalItems: number;

  @Prop({
    type: String,
    default: 'Paid',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
