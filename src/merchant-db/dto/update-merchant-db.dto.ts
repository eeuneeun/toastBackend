import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDbDto } from './create-merchant-db.dto';

export class UpdateOwnerDbDto extends PartialType(CreateOwnerDbDto) {}
