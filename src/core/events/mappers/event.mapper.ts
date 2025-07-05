import { PhotoMapper } from '../../photos/mappers/photo.mapper';
import { UserMapper } from '../../user/domain/mappers/user.mapper';
import { EventOutput } from '../application/shared/outputs/event.output';
import { Event } from '../domain/entities/event.entity';

export class EventMapper {
  static toOutput(entity: Event): EventOutput {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      eventDate: entity.eventDate,
      publicToken: entity.publicToken,
      logo: entity.logo,
      user: entity?.user && UserMapper.toOutput(entity.user),
      photos: entity.photos?.map((p) => PhotoMapper.toOutput(p)),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
