import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDTO } from './create-plan.dto';
import { IsOptional } from 'class-validator';

export class UpdatePlanDTO extends PartialType(CreatePlanDTO) {
  @IsOptional()
  id: string;
}
