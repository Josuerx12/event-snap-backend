import { Injectable } from '@nestjs/common';
import { ByIdDTO } from '../../@shared/domain/dto/by-id.dto';
import { CreateEventUseCase } from '../../core/events/application/use-cases/create-event.use-case';
import { DeleteEventUseCase } from '../../core/events/application/use-cases/delete-event.use-case';
import { GetAllEventsUseCase } from '../../core/events/application/use-cases/get-all-events.use-case';
import { GetEventByIdUseCase } from '../../core/events/application/use-cases/get-event-by-id.use-case';
import { GetUserEventsUseCase } from '../../core/events/application/use-cases/get-user-events.use-case';
import { UpdateEventUseCase } from '../../core/events/application/use-cases/update-event.use-case';
import { CreateEventDTO } from '../../core/events/domain/dto/create-event.dto';
import { GetAllEventDTO } from '../../core/events/domain/dto/get-all-event.dto';
import { UpdateEventDTO } from '../../core/events/domain/dto/update-event.dto';
import { AddEventPhotosDTO } from '../../core/events/domain/dto/add-event-photos.dto';
import { AddEventPhotosUseCase } from '../../core/events/application/use-cases/add-event-photos.use-case';
import { GetEventPhotosDTO } from '../../core/events/domain/dto/get-event-photos.dto';
import { GetEventPhotosUseCase } from '../../core/events/application/use-cases/get-event-photos.use-case';
import { GetEventWithoutAuthUseCase } from '../../core/events/application/use-cases/get-event-without-auth.use-case';
import { GetEventWithoutAuthDTO } from '../../core/events/domain/dto/get-event-without-auth.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly getUserEventsUseCase: GetUserEventsUseCase,
    private readonly getEventByIdUseCase: GetEventByIdUseCase,
    private readonly getAllEventsUseCase: GetAllEventsUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
    private readonly addEventPhotosUseCase: AddEventPhotosUseCase,
    private readonly getEventPhotosUseCase: GetEventPhotosUseCase,
    private readonly getEventWithoutAuthUseCase: GetEventWithoutAuthUseCase,
  ) {}

  create(data: CreateEventDTO) {
    return this.createEventUseCase.execute(data);
  }

  addPhotos(data: AddEventPhotosDTO) {
    return this.addEventPhotosUseCase.execute(data);
  }

  getEventWithoutAuth(data: GetEventWithoutAuthDTO) {
    return this.getEventWithoutAuthUseCase.execute(data);
  }

  getPhotos(data: GetEventPhotosDTO) {
    return this.getEventPhotosUseCase.execute(data);
  }

  update(data: UpdateEventDTO) {
    return this.updateEventUseCase.execute(data);
  }

  getById(data: ByIdDTO) {
    return this.getEventByIdUseCase.execute(data);
  }

  getUserEvents(data: GetAllEventDTO) {
    return this.getUserEventsUseCase.execute(data);
  }

  getAll(data: GetAllEventDTO) {
    return this.getAllEventsUseCase.execute(data);
  }

  delete(data: ByIdDTO) {
    return this.deleteEventUseCase.execute(data);
  }
}
