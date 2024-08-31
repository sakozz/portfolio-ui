import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { Toast } from '../components/toast-messages/toast-messages.tsx';
import store from '../store/store.ts';
import { uiActions } from '../store/ui.store.ts';
import { apiPath } from '../types/api.ts';
import Cookies from 'js-cookie';
import { RestApi } from './restApi.ts';
import Profile from './users.dao.ts';
import { profileConfigs } from '../profile-configs.ts';
import { SessionState } from '../store/session.store.ts';

export class Session {
  accessTokenCookieName: string = 'profile_cookie';
  restApi = new RestApi();

  hasSessionCookie(): boolean {
    return !!Cookies.get(this.accessTokenCookieName);
  }

  constructor() {}

  async loadCurrentProfile(): Promise<SessionState> {
    let url = `${apiPath.profilesPath}/`;
    const isAuthenticated = this.hasSessionCookie();
    url += isAuthenticated ? 'own' : profileConfigs.defaultProfileUsername;
    const result = await this.restApi.get({ queryKey: ['currentProfile'] }, url);
    if (result instanceof AxiosError) {
      throw result;
    }
    return {
      currentSession: this,
      currentProfile: result.data as Profile,
      authenticated: isAuthenticated,
    };
  }
}

export const ClearCookie = () => {
  const session = new Session();
  Cookies.remove(session.accessTokenCookieName);
};

export async function SsoLoginLoader() {
  const session = new Session();
  const result = await session.loadCurrentProfile();

  let loginMessage: Toast = new Toast('Welcome !', 'Logged in Successfully.', 'success');

  if (result instanceof AxiosError) {
    loginMessage = new Toast('Failed to login', 'Sorry, Failed to log you in', 'error');
  }
  store.dispatch(
    uiActions.addToast({
      toast: loginMessage,
    }),
  );
  return redirect('/');
}

export async function LoadSession(): Promise<SessionState> {
  const session = new Session();
  return session.loadCurrentProfile();
}

export async function LogoutUser() {
  const apiService = new RestApi();
  return apiService.post(`${apiPath.authPath}/logout`);
}
