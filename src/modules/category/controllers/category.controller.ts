import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ResponseModel } from 'src/models/response-model';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';
import { CategoryModel } from 'src/models/category-model';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNewCategory(
    @User() user: UserDecoratorModel,
    @Body() categoryDetails: CreateCategoryDto,
  ): Promise<ResponseModel> {
    return await this.categoryService.createNewCategory(
      user.userId,
      categoryDetails,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCategories(
    @User() user: UserDecoratorModel,
    @Query('query') searchQuery?: string,
    @Query('page') page: number = 1,
  ): Promise<any> {
    return await this.categoryService.getCategories(
      searchQuery,
      page,
      user.userId,
    );
  }

  @Get(':categoryId')
  @UseGuards(JwtAuthGuard)
  async getSingleCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<CategoryModel> {
    return await this.categoryService.getSingleCategory(categoryId);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard)
  async deleteSingleCateogry(
    @Param('categoryId') categoryId: string,
  ): Promise<ResponseModel> {
    return await this.categoryService.deleteSingleCateogry(categoryId);
  }
  @Put(':categoryId')
  @UseGuards(JwtAuthGuard)
  async updateSingleCategory(
    @Param('categoryId') categoryId: string,
    @Body() categoryDetails: UpdateCategoryDto,
  ): Promise<ResponseModel> {
    return await this.categoryService.updateSingleCategory(
      categoryId,
      categoryDetails,
    );
  }
}
