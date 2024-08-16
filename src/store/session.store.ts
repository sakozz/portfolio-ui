import { createSlice } from "@reduxjs/toolkit";
import { Session } from "../dao/session.dao.ts";
import User from "../dao/users.dao.ts";

export type SessionState = {
  currentSession: Session | null;
  currentUser: User | null;
  authToken: string | null;
  authenticated: boolean;
};

export const initialState: SessionState = {
  currentSession: null,
  currentUser: null,
  authToken: null,
  authenticated: false,
};
const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setSession: (
      state,
      action: { payload: { session: Session; user: User } },
    ) => {
      state.currentSession = action.payload.session;
      state.currentUser = action.payload.user;
      state.authenticated = true;
    },
    clearSession: (state) => {
      state.currentUser = undefined;
      state.currentSession = undefined;
      state.authenticated = false;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
