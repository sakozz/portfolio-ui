import { UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FieldPath, UseFormSetError } from "react-hook-form";
import { redirect } from "react-router-dom";
import { AppQueryClient } from "../app.routes.tsx";
import { Toast } from "../components/toast-messages/toast-messages.tsx";
import store from "../store/store.ts";
import { uiActions } from "../store/ui.store.ts";
import { ApiError } from "../types/payload.interface.ts";

export type httpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const fetchQuery = async (
  method: httpMethod,
  queryOptions: UseQueryOptions,
  path: string,
  payload?: unknown,
): Promise<AxiosResponse | AxiosError> => {
  try {
    const res = await AppQueryClient.fetchQuery({
      ...queryOptions,
      queryFn: async ({ signal }) => callApi(method, path, signal, payload),
    });
    return res as AxiosResponse;
  } catch (err) {
    return handleApiError(err as AxiosError);
  }
};

export const callApi = (
  method: httpMethod,
  path: string,
  signal: AbortSignal,
  payload?: unknown,
): Promise<AxiosResponse | AxiosError> => {
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

  post(path: string, payload?: unknown) {
    return fetchQuery("POST", null, path, payload);
  }

  put(path: string, payload?: unknown) {
    return fetchQuery("PUT", null, path, payload);
  }
}

const handleApiError = (error: AxiosError): AxiosError => {
  const { status } = error.response;
  if ([401, 422, 403, 500].includes(status)) {
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
        throw redirect("/auth");
      case 403:
        toast = new Toast(
          "Forbidden Error",
          "Access to record or content is not allowed",
          "error",
        );
        break;
      case 422:
        toast = new Toast(
          "Validation Error",
          "Please ensure all fields are filled in correctly",
          "error",
        );
        break;
      default:
        toast.title = "Server Error";
        break;
    }
    store.dispatch(uiActions.addToast({ toast: toast }));
  }
  return error;
};

export function setValidationErrors<TFieldValues>(
  setErrorFn: UseFormSetError<TFieldValues>,
  error: AxiosError,
) {
  const apiErrors: ApiError = error.response.data as ApiError;
  if (apiErrors.error != "validation_error") {
    return apiErrors;
  }

  setErrorFn("root", {
    message: apiErrors.message,
  });

  Object.keys(apiErrors.causes).forEach((key) => {
    const field = key.toLowerCase() as FieldPath<TFieldValues>;
    return setErrorFn(field, {
      message: apiErrors.causes[key].map((item) => item.error).join("/n"),
    });
  });
}
