export interface MetaInterface {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface LinksInterface {
  first: string;
  prev: string;
  next: string;
  last: string;
}