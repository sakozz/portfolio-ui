import { createSlice } from '@reduxjs/toolkit';
import { Session } from '../dao/session.dao.ts';
import Profile from '../dao/users.dao.ts';

export type SessionState = {
  currentSession: Session | null;
  currentProfile: Profile | null;
  authenticated: boolean;
};

export const initialState: SessionState = {
  currentSession: null,
  currentProfile: null,
  authenticated: false,
};
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    setSession: (state, action: { payload: SessionState }) => {
      state.currentSession = action.payload.currentSession;
      state.currentProfile = action.payload.currentProfile;
      state.authenticated = action.payload.authenticated;
    },
    clearSession: (state) => {
      state.currentSession = undefined;
      state.authenticated = false;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
