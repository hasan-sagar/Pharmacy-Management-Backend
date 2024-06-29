import { UserModel } from './user-model';

export class OrderModel {
  user?: UserModel['_id'];
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  cartItems: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }[];

  totalAmount: number;
  totalItems: number;
  status?: string;
}
