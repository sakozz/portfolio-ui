import { apiPath } from "../types/api.ts";
import { callApi } from "./restApi.ts";

export interface ExperienceType {}

export class Experience {
  public type: string = "experiences";

  constructor(
    public id: number,
    public jobTitle: string,
    public responsibilities: string,
    public companyName: string,
    public link: string,
    public startDate: string,
    public endDate: string,
    public isCurrent: boolean,
  ) {}
}

export async function fetchProfileExperiences(
  profileId: number,
  signal: AbortSignal,
) {
  return await callApi(
    "GET",
    `${apiPath.profilesPath}/${profileId}/experiences`,
    signal,
  );
}

export async function saveExperience(
  profileId: number,
  payload: unknown,
  signal?: AbortSignal,
) {
  return await callApi(
    "GET",
    `${apiPath.profilesPath}/${profileId}/experiences`,
    signal,
    payload,
  );
}
