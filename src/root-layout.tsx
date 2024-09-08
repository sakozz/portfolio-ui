import { useIsFetching } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ToastMessages from './components/toast-messages/toast-messages.tsx';
import { hasSessionCookie } from './dao/session.dao.ts';
import { sessionActions } from './store/session.store.ts';
import { loadProfile } from './dao/users.dao.ts';
import { profileConfigs } from './profile-configs.ts';
import { Footer } from './components/footer.tsx';

function RootLayout() {
  const dispatch = useDispatch();
  const isFetching = useIsFetching();

  useEffect(() => {
    const isAuthenticated = hasSessionCookie();
    const username = isAuthenticated ? 'own' : profileConfigs.defaultProfileUsername;
    loadProfile(username)
      .then((profile) => {
        dispatch(
          sessionActions.setSession({ authenticated: isAuthenticated, currentProfile: profile }),
        );
      })
      .catch((err) => {
        console.log('Error loading session:', err);
      });
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full">
      {isFetching > 0 && <div className="absolute top-0 h-1 w-full progress-bar"></div>}
      <div id={'modal'}></div>
      <ToastMessages></ToastMessages>
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default RootLayout;
