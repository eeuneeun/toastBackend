import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDbDto } from './create-user-db.dto';

export class UpdateUserDbDto extends PartialType(CreateUserDbDto) {}
