import { library } from '@fortawesome/fontawesome-svg-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import router, { AppQueryClient } from './app.routes.tsx';
import { faIconsList } from './types/icons.ts';

library.add(...faIconsList);

function App() {
  return (
    <QueryClientProvider client={AppQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
