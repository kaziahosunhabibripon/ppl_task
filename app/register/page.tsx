"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { clearAuthError, registerUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <AuthTemplate>
      <AuthForm
        error={error}
        mode="register"
        onSubmit={(values) => {
          dispatch(
            registerUser({
              ...values,
              id: crypto.randomUUID(),
            }),
          );

          if (!store.getState().auth.error) {
            router.push("/login");
          }
        }}
      />
    </AuthTemplate>
  );
}
