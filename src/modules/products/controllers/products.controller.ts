import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { ResponseModel } from 'src/models/response-model';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { CreateProductDto } from '../dto/create-products.dto';
import { ProductsModel } from 'src/models/products-model';
import { UpdateProductDto } from '../dto/update-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('purchase')
  @UseGuards(JwtAuthGuard)
  async purchaseNewProduct(
    @User() user: UserDecoratorModel,
    @Body() productDetails: CreateProductDto,
  ): Promise<ResponseModel> {
    return await this.productService.purchaseNewProduct(
      user.userId,
      productDetails,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.productService.getProducts(
      searchQuery,
      page,
      user.userId,
    );
  }

  @Delete(':productId')
  async deleteSingleProduct(
    @Param('productId') productId: string,
  ): Promise<ResponseModel> {
    return await this.productService.deleteSingleProduct(productId);
  }

  @Get(':productId')
  async getSingleProduct(@Param('productId') productId: string): Promise<any> {
    return await this.productService.getSingleProduct(productId);
  }

  @Put(':productId')
  async updateSingleProduct(
    @Param('productId') productId: string,
    @Body() productDetails: UpdateProductDto,
  ): Promise<ResponseModel> {
    return await this.productService.updateSingleProduct(
      productId,
      productDetails,
    );
  }

  @Get('get/stock')
  @UseGuards(JwtAuthGuard)
  async getInStockProducts(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.productService.getInStockProducts(
      searchQuery,
      page,
      user.userId,
    );
  }

  @Get('get/stock-out')
  @UseGuards(JwtAuthGuard)
  async getOutofStockProducts(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.productService.getOutofStockProducts(
      searchQuery,
      page,
      user.userId,
    );
  }

  @Get('get/expired')
  @UseGuards(JwtAuthGuard)
  async getExpiredProducts(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.productService.getExpiredProducts(
      searchQuery,
      page,
      user.userId,
    );
  }
}
