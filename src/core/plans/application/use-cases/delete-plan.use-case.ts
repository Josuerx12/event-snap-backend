import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { Plan } from '../../domain/entities/plan.entity';
import { NotFoundException } from '@nestjs/common';
import { ByIdDTO } from '../../domain/dto/by-id.dto';

export class DeletePlanUseCase implements IUseCase<ByIdDTO, void> {
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async execute(input: ByIdDTO): Promise<void> {
    const plan = await this.repository.findOneBy({
      id: input.id,
    });

    if (!plan) {
      throw new NotFoundException('Plano com o id informado não encontrado.');
    }

    await this.repository.remove(plan);
  }
}
