import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { ResponseModel } from 'src/models/response-model';
import { OrderCreateDto } from '../dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNewOrder(
    @User() user: UserDecoratorModel,
    @Body() orderDetais: OrderCreateDto,
  ): Promise<ResponseModel> {
    return await this.orderService.createNewOrder(user.userId, orderDetais);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSuppliers(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.orderService.getOrders(searchQuery, page, user.userId);
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  async getSingleOrder(@Param('orderId') orderId: string) {
    return await this.orderService.getSingleOrder(orderId);
  }
}
