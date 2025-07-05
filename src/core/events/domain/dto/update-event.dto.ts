import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDTO } from './create-event.dto';
import { IsOptional, IsUUID, Validate } from 'class-validator';
import { EventExistsValidator } from '../../application/validators/event-exists.validator';

export class UpdateEventDTO extends PartialType(CreateEventDTO) {
  @IsOptional()
  @IsUUID('4')
  @Validate(EventExistsValidator)
  id: string;
}
