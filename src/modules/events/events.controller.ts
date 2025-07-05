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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDTO } from '../../core/events/domain/dto/create-event.dto';
import { UpdateEventDTO } from '../../core/events/domain/dto/update-event.dto';
import { GetAllEventDTO } from '../../core/events/domain/dto/get-all-event.dto';
import { ByIdDTO } from '../../@shared/domain/dto/by-id.dto';
import { EventService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateEventDTO,
  ) {
    data.file = file;
    return this.eventService.create(data);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo'))
  update(
    @Param() byId: ByIdDTO,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateEventDTO,
  ) {
    data.id = byId.id;
    data.file = file;
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
