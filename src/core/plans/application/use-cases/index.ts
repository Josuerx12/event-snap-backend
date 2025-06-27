import { CreatePlanUseCase } from './create-plan.use-case';
import { DeletePlanUseCase } from './delete-plan.use-case';
import { GetAllPlansUseCase } from './get-all-plans.use-case';
import { GetPlanByIdUseCase } from './get-by-id.use-case';
import { UpdatePlanUseCase } from './update-plan.use-case';

export const planUseCases = [
  CreatePlanUseCase,
  UpdatePlanUseCase,
  GetPlanByIdUseCase,
  GetAllPlansUseCase,
  DeletePlanUseCase,
];
