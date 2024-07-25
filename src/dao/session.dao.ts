import { apiPath } from "../types/api.ts";
import Cookies from "js-cookie";
import { ApiService } from "./api.service.ts";

export class Session {
  accessTokenCookieName: string = "EATERY_ACCESS_TOKEN";
  sessionExpiryStoreName: string = "EATERY_SESSION_EXPIRY";
  provider: string = "google";
  state: string = "";
  code: string = "";
  token: string = "";
  expiresAt: Date = new Date();
  apiService = new ApiService();

  constructor() {}

  async loadSessionUser() {
    const url = `${apiPath.userProfilePath}`;
    const result = await this.apiService.get(["profile"], url);
    return result.data;
  }

  loadClientSession() {
    this.token = Cookies.get(this.accessTokenCookieName) || "";
    return this.loadSessionUser();
  }

  async ssoLogin() {
    const url = `${apiPath.authPath}/${this.provider}/callback?code=${this.code}&state=${this.state}`;
    const result = await this.apiService.get(["profile"], url);
    this.setCookie(result.data);
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

export function SsoLoginLoader({ request }: { request: Request }) {
  const session = new Session();
  const params = new URL(request.url).searchParams;
  session.state = params.get("state") || "";
  session.code = params.get("code") || "";
  return session.ssoLogin();
}

export async function LoadSession() {
  const session = new Session();
  return session.loadClientSession();
}
