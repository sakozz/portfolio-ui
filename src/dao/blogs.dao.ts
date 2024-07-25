import { defer, json } from "react-router-dom";
import { apiPath } from "../types/api.ts";
import { ApiService } from "./api.service.ts";

export async function blogDetailsLoader({
  params,
}: {
  request: Request;
  params: Record<string, unknown>;
}) {
  const id = params.id as string;

  return defer({
    blog: await loadBlogDetails(id),
  });
}

async function loadBlogDetails(id: string) {
  const response = await fetch("http://localhost:3000/pages/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      },
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadBlogsList() {
  const apiService = new ApiService();
  return apiService.get([], `${apiPath.blogsPath}`)
}

export function blogsListLoader() {
  return defer({
    blogs: loadBlogsList(),
  });
}
