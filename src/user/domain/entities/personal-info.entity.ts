import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { EntityAbstract } from '../../../@shared/arq/abstract/entity.abstract';

@Entity({
  name: 'personal_infos',
})
export class PersonalInfo extends EntityAbstract {
  @Column({ unique: true })
  cpf: string;

  @OneToOne(() => User, (u) => u.personalInfo, {
    onDelete: 'CASCADE',
  })
  user: User;
}
