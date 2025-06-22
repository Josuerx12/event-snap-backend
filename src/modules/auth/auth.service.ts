import { Injectable } from '@nestjs/common';
import { SignInUseCase } from '../../core/auth/application/use-cases/sign-in.use-case';
import { SignInDto } from '../../core/auth/domain/dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  signIn(data: SignInDto) {
    return this.signInUseCase.execute(data);
  }
}
