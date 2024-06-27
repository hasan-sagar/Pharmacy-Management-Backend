import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [UsersModule, CategoryModule, BrandsModule],
})
export class ModulesModule {}
