import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../modules/users/core/reducer";
import categoryReducer from "../modules/categories/core/reducer";
import productReducer from "../modules/product/core/reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product : productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
