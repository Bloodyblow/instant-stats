import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Category, Message, StoredMessage } from "@/app/types";

export interface AppState {
  categories: Category[];
  messages: StoredMessage[];
}

const initialState: AppState = {
  categories: [],
  messages: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
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

export const { setCategories, addCategory, addMessage } = appSlice.actions;

export default appSlice.reducer;