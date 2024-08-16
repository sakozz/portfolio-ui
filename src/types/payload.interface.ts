export type PayloadJSON = Record<string, unknown>;

export interface ArrayPayloadJSON {
  items: ResourceJSON[];
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

export type SuccessCode = "submission_success";

export interface SuccessJSON {
  code: string;
  type: SuccessCode;
  title: string;
  detail: Record<string, string>;
}

export type ApiError = {
  message: string; // Generic error message
  status: number; // Error status i.e 401, 422
  error: "validation_error"; // Error code i.e "validation_error"
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
