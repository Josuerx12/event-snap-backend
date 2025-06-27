export class PaginationOutput<OutputT> {
  items: OutputT[];
  perPage: number;
  page: number;
  totalPages: number;
  totalItems: number;
}
