import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, StoredMessage } from "@/app/types";

export interface AppState {
  messages: StoredMessage[];
}

const initialState: AppState = {
  messages: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const id = state.messages[state.messages.length - 1]?.id + 1 || 0;
      state.messages.push({ ...action.payload, id });
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage } = appSlice.actions;

export default appSlice.reducer;
