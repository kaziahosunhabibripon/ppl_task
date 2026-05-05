"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Select } from "@/components/atoms/Select";

type AuthFormProps = {
  error?: string | null;
  mode: "login" | "register";
  onSubmit: (values: { name: string; email: string }) => void;
};

const inputClass =
  "h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-[11px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100";

export function AuthForm({ error, mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isLogin = mode === "login";

  const fieldErrors = useMemo(
    () => ({
      name: submitted && !name.trim() ? "Name is required." : "",
      email: submitted && !email.trim() ? "Email is required." : "",
    }),
    [email, name, submitted],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!name.trim() || !email.trim()) {
      return;
    }

    onSubmit({
      name,
      email,
    });
  };

  return (
    <form
      className={`mx-auto grid w-full ${isLogin ? "max-w-[258px] gap-3" : "max-w-[322px] gap-2.5"}`}
      onSubmit={handleSubmit}
    >
      <div className={`grid text-center ${isLogin ? "gap-1" : "gap-0.5"}`}>
        <h1
          className={
            isLogin
              ? "text-[21px] font-bold leading-7 text-slate-950"
              : "text-[16px] font-bold leading-7 text-slate-950"
          }
        >
          {isLogin ? "Log in to your account" : "Create new Account"}
        </h1>
        {isLogin ? (
          <p className="text-[10px] leading-5 text-slate-500">
            Welcome back! Please enter your details.
          </p>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {isLogin ? (
        <>
          <AuthInput
            error={fieldErrors.name}
            id="login-name"
            onChange={setName}
            placeholder="Enter your name"
            value={name}
          />
          <AuthInput
            error={fieldErrors.email}
            id="login-email"
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
            value={email}
          />
        </>
      ) : (
        <>
          <AuthInput
            error={fieldErrors.name}
            id="register-name"
            label="Name"
            onChange={setName}
            placeholder="Muhidul Hasan"
            value={name}
          />
          <AuthInput
            error={fieldErrors.email}
            id="register-email"
            label="Email"
            onChange={setEmail}
            placeholder="student@example.com"
            type="email"
            value={email}
          />
          <FieldSelect id="level" label="Level" options={["HSC", "SSC", "Admission"]} />
          <FieldSelect id="batch" label="Batch" options={["2025", "2026", "2027"]} />
          <FieldSelect id="group" label="Group" options={["Science", "Business Studies", "Humanities"]} />
          <FieldSelect id="version" label="Version" options={["English", "Bangla"]} />
        </>
      )}

      <button
        className={`${isLogin ? "mt-1" : "mt-3"} h-9 rounded-md bg-[#9d00df] text-[11px] font-bold text-white transition hover:bg-[#8700c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-700`}
        type="submit"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      {isLogin ? (
        <>
          <p className="py-1 text-center text-[10px] font-medium uppercase text-slate-500">or</p>
          <SocialButton icon={<GoogleIcon />}>Continue with Google</SocialButton>
          <SocialButton icon={<FacebookIcon />}>Continue with Facebook</SocialButton>
        </>
      ) : null}

      <p className={`${isLogin ? "pt-3" : "pt-1"} text-center text-[10px] text-slate-600`}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          className="font-bold text-fuchsia-700 hover:text-fuchsia-900"
          href={isLogin ? "/register" : "/login"}
        >
          {isLogin ? "Sign up" : "Login"}
        </Link>
      </p>
    </form>
  );
}

function AuthInput({
  error,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  error?: string;
  id: string;
  label?: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <div className="grid gap-1">
      {label ? (
        <label className="text-[10px] font-medium text-slate-950" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={`${inputClass} ${error ? "border-red-400" : ""}`}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="text-[10px] font-medium text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FieldSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="grid gap-1">
      <label className="text-[10px] font-medium text-slate-950" htmlFor={id}>
        {label}
      </label>
      <Select className="h-9 text-[11px]" id={id} options={options} />
    </div>
  );
}

function SocialButton({
  children,
  icon,
}: {
  children: string;
  icon: ReactNode;
}) {
  return (
    <button
      className="flex h-9 items-center justify-center gap-2 rounded-md bg-white text-[11px] font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
      type="button"
    >
      {icon}
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M21.805 10.023h-9.58v3.955h5.515c-.238 1.276-.96 2.358-2.045 3.087v2.565h3.31c1.937-1.784 3.053-4.413 3.053-7.523 0-.724-.065-1.421-.253-2.084z" fill="#4285F4" />
      <path d="M12.225 22c2.767 0 5.088-.918 6.78-2.49l-3.31-2.565c-.918.615-2.092.978-3.47.978-2.672 0-4.935-1.804-5.742-4.229H3.066v2.648C4.75 19.686 8.21 22 12.225 22z" fill="#34A853" />
      <path d="M6.483 13.694A5.996 5.996 0 0 1 6.17 12c0-.587.113-1.158.313-1.694V7.658H3.066A9.996 9.996 0 0 0 2 12c0 1.613.386 3.14 1.066 4.342l3.417-2.648z" fill="#FBBC05" />
      <path d="M12.225 6.077c1.504 0 2.855.517 3.918 1.532l2.936-2.936C17.306 3.02 14.985 2 12.225 2 8.21 2 4.75 4.314 3.066 7.658l3.417 2.648c.807-2.425 3.07-4.229 5.742-4.229z" fill="#EA4335" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <circle cx="12" cy="12" fill="#1877F2" r="10" />
      <path d="M14.62 12.58h-1.7V18h-2.24v-5.42H9.55v-1.9h1.13V9.45c0-1.67.98-2.6 2.52-2.6.74 0 1.51.13 1.51.13v1.66h-.85c-.84 0-1.1.52-1.1 1.05v.99h1.87l-.01 1.9z" fill="#fff" />
    </svg>
  );
}
