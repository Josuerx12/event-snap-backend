import { Repository } from 'typeorm';

import { SignInOutput } from '../output/sign-in.output';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AES } from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { IUseCase } from '../../../../@shared/arq/interface/use-case.interface';
import { User } from '../../../user/domain/entities/user.entity';
import { UserMapper } from '../../../user/domain/mappers/user.mapper';
import { SignInDto } from '../../domain/dto/sign-in.dto';

export class SignInUseCase implements IUseCase<SignInDto, SignInOutput> {
  private readonly secret: string;
  private readonly encryptSecret: string;
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.get<string>('JWT_SECRET') || '';
    this.encryptSecret = this.configService.get<string>('ENCRYPT_SECRET') || '';
  }
  async execute(input: SignInDto): Promise<SignInOutput> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.companyInfo', 'companyInfo')
      .leftJoinAndSelect('user.personalInfo', 'personalInfo')
      .where('user.email = :login', { login: input.login })
      .orWhere('companyInfo.cnpj = :login', { login: input.login })
      .orWhere('personalInfo.cpf = :login', { login: input.login })
      .getOne();

    if (!user) {
      throw new BadRequestException(
        'Valide suas credenciais e tente novamente.',
      );
    }

    const verify = compareSync(input.password, user.password!);

    if (!verify) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    delete user.password;

    const userOutput = UserMapper.toOutput(user);

    const encyptedUser = AES.encrypt(
      JSON.stringify(userOutput),
      this.encryptSecret,
    ).toString();

    const accessToken = sign({ user: encyptedUser }, this.secret, {
      expiresIn: '1d',
    });

    const now = new Date();
    const expiresIn = Math.floor(
      (now.getTime() + 1 * 24 * 60 * 60 * 1000) / 1000,
    );

    return {
      accessToken,
      exp: expiresIn,
    };
  }
}
