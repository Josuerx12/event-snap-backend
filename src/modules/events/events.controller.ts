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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDTO } from '../../core/events/domain/dto/create-event.dto';
import { UpdateEventDTO } from '../../core/events/domain/dto/update-event.dto';
import { GetAllEventDTO } from '../../core/events/domain/dto/get-all-event.dto';
import { EventService } from './events.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { EventByIdDTO } from '../../core/events/domain/dto/get-event-by-id.dto';
import { IsPublic } from '../../@shared/application/decorators/is-public.decorator';
import { AddEventPhotosDTO } from '../../core/events/domain/dto/add-event-photos.dto';
import { GetEventPhotosDTO } from '../../core/events/domain/dto/get-event-photos.dto';
import { GetEventWithoutAuthDTO } from '../../core/events/domain/dto/get-event-without-auth.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @IsPublic()
  @Post(':id/add-photos')
  @UseInterceptors(FilesInterceptor('photos'))
  @HttpCode(204)
  addPhotos(
    @Param() params: EventByIdDTO,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: AddEventPhotosDTO,
  ) {
    data.photos = files;
    data.id = params.id;

    return this.eventService.addPhotos(data);
  }

  @Get(':id/photos')
  getPhotos(@Param() params: EventByIdDTO, @Query() data: GetEventPhotosDTO) {
    data.id = params.id;
    return this.eventService.getPhotos(data);
  }

  @IsPublic()
  @Get(':id/:eventToken')
  getEventWithoutAuth(@Param() params: GetEventWithoutAuthDTO) {
    return this.eventService.getEventWithoutAuth(params);
  }

  @Post()
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
    @Param() byId: EventByIdDTO,
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
  getById(@Param() data: EventByIdDTO) {
    return this.eventService.getById(data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() data: EventByIdDTO) {
    return this.eventService.delete(data);
  }
}
