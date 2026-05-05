import type { ReactNode } from "react";

import { Sidebar } from "@/components/organisms/Sidebar";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";

type AppTemplateProps = {
  children: ReactNode;
};

export function AppTemplate({ children }: AppTemplateProps) {
  return (
    <ProtectedRoute>
      <div className="auth-grid min-h-screen">
        <Sidebar />
        <main className="min-h-screen px-4 py-6 lg:ml-[266px] lg:px-12">
          <div className="mx-auto w-full max-w-[1060px]">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
