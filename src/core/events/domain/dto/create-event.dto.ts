import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDTO {
  @IsString({ message: 'Nome do evento deve ser informado.' })
  @Length(3, 100, {
    message: 'Nome do evento deve conter de 3 a 100 caracteres.',
  })
  name: string;

  @IsString({ message: 'Descrição do evento deve ser informada.' })
  @Length(10, 255, {
    message: 'Descrição do evento deve conter de 10 a 255 caracteres.',
  })
  description: string;

  @IsDateString({}, { message: 'Dia e hora do evento devem ser informados.' })
  eventDate: string;

  file?: Express.Multer.File;
}
