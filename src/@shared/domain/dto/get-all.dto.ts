import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

type Props<FilterT> = {
  sort?: string;
  orderBy?: string;
  filter?: FilterT;
  perPage?: string;
  page?: string;
};

export class GetAllDTO<FilterT> {
  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  filter?: FilterT;

  constructor(props: Props<FilterT>) {
    this.sort = props.sort;
    this.orderBy = props.orderBy;
    this.page = props.page ? parseInt(props.page) : 1;
    this.perPage = props.perPage ? parseInt(props.perPage) : 15;
    this.filter = props.filter;
  }
}
