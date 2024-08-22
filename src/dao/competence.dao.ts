import { apiPath } from '../types/api.ts';
import { callApi, httpMethod, RestApi } from './restApi.ts';
import { SelectOption } from '../components/select-input.tsx';

export interface groupCompetence {
  id: number;
  level: number;
  competenceId: number;
  competencesName: string;
}

export class Competence {
  public type: string = 'competenceGroups';

  constructor(
    public id: number,
    public name: string,
    public description: string,
  ) {}
}

export async function fetchCompetences(params?: Record<string, unknown>) {
  const restApi = new RestApi();
  console.log(params);
  return await restApi.get({ queryKey: [params] }, `${apiPath.competencesPath}`);
}

export function asSelectOptions(competences: Competence[]): SelectOption[] {
  return competences.map((item) => {
    return {
      label: item.name,
      value: { competenceId: item.id, level: 0 },
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
