import { Repository } from 'typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { CreatePlanDTO } from '../../dto/create-plan.dto';
import { PlanOutput } from '../shared/output/plan.output';
import { Plan } from '../../domain/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../../../../@shared/domain/currency';
import { PlanMapper } from '../../mappers/plan.mapper';
import { randomUUID } from 'crypto';

export class CreatePlanUseCase implements IUseCase<CreatePlanDTO, PlanOutput> {
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async execute(input: CreatePlanDTO): Promise<PlanOutput> {
    const plan = new Plan();

    plan.id = randomUUID();
    plan.name = input.name;
    plan.durationDays = input.duration;
    plan.events = input.events;
    plan.phoneLimit = input.photoLimit;
    plan.storageLimitMb = input.storageLimitMb;
    plan.price = Currency.toCents(input.price);

    await this.repository.save(plan);

    return PlanMapper.toOutput(plan);
  }
}
