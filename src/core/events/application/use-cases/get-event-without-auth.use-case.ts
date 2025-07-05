import { InjectRepository } from '@nestjs/typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { GetEventWithoutAuthDTO } from '../../domain/dto/get-event-without-auth.dto';
import { EventOutput } from '../shared/outputs/event.output';
import { Event } from '../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EventMapper } from '../../mappers/event.mapper';
import { S3Gateway } from '../../../aws/s3.gateway';

export class GetEventWithoutAuthUseCase
  implements IUseCase<GetEventWithoutAuthDTO, EventOutput>
{
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
    private readonly s3: S3Gateway,
  ) {}

  async execute(input: GetEventWithoutAuthDTO): Promise<EventOutput> {
    const event = await this.repository.findOneBy({
      id: input.id,
      publicToken: input.eventToken,
    });

    if (!event) {
      throw new NotFoundException(
        'Não foi encontrado nenhum evento, como os dados informados.',
      );
    }

    if (event.logo) {
      const url = await this.s3.getUrl(event.logo);

      event.logo = url;
    }

    return EventMapper.toOutput(event);
  }
}
