import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { CategoryExtend, ChartType, DateStringRange, Value } from "@/app/types";

export interface CategoryState {
  category: CategoryExtend | null;
  chart: ChartType;
  dateRange: DateStringRange;
  selectedValue: Value | null;
  shouldRefetchCategories: boolean;
  showCategoryForm: boolean;
  values: Value[];
}

const initialState: CategoryState = {
  category: null,
  chart: "bar",
  dateRange: [
    dayjs().subtract(2, "week").toISOString(),
    dayjs().add(2, "week").toISOString(),
  ],
  showCategoryForm: false,
  selectedValue: null,
  shouldRefetchCategories: false,
  values: [],
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
    setValues: (state, action: PayloadAction<Value[]>) => {
      state.values = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateStringRange>) => {
      state.dateRange = action.payload;
    },
    clearAll: () => initialState,
  },
});

export const {
  setCategory,
  setChart,
  clearAll,
  setShowCategoryForm,
  setSelectedValue,
  removeCategory,
  setShouldRefreshCategories,
  setValues,
  setDateRange,
} = categorySlice.actions;

export default categorySlice.reducer;
