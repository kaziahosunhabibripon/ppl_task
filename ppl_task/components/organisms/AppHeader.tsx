"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logoutUser } from "@/lib/features/auth/authSlice";

export function AppHeader() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link className="text-lg font-bold text-slate-950" href="/exams">
          পরীক্ষা দাও
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          {currentUser ? (
            <>
              <span className="text-sm text-slate-600">{currentUser.name}</span>
              <Button onClick={handleLogout} variant="secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="text-sm font-semibold text-slate-700 hover:text-slate-950" href="/login">
                Login
              </Link>
              <Link className="text-sm font-semibold text-sky-700 hover:text-sky-900" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
