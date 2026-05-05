"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { clearAuthError, registerUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      router.push("/exams");
    }
  }, [currentUser, router]);

  return (
    <AuthTemplate>
      <AuthForm
        mode="register"
        onSubmit={(values) =>
          dispatch(
            registerUser({
              ...values,
              id: crypto.randomUUID(),
            }),
          )
        }
      />
    </AuthTemplate>
  );
}
