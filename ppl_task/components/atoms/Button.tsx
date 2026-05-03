import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses = {
  primary:
    "bg-fuchsia-700 text-white hover:bg-fuchsia-800 focus-visible:outline-fuchsia-700",
  secondary:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-fuchsia-600",
  ghost: "text-slate-700 hover:bg-fuchsia-50 focus-visible:outline-fuchsia-600",
};

export function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
