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
import { S3Gateway } from '../../../aws/s3.gateway';
import { Photo } from '../../../photos/domain/entities/photo.entity';

export class DeleteEventUseCase implements IUseCase<ByIdDTO, void> {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
    @InjectRepository(Photo) private readonly photoRepo: Repository<Photo>,
    private readonly s3: S3Gateway,
  ) {}

  async execute(input: ByIdDTO): Promise<void> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new BadRequestException(
        'Não foi possivel deletar o evento selecionado pois seu login é invalido, re-autentique-se e tente novamente.',
      );
    }

    const event = await this.repository.findOne({
      where: { id: input.id },
      relations: ['photos'],
    });

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

    if (event.logo) {
      this.s3.deleteFile(event.logo);
    }

    if (event.photos && event.photos.length > 0) {
      const deletePhotosPromise = event.photos.map(async (p) => {
        await this.s3.deleteFile(p.image);

        await this.photoRepo.remove(p);
      });

      await Promise.all(deletePhotosPromise);
    }

    await this.repository.remove(event);
  }
}
