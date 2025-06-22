import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true, name: 'ValidateUserDocumentExists' })
export class ValidateUserDocumentExists
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async validate(value: string): Promise<boolean> {
    const cleanedValue = value.replace(/\D/g, '');

    const userExists = await this.userRepo
      .createQueryBuilder('user')
      .leftJoin('user.personalInfo', 'personalInfo')
      .leftJoin('user.companyInfo', 'companyInfo')
      .where('personalInfo.cpf = :value', { value: cleanedValue })
      .orWhere('companyInfo.cnpj = :value', { value: cleanedValue })
      .getExists();

    return !userExists;
  }
  defaultMessage(): string {
    return 'documento informado já se encontra em uso.';
  }
}
