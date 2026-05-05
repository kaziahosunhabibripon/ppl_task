import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level?: string;
  batch?: string;
  group?: string;
  version?: string;
  password?: string;
};

type AuthState = {
  users: User[];
  currentUser: User | null;
  error: string | null;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level?: string;
  batch?: string;
  group?: string;
  version?: string;
  password?: string;
};

const initialState: AuthState = {
  users: [],
  currentUser: null,
  error: null,
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizePhone = (phone: string) => phone.replace(/\s+/g, "").trim();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterPayload>) => {
      const email = normalizeEmail(action.payload.email);
      const phone = normalizePhone(action.payload.phone);
      const existingUser = state.users.find(
        (user) => user.email === email || normalizePhone(user.phone) === phone,
      );

      if (existingUser) {
        state.currentUser = existingUser;
        state.error = null;
        return;
      }

      const user: User = {
        id: action.payload.id,
        name: action.payload.name.trim(),
        email,
        phone,
        level: action.payload.level,
        batch: action.payload.batch,
        group: action.payload.group,
        version: action.payload.version,
        password: action.payload.password?.trim(),
      };

      state.users.push(user);
      state.currentUser = user;
      state.error = null;
    },
    loginUser: (state, action: PayloadAction<LoginPayload>) => {
      const email = normalizeEmail(action.payload.email);
      const password = action.payload.password.trim();
      const user = state.users.find(
        (item) => item.email === email && item.password === password,
      );

      if (!user) {
        state.error = "No registered student found with this email and password.";
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
