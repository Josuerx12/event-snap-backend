import { PersonalInfo } from '../entities/personal-info.entity';
import { PersonalInfoOutput } from '../../application/outputs/personal-info.output';

export class PersonalInfoMapper {
  static toOutput(personalInfo: PersonalInfo): PersonalInfoOutput {
    return {
      id: personalInfo.id,
      cpf: personalInfo.cpf,
    };
  }
}
