import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';

import { PlanService } from './plan.service';
import { IsPublic } from '../../@shared/application/decorators/is-public.decorator';
import { ByIdDTO } from '../../@shared/domain/dto/by-id.dto';
import { CreatePlanDTO } from '../../core/plans/domain/dto/create-plan.dto';
import { GetAllPlansDTO } from '../../core/plans/domain/dto/get-all-plans.dto';
import { UpdatePlanDTO } from '../../core/plans/domain/dto/update-plan.dto';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}
  @Post()
  create(@Body() createPlanDto: CreatePlanDTO) {
    return this.planService.create(createPlanDto);
  }

  @IsPublic()
  @Get()
  findAll(@Query() query: GetAllPlansDTO) {
    return this.planService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() param: ByIdDTO) {
    return this.planService.findOne(param);
  }

  @Put(':id')
  update(@Param() param: ByIdDTO, @Body() updatePlanDto: UpdatePlanDTO) {
    updatePlanDto.id = param.id;
    return this.planService.update(updatePlanDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() data: ByIdDTO) {
    return this.planService.delete(data);
  }
}
