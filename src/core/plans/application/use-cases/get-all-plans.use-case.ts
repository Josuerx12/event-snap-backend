import { Repository } from 'typeorm';
import { PaginationOutput } from '../../../../@shared/domain/dto/pagination.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { GetAllPlansDTO } from '../../dto/get-all-plans.dto';
import { PlanOutput } from '../shared/output/plan.output';
import { Plan } from '../../domain/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanMapper } from '../../mappers/plan.mapper';

export class GetAllPlansUseCase
  implements IUseCase<GetAllPlansDTO, PaginationOutput<PlanOutput>>
{
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async execute(input: GetAllPlansDTO): Promise<PaginationOutput<PlanOutput>> {
    const [plans, count] = await this.repository.findAndCount({
      ...(input.filter?.search && { where: { name: input.filter.search } }),
      take: input.perPage,
      skip: (input.page - 1) * input.perPage,
    });

    const totalPages = Math.ceil(count / input.perPage);

    return {
      items: plans?.map((p) => PlanMapper.toOutput(p)),
      page: input.page,
      perPage: input.perPage,
      totalItems: count,
      totalPages,
    };
  }
}
