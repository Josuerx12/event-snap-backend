import { AddEventPhotosUseCase } from './add-event-photos.use-case';
import { CreateEventUseCase } from './create-event.use-case';
import { DeleteEventUseCase } from './delete-event.use-case';
import { GetAllEventsUseCase } from './get-all-events.use-case';
import { GetEventByIdUseCase } from './get-event-by-id.use-case';
import { GetEventPhotosUseCase } from './get-event-photos.use-case';
import { GetEventWithoutAuthUseCase } from './get-event-without-auth.use-case';
import { GetUserEventsUseCase } from './get-user-events.use-case';
import { UpdateEventUseCase } from './update-event.use-case';

export const eventUseCases = [
  CreateEventUseCase,
  UpdateEventUseCase,
  DeleteEventUseCase,
  GetEventByIdUseCase,
  GetUserEventsUseCase,
  GetAllEventsUseCase,
  AddEventPhotosUseCase,
  GetEventPhotosUseCase,
  GetEventWithoutAuthUseCase,
];
