import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { Toast } from '../components/toast-messages/toast-messages.tsx';
import store from '../store/store.ts';
import { uiActions } from '../store/ui.store.ts';
import { apiPath } from '../types/api.ts';
import Cookies from 'js-cookie';
import { loadCurrentProfile } from './users.dao.ts';
import { profileConfigs } from '../profile-configs.ts';
import { fetchQuery } from './restApi.ts';

export const hasSessionCookie = (): boolean => {
  return !!Cookies.get(profileConfigs.accessTokenCookieName);
};

export const clearCookie = () => {
  Cookies.remove(profileConfigs.accessTokenCookieName);
};

export async function SsoLoginLoader() {
  const result = await loadCurrentProfile('own');

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

export async function LogoutUser() {
  return fetchQuery('POST', null, `${apiPath.authPath}/logout`);
}
