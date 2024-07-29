import { ResourceJSON } from "../types/payload.interface.ts";

export default class User {
  id: string = null;
  username: string = null;
  email: string = null;
  firstName: string = null;
  lastName: string = null;
  role: string = null;
  avatarUrl: string = null;

  constructor(payload: ResourceJSON<User>) {
    this.id = payload.attributes.id;
    this.username = payload.attributes.username;
    this.email = payload.attributes.email;
    this.firstName = payload.attributes.firstName;
    this.lastName = payload.attributes.lastName;
    this.role = payload.attributes.role;
    this.avatarUrl = payload.attributes.avatarUrl;
  }
}
