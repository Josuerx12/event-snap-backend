import { IsInt, IsNumberString, IsString, Length } from 'class-validator';

export class CreatePlanDTO {
  @IsString({ message: 'Nome do plano deve ser informado.' })
  @Length(2, 100, {
    message: 'Nome do plano deve conter de 2 a 100 caracteres.',
  })
  name: string;

  @IsInt({ message: 'Quantidade de fotos limite do plano deve ser informado.' })
  photoLimit: number;

  @IsInt({
    message:
      'Tamanho de armazenamento maximo suportado no plano deve ser informado.',
  })
  storageLimitMb: number;

  @IsInt({ message: 'Quantidade de eventos maximo deve ser informado.' })
  events: number;

  @IsNumberString()
  price: string;

  @IsInt({ message: 'Tempo de duração em dias do plano deve ser informado.' })
  duration: number;
}
