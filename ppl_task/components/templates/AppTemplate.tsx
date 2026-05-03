import type { ReactNode } from "react";

import { Sidebar } from "@/components/organisms/Sidebar";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";

type AppTemplateProps = {
  children: ReactNode;
};

export function AppTemplate({ children }: AppTemplateProps) {
  return (
    <ProtectedRoute>
      <div className="app-gradient min-h-screen">
        <Sidebar />
        <main className="min-h-screen px-4 py-6 lg:ml-72 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
