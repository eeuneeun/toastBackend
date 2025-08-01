import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Get(':cartId')
  findAll(cartId: number) {
    return this.cartService.getCartWithMenus(cartId);
  }

  @Patch(':cartId')
  update(
    @Param('cartId') cartId: number,
    @Body() menuId: number,
    quantity: number,
    totalPrice: number,
  ) {
    return this.cartService.addMenuToCart(cartId, menuId, quantity, totalPrice);
  }

  @Delete(':cartId')
  remove(@Param('cartId') cartId: number) {
    return this.cartService.deleteCart(cartId);
  }
}
