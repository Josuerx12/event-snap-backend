import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInUseCase } from '../../core/auth/application/use-cases/sign-in.use-case';
import { CompanyInfo } from '../../core/user/domain/entities/company-info.entity';
import { PersonalInfo } from '../../core/user/domain/entities/personal-info.entity';
import { User } from '../../core/user/domain/entities/user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalInfo, CompanyInfo])],
  controllers: [AuthController],
  providers: [AuthService, SignInUseCase],
})
export class AuthModule {}
