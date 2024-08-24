import { apiPath } from '../types/api.ts';
import { callApi, httpMethod } from './restApi.ts';
import { GroupCompetence } from './group-competence.dao.ts';

export interface groupCompetence {
  id: number;
  level: number;
  competenceId: number;
  competencesName: string;
}

export class CompetenceGroup {
  public type: string = 'competenceGroups';

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public competences: GroupCompetence[],
  ) {}
}

export async function fetchProfileCompetenceGroups(profileId: number, signal: AbortSignal) {
  return await callApi('GET', `${apiPath.profilesPath}/${profileId}/competence-groups`, signal);
}

export async function saveCompetenceGroup(
  profileId: number,
  payload: CompetenceGroup,
  signal?: AbortSignal,
) {
  let path = `${apiPath.profilesPath}/${profileId}/competence-groups`;
  let method: httpMethod = 'POST';
  if (payload.id) {
    path = path.concat('/', payload.id.toString());
    method = 'PUT';
  }
  return await callApi(method, path, signal, payload);
}
