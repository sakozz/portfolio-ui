import { AxiosError, AxiosResponse } from "axios";
import { apiPath } from "../types/api.ts";
import {
  ArrayPayloadJSON,
  PayloadJSON,
  ResourceJSON,
} from "../types/payload.interface.ts";
import { RestApi } from "./restApi.ts";
export class Blog {
  type: string = "blogs";
  id: string = null;
  title: string = null;
  body: string = null;
  authorId: string = null;
  excerpt: string = null;
  updatedAt: string = null;
  slug: string = null;
  constructor(payload: ResourceJSON<Blog>) {
    this.id = payload?.attributes?.id;
    this.title = payload?.attributes?.title;
    this.body = payload?.attributes?.body;
    this.authorId = payload?.attributes?.authorId;
    this.excerpt = payload?.attributes?.excerpt;
    this.updatedAt = payload?.attributes?.updatedAt;
    this.slug = payload?.attributes?.slug;
  }
}

export async function blogDetailsLoader({
  params,
}: {
  request: Request;
  params: Record<string, unknown>;
}) {
  const id = params.id as string;
  const restApi = new RestApi();
  if (id == "new") {
    return new Blog(undefined);
  }
  const result = await restApi.get(
    { queryKey: ["blogDetails", id] },
    `${apiPath.blogsPath}/${id}`,
  );

  if (result instanceof AxiosError) {
    return result;
  }

  const payload = result.data as PayloadJSON<Blog>;
  return new Blog(payload.data as Blog);
}

export async function blogsListLoader() {
  const restApi = new RestApi();
  const result = await restApi.get(
    { queryKey: ["blogsList"] },
    `${apiPath.blogsPath}`,
  );

  if (result instanceof AxiosError) {
    return result;
  }
  const payload = result.data as ArrayPayloadJSON<Blog>;
  return payload.data.map((item) => {
    return new Blog(item);
  });
}

export async function saveBlog(
  payload: unknown,
  id?: string,
): Promise<Blog | AxiosError> {
  const data: PayloadJSON = {
    data: {
      type: "blogs",
      attributes: payload,
    },
  };
  const restApi = new RestApi();
  let result: AxiosResponse<Blog> | AxiosError;
  if (id) {
    result = await restApi.put(`${apiPath.blogsPath}/${id}`, data);
  } else {
    result = await restApi.post(`${apiPath.blogsPath}`, data);
  }

  if (result instanceof AxiosError) {
    return result;
  }
  return new Blog(result.data as ResourceJSON<Blog>);
}

