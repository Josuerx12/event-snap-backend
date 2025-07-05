import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';
import { EventExistsValidator } from '../../application/validators/event-exists.validator';

export class AddEventPhotosDTO {
  @IsUUID('4', { message: 'Id do evendo deve ser informado.' })
  @Validate(EventExistsValidator)
  @IsOptional()
  id: string;

  @IsUUID('4', { message: 'Token do evento deve ser informado.' })
  eventToken: string;

  @IsOptional()
  @IsString({ message: 'Mensagem deve ser informada.' })
  message?: string;

  photos: Express.Multer.File[];
}
