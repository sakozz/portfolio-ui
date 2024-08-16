import { AxiosError } from "axios";
import { redirect } from "react-router-dom";
import { Toast } from "../components/toast-messages/toast-messages.tsx";
import store from "../store/store.ts";
import { uiActions } from "../store/ui.store.ts";
import { apiPath } from "../types/api.ts";
import Cookies from "js-cookie";
import { RestApi } from "./restApi.ts";
import User from "./users.dao.ts";

export class Session {
  accessTokenCookieName: string = "profile_cookie";
  restApi = new RestApi();

  constructor() {}

  async loadSessionUser(): Promise<{ session: Session; user: User }> {
    const url = `${apiPath.profilesPath}/own`;
    const result = await this.restApi.get({ queryKey: ["ownProfile"] }, url);
    if (result instanceof AxiosError) {
      throw result;
    }
    return { session: this, user: result.data as User };
  }
}

export const ClearCookie = () => {
  const session = new Session();
  Cookies.remove(session.accessTokenCookieName);
};

export async function SsoLoginLoader() {
  const session = new Session();
  const result = await session.loadSessionUser();

  let loginMessage: Toast = new Toast(
    "Welcome !",
    "Logged in Successfully.",
    "success",
  );

  if (result instanceof AxiosError) {
    loginMessage = new Toast(
      "Failed to login",
      "Sorry, Failed to log you in",
      "error",
    );
  }
  store.dispatch(
    uiActions.addToast({
      toast: loginMessage,
    }),
  );
  return redirect("/");
}

export async function LoadSession() {
  const session = new Session();
  return session.loadSessionUser();
}

export async function LogoutUser() {
  const apiService = new RestApi();
  return apiService.post(`${apiPath.authPath}/logout`);
}
