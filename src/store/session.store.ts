import { createSlice } from "@reduxjs/toolkit";
import { Session } from "../dao/session.dao.ts";
import User from "../dao/users.dao.ts";

const sessionSlice = createSlice({
  name: "session",
  initialState: { currentSession: null, currentUser: null, authenticated: false },
  reducers: {
    setSession: (
      state,
      action: { payload: { session: Session; user: User } },
    ) => {
      state.currentSession = action.payload.session;
      state.currentUser = action.payload.user;
      state.authenticated = true;
    },
    clearSession: (state) =>{
      state.currentUser = undefined;
      state.currentSession = undefined;
      state.authenticated = false;
    }
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
