import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartMenuService } from './cart-menu.service';
import { CreateCartMenuDto } from './dto/create-cart-menu.dto';
import { UpdateCartMenuDto } from './dto/update-cart-menu.dto';

@Controller('cart-menu')
export class CartMenuController {
  constructor(private readonly cartMenuService: CartMenuService) {}

  @Post()
  create(@Body() createCartMenuDto: CreateCartMenuDto) {
    return this.cartMenuService.create(createCartMenuDto);
  }

  @Get()
  findAll() {
    return this.cartMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartMenuDto: UpdateCartMenuDto) {
    return this.cartMenuService.update(+id, updateCartMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartMenuService.remove(+id);
  }
}
