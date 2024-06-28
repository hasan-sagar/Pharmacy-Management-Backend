import { Global, Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CateogrySchema } from './category.schema';
import { Brands, BrandsSchema } from './brands.schema';
import { Supplier, SupplierSchema } from './supplier.schema';

const MODELS = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Category.name,
    schema: CateogrySchema,
  },
  {
    name: Brands.name,
    schema: BrandsSchema,
  },
  {
    name: Supplier.name,
    schema: SupplierSchema,
  },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
