import { InjectRepository } from '@nestjs/typeorm';
import { PaginationOutput } from '../../../../@shared/domain/dto/pagination.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { PhotoOutput } from '../../../photos/application/output/photo.output';
import { GetEventPhotosDTO } from '../../domain/dto/get-event-photos.dto';
import { Photo } from '../../../photos/domain/entities/photo.entity';
import { Repository } from 'typeorm';
import { Event } from '../../domain/entities/event.entity';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import { UnauthorizedException } from '@nestjs/common';
import { S3Gateway } from '../../../aws/s3.gateway';
import { PhotoMapper } from '../../../photos/mappers/photo.mapper';

export class GetEventPhotosUseCase
  implements IUseCase<GetEventPhotosDTO, PaginationOutput<PhotoOutput>>
{
  constructor(
    @InjectRepository(Photo) private readonly repository: Repository<Photo>,
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    private readonly s3: S3Gateway,
  ) {}

  async execute(
    input: GetEventPhotosDTO,
  ): Promise<PaginationOutput<PhotoOutput>> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new UnauthorizedException(
        'Você deve está conectado para acessar esse evento.',
      );
    }

    const event = await this.eventRepo.existsBy({
      id: input.id,
      userId: user.id,
    });

    if (!event) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar as fotos desse evento.',
      );
    }

    const [photos, count] = await this.repository.findAndCount({
      where: {
        eventId: input.id,
      },
      take: input.perPage,
      skip: (input.page - 1) * input.perPage,
    });

    const totalPages = Math.ceil(count / input.perPage);

    const photosWithUrlPromises = photos.map(async (p) => {
      const signedUrl = await this.s3.getUrl(p.image);

      p.image = signedUrl;

      return p;
    });

    const photosWithUrl = await Promise.all(photosWithUrlPromises);

    return {
      items: photosWithUrl.map((p) => PhotoMapper.toOutput(p)),
      page: input.page,
      perPage: input.perPage,
      totalItems: count,
      totalPages,
    };
  }
}
