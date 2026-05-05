import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/lib/features/auth/authSlice";
import examReducer from "@/lib/features/exam/examSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      exam: examReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
