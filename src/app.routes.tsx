import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import { SsoLoginLoader } from './dao/session.dao.ts';
import Auth from './pages/public/auth/auth.tsx';
import LoginPage from './pages/public/auth/login.tsx';
import SSOCallback from './pages/public/auth/sso-callback.tsx';

import ErrorPage from './components/Error.tsx';
import RootLayout from './root-layout.tsx';
import Internal from './pages/int/internal.tsx';
import Overview from './pages/int/overview/overview.tsx';
import Profiles from './pages/int/profiles/profiles.tsx';
import ProfilesCollection from './pages/int/profiles/profiles-collection.tsx';
import Profile from './pages/int/profiles/profile.tsx';
import { profileLoader } from './dao/profiles.dao.ts';
import PublicPages from './pages/public/public.tsx';

export const AppQueryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <PublicPages />,
      },
      {
        path: ':id',
        element: <Profile />,
        loader: ({ params }) => profileLoader(params),
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: 'google/sso-callback',
            element: <SSOCallback />,
            loader: SsoLoginLoader,
          },
        ],
      },
      {
        path: 'int',
        element: <Internal />,
        children: [
          { index: true, element: <Overview /> },
          {
            path: 'profiles',
            element: <Profiles />,
            children: [
              { index: true, element: <ProfilesCollection /> },
              { path: ':id', element: <Profile /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
