import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from '../../core/auth/domain/dto/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }
}
