import type { ReactNode } from "react";

import { Logo } from "@/components/atoms/Logo";

type AuthTemplateProps = {
  children: ReactNode;
};

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <main className="app-gradient relative flex min-h-screen flex-1 justify-center overflow-y-auto px-4 pb-10 pt-16 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url('/Content.svg')",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat",
          backgroundSize: "790px auto",
        }}
      />
      <div className="relative w-full max-w-[308px]">
        <div className="mb-6 flex justify-center">
          <Logo emphasized />
        </div>
        {children}
      </div>
    </main>
  );
}
