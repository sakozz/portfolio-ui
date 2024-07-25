import axios, { AxiosResponse } from "axios";
import { AppQueryClient } from "../app.routes.tsx";

export class ApiService {
  get(queryKey: string[], path: string): Promise<AxiosResponse> {
    return this.fetchQuery('GET', queryKey, path);
  }

  fetchQuery(method: string, queryKeys: string[], path: string) {
    return  AppQueryClient.fetchQuery({
      queryKey: queryKeys,
      queryFn: async ({ signal }) => {
        return  axios.get(path, {
          method: method,
          withCredentials: true,
          signal: signal,
        }).then(res =>{
          return res;
        }).catch(error=>{
          // show flash errors
          console.log(error);
          AppQueryClient.invalidateQueries({queryKey: queryKeys});
          throw error;
        });
      },
    });
  }
}
