import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  users: User[];
  currentUser: User | null;
  error: string | null;
};

type LoginPayload = {
  name: string;
  email: string;
};

type RegisterPayload = {
  id: string;
  name: string;
  email: string;
};

const initialState: AuthState = {
  users: [],
  currentUser: null,
  error: null,
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizeName = (name: string) => name.trim().toLowerCase();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterPayload>) => {
      const name = action.payload.name.trim();
      const email = normalizeEmail(action.payload.email);
      const existingUser = state.users.find((user) => user.email === email);

      if (existingUser) {
        state.currentUser = null;
        state.error = "A student is already registered with this email.";
        return;
      }

      const user: User = {
        id: action.payload.id,
        name,
        email,
      };

      state.users.push(user);
      state.currentUser = null;
      state.error = null;
    },
    loginUser: (state, action: PayloadAction<LoginPayload>) => {
      const name = normalizeName(action.payload.name);
      const email = normalizeEmail(action.payload.email);
      const user = state.users.find(
        (item) => item.email === email && normalizeName(item.name) === name,
      );

      if (!user) {
        state.currentUser = null;
        state.error = "No registered student found with this name and email.";
        return;
      }

      state.currentUser = user;
      state.error = null;
    },
    hydrateAuthState: (_state, action: PayloadAction<AuthState>) => {
      return {
        ...action.payload,
        currentUser: null,
        error: null,
      };
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

export const {
  clearAuthError,
  hydrateAuthState,
  loginUser,
  logoutUser,
  registerUser,
} =
  authSlice.actions;

export default authSlice.reducer;
