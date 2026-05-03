import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
};

export function Select({ className = "", options, ...props }: SelectProps) {
  return (
    <select
      className={`h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
