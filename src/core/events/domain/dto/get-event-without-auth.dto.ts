import { IsString, IsUUID, Validate } from 'class-validator';
import { EventExistsValidator } from '../../application/validators/event-exists.validator';

export class GetEventWithoutAuthDTO {
  @IsUUID('4', { message: 'Id do evento dever ser informado.' })
  @Validate(EventExistsValidator)
  id: string;

  @IsString({ message: 'Token do evento deve ser informado.' })
  eventToken: string;
}
