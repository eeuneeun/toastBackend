import { Injectable } from '@nestjs/common';
import { CreateOwnerDbDto } from './dto/create-merchant-db.dto';
import { UpdateOwnerDbDto } from './dto/update-merchant-db.dto';

@Injectable()
export class MerchantDbService {
  create(createOwnerDbDto: CreateOwnerDbDto) {
    return 'This action adds a new ownerDb';
  }

  findAll() {
    return `This action returns all ownerDb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ownerDb`;
  }

  update(id: number, updateOwnerDbDto: UpdateOwnerDbDto) {
    return `This action updates a #${id} ownerDb`;
  }

  remove(id: number) {
    return `This action removes a #${id} ownerDb`;
  }
}
