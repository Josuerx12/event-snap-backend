import { GetAllDTO } from '../../../../@shared/domain/dto/get-all.dto';

export type PhotoFilter = string;

export class GetEventPhotosDTO extends GetAllDTO<PhotoFilter> {
  id: string;
}
