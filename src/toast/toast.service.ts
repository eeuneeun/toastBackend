import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToastDto } from './dto/create-toast.dto';
import { UpdateToastDto } from './dto/update-toast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Toast } from './entities/toast.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToastService {
  constructor(
    @InjectRepository(Toast) private toastRepository: Repository<Toast>,
  ) {
    this.toastRepository = toastRepository;
  }

  async create(input: any): Promise<Toast> {
    const result = await this.toastRepository.save({
      ...input,
    });
    return result;
  }

  async findAll(): Promise<Toast[]> {
    const result = await this.toastRepository.find();
    return result;
  }

  async findOne(id: number): Promise<Toast | null> {
    const result = await this.toastRepository.findOne({ where: { id: id } });

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
