import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className = "", hasError = false, ...props }: InputProps) {
  return (
    <input
      className={`h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${
        hasError ? "border-red-400" : "border-slate-300"
      } ${className}`}
      {...props}
    />
  );
}
