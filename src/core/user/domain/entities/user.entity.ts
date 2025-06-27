import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PersonalInfo } from './personal-info.entity';
import { CompanyInfo } from './company-info.entity';
import { AccountType } from '../enums/account-type.enum';
import { EntityAbstract } from '../../../../@shared/domain/abstract/entity.abstract';

@Entity({
  name: 'users',
})
export class User extends EntityAbstract {
  @Column({ nullable: true, name: 'personal_info_id' })
  personalInfoId: string;

  @Column({ nullable: true, name: 'company_info_id' })
  companyInfoId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: AccountType, name: 'account_type' })
  accountType: AccountType;

  @OneToOne(() => PersonalInfo, (pi) => pi.user, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'personal_info_id' })
  personalInfo: PersonalInfo;

  @OneToOne(() => CompanyInfo, (ci) => ci.user, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'company_info_id' })
  companyInfo: CompanyInfo;
}
