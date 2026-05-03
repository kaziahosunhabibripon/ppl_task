import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`text-sm font-medium text-slate-800 ${className}`} {...props}>
      {children}
    </label>
  );
}
