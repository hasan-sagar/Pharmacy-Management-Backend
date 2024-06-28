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

  //get all categories by user with search and pagination
  async getCategories(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    const query: any = {};

    if (searchQuery) {
      const searchKeyRegex = new RegExp(searchQuery, 'i');
      query['name'] = searchKeyRegex;
    }

    if (userId) {
      query['user'] = userId;
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const categories = await this.categoryModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await this.categoryModel.countDocuments(query);

    return {
      data: categories,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  //get a single category
  async getSingleCategory(categoryId: string): Promise<CategoryModel> {
    try {
      return await this.categoryModel.findById(categoryId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  //delete a category
  async deleteSingleCateogry(categoryId: string): Promise<ResponseModel> {
    try {
      await this.categoryModel.findByIdAndDelete(categoryId);
      return {
        message: 'Category deleted',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  //update a category
  async updateSingleCategory(
    categoryId: string,
    categoryDetails: CategoryModel,
  ): Promise<ResponseModel> {
    try {
      await this.categoryModel.findByIdAndUpdate(categoryId, categoryDetails, {
        new: true,
      });

      return {
        message: 'Category updated',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  //get all categories
  async getAllCategories(userId: string): Promise<CategoryModel[]> {
    try {
      return await this.categoryModel.find({
        user: userId,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
