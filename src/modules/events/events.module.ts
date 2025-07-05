import { Module } from '@nestjs/common';
import { eventUseCases } from '../../core/events/application/use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../core/events/domain/entities/event.entity';
import { EventService } from './events.service';
import { EventsController } from './events.controller';
import { Photo } from '../../core/photos/domain/entities/photo.entity';
import { EventExistsValidator } from '../../core/events/application/validators/event-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Photo])],
  controllers: [EventsController],
  providers: [...eventUseCases, EventService, EventExistsValidator],
})
export class EventsModule {}
