import { Global, Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CateogrySchema } from './category.schema';
import { Brands, BrandsSchema } from './brands.schema';
import { Supplier, SupplierSchema } from './supplier.schema';
import { Products, ProductsSchema } from './products.schema';
import { Order, OrderSchema } from './order.schema';

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
  {
    name: Products.name,
    schema: ProductsSchema,
  },
  {
    name: Order.name,
    schema: OrderSchema,
  },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
