import { IsDateString, IsString } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  eventDate: string;

  file?: Express.Multer.File;
}
