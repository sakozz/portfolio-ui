import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import { AppQueryClient } from "../app.routes.tsx";
import { Toast } from "../components/toast-messages/toast-messages.tsx";
import store from "../store/store.ts";
import { uiActions } from "../store/ui.store.ts";

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
    return handleApiError(err as AxiosError);
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

const handleApiError = (error: AxiosError) => {
  const { status } = error.response;
  if ([401, 403, 500].includes(status)) {
    let toast: Toast = new Toast("Sorry, Error has occurred", "", "error");
    // Flash error message
    switch (status) {
      case 401:
        toast = new Toast(
          "Unauthorized Error",
          "Invalid or Expired session. Please login.",
          "error",
        );
        store.dispatch(uiActions.addToast({ toast: toast }));
        return redirect("/auth");
      case 403:
        toast = new Toast(
          "Forbidden Error",
          "Access to record or content is not allowed",
          "error",
        );
        break;
      default:
        toast.title = "Server Error";
        break;
    }
    store.dispatch(uiActions.addToast({ toast: toast }));
    return error.response;
  } else {
    throw error;
  }
};
