import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { OwnerStore } from 'src/user-db/entities/OwnerStore';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(OwnerStore, 'userDBConnection')
    private storeRepo: Repository<OwnerStore>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  async findAll(): Promise<OwnerStore[]> {
    return this.storeRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
