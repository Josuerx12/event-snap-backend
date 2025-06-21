import { CompanyInfo } from '../entities/company-info.entity';
import { CompanyInfoOutput } from '../../application/outputs/company-info.output';

export class CompanyInfoMapper {
  static toOutput(companyInfo: CompanyInfo): CompanyInfoOutput {
    return {
      id: companyInfo.id,
      cnpj: companyInfo.cnpj,
      companyName: companyInfo.companyName,
    };
  }
}
