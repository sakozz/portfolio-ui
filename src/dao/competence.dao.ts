import { apiPath } from '../types/api.ts';
import { callApi, httpMethod } from './restApi.ts';
import { SelectOption } from '../components/select-input.tsx';
import { QueryParams } from '../types/payload.interface.ts';

export class Competence {
  public type: string = 'competenceGroups';

  constructor(
    public id: number,
    public name: string,
  ) {}
}

export async function fetchCompetences(params?: QueryParams, signal?: AbortSignal) {
  return await callApi('GET', `${apiPath.competencesPath}`, signal, null, params);
}

export function asSelectOptions(competences: Competence[]): SelectOption[] {
  return competences?.map((item) => {
    return {
      label: item?.name,
      value: { competenceId: item?.id, level: 0 },
    };
  });
}

export async function saveCompetence(payload: Competence, signal?: AbortSignal) {
  let path = `${apiPath.competencesPath}/`;
  let method: httpMethod = 'POST';
  if (payload.id) {
    path = path.concat('/', payload.id.toString());
    method = 'PUT';
  }
  return await callApi(method, path, signal, payload);
}
