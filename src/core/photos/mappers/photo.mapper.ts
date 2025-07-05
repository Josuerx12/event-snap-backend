import { PhotoOutput } from '../application/output/photo.output';
import { Photo } from '../domain/entities/photo.entity';

export class PhotoMapper {
  static toOutput(photo: Photo): PhotoOutput {
    return {
      id: photo.id,
      url: photo.image,
      message: photo.message,
      uploadedBy: photo.uploadBy,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    };
  }
}
