import { RestApi } from './restApi.ts';
import { apiPath } from '../types/api.ts';
import { AxiosError } from 'axios';

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

export const loadCurrentProfile = async (username: string): Promise<Profile> => {
  const restApi = new RestApi();
  const url = `${apiPath.profilesPath}/${username}`;
  const result = await restApi.get({ queryKey: ['currentProfile'] }, url);
  if (result instanceof AxiosError) {
    throw result;
  }

  return result.data as Profile;
};
