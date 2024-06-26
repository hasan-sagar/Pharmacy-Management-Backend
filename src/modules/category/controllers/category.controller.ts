import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

  @Get(':catId')
  async getCategory(@Param('catId') catId: string): Promise<any> {
    return await this.categoryService.getCategory(catId);
  }
}
