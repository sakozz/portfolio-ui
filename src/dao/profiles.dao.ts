import { Params, redirect } from 'react-router-dom';
import { apiPath } from '../types/api.ts';
import { AxiosError } from 'axios';
import { RestApi } from './restApi.ts';

export async function profileLoader(params: Params) {
  const username = params?.id;
  const restApi = new RestApi();

  if (!username) {
    return redirect(`/`);
  }

  const url = `${apiPath.profilesPath}/${username}`;
  const result = await restApi.get({ queryKey: ['profiles', username] }, url);
  if (result instanceof AxiosError) {
    //return redirect(`/auth`);
  }

  return result;
}
