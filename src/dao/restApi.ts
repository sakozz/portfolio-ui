import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AppQueryClient } from "../app.routes.tsx";
export type httpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const fetchQuery = async (
  method: httpMethod,
  queryOptions: UseQueryOptions,
  path: string,
  payload?: Record<string, unknown>,
) => {
  try {
    const res = await AppQueryClient.fetchQuery({
      ...queryOptions,
      queryFn: async ({ signal }) => callApi(method, path, signal, payload),
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

export const callApi = (
  method: httpMethod,
  path: string,
  signal: AbortSignal,
  payload?: unknown,
) => {
  const config: AxiosRequestConfig = {
    withCredentials: true,
    signal: signal,
  };
  switch (method) {
    case "GET":
      return axios.get(path, config);
    case "POST":
      return axios.post(path, payload, config);
    case "PUT":
      return axios.put(path, payload, config);
    case "PATCH":
      return axios.patch(path, payload, config);
    case "DELETE":
      return axios.delete(path, config);
    default:
      throw "Unknown method";
  }
};

export class RestApi {
  get(queryOptions: UseQueryOptions, path: string) {
    return fetchQuery("GET", queryOptions, path);
  }

  post(path: string, payload?: Record<string, unknown>) {
    return fetchQuery("POST", null, path, payload);
  }
}
