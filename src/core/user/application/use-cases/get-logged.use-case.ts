import { UnauthorizedException } from '@nestjs/common';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { UserOutput } from '../outputs/user.output';

export class GetLoggedUseCase implements IUseCase<null, UserOutput> {
  execute(): UserOutput {
    const user = AuthStorage.get()?.user;

    if (!user) {
      throw new UnauthorizedException(
        'Deve está conectado para coletar os dados do usuário.',
      );
    }

    return UserMapper.toOutput(user);
  }
}
