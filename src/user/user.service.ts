import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.userRepository.save({
      ...createUserDto,
    });
    return result;
  }

  async validateUser(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { userId: signInDto.userId, password: signInDto.password },
    });

    /* The commented code block is a validation process in the `validateUser` method of the
   `UserService` class. Here's a breakdown of what each part is doing: */
    if (!user) throw new UnauthorizedException('User not found');

    // const isMatch = user?.password === signInDto.password;
    // if (!isMatch) throw new UnauthorizedException('Invalid password');
    /* The commented code block `// return { id: user?.userId, username: user?.username };` is attempting
to return an object with the `id` and `username` properties of the user if the user is found and the
password matches the one provided in the `signInDto`. However, this code block is currently
commented out, so it is not being executed in the `validateUser` method of the `UserService` class. */

    // return { id: user?.userId, username: user?.username };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
