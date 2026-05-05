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
        <main className="min-h-screen px-4 py-6 lg:ml-56 lg:px-9">
          <div className="relative mx-auto w-full max-w-6xl">
            <button
              aria-label="নোটিফিকেশন"
              className="absolute right-0 top-0 hidden h-8 w-8 place-items-center rounded-full text-sm text-slate-700 transition hover:bg-white/70 lg:grid"
              type="button"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6.75 10.5a5.25 5.25 0 0 1 10.5 0v2.85l1.27 2.53a1 1 0 0 1-.9 1.45H6.38a1 1 0 0 1-.9-1.45l1.27-2.53V10.5Z"
                  fill="currentColor"
                />
                <path
                  d="M9.75 18.5a2.25 2.25 0 0 0 4.5 0"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
