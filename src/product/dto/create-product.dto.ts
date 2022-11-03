import { IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  id?: string;

  @IsNotEmpty()
  name: string;
  @IsPositive()
  price: number;
  img?: string;
}
