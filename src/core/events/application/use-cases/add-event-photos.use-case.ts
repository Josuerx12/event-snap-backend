import { Repository } from 'typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { AddEventPhotosDTO } from '../../domain/dto/add-event-photos.dto';
import { Photo } from '../../../photos/domain/entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../domain/entities/event.entity';
import { NotFoundException } from '@nestjs/common';
import { S3Gateway } from '../../../aws/s3.gateway';
import { randomUUID } from 'crypto';

export class AddEventPhotosUseCase
  implements IUseCase<AddEventPhotosDTO, void>
{
  constructor(
    @InjectRepository(Photo) private readonly repository: Repository<Photo>,
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    private readonly s3: S3Gateway,
  ) {}

  async execute(input: AddEventPhotosDTO): Promise<void> {
    const event = await this.eventRepo.findOne({
      where: {
        id: input.id,
        publicToken: input.eventToken,
      },
    });

    if (!event) {
      throw new NotFoundException(
        'Não foi possivel encontrar o evento com as credenciais informada.',
      );
    }

    const photoPromises = input.photos?.map(async (p) => {
      if (p.mimetype.includes('image')) {
        const photoKey = await this.s3.uploadFile(p);

        const photo = new Photo();

        photo.id = randomUUID();
        photo.image = photoKey;
        photo.sizeInMb = p.size;
        photo.message = input.message;
        photo.event = event;

        await this.repository.save(photo);
      }
    });

    await Promise.all(photoPromises);
  }
}
