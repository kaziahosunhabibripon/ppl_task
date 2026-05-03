import type { ReactNode } from "react";

import { AppHeader } from "@/components/organisms/AppHeader";

type AppTemplateProps = {
  children: ReactNode;
};

export function AppTemplate({ children }: AppTemplateProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
