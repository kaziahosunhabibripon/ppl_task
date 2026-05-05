import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
};

export function Select({ className = "", options, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`min-h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white/85 px-4 pr-8 text-sm text-slate-950 shadow-sm outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 6.5 8 10l4-3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}
