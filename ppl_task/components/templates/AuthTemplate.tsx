import type { ReactNode } from "react";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-slate-50 px-4 py-10">
      <div className="grid w-full max-w-md gap-6">
        <div className="grid gap-2 text-center">
          <p className="text-sm font-semibold uppercase text-sky-700">পরীক্ষা দাও</p>
          <h1 className="text-3xl font-bold text-slate-950">Exam Practice Portal</h1>
          <p className="text-sm leading-6 text-slate-600">
            Register, login, take a dummy exam, and get your score instantly.
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}
