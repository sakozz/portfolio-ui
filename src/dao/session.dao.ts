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
  token: string = "";
  expiresAt: Date = new Date();
  restApi         = new RestApi();

  constructor() {}

  async loadSessionUser(): Promise<{session: Session, user: User}> {
    const url = `${apiPath.userProfilePath}`;
    const result = await this.restApi.get({queryKey: ["profile"]}, url) as PayloadJSON<User>;
    return { session: this, user: new User(result.data.attributes) };
  }

  loadClientSession() {
    this.token = Cookies.get(this.accessTokenCookieName) || "";
    return this.loadSessionUser();
  }

  async ssoLogin() {
    const url = `${apiPath.authPath}/${this.provider}/callback?code=${this.code}&state=${this.state}`;
    const result = await this.restApi.get({queryKey:  ["session"], refetchOnWindowFocus: false}, url);
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
