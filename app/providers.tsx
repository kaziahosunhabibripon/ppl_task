"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { hydrateAuthState } from "@/lib/features/auth/authSlice";
import { hydrateExamState } from "@/lib/features/exam/examSlice";
import { makeStore } from "@/lib/store";

const STORAGE_KEY = "ppl-redux-state";

type PersistedState = {
  auth?: ReturnType<ReturnType<typeof makeStore>["getState"]>["auth"];
  exam?: ReturnType<ReturnType<typeof makeStore>["getState"]>["exam"];
};

export function Providers({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    setupListeners(store.dispatch);

    if (typeof window === "undefined") {
      return;
    }

    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY);

      if (rawState) {
        const persistedState = JSON.parse(rawState) as PersistedState;

        if (persistedState.auth) {
          store.dispatch(hydrateAuthState(persistedState.auth));
        }

        if (persistedState.exam) {
          store.dispatch(
            hydrateExamState({
              results: persistedState.exam.results,
              sessions: persistedState.exam.sessions,
            }),
          );
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          auth: {
            ...state.auth,
            currentUser: null,
            error: null,
          },
          exam: {
            results: state.exam.results,
            sessions: state.exam.sessions,
          },
        }),
      );
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
