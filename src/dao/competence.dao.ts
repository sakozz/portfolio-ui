import { apiPath } from '../types/api.ts';
import { callApi, httpMethod } from './restApi.ts';
import { SelectOption } from '../components/select-input.tsx';
import { ArrayPayloadJSON, QueryParams } from '../types/payload.interface.ts';
import { CompetenceGroup } from './competence-group.dao.ts';
import { AxiosError } from 'axios';

export class Competence {
  public type: string = 'competenceGroups';

  constructor(
    public id: number,
    public name: string,
    public description: string,
  ) {}
}

export async function fetchCompetences(params?: Record<string, unknown>, signal?: AbortSignal) {
  return await callApi('GET', `${apiPath.competencesPath}`, signal, params);
}

export async function fetchGroupCompetencesByIds(
  group: CompetenceGroup,
  signal?: AbortSignal,
): Promise<CompetenceGroup> {
  const competenceIds = group.competences.map((item) => item.competenceId);
  const params = new QueryParams({ filters: [{ attr: 'id', value: competenceIds, opt: 'in' }] });

  const result = await callApi('GET', `${apiPath.competencesPath}`, signal, null, params);

  if (result instanceof AxiosError) return group;
  group.competences.map((item) => {
    item.competencesName = result.data.items.find(
      (comp: Competence) => comp.id === item.competenceId,
    )?.name;
    return item;
  });
  return group;
}

export function asSelectOptions(payload: ArrayPayloadJSON<Competence>): SelectOption[] {
  return payload.items.map((item) => {
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
