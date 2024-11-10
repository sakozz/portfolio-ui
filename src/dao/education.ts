import { apiPath } from '../types/api.ts';
import { callApi, httpMethod } from './restApi.ts';

export class Education {
  public type: string = 'experiences';

  constructor(
    public id: number,
    public degreeProgram: string,
    public university: string,
    public link: string,
    public startDate: Date,
    public endDate: Date,
    public isCurrent: boolean,
  ) {}
}

export async function fetchEducation(profileId: number, signal: AbortSignal) {
  return await callApi('GET', `${apiPath.profilesPath}/${profileId}/education`, signal);
}

export async function saveEducation(profileId: number, payload: Education, signal?: AbortSignal) {
  let path = `${apiPath.profilesPath}/${profileId}/education`;
  let method: httpMethod = 'POST';
  if (payload.id) {
    path = path.concat('/', payload.id.toString());
    method = 'PUT';
  }
  return await callApi(method, path, signal, payload);
}
