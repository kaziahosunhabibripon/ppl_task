import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  users: User[];
  currentUser: User | null;
  error: string | null;
};

type AuthPayload = {
  name: string;
  email: string;
};

const initialState: AuthState = {
  users: [],
  currentUser: null,
  error: null,
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<AuthPayload>) => {
      const name = action.payload.name.trim();
      const email = normalizeEmail(action.payload.email);
      const existingUser = state.users.find((user) => user.email === email);

      if (existingUser) {
        state.currentUser = existingUser;
        state.error = null;
        return;
      }

      const user: User = {
        id: crypto.randomUUID(),
        name,
        email,
      };

      state.users.push(user);
      state.currentUser = user;
      state.error = null;
    },
    loginUser: (state, action: PayloadAction<AuthPayload>) => {
      const name = action.payload.name.trim();
      const email = normalizeEmail(action.payload.email);
      const user = state.users.find(
        (item) => item.email === email && item.name.toLowerCase() === name.toLowerCase(),
      );

      if (!user) {
        state.error = "No registered user found with that name and email.";
        return;
      }

      state.currentUser = user;
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { clearAuthError, loginUser, logoutUser, registerUser } =
  authSlice.actions;

export default authSlice.reducer;
