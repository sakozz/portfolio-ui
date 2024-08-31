export default class Profile {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public description: string,
    public dateOfBirth: string,
    public address: string,
    public phone: string,
    public nationality: string,
    public role: string,
    public avatarUrl: string,
    public linkedInUrl: string,
    public stackoverflowUrl: string,
    public githubUrl: string,
  ) {}
}
