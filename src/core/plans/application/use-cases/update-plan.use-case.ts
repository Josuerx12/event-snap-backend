import { Repository } from 'typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { UpdatePlanDTO } from '../../dto/update-plan.dto';
import { PlanOutput } from '../shared/output/plan.output';
import { Plan } from '../../domain/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Currency } from '../../../../@shared/domain/currency';
import { PlanMapper } from '../../mappers/plan.mapper';

export class UpdatePlanUseCase implements IUseCase<UpdatePlanDTO, PlanOutput> {
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async execute(input: UpdatePlanDTO): Promise<PlanOutput> {
    const plan = await this.repository.findOneBy({ id: input.id });

    if (!plan) {
      throw new NotFoundException(
        'Não foi possivel encontrar o plano informado.',
      );
    }

    if (input.name) plan.name = input.name;
    if (input.events) plan.events = input.events;
    if (input.photoLimit) plan.phoneLimit = input.photoLimit;
    if (input.storageLimitMb) plan.storageLimitMb = input.storageLimitMb;
    if (input.price) plan.price = Currency.toCents(input.price);
    if (input.duration) plan.durationDays = input.duration;

    await this.repository.save(plan);

    return PlanMapper.toOutput(plan);
  }
}
