import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryExtend, ChartType, Value } from "@/app/types";

export interface CategoryState {
  category: CategoryExtend | null;
  chart: ChartType;
  selectedValue: Value | null;
  shouldRefetchCategories: boolean;
  showCategoryForm: boolean;
}

const initialState: CategoryState = {
  category: null,
  chart: "bar",
  showCategoryForm: false,
  selectedValue: null,
  shouldRefetchCategories: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryExtend>) => {
      state.category = action.payload;
    },
    removeCategory: (state) => {
      state.category = null;
    },
    setShowCategoryForm: (state, action: PayloadAction<boolean>) => {
      state.showCategoryForm = action.payload;
    },
    setSelectedValue: (state, action: PayloadAction<Value | null>) => {
      state.selectedValue = action.payload;
    },
    setShouldRefreshCategories: (state, action: PayloadAction<boolean>) => {
      state.shouldRefetchCategories = action.payload;
    },
    setChart: (state, action: PayloadAction<"line" | "bar">) => {
      state.chart = action.payload;
    },
  },
});

export const {
  setCategory,
  setChart,
  setShowCategoryForm,
  setSelectedValue,
  removeCategory,
  setShouldRefreshCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
