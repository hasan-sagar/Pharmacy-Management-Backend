import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './category.schema';
import mongoose from 'mongoose';
import { Brands } from './brands.schema';
import { User } from './user.schema';
import { Supplier } from './supplier.schema';

@Schema({ timestamps: true })
export class Products {
  @Prop({ type: String, required: true })
  medicineName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brands',
    required: true,
  })
  brands: Brands;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  })
  supplier: Supplier;

  @Prop({
    type: Number,
    required: true,
  })
  buyPrice: number;

  @Prop({
    type: Number,
    required: true,
  })
  sellPrice: number;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  expireDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
