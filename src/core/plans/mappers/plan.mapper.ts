import { Currency } from '../../../@shared/domain/currency';
import { PlanOutput } from '../application/shared/output/plan.output';
import { Plan } from '../domain/plan.entity';

export class PlanMapper {
  static toOutput(plan: Plan): PlanOutput {
    return {
      id: plan.id,
      name: plan.name,
      events: plan.events,
      photoLimit: plan.phoneLimit,
      storageLimitMb: plan.storageLimitMb,
      price: Currency.toReais(plan.price),
      duration: plan.durationDays,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  }
}
