import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AppQueryClient } from "../app.routes.tsx";

const fetchQuery = async (
  method: string,
  queryOptions: UseQueryOptions,
  path: string,
) => {
  try {
    const res = await AppQueryClient.fetchQuery({
      ...queryOptions,
      queryFn: async ({ signal }) => callApi(method, path, signal),
    });
    const result = res as AxiosResponse;
    return result.data;
  } catch (err) {
    const error = err as AxiosError;
    if ([401, 403, 500].includes(error.response.status)) {
      // Flash error message
      console.log(error);
    }
    throw error;
  }
};

export const useGet = (options: UseQueryOptions, path: string) => {
  return useQuery({
    ...options,
    queryFn: async ({ signal }) => callApi("GET", path, signal),
  });
};

export const callApi = (method: string, path: string, signal: AbortSignal) => {
  return axios.get(path, {
    method: method,
    withCredentials: true,
    signal: signal,
  });
};


export class RestApi {
  get(queryOptions: UseQueryOptions, path: string) {
    return fetchQuery("GET", queryOptions, path);
  }
}

