import { Repository } from 'typeorm';
import { ByIdDTO } from '../../../../@shared/domain/dto/by-id.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { Photo } from '../../../photos/domain/entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Gateway } from '../../../aws/s3.gateway';
import { AuthStorage } from '../../../../@shared/application/auth-storage';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class DeletePhotoUseCase implements IUseCase<ByIdDTO, void> {
  constructor(
    @InjectRepository(Photo) private readonly repository: Repository<Photo>,
    private readonly s3: S3Gateway,
  ) {}
  async execute(input: ByIdDTO): Promise<void> {
    const { user } = AuthStorage.get();

    if (!user) {
      throw new UnauthorizedException('Sessão atual não é valida.');
    }

    const photo = await this.repository.findOneBy({
      id: input.id,
      event: { userId: user.id },
    });

    if (!photo) {
      throw new NotFoundException('Não foi possivel encontrar a foto.');
    }

    await this.s3.deleteFile(photo.image);

    await this.repository.remove(photo);
  }
}
