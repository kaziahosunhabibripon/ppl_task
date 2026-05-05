import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/lib/api/baseApi";
import authReducer from "@/lib/features/auth/authSlice";
import examReducer from "@/lib/features/exam/examSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      exam: examReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
