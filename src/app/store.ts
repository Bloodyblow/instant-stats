import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../pages/category/categorySlice";
import appReducer from "../app/appSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    app: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
