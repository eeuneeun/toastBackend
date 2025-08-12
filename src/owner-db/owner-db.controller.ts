import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerDbService } from './owner-db.service';
import { CreateOwnerDbDto } from './dto/create-owner-db.dto';
import { UpdateOwnerDbDto } from './dto/update-owner-db.dto';

@Controller('owner-db')
export class OwnerDbController {
  constructor(private readonly ownerDbService: OwnerDbService) {}

  @Post()
  create(@Body() createOwnerDbDto: CreateOwnerDbDto) {
    return this.ownerDbService.create(createOwnerDbDto);
  }

  @Get()
  findAll() {
    return this.ownerDbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerDbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDbDto: UpdateOwnerDbDto) {
    return this.ownerDbService.update(+id, updateOwnerDbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerDbService.remove(+id);
  }
}
