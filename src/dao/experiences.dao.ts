import { apiPath } from "../types/api.ts";
import { callApi } from "./restApi.ts";

export type ExperienceType = {
  id: number;
  jobTitle: string;
  responsibilities: string;
  companyName: string;
  link: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

export class Experience {
  public type: string = "experiences";

  constructor(attrs: Partial<ExperienceType>) {
    Object.assign(this, attrs);
  }
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
