import { Injectable } from '@nestjs/common';
import { CreateUserDbDto } from './dto/create-user-db.dto';
import { UpdateUserDbDto } from './dto/update-user-db.dto';

@Injectable()
export class UserDbService {
  create(createUserDbDto: CreateUserDbDto) {
    return 'This action adds a new userDb';
  }

  findAll() {
    return `This action returns all userDb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDb`;
  }

  update(id: number, updateUserDbDto: UpdateUserDbDto) {
    return `This action updates a #${id} userDb`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDb`;
  }
}
