import { Repository } from 'typeorm';
import { ByIdDTO } from '../../../../@shared/domain/dto/by-id.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { EventOutput } from '../shared/outputs/event.output';
import { Event } from '../../domain/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventMapper } from '../../mappers/event.mapper';

export class GetEventByIdUseCase
  implements IUseCase<ByIdDTO, EventOutput | null>
{
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async execute(input: ByIdDTO): Promise<EventOutput | null> {
    const event = await this.repository.findOneBy({ id: input.id });

    if (!event) {
      return null;
    }

    return EventMapper.toOutput(event);
  }
}
