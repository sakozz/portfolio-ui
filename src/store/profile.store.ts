import { createSlice } from '@reduxjs/toolkit';
import Profile from '../dao/users.dao.ts';

export type ProfileState = {
  currentProfile: Profile;
};

export const initialState: ProfileState = {
  currentProfile: null,
};
const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile: (state, action: { payload: ProfileState }) => {
      state.currentProfile = action.payload.currentProfile;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
