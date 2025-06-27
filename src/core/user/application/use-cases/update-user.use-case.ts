import { UnauthorizedException } from '@nestjs/common';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UserOutput } from '../outputs/user.output';
import { PhoneVo } from '../../../../@shared/domain/value-objects/phone.vo';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from '../../domain/mappers/user.mapper';

export class UpdateUserUseCase
  implements IUseCase<Partial<CreateUserDto>, UserOutput>
{
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(input: Partial<CreateUserDto>): Promise<UserOutput> {
    const user = AuthStorage.get()?.user;

    if (!user) {
      throw new UnauthorizedException(
        'Você deve está autenticado para editar um usuário.',
      );
    }

    if (input.birthdate) {
      user.birthdate = input.birthdate;
    }

    if (input.name) {
      user.name = input.name;
    }

    if (input.companyName && user.companyInfo) {
      user.companyInfo.companyName = input.companyName;
    }

    if (input.phone) {
      const phone = new PhoneVo(input.phone);
      user.phone = phone.getValue();
    }

    await this.userRepo.save(user);

    return UserMapper.toOutput(user);
  }
}
