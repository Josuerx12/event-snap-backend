import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './@shared/application/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getStatus() {
    return this.appService.getStatus();
  }
}
