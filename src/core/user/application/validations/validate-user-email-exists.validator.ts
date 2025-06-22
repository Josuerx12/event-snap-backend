import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true, name: 'ValidateUserEmailExists' })
@Injectable()
export class ValidateUserEmailExists implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async validate(value: string): Promise<boolean> {
    const userExists = await this.userRepo.exists({
      where: {
        email: value,
      },
    });

    return !userExists;
  }
  defaultMessage(): string {
    return 'email informado já se encontra em uso.';
  }
}
