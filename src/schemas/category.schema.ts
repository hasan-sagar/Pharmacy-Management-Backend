import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const CateogrySchema = SchemaFactory.createForClass(Category);
