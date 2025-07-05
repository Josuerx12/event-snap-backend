import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityAbstract } from '../../../../@shared/domain/abstract/entity.abstract';
import { Event } from '../../../events/domain/entities/event.entity';

@Entity({ name: 'photos' })
export class Photo extends EntityAbstract {
  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'upload_by', nullable: true })
  uploadBy?: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  message?: string;

  @Column({ name: 'size_in_mb' })
  sizeInMb: number;

  @ManyToOne(() => Event, (e) => e.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
