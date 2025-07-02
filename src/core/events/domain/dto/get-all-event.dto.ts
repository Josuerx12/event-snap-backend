import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { GetAllDTO } from '../../../../@shared/domain/dto/get-all.dto';
import { Type } from 'class-transformer';

export class EventFilterDTO {
  @IsOptional()
  @IsString()
  search: string;
}

export class GetAllEventDTO extends GetAllDTO<EventFilterDTO> {
  @ValidateNested()
  @Type(() => EventFilterDTO)
  filter?: EventFilterDTO;

  constructor(props: any) {
    super(props);
    this.filter = props?.filter;
  }
}
