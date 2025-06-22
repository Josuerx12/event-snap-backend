import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UserOutput } from '../outputs/user.output';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcryptjs';
import { AccountType } from '../../domain/enums/account-type.enum';
import { PersonalInfo } from '../../domain/entities/personal-info.entity';
import { CompanyInfo } from '../../domain/entities/company-info.entity';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { PhoneVo } from '../../../../@shared/arq/value-objects/phone.vo';
import { CpfVo } from '../../../../@shared/arq/value-objects/cpf.vo';
import { CnpjVo } from '../../../../@shared/arq/value-objects/cnpj.vo';
import { IUseCase } from '../../../../@shared/arq/interface/use-case.interface';

export class CreateUserUseCase implements IUseCase<CreateUserDto, UserOutput> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async execute(input: CreateUserDto): Promise<UserOutput> {
    const user = new User();

    user.name = input.name;
    user.email = input.email;
    user.birthdate = input.birthdate;
    user.password = input.password;
    user.accountType = input.accountType;

    const hashPass = hashSync(input.password, 10);

    user.password = hashPass;

    const phone = new PhoneVo(input.phone);

    user.phone = phone.getValue();

    if (input.accountType === AccountType.PERSONAL) {
      const document = new CpfVo(input.document);

      const personalInfo = new PersonalInfo();
      personalInfo.cpf = document.getValue();

      user.personalInfo = personalInfo;
    } else if (input.accountType === AccountType.COMPANY) {
      const document = new CnpjVo(input.document);
      const companyInfo = new CompanyInfo();

      companyInfo.cnpj = document.getValue();
      companyInfo.companyName = input.companyName;

      user.companyInfo = companyInfo;
    }

    await this.userRepo.save(user);

    return UserMapper.toOutput(user);
  }
}
