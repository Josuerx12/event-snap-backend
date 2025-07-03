import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateEventDTO } from '../../core/events/domain/dto/create-event.dto';
import { UpdateEventDTO } from '../../core/events/domain/dto/update-event.dto';
import { GetAllEventDTO } from '../../core/events/domain/dto/get-all-event.dto';
import { ByIdDTO } from '../../@shared/domain/dto/by-id.dto';
import { EventService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() data: CreateEventDTO) {
    return this.eventService.create(data);
  }

  @Put(':id')
  update(@Param() byId: ByIdDTO, @Body() data: UpdateEventDTO) {
    data.id = byId.id;
    return this.eventService.update(data);
  }

  @Get('user')
  getUserEvents(@Query() query: GetAllEventDTO) {
    return this.eventService.getUserEvents(query);
  }

  @Get()
  getAll(@Query() query: GetAllEventDTO) {
    return this.eventService.getAll(query);
  }

  @Get(':id')
  getById(@Param() data: ByIdDTO) {
    return this.eventService.getById(data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() data: ByIdDTO) {
    return this.eventService.delete(data);
  }
}
