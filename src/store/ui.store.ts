import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "../components/toast-messages/toast-messages.tsx";

const uiSlice = createSlice({
  name: "ui",
  initialState: { toastMessages: [] },
  reducers: {
    addToast: (state, action: { payload: { toast: Toast } }) => {
      state.toastMessages.push(action.payload.toast);
    },
    clearToast: (state, action: { payload: { id: string } }) => {
      state.toastMessages = state.toastMessages.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
