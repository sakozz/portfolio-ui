import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./session.store.ts";

const store = configureStore({
  reducer: {session: sessionSlice.reducer}
})

export default store;
export type RootState = ReturnType<typeof store.getState>
