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
import { SuppliersService } from '../services/suppliers.service';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { CreateSuppliersDto } from '../dto/create-supplier.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/models/response-model';
import { UpdateSuppliersDto } from '../dto/update-supplier.dto';
import { SupplierModel } from 'src/models/suplier-model';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNewSupplier(
    @User() user: UserDecoratorModel,
    @Body() supplierDetails: CreateSuppliersDto,
  ): Promise<ResponseModel> {
    return await this.supplierService.createNewSupplier(
      user.userId,
      supplierDetails,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSuppliers(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.supplierService.getSuppliers(
      searchQuery,
      page,
      user.userId,
    );
  }

  @Delete(':supplierId')
  @UseGuards(JwtAuthGuard)
  async deleteSingleSupplier(@Param('supplierId') supplierId: string) {
    return await this.supplierService.deleteSingleSupplier(supplierId);
  }

  @Get(':supplierId')
  @UseGuards(JwtAuthGuard)
  async getSingleSupplier(
    @Param('supplierId') supplierId: string,
  ): Promise<any> {
    return await this.supplierService.getSingleSupplier(supplierId);
  }

  @Put(':supplierId')
  @UseGuards(JwtAuthGuard)
  async updateSingleSupplier(
    @Param('supplierId') supplierId: string,
    @Body() supplierDetails: UpdateSuppliersDto,
  ): Promise<ResponseModel> {
    return await this.supplierService.updateSingleSupplier(
      supplierId,
      supplierDetails,
    );
  }

  @Get('get/all')
  @UseGuards(JwtAuthGuard)
  async getAllSuppliers(
    @User() user: UserDecoratorModel,
  ): Promise<SupplierModel[]> {
    return await this.supplierService.getAllSuppliers(user.userId);
  }
}
