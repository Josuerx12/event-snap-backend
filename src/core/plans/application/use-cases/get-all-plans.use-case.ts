import { Repository } from 'typeorm';
import { PaginationOutput } from '../../../../@shared/domain/dto/pagination.dto';
import { IUseCase } from '../../../../@shared/domain/interface/use-case.interface';
import { PlanOutput } from '../shared/output/plan.output';
import { Plan } from '../../domain/entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanMapper } from '../../mappers/plan.mapper';
import { GetAllPlansDTO } from '../../domain/dto/get-all-plans.dto';

export class GetAllPlansUseCase
  implements IUseCase<GetAllPlansDTO, PaginationOutput<PlanOutput>>
{
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async execute(input: GetAllPlansDTO): Promise<PaginationOutput<PlanOutput>> {
    const whereConditions: any = {};

    if (input.filter?.search) {
      whereConditions.name = input.filter.search;
    }

    const [plans, count] = await this.repository.findAndCount({
      where: whereConditions,
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
