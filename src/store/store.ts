import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from './session.store.ts';
import uiSlice from './ui.store.ts';
import profileSlice from './profile.store.ts';

const store = configureStore({
  reducer: { session: sessionSlice.reducer, ui: uiSlice.reducer, profile: profileSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
