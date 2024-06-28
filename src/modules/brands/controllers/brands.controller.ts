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
import { BrandsService } from '../services/brands.service';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { CreateBrandsDto } from '../dto/create-brands.dto';
import { ResponseModel } from 'src/models/response-model';
import { ApiTags } from '@nestjs/swagger';
import { UpdateBrandsDto } from '../dto/update-brand.dto';
import { BrandModel } from 'src/models/brand-model';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNewCategory(
    @User() user: UserDecoratorModel,
    @Body() brandDetails: CreateBrandsDto,
  ): Promise<ResponseModel> {
    return await this.brandService.createNewBrand(user.userId, brandDetails);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCategories(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.brandService.getBrands(searchQuery, page, user.userId);
  }

  @Delete(':brandId')
  @UseGuards(JwtAuthGuard)
  async deleteSingleBrand(@Param('brandId') brandId: string): Promise<any> {
    return await this.brandService.deleteSingleBrand(brandId);
  }

  @Get(':brandId')
  @UseGuards(JwtAuthGuard)
  async getSingleBrand(@Param('brandId') brandId: string): Promise<any> {
    return await this.brandService.getSingleBrand(brandId);
  }

  @Put(':brandId')
  @UseGuards(JwtAuthGuard)
  async updateSingleCategory(
    @Param('brandId') brandId: string,
    @Body() brandDetails: UpdateBrandsDto,
  ): Promise<ResponseModel> {
    return await this.brandService.updateSingleBrand(brandId, brandDetails);
  }

  @Get('get/all')
  @UseGuards(JwtAuthGuard)
  async getAllCategories(
    @User() user: UserDecoratorModel,
  ): Promise<BrandModel[]> {
    return await this.brandService.getAllBrands(user.userId);
  }
}
