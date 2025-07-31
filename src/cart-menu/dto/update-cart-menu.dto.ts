import { PartialType } from '@nestjs/mapped-types';
import { CreateCartMenuDto } from './create-cart-menu.dto';

export class UpdateCartMenuDto extends PartialType(CreateCartMenuDto) {}
