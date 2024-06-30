import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { OrderModel } from 'src/models/order-model';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getDashboardSummary(@User() user: UserDecoratorModel): Promise<any> {
    return await this.dashboardService.getDashboardSummary(user.userId);
  }

  @Get('/recent-orders')
  @UseGuards(JwtAuthGuard)
  async getRecentOrders(
    @User() user: UserDecoratorModel,
  ): Promise<OrderModel[]> {
    return await this.dashboardService.getRecentOrders(user.userId);
  }

  @Get('/orders-summary')
  @UseGuards(JwtAuthGuard)
  async getAllOrdersSummary(
    @User() user: UserDecoratorModel,
  ): Promise<OrderModel[]> {
    return await this.dashboardService.getAllOrdersSummary(user.userId);
  }
}
