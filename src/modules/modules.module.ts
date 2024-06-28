import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { BrandsModule } from './brands/brands.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [UsersModule, CategoryModule, BrandsModule, SuppliersModule],
})
export class ModulesModule {}
