import { apiPath } from '../types/api.ts';
import { callApi, httpMethod } from './restApi.ts';

export interface ExperienceType {}

export class Experience {
  public type: string = 'experiences';

  constructor(
    public id: number,
    public profileId: number,
    public jobTitle: string,
    public responsibilities: string,
    public companyName: string,
    public link: string,
    public startDate: Date,
    public endDate: Date,
    public isCurrent: boolean,
  ) {}
}

export async function fetchProfileExperiences(profileId: number, signal: AbortSignal) {
  return await callApi('GET', `${apiPath.profilesPath}/${profileId}/experiences`, signal);
}

export async function saveExperience(profileId: number, payload: Experience, signal?: AbortSignal) {
  let path = `${apiPath.profilesPath}/${profileId}/experiences`;
  let method: httpMethod = 'POST';
  if (payload.id) {
    path = path.concat('/', payload.id.toString());
    method = 'PUT';
  }
  return await callApi(method, path, signal, payload);
}
