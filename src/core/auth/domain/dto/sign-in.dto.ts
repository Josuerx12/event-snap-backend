import { IsString } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'Login deve ser informado.' })
  login: string;
  @IsString({ message: 'Senha deve ser informada.' })
  password: string;
}
