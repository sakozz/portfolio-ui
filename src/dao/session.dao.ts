import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { Toast } from '../components/toast-messages/toast-messages.tsx';
import store from '../store/store.ts';
import { uiActions } from '../store/ui.store.ts';
import { apiPath } from '../types/api.ts';
import Cookies from 'js-cookie';
import { loadProfile } from './users.dao.ts';
import { profileConfigs } from '../profile-configs.ts';
import { fetchQuery } from './restApi.ts';
import { profileActions } from '../store/profile.store.ts';

export const hasSessionCookie = (): boolean => {
  return !!Cookies.get(profileConfigs.accessTokenCookieName);
};

export const clearCookie = () => {
  Cookies.remove(profileConfigs.accessTokenCookieName);
};

export async function SsoLoginLoader() {
  const profile = await loadProfile('own');

  let loginMessage: Toast = new Toast('Welcome !', 'Logged in Successfully.', 'success');

  if (profile instanceof AxiosError) {
    loginMessage = new Toast('Failed to login', 'Sorry, Failed to log you in', 'error');
  }
  store.dispatch(
    uiActions.addToast({
      toast: loginMessage,
    }),
  );

  store.dispatch(
    profileActions.setProfile({
      currentProfile: profile,
    }),
  );
  return redirect('/');
}

export async function LogoutUser() {
  return fetchQuery('POST', null, `${apiPath.authPath}/logout`);
}
