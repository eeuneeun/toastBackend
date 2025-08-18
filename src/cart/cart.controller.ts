import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateCartMenuDto } from 'src/cart-menu/dto/update-cart-menu.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    const result = await this.cartService.createCart(
      createCartDto.customerId,
      createCartDto.cartMenus,
    );
    return result;
  }

  @Post('add')
  async addItem(
    @Body() body: { customerId: string; menuId: number; quantity: number },
  ) {
    return this.cartService.addItem(
      body.customerId,
      body.menuId,
      body.quantity,
    );
  }

  @Get(':cartId')
  findAll(cartId: number) {
    return this.cartService.getByCartId(cartId);
  }

  @Get('customer/:customerId')
  async getByCustomer(@Param('customerId') customerId: string) {
    const cart = await this.cartService.getByCustomerId(customerId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // 없으면 생성 후 반환
  @Get('customer/:customerId/ensure')
  async getOrCreate(@Param('customerId') customerId: string) {
    return this.cartService.getOrCreateByCustomerId(customerId);
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

  @Patch('/:cartId/menu/:menuId')
  async updateQuantity(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() dto: UpdateCartMenuDto,
  ) {
    return this.cartService.updateMenuQuantity(cartId, menuId, dto.quantity!);
  }

  @Delete(':cartId')
  remove(@Param('cartId') cartId: number) {
    return this.cartService.deleteCart(cartId);
  }
}
