import type { ReactNode } from "react";

import { Sidebar } from "@/components/organisms/Sidebar";

type AppTemplateProps = {
  children: ReactNode;
};

export function AppTemplate({ children }: AppTemplateProps) {
  return (
    <div className="app-gradient min-h-screen">
      <Sidebar />
      <main className="min-h-screen px-4 py-6 lg:ml-72 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
