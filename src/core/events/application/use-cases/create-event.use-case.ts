import { Repository } from 'typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { CreateEventDTO } from '../../domain/dto/create-event.dto';
import { EventOutput } from '../shared/outputs/event.output';
import { Event } from '../../domain/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import { BadRequestException } from '@nestjs/common';
import { EventMapper } from '../../mappers/event.mapper';
import { addHours, isBefore } from 'date-fns';

export class CreateEventUseCase
  implements IUseCase<CreateEventDTO, EventOutput>
{
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async execute(input: CreateEventDTO): Promise<EventOutput> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new BadRequestException(
        'Não foi possivel criar o evento pois o login do usuário atual é invalido, reautetique-se e tente novamente.',
      );
    }

    const event = new Event();

    event.id = randomUUID();
    event.name = input.name;
    event.description = input.description;

    const eventDate = new Date(input.eventDate);

    const now = new Date();

    const limitToCreateAEvent = addHours(now, 1);

    if (isBefore(eventDate, limitToCreateAEvent)) {
      throw new BadRequestException(
        'A data do evento deve ser pelo menos 1 hora após o horário atual.',
      );
    }

    event.eventDate = eventDate;
    event.publicToken = randomUUID();
    event.user = user;

    await this.repository.save(event);

    return EventMapper.toOutput(event);
  }
}
