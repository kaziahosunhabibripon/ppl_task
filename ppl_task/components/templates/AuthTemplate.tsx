import type { ReactNode } from "react";

import { Logo } from "@/components/atoms/Logo";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="auth-grid flex min-h-screen flex-1 items-start justify-center px-4 py-9">
      <div className="grid w-full max-w-[322px] gap-4">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        {children}
      </div>
    </main>
  );
}
