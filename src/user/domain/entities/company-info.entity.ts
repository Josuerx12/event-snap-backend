import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { EntityAbstract } from '../../../@shared/arq/abstract/entity.abstract';

@Entity({
  name: 'company_infos',
})
export class CompanyInfo extends EntityAbstract {
  @Column({ unique: true })
  cnpj: string;

  @Column({ name: 'company_name', nullable: true })
  companyName?: string;

  @OneToOne(() => User, (u) => u.personalInfo, {
    onDelete: 'CASCADE',
  })
  user: User;
}
