import { Module } from '@nestjs/common';
import { eventUseCases } from '../../core/events/application/use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../core/events/domain/entities/event.entity';
import { EventService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [...eventUseCases, EventService],
})
export class EventsModule {}
