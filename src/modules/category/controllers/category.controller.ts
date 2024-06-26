import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/utils/jwt.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ResponseModel } from 'src/models/response-model';
import { User } from 'src/core/utils/user.decorator';
import { UserDecoratorModel } from 'src/models/user-decorator-model';

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
  ) {
    return await this.categoryService.getCategories(
      searchQuery,
      page,
      user.userId,
    );
  }
}
