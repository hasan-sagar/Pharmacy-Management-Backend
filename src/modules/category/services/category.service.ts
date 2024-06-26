import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryModel } from 'src/models/category-model';
import { ResponseModel } from 'src/models/response-model';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  //create new cateogry
  async createNewCategory(
    userId: string,
    categoryDetails: CategoryModel,
  ): Promise<ResponseModel> {
    try {
      await this.categoryModel.create({
        name: categoryDetails.name,
        user: userId,
      });

      return {
        message: 'New category created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  //get cat with user
  async getCategory(catId: string): Promise<any> {
    try {
      const category = await this.categoryModel
        .findById(catId)
        .populate('user')
        .exec();

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error fetching category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
