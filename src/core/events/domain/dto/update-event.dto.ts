import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDTO } from './create-event.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateEventDTO extends PartialType(CreateEventDTO) {
  @IsOptional()
  @IsUUID('4')
  id: string;
}
