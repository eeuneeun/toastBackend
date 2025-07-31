import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderMenuService } from './order-menu.service';
import { CreateOrderMenuDto } from './dto/create-order-menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order-menu.dto';

@Controller('order-menu')
export class OrderMenuController {
  constructor(private readonly orderMenuService: OrderMenuService) {}

  @Post()
  create(@Body() createOrderMenuDto: CreateOrderMenuDto) {
    return this.orderMenuService.create(createOrderMenuDto);
  }

  @Get()
  findAll() {
    return this.orderMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderMenuDto: UpdateOrderMenuDto) {
    return this.orderMenuService.update(+id, updateOrderMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderMenuService.remove(+id);
  }
}
