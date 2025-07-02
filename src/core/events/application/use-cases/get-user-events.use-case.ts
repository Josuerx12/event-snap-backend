import { BadRequestException } from '@nestjs/common';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import { PaginationOutput } from '../../../../@shared/domain/dto/pagination.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { GetAllEventDTO } from '../../domain/dto/get-all-event.dto';
import { EventOutput } from '../shared/outputs/event.output';
import { Repository } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventMapper } from '../../mappers/event.mapper';

export class GetUserEventsUseCase
  implements IUseCase<GetAllEventDTO, PaginationOutput<EventOutput>>
{
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async execute(input: GetAllEventDTO): Promise<PaginationOutput<EventOutput>> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new BadRequestException(
        'Não foi possivel carregar lista de eventos do usuário pois o login atual não é mais válido.',
      );
    }

    const whereConditions: any = {
      userId: user.id,
    };

    if (input.filter?.search) {
      whereConditions.name = input.filter.search;
    }

    const [events, count] = await this.repository.findAndCount({
      where: whereConditions,
      take: input.perPage,
      skip: (input.page - 1) * input.perPage,
    });

    const totalPages = Math.ceil(count / input.perPage);

    return {
      items: events?.map((e) => EventMapper.toOutput(e)),
      page: input.page,
      perPage: input.perPage,
      totalItems: count,
      totalPages,
    };
  }
}
