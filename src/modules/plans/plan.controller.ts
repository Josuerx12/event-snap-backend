import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePlanDTO } from '../../core/plans/dto/create-plan.dto';
import { UpdatePlanDTO } from '../../core/plans/dto/update-plan.dto';
import { ByIdDTO } from '../../core/plans/dto/by-id.dto';
import { GetAllPlansDTO } from '../../core/plans/dto/get-all-plans.dto';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}
  @Post()
  create(@Body() createPlanDto: CreatePlanDTO) {
    return this.planService.create(createPlanDto);
  }

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
  delete(@Param() data: ByIdDTO) {
    return this.planService.delete(data);
  }
}
