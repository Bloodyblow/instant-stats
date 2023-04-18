import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryExtend, Value } from "@/app/types";

export interface CategoryState {
  category: CategoryExtend | null;
  editCategory: boolean;
}

const initialState: CategoryState = {
  category: null,
  editCategory: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryExtend>) => {
      state.category = action.payload;
    },
    addValue: (state, action: PayloadAction<Value>) => {
      if (state.category) {
        state.category.values.push(action.payload);
      }
    },
    removeValue: (state, action: PayloadAction<number>) => {
      if (state.category) {
        state.category.values = state.category.values.filter(
          (value) => value.id !== action.payload
        );
      }
    },
    updateValue: (state, action: PayloadAction<Value>) => {
      if (state.category) {
        state.category.values = state.category.values.map((value) =>
          value.id === action.payload.id ? action.payload : value
        );
      }
    },
    setCategoryName: (state, action: PayloadAction<string>) => {
      if (state.category) {
        state.category.name = action.payload;
      }
    },
    setEditCategory: (state, action: PayloadAction<boolean>) => {
      state.editCategory = action.payload;
    },
  },
});

export const {
  setCategory,
  addValue,
  removeValue,
  updateValue,
  setCategoryName,
  setEditCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
