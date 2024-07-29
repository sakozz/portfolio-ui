import { AttributeDescriptor } from "../dao/decorators.ts";
import { ResourceJSON } from "../types/payload.interface.ts";

export class BaseResource<AttrType = unknown> {
  attributeDescriptors: Record<string, AttributeDescriptor>;

  static defineAttribute(key: string, descriptor: unknown) {
    if (!Reflect.has(this, "attributeDescriptors")) {
      Reflect.defineProperty(this, "attributeDescriptors", {});
    }
    Reflect.defineProperty(this, key, descriptor);
  }

  constructor(payload: ResourceJSON<AttrType>) {
    this.deserialize(payload);
  }

  deserialize(payload: ResourceJSON<AttrType>) {
    const attrs = payload.attributes as Record<string, unknown>;
    for (const key in attrs) {
      if (Object.hasOwn(attrs, key)) {
        Reflect.defineProperty(this, key, { value: attrs[key] });
      }
    }
  }

}
