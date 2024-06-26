import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  user: string;
}
