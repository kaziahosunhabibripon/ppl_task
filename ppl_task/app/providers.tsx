"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { makeStore } from "@/lib/store";

export function Providers({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => setupListeners(store.dispatch), [store]);

  return <Provider store={store}>{children}</Provider>;
}
