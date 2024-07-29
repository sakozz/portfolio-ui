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
