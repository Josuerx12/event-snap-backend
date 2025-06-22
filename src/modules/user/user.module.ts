import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCases } from '../../core/user/application/use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateUserEmailExists } from '../../core/user/application/validations/validate-user-email-exists.validator';
import { ValidateUserDocumentExists } from '../../core/user/application/validations/validate-user-document-exists.validator';
import { UserService } from './user.service';
import { CompanyInfo } from '../../core/user/domain/entities/company-info.entity';
import { PersonalInfo } from '../../core/user/domain/entities/personal-info.entity';
import { User } from '../../core/user/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalInfo, CompanyInfo])],
  controllers: [UserController],
  providers: [
    ValidateUserEmailExists,
    ValidateUserDocumentExists,
    UserService,
    ...UserUseCases,
  ],
})
export class UserModule {}
