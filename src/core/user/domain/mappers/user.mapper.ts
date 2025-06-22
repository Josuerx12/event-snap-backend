import { User } from '../entities/user.entity';
import { UserOutput } from '../../application/outputs/user.output';
import { CompanyInfoMapper } from './company-info.mapper';
import { PersonalInfoMapper } from './personal-info.mapper';

export class UserMapper {
  static toOutput(user: User): UserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      accountType: user.accountType,
      document: user.personalInfo?.cpf || user.companyInfo?.cnpj,
      personalInfo:
        user.personalInfo && PersonalInfoMapper.toOutput(user.personalInfo),
      companyInfo:
        user.companyInfo && CompanyInfoMapper.toOutput(user.companyInfo),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
