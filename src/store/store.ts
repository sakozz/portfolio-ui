import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./session.store.ts";

const store = configureStore({
  reducer: {session: sessionSlice.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;
export type RootState = ReturnType<typeof store.getState>
