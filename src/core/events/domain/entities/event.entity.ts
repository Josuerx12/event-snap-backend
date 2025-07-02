import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EntityAbstract } from '../../../../@shared/domain/abstract/entity.abstract';
import { User } from '../../../user/domain/entities/user.entity';
import { Photo } from '../../../photos/domain/entities/photo.entity';

@Entity({ name: 'events' })
export class Event extends EntityAbstract {
  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'event_date' })
  eventDate: Date;

  @Column({ name: 'public_token' })
  publicToken: string;

  @ManyToOne(() => User, (u) => u.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Photo, (p) => p.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  photos: Photo[];
}
