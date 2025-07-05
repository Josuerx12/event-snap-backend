import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { EntityAbstract } from '../../../../@shared/domain/abstract/entity.abstract';
import { SubscriptionStatusEnum } from '../enums/subscription-status.enum';
import { User } from '../../../user/domain/entities/user.entity';
import { Plan } from '../../../plans/domain/entities/plan.entity';

@Entity({ name: 'subscriptions' })
export class Subscription extends EntityAbstract {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'plan_id' })
  planId: string;

  @Column({ name: 'mp_subscription_id', nullable: true })
  mpSubscriptionId?: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ type: 'enum', enum: SubscriptionStatusEnum })
  status: SubscriptionStatusEnum;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Plan, (p) => p.subscriptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;
}
