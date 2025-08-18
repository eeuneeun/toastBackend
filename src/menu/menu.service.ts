import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu, 'userDBConnection')
    private toastRepository: Repository<Menu>,
  ) {
    this.toastRepository = toastRepository;
  }

  async create(newMenu: Menu): Promise<Menu> {
    const result = await this.toastRepository.save({
      ...newMenu,
    });
    return result;
  }

  async findAll(): Promise<Menu[]> {
    const result = await this.toastRepository.find();
    return result;
  }

  async findOne(id: number): Promise<Menu | null> {
    const result = await this.toastRepository.findOne({ where: { id: id } });
    return result;
  }

  async findByCategory(category: string): Promise<Menu[] | null> {
    const result = await this.toastRepository.find({
      where: { category: category },
    });

    return result;
  }

  async update(id: number, newContents: {}): Promise<{ message: string }> {
    const result = await this.toastRepository.update(id, newContents);
    if (result.affected === 0) {
      throw new NotFoundException(`Toast with id ${id} not found`);
    }
    return { message: `Toast ${id} updated` };
  }

  async remove(id: number): Promise<any> {
    const result = await this.toastRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Toast with id ${id} not found`);
    }
    return { message: `Toast ${id} updated` };
  }
}
