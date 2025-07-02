import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetAllDTO } from '../../../../@shared/domain/dto/get-all.dto';

export class PlanFilterDTO {
  @IsString()
  @IsOptional()
  search: string;
}

export class GetAllPlansDTO extends GetAllDTO<PlanFilterDTO> {
  @ValidateNested()
  @Type(() => PlanFilterDTO)
  filter?: PlanFilterDTO;

  constructor(props: any) {
    super(props);
    this.filter = props?.filter;
  }
}
