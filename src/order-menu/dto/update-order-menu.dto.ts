import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderMenuDto } from './create-order-menu.dto';

export class UpdateOrderMenuDto extends PartialType(CreateOrderMenuDto) {}
