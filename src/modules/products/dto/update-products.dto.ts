import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  medicineName: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  brands: string;

  @ApiProperty()
  @IsNotEmpty()
  supplier: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  expireDate: Date;
}
