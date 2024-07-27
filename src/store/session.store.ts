import { createSlice } from "@reduxjs/toolkit";
import { Session } from "../dao/session.dao.ts";
import User from "../dao/users.dao.ts";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    currentSession: null,
    currentUser: null,
    cookie: null,
    authenticated: false,
  },
  reducers: {
    setSession: (
      state,
      action: { payload: { session: Session; user: User } },
    ) => {
      state.currentSession = action.payload.session;
      state.currentUser = action.payload.user;
      state.authenticated = true;
    },
    setCookies: (state, action: { payload: { cookie: string } }) => {
      state.cookie = action.payload.cookie;
    },
    clearSession: (state) => {
      state.currentUser = undefined;
      state.currentSession = undefined;
      state.cookie = undefined;
      state.authenticated = false;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
