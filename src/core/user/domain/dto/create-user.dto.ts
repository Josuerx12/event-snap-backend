import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { AccountType } from '../enums/account-type.enum';
import { ValidateUserEmailExists } from '../../application/validations/validate-user-email-exists.validator';
import { ValidateUserDocumentExists } from '../../application/validations/validate-user-document-exists.validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  @Validate(ValidateUserEmailExists)
  email: string;

  @IsString()
  @Validate(ValidateUserDocumentExists)
  document: string;

  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @Length(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsOptional()
  @IsString()
  companyName?: string;
}
