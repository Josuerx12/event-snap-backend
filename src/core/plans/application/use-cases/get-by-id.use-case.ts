import { InjectRepository } from '@nestjs/typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { PlanOutput } from '../shared/output/plan.output';
import { Plan } from '../../domain/entities/plan.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PlanMapper } from '../../mappers/plan.mapper';
import { ByIdDTO } from '../../domain/dto/by-id.dto';

export class GetPlanByIdUseCase implements IUseCase<ByIdDTO, PlanOutput> {
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async execute(input: ByIdDTO): Promise<PlanOutput> {
    const plan = await this.repository.findOneBy({
      id: input.id,
    });

    if (!plan) {
      throw new NotFoundException('Plano com o id informado não encontrado.');
    }

    return PlanMapper.toOutput(plan);
  }
}
