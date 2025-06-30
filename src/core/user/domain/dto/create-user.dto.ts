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
  @IsString({ message: 'O nome é obrigatório.' })
  @Length(1, 255, { message: 'O nome deve ter entre 1 e 255 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'O email informado é inválido.' })
  @Validate(ValidateUserEmailExists)
  email: string;

  @IsString({ message: 'O documento é obrigatório.' })
  @Validate(ValidateUserDocumentExists)
  document: string;

  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @IsString({ message: 'A senha é obrigatória.' })
  @Length(6, 20, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @IsString({ message: 'O telefone é obrigatório.' })
  phone: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsOptional()
  @IsString({ message: 'O nome da empresa deve ser um texto.' })
  companyName?: string;
}
