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
      throw new HttpException('Product stock exist', HttpStatus.BAD_REQUEST);
    }
  }
}
