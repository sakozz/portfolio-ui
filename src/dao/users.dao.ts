import { apiPath } from '../types/api.ts';
import { AxiosError } from 'axios';
import store from '../store/store.ts';
import { profileActions } from '../store/profile.store.ts';
import { Params } from 'react-router-dom';
import { callApi, fetchQuery } from './restApi.ts';

export default class Profile {
  constructor(
    public id: number,
    public userId: number,
    public username: string,
    public jobTitle: string,
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

export const loadProfile = async (username: string): Promise<Profile> => {
  const url = `${apiPath.profilesPath}/${username}`;
  const result = await fetchQuery('GET', { queryKey: ['profiles', username] }, url);
  if (result instanceof AxiosError) {
    throw result;
  }
  return result.data as Profile;
};

export const currentProfileLoader = async (params: Params) => {
  const username = params['id'];
  const profile = await loadProfile(username);
  store.dispatch(
    profileActions.setProfile({
      currentProfile: profile,
    }),
  );
  return profile;
};

export async function saveProfile(payload: Profile, signal?: AbortSignal) {
  return await callApi('PUT', `${apiPath.profilesPath}/${payload.username}`, signal, payload);
}
