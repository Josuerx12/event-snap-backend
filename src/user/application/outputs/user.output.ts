import { AccountType } from '../../domain/enums/account-type.enum';
import { CompanyInfoOutput } from './company-info.output';
import { PersonalInfoOutput } from './personal-info.output';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  birthdate?: Date;
  accountType: AccountType;
  document?: string;
  personalInfo?: PersonalInfoOutput | null;
  companyInfo?: CompanyInfoOutput | null;
  createdAt: Date;
  updatedAt: Date;
};
