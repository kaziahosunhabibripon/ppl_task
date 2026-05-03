"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { clearAuthError, loginUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, error } = useAppSelector((state) => state.auth);

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
        error={error}
        mode="login"
        onSubmit={(values) => dispatch(loginUser(values))}
      />
    </AuthTemplate>
  );
}
