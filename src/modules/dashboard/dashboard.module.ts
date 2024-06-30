import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './controllers/dashboard.controller';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
