import { Column, Entity } from 'typeorm';
import { EntityAbstract } from '../../../@shared/domain/abstract/entity.abstract';

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
}
