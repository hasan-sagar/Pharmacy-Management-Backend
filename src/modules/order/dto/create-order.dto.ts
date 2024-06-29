import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OrderCreateDto {
  @ApiProperty()
  user?: string;

  @ApiProperty()
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };

  @ApiProperty()
  cartItems: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }[];

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  totalItems: number;

  @ApiProperty()
  status?: string;
}
