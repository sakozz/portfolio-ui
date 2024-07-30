export interface PayloadJSON<AttrType = unknown> {
  data: ResourceJSON<AttrType>;
  errors?: undefined;
  meta?: undefined; // { count: 1, next: }
  included?: ResourceJSON[];
}

export interface ArrayPayloadJSON<AttrType = unknown> {
  data: ResourceJSON<AttrType>[];
  errors?: undefined;
  meta?: undefined;
  links?: undefined;
  included?: ResourceJSON[];
}
export interface ResourceJSON<AttrType = unknown> {
  type: string;
  id?: string;
  attributes?: AttrType;
  meta?: undefined;
  relationships?: Record<string, PayloadJSON | ArrayPayloadJSON>;
  included?: ResourceJSON[]; // This is filled by frontend, not part of JSONAPI spec
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
