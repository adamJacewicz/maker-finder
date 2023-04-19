export type Credentials = {
  email: string;
  password: string;
};

export type PaginationPayload = {
  page: number
  perPage?: number
  searchTerm?: string | string[]
}