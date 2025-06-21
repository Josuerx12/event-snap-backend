import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserUseCases } from './application/use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { PersonalInfo } from './domain/entities/personal-info.entity';
import { CompanyInfo } from './domain/entities/company-info.entity';
import { ValidateUserEmailExists } from './application/validations/validate-user-email-exists.validator';
import { ValidateUserDocumentExists } from './application/validations/validate-user-document-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalInfo, CompanyInfo])],
  controllers: [UserController],
  providers: [
    UserService,
    ...UserUseCases,
    ValidateUserEmailExists,
    ValidateUserDocumentExists,
  ],
})
export class UserModule {}
