import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDbDto } from './create-owner-db.dto';

export class UpdateOwnerDbDto extends PartialType(CreateOwnerDbDto) {}
