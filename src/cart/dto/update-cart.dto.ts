import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsInt, Min } from 'class-validator';
export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsInt()
  @Min(1)
  quantity: number;
}
