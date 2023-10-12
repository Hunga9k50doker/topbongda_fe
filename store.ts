"use client";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import rootReducer from "@/reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});
const moduleStore: any = module;
if (process.env.NODE_ENV !== "production" && moduleStore.hot) {
  moduleStore.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
