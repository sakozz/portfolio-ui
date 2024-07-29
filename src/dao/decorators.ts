export type RelationshipSaveOptions =
  | boolean
  | "idOnly"
  | "idIfExists"
  | string[];

export interface AttributeOptions {
  save?: RelationshipSaveOptions;
  path?: string;
  value?: unknown;
  typeForwardRef?: () => unknown;
}

export class AttributeDescriptor {
  type: unknown;
  save: boolean;

  constructor(options: AttributeOptions, reflectType: unknown) {
    this.type = reflectType;
    this.save = true;
    Object.assign(this, options);
  }
}

/**
 * Decorator for attributes
 */
export function Attribute(options?: AttributeOptions) {
  return (target: any, key: string) => {
    target.constructor.defineAttribute(key,options);
  };
}
