import { createSlice } from '@reduxjs/toolkit';
import Profile from '../dao/users.dao.ts';

export type SessionState = {
  currentProfile: Profile | null;
  authenticated: boolean;
};

export const initialState: SessionState = {
  currentProfile: null,
  authenticated: false,
};
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    setSession: (state, action: { payload: SessionState }) => {
      state.currentProfile = action.payload.currentProfile;
      state.authenticated = action.payload.authenticated;
    },
    clearSession: (state) => {
      state.currentProfile = null;
      state.authenticated = false;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
