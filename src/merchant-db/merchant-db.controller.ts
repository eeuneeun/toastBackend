import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantDbService } from './merchant-db.service';
import { CreateOwnerDbDto } from './dto/create-merchant-db.dto';
import { UpdateOwnerDbDto } from './dto/update-merchant-db.dto';

@Controller('merchant-db')
export class MerchantDbController {
  constructor(private readonly merchantDbService: MerchantDbService) {}

  @Post()
  create(@Body() createOwnerDbDto: CreateOwnerDbDto) {
    return this.merchantDbService.create(createOwnerDbDto);
  }

  @Get()
  findAll() {
    return this.merchantDbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantDbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDbDto: UpdateOwnerDbDto) {
    return this.merchantDbService.update(+id, updateOwnerDbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantDbService.remove(+id);
  }
}
