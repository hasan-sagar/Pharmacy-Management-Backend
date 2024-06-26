import { Global, Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CateogrySchema } from './category.schema';

const MODELS = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Category.name,
    schema: CateogrySchema,
  },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
