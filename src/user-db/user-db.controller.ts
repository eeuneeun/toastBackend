import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { CreateUserDbDto } from './dto/create-user-db.dto';
import { UpdateUserDbDto } from './dto/update-user-db.dto';

@Controller('user-db')
export class UserDbController {
  constructor(private readonly userDbService: UserDbService) {}

  @Post()
  create(@Body() createUserDbDto: CreateUserDbDto) {
    return this.userDbService.create(createUserDbDto);
  }

  @Get()
  findAll() {
    return this.userDbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDbDto: UpdateUserDbDto) {
    return this.userDbService.update(+id, updateUserDbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDbService.remove(+id);
  }
}
