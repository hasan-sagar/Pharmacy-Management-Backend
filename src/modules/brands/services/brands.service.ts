import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandModel } from 'src/models/brand-model';
import { ResponseModel } from 'src/models/response-model';
import { Brands } from 'src/schemas/brands.schema';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brands.name) private readonly brandsModel: Model<Brands>,
  ) {}

  //create new brand
  async createNewBrand(
    userId: string,
    brandDetails: BrandModel,
  ): Promise<ResponseModel> {
    try {
      await this.brandsModel.create({
        name: brandDetails.name,
        user: userId,
      });

      return {
        message: 'New brand created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  //get all brands by user with search and pagination
  async getBrands(
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

    const brands = await this.brandsModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await this.brandsModel.countDocuments(query);

    return {
      data: brands,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  //delete a brand
  async deleteSingleBrand(brandId: string): Promise<ResponseModel> {
    try {
      await this.brandsModel.findByIdAndDelete(brandId);
      return {
        message: 'Brand deleted',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
  }

  //get a single brand
  async getSingleBrand(brandId: string): Promise<BrandModel> {
    try {
      return await this.brandsModel.findById(brandId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
  }

  //update a brand
  async updateSingleBrand(
    brandId: string,
    brandDetails: BrandModel,
  ): Promise<ResponseModel> {
    try {
      await this.brandsModel.findByIdAndUpdate(brandId, brandDetails, {
        new: true,
      });

      return {
        message: 'Brand updated',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
  }
}
