import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UsersModule, CategoryModule],
})
export class ModulesModule {}
