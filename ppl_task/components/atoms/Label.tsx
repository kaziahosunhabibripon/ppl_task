import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`text-xs font-medium text-slate-700 ${className}`} {...props}>
      {children}
    </label>
  );
}
