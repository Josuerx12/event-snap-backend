import { Repository } from 'typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { Event } from '../../domain/entities/event.entity';
import { EventOutput } from '../shared/outputs/event.output';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventMapper } from '../../mappers/event.mapper';
import { UpdateEventDTO } from '../../domain/dto/update-event.dto';
import { S3Gateway } from '../../../aws/s3.gateway';

export class UpdateEventUseCase
  implements IUseCase<UpdateEventDTO, EventOutput>
{
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
    private readonly s3: S3Gateway,
  ) {}

  async execute(input: UpdateEventDTO): Promise<EventOutput> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new BadRequestException(
        'Não foi possivel editar o evento pois o login do usuário atual é invalido, re-autetique-se e tente novamente.',
      );
    }

    const event = await this.repository.findOneBy({ id: input.id });

    if (!event) {
      throw new NotFoundException(
        'Evento selecionado não existe no banco de dados.',
      );
    }

    if (event.userId != user.id) {
      throw new UnauthorizedException(
        'Você não tem permissão para editar esse evento.',
      );
    }

    if (input.file && input.file.mimetype.includes('image')) {
      if (event.logo) {
        this.s3.deleteFile(event.logo);
      }

      const key = await this.s3.uploadFile(input.file);

      event.logo = key;
    }

    if (input.name) event.name = input.name;
    if (input.description) event.description = input.description;
    if (input.eventDate) event.eventDate = new Date(input.eventDate);

    await this.repository.save(event);

    const getFileUrl = await this.s3.getUrl(event.logo);

    event.logo = getFileUrl;

    return EventMapper.toOutput(event);
  }
}
