import type { ReactNode } from "react";

import { Logo } from "@/components/atoms/Logo";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="app-gradient flex min-h-screen flex-1 items-start justify-center px-4 py-16 sm:py-24">
      <div className="grid w-full max-w-[280px] gap-5">
        <div className="flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </main>
  );
}
