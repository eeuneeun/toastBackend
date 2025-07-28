import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class BoardService {
  // constructor(protected repo: Repository<T>) {
  //   super();
  //   this.dbName = this.repo.metadata.connection.options.type;
  //   this.onInitMapEntityColomns();
  // }
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {
    this.boardRepository = boardRepository;
  }
  async create(input: any): Promise<Board> {
    const result = await this.boardRepository.save({
      ...input,
    });
    return result;
  }

  async findAll() {
    const result = await this.boardRepository.find();
    return result;
  }

  async findOne(id: number): Promise<Board | null> {
    const result = await this.boardRepository.findOne({ where: { id: id } });

    return result;
  }

  async update(id: number, newContents: {}): Promise<{ message: string }> {
    const result = await this.boardRepository.update(id, newContents);
    if (result.affected === 0) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return { message: `Article ${id} updated` };
  }

  async remove(id: number): Promise<any> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return { message: `Article ${id} updated` };
  }
}
