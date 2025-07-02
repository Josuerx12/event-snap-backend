import { IsUUID } from 'class-validator';

export class ByIdDTO {
  @IsUUID('4')
  id: string;
}
