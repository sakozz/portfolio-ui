import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./session.store.ts";
import uiSlice from "./ui.store.ts";

const store = configureStore({
  reducer: {session: sessionSlice.reducer, ui: uiSlice.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;
export type RootState = ReturnType<typeof store.getState>
