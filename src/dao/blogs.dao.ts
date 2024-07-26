import { apiPath } from "../types/api.ts";
import { RestApi } from "./restApi.ts";

export async function blogDetailsLoader({
  params,
}: {
  request: Request;
  params: Record<string, unknown>;
}) {
  const id = params.id as string;
  const apiService = new RestApi();
  return apiService.get({ queryKey: ['blogDetails', id] }, `${apiPath.blogsPath}/${id}`)
}

export function blogsListLoader() {
  const apiService = new RestApi();
  return apiService.get({ queryKey: ['blogsList'] }, `${apiPath.blogsPath}`)
}
