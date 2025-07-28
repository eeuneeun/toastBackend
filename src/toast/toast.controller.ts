import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToastService } from './toast.service';
import { CreateToastDto } from './dto/create-toast.dto';
import { UpdateToastDto } from './dto/update-toast.dto';

@Controller('toast')
export class ToastController {
  constructor(private readonly toastService: ToastService) {}

  @Post()
  create(@Body() createToastDto: CreateToastDto) {
    return this.toastService.create(createToastDto);
  }

  @Get()
  findAll() {
    return this.toastService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toastService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToastDto: UpdateToastDto) {
    return this.toastService.update(+id, updateToastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toastService.remove(+id);
  }
}
