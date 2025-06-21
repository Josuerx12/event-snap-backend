import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignInUseCase } from './use-cases/sign-in.use-case';

@Injectable()
export class AuthService {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  signIn(data: SignInDto) {
    return this.signInUseCase.execute(data);
  }
}
