import { Module } from '@nestjs/common';
import { SuppliersController } from './controllers/suppliers.controller';
import { SuppliersService } from './services/suppliers.service';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
