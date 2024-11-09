import { apiPath } from '../types/api.ts';
import { callApi, httpMethod } from './restApi.ts';

export class Project {
  public type: string = 'experiences';

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public companyName: string,
    public link: string,
    public startDate: string,
    public endDate: string,
    public isCurrent: boolean,
  ) {}
}

export async function fetchProjects(profileId: number, signal: AbortSignal) {
  return await callApi('GET', `${apiPath.profilesPath}/${profileId}/projects`, signal);
}

export async function saveProject(profileId: number, payload: Project, signal?: AbortSignal) {
  let path = `${apiPath.profilesPath}/${profileId}/projects`;
  let method: httpMethod = 'POST';
  if (payload.id) {
    path = path.concat('/', payload.id.toString());
    method = 'PUT';
  }
  return await callApi(method, path, signal, payload);
}
