import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@ValidatorConstraint({ async: true })
export class EventExistsValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async validate(value: string): Promise<boolean> {
    const exists = await this.repository.existsBy({ id: value });

    return exists;
  }

  defaultMessage(): string {
    return 'Evento não encontrado, para o id informado.';
  }
}
