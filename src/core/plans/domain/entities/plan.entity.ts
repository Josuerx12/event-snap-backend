import { Column, Entity, OneToMany } from 'typeorm';
import { EntityAbstract } from '../../../../@shared/domain/abstract/entity.abstract';
import { Subscription } from '../../../subscription/domain/entities/subscription.entity';

@Entity({ name: 'plans' })
export class Plan extends EntityAbstract {
  @Column()
  name: string;

  @Column({ name: 'phone_limit', type: 'int4' })
  phoneLimit: number;

  @Column({ name: 'storage_limit_mb', type: 'int4' })
  storageLimitMb: number;

  @Column({ type: 'int4' })
  events: number;

  @Column({ type: 'int4' })
  price: number;

  @Column({ name: 'duration_days', type: 'int4' })
  durationDays: number;

  @OneToMany(() => Subscription, (s) => s.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subscriptions: Subscription[];
}
