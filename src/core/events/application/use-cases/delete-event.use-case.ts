import { Repository } from 'typeorm';
import { ByIdDTO } from '../../../../@shared/domain/dto/by-id.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { Event } from '../../domain/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class DeleteEventUseCase implements IUseCase<ByIdDTO, void> {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async execute(input: ByIdDTO): Promise<void> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new BadRequestException(
        'Não foi possivel deletar o evento selecionado pois seu login é invalido, re-autentique-se e tente novamente.',
      );
    }

    const event = await this.repository.findOneBy({ id: input.id });

    if (!event) {
      throw new NotFoundException(
        'Evento não se econtra mais no banco de dados.',
      );
    }

    if (user.id != event?.userId) {
      throw new UnauthorizedException(
        'Você não tem permissão para deletar esse evento.',
      );
    }

    await this.repository.remove(event);
  }
}
