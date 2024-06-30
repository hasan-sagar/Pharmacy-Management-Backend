import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from 'src/schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from 'src/schemas/products.schema';
import { OrderModel } from 'src/models/order-model';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Products.name) private readonly productModel: Model<Products>,
  ) {}

  // get dashboard summary
  // async getDashboardSummary(userId: string): Promise<any> {
  //   try {
  //     const getOrdersTotalAmount = await this.orderModel.aggregate([
  //       {
  //         $group: {
  //           _id: null,
  //           totalSaleAmount: { $sum: '$totalAmount' },
  //         },
  //       },
  //     ]);

  //     const getTotalProductsNumber = await this.productModel.aggregate([
  //       {
  //         $count: 'totalProducts',
  //       },
  //     ]);

  //     const getTotalExpiredProducts = await this.productModel.aggregate([
  //       {
  //         $match: {
  //           expireDate: { $lt: new Date() },
  //         },
  //       },
  //       {
  //         $count: 'totalExpiredProducts',
  //       },
  //     ]);

  //     const getTotalStockOutProducts = await this.productModel.aggregate([
  //       {
  //         $match: {
  //           quantity: 0,
  //         },
  //       },
  //       {
  //         $count: 'totalStockOutProducts',
  //       },
  //     ]);

  //     return {
  //       getOrdersTotalAmount,
  //       getTotalProductsNumber,
  //       getTotalExpiredProducts,
  //       getTotalStockOutProducts,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException('Fetch error', HttpStatus.BAD_REQUEST);
  //   }
  // }

  async getDashboardSummary(userId: string): Promise<any> {
    try {
      const orderQuery: any = {};

      if (userId) {
        orderQuery['user'] = userId;
      }

      const ordersData = await this.orderModel.find(orderQuery).lean();

      // Calculate total amount
      let totalSaleAmount = 0;

      ordersData.forEach((order) => {
        totalSaleAmount += order.totalAmount;
      });

      //get Total Products Number

      const productsQuery: any = {};

      if (userId) {
        orderQuery['user'] = userId;
      }

      const productsData = await this.orderModel
        .find(productsQuery)
        .lean()
        .countDocuments();

      //get Total expired Products Number
      const expiredProductsQuery: any = {};

      expiredProductsQuery['expireDate'] = { $lt: new Date() };

      if (userId) {
        expiredProductsQuery['user'] = userId;
      }

      const expiredProductsData = await this.productModel
        .find(expiredProductsQuery)
        .lean()
        .countDocuments();

      //get total stock out products number

      const stockOutProductsQuery: any = {};

      stockOutProductsQuery['quantity'] = { $eq: 0 };

      if (userId) {
        stockOutProductsQuery['user'] = userId;
      }

      const stockOutProductsData = await this.productModel
        .find(stockOutProductsQuery)
        .lean()
        .countDocuments();

      return {
        totalSaleAmount: totalSaleAmount,
        totalProducts: productsData,
        totalExpiredProducts: expiredProductsData,
        totalStockOutProducts: stockOutProductsData,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Fetch error', HttpStatus.BAD_REQUEST);
    }
  }

  async getRecentOrders(userId: string): Promise<OrderModel[]> {
    try {
      return this.orderModel
        .find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException('Fetch error', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOrdersSummary(userId: string): Promise<OrderModel[]> {
    try {
      return this.orderModel.find({ user: userId }).lean();
    } catch (error) {
      console.log(error);
      throw new HttpException('Fetch error', HttpStatus.BAD_REQUEST);
    }
  }
}
