import { Injectable } from '@nestjs/common';
import { CreatePlanUseCase } from '../../core/plans/application/use-cases/create-plan.use-case';
import { UpdatePlanUseCase } from '../../core/plans/application/use-cases/update-plan.use-case';
import { CreatePlanDTO } from '../../core/plans/dto/create-plan.dto';
import { UpdatePlanDTO } from '../../core/plans/dto/update-plan.dto';
import { GetPlanByIdUseCase } from '../../core/plans/application/use-cases/get-by-id.use-case';
import { GetAllPlansUseCase } from '../../core/plans/application/use-cases/get-all-plans.use-case';
import { DeletePlanUseCase } from '../../core/plans/application/use-cases/delete-plan.use-case';
import { ByIdDTO } from '../../core/plans/dto/by-id.dto';
import { GetAllPlansDTO } from '../../core/plans/dto/get-all-plans.dto';

@Injectable()
export class PlanService {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly getPlanByIdUseCase: GetPlanByIdUseCase,
    private readonly getAllPlansUseCase: GetAllPlansUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
  ) {}

  create(createPlanDto: CreatePlanDTO) {
    return this.createPlanUseCase.execute(createPlanDto);
  }

  update(updatePlanDto: UpdatePlanDTO) {
    return this.updatePlanUseCase.execute(updatePlanDto);
  }

  findAll(data: GetAllPlansDTO) {
    return this.getAllPlansUseCase.execute(data);
  }

  findOne(data: ByIdDTO) {
    return this.getPlanByIdUseCase.execute(data);
  }

  delete(data: ByIdDTO) {
    return this.deletePlanUseCase.execute(data);
  }
}
