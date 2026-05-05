import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className = "", hasError = false, ...props }: InputProps) {
  return (
    <input
      className={`min-h-11 w-full rounded-2xl border bg-white/85 px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 ${
        hasError ? "border-red-400" : "border-slate-200"
      } ${className}`}
      {...props}
    />
  );
}
