import type { ReactNode } from "react";

type PageHeadingProps = {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
};

export function PageHeading({ children, eyebrow, title }: PageHeadingProps) {
  return (
    <div className="grid gap-2">
      {eyebrow ? <p className="text-sm font-semibold text-slate-700">{eyebrow}</p> : null}
      <h1 className="text-xl font-bold tracking-normal text-slate-950 sm:text-2xl">{title}</h1>
      {children ? <p className="max-w-2xl text-sm leading-6 text-slate-600">{children}</p> : null}
    </div>
  );
}
