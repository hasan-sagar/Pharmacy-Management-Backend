import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderModel } from 'src/models/order-model';
import { ResponseModel } from 'src/models/response-model';
import { Order } from 'src/schemas/order.schema';
import { Products } from 'src/schemas/products.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Products.name) private readonly productModel: Model<Products>,
  ) {}

  // Create an order
  async createNewOrder(
    userId: string,
    orderDetails: OrderModel,
  ): Promise<ResponseModel> {
    //transaction session
    const session = await this.orderModel.db.startSession();
    session.startTransaction();
    try {
      await this.orderModel.create(
        [
          {
            invoiceNo: orderDetails.invoiceNo,
            user: userId,
            customerDetails: orderDetails.customerDetails,
            cartItems: orderDetails.cartItems,
            totalAmount: orderDetails.totalAmount,
            status: orderDetails.status,
          },
        ],
        { session },
      );

      //  product quantities update
      for (const item of orderDetails.cartItems) {
        const product = await this.productModel
          .findById(item.productId)
          .session(session);

        if (!product) {
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        if (product.quantity < item.quantity) {
          throw new HttpException(
            `Insufficient quantity for product: ${product.medicineName}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        product.quantity -= item.quantity;
        await product.save({ session });
      }

      //session end
      await session.commitTransaction();
      session.endSession();

      return {
        message: 'New order created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      //rollback
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      throw new HttpException(
        'Product stock not available',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //get all orders by user with search and pagination
  async getOrders(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    const query: any = {};

    if (searchQuery) {
      const searchKeyRegex = new RegExp(searchQuery, 'i');
      query['$or'] = [
        { invoiceNo: searchKeyRegex },
        { 'customerDetails.name': searchKeyRegex },
        { 'cartItems.name': searchKeyRegex },
      ];
    }

    if (userId) {
      query['user'] = userId;
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const orders = await this.orderModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await this.orderModel.countDocuments(query);

    return {
      data: orders,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  //get a single order
  async getSingleOrder(orderId: string): Promise<OrderModel> {
    try {
      return await this.orderModel.findById(orderId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
