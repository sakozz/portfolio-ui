import { AxiosError } from "axios";
import { redirect } from "react-router-dom";
import { Toast } from "../components/toast-messages/toast-messages.tsx";
import { sessionActions } from "../store/session.store.ts";
import store from "../store/store.ts";
import { uiActions } from "../store/ui.store.ts";
import { apiPath } from "../types/api.ts";
import Cookies from "js-cookie";
import { PayloadJSON } from "../types/payload.interface.ts";
import { RestApi } from "./restApi.ts";
import User from "./users.dao.ts";

export class Session {
  accessTokenCookieName: string = "EATERY_ACCESS_TOKEN";
  sessionExpiryStoreName: string = "EATERY_SESSION_EXPIRY";
  provider: string = "google";
  state: string = "";
  code: string = "";
  token: string = null;
  expiresAt: Date = new Date();
  restApi = new RestApi();

  constructor() {}

  async loadSessionUser(): Promise<{ session: Session; user: User }> {
    const url = `${apiPath.userProfilePath}`;
    const result = await this.restApi.get({ queryKey: ["profile"] }, url);
    if (result instanceof AxiosError) {
      throw result;
    }
    const user = result.data as PayloadJSON<User>;
    return { session: this, user: new User(user.data) };
  }

  loadCookie() {
    this.token = Cookies.get(this.accessTokenCookieName) || null;
    store.dispatch(sessionActions.setCookies({ cookie: this.token }));
  }

  async ssoLogin() {
    const url = `${apiPath.authPath}/${this.provider}/callback?code=${this.code}&state=${this.state}`;
    const result = await this.restApi.get(
      { queryKey: ["session"], refetchOnWindowFocus: false },
      url,
    );
    if (result instanceof AxiosError) {
      throw result;
    }

    this.setCookie(result.data);
    store.dispatch(
      uiActions.addToast({
        toast: new Toast("Welcome !", "Logged in Successfully.", "success"),
      }),
    );
    return redirect("/");
  }

  setCookie({
    accessToken,
    expiresAt,
  }: {
    accessToken: string;
    expiresAt: string;
  }) {
    this.expiresAt = new Date(expiresAt);
    Cookies.set(this.accessTokenCookieName, accessToken, {
      expires: this.expiresAt,
      sameSite: "lax",
      path: "/",
    });
    localStorage.setItem(
      this.sessionExpiryStoreName,
      this.expiresAt.toDateString(),
    );
  }
}

export const ClearCookie = () => {
  const session = new Session();
  Cookies.remove(session.accessTokenCookieName);
};

export function SsoLoginLoader({ request }: { request: Request }) {
  const session = new Session();
  const params = new URL(request.url).searchParams;
  session.state = params.get("state") || "";
  session.code = params.get("code") || "";
  return session.ssoLogin();
}

export async function LoadSession() {
  const session = new Session();
  return session.loadSessionUser();
}

export function loadCookie() {
  const session = new Session();
  session.loadCookie();
}

export async function LogoutUser() {
  const apiService = new RestApi();
  return apiService.post(`${apiPath.authPath}/logout`);
}
