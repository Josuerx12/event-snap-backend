import { IsUUID, Validate } from 'class-validator';
import { EventExistsValidator } from '../../application/validators/event-exists.validator';

export class EventByIdDTO {
  @IsUUID('4', { message: 'Id do evento deve ser informado.' })
  @Validate(EventExistsValidator)
  id: string;
}
