import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { PersonalInfo } from '../user/domain/entities/personal-info.entity';
import { CompanyInfo } from '../user/domain/entities/company-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalInfo, CompanyInfo])],
  controllers: [AuthController],
  providers: [AuthService, SignInUseCase],
})
export class AuthModule {}
