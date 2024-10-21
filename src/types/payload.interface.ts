export type PayloadJSON = Record<string, unknown>;

export interface ArrayPayloadJSON<Type> {
  items: Type[];
  errors?: unknown;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  included?: ResourceJSON[];
}

export type ResourceJSON = Record<string, unknown>;

export type SuccessCode = 'submission_success';

export interface SuccessJSON {
  code: string;
  type: SuccessCode;
  title: string;
  detail: Record<string, string>;
}

export type ApiError = {
  message: string; // Generic error message
  status: number; // Error status i.e 401, 422
  error: 'validation_error'; // Error code i.e "validation_error"
  causes: Record<string, Record<string, unknown>[]>; // Reasons for errors
  /* Example of causes
  {
    Body: [
        {
          error: "min_length_required";
          expected: 100;
          provided: 65;
        },
     ];
    };
  */
};

export type Filter = {
  attr: string;
  value: unknown;
  opt?: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in'; // Operator for filtering i.e "eq", "neq" etc.
};

export class QueryParams {
  page: number;
  size: number;
  sort: string;
  filters: Filter[];

  constructor({
    page,
    size,
    sort,
    filters,
  }: {
    page?: number;
    size?: number;
    sort?: string;
    filters?: Filter[];
  }) {
    this.page = page || 1;
    this.size = size || 10;
    this.sort = sort;
    this.filters = filters;
  }
}
