export default class User {
  id: number = null;
  username: string = null;
  email: string = null;
  firstName: string = null;
  lastName: string = null;
  role:  string = null;
  avatarUrl: string = null;

  constructor({
    id,
    username,
    email,
    firstName,
    lastName,
    role,
    avatarUrl,
  }: User) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.avatarUrl = avatarUrl;
  }
}
