import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsModel } from 'src/models/products-model';
import { ResponseModel } from 'src/models/response-model';
import { Products } from 'src/schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<Products>,
  ) {}

  //create/purchase new products
  async purchaseNewProduct(
    userId: string,
    productDetails: ProductsModel,
  ): Promise<ResponseModel> {
    try {
      await this.productsModel.create({
        user: userId,
        brands: productDetails.brands,
        category: productDetails.category,
        medicineName: productDetails.medicineName,
        supplier: productDetails.supplier,
        buyPrice: productDetails.buyPrice,
        sellPrice: productDetails.sellPrice,
        quantity: productDetails.quantity,
        expireDate: productDetails.expireDate,
      });

      return {
        message: 'New Product Created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Fill the form correctly',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProducts(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    try {
      const query: any = {};

      if (searchQuery) {
        const searchKeyRegex = new RegExp(searchQuery, 'i');
        query['medicineName'] = searchKeyRegex;
      }

      if (userId) {
        query['user'] = userId;
      }

      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const products = await this.productsModel
        .find(query)
        .populate('category', 'name')
        .populate('supplier', 'name')
        .populate('brands', 'name')
        .skip(skip)
        .limit(pageSize)
        .lean();

      const total = await this.productsModel.countDocuments(query);

      return {
        data: products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
  }

  //delete a product
  async deleteSingleProduct(productId: string): Promise<ResponseModel> {
    try {
      await this.productsModel.findByIdAndDelete(productId);
      return {
        message: 'Product deleted',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  //get a single product
  async getSingleProduct(productId: string): Promise<any> {
    try {
      return await this.productsModel
        .findById(productId)
        .populate('category', 'name')
        .populate('supplier', 'name')
        .populate('brands', 'name');
    } catch (error) {
      console.log(error);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  //update a product
  async updateSingleProduct(
    productId: string,
    productDetails: ProductsModel,
  ): Promise<ResponseModel> {
    try {
      await this.productsModel.findByIdAndUpdate(productId, productDetails, {
        new: true,
      });

      return {
        message: 'Product updated',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  //product in stock
  async getInStockProducts(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    try {
      const query: any = {};

      if (searchQuery) {
        const searchKeyRegex = new RegExp(searchQuery, 'i');
        query['medicineName'] = searchKeyRegex;
      }

      if (userId) {
        query['user'] = userId;
      }

      query['quantity'] = { $gt: 0 };

      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const products = await this.productsModel
        .find(query)
        .populate('category', 'name')
        .populate('supplier', 'name')
        .populate('brands', 'name')
        .skip(skip)
        .limit(pageSize)
        .lean();

      const total = await this.productsModel.countDocuments(query);

      return {
        data: products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
  }

  //product out of stock
  async getOutofStockProducts(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    try {
      const query: any = {};

      if (searchQuery) {
        const searchKeyRegex = new RegExp(searchQuery, 'i');
        query['medicineName'] = searchKeyRegex;
      }

      if (userId) {
        query['user'] = userId;
      }

      query['quantity'] = { $eq: 0 };

      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const products = await this.productsModel
        .find(query)
        .populate('category', 'name')
        .populate('supplier', 'name')
        .populate('brands', 'name')
        .skip(skip)
        .limit(pageSize)
        .lean();

      const total = await this.productsModel.countDocuments(query);

      return {
        data: products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
  }

  // expired medicines list
  async getExpiredProducts(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    try {
      const query: any = {};

      if (searchQuery) {
        const searchKeyRegex = new RegExp(searchQuery, 'i');
        query['medicineName'] = searchKeyRegex;
      }

      if (userId) {
        query['user'] = userId;
      }

      query['expireDate'] = { $lt: new Date() };

      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const products = await this.productsModel
        .find(query)
        .populate('category', 'name')
        .populate('supplier', 'name')
        .populate('brands', 'name')
        .skip(skip)
        .limit(pageSize)
        .lean();

      const total = await this.productsModel.countDocuments(query);

      return {
        data: products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
  }
}
