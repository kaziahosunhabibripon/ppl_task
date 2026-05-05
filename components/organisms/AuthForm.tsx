"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Select } from "@/components/atoms/Select";

type LoginFormValues = {
  name: string;
  email: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
};

type AuthFormProps =
  | {
      error?: string | null;
      mode: "login";
      onSubmit: (values: LoginFormValues) => void;
    }
  | {
      error?: string | null;
      mode: "register";
      onSubmit: (values: RegisterFormValues) => void;
    };

const fieldClassName =
  "h-9 min-h-0 rounded-[4px] border-slate-200 bg-white px-3 text-[11px] text-slate-900 shadow-none placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100";

export function AuthForm(props: AuthFormProps) {
  const { error, mode } = props;
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [level, setLevel] = useState("HSC");
  const [batch, setBatch] = useState("2025");
  const [group, setGroup] = useState("Science");
  const [version, setVersion] = useState("English");
  const [submitted, setSubmitted] = useState(false);

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

    props.onSubmit({ name, email });
  };

  return (
    <form
      className={`mx-auto grid w-full ${
        isLogin ? "max-w-[264px] gap-4" : "max-w-[264px] gap-3"
      }`}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-1 text-center">
        <h1 className="text-[14px] font-bold leading-none text-slate-900">
          {isLogin ? "Log in to your account" : "Create new Account"}
        </h1>
        {isLogin ? (
          <p className="text-[10px] text-slate-500">
            Welcome back! Please enter your details.
          </p>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-3">
        {isLogin ? (
          <InputField
            error={fieldErrors.name}
            id="login-name"
            name="name"
            onChange={setName}
            placeholder="Enter your name"
            value={name}
          />
        ) : (
          <LabeledField
            error={fieldErrors.name}
            id="register-name"
            label="Name"
            name="name"
            onChange={setName}
            placeholder="Muhidul Hasan"
            value={name}
          />
        )}

        {isLogin ? (
          <InputField
            error={fieldErrors.email}
            id="login-email"
            name="email"
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
            value={email}
          />
        ) : (
          <LabeledField
            error={fieldErrors.email}
            id="register-email"
            label="Email"
            name="email"
            onChange={setEmail}
            placeholder="student@email.com"
            type="email"
            value={email}
          />
        )}

        {!isLogin ? (
          <>
            <LabeledField
              id="register-phone"
              label="Phone"
              name="phone"
              onChange={setPhone}
              placeholder="+880"
              type="tel"
              value={phone}
            />
            <LabeledSelect
              id="register-level"
              label="Level"
              onChange={setLevel}
              options={["HSC", "SSC", "Admission"]}
              value={level}
            />
            <LabeledSelect
              id="register-batch"
              label="Batch"
              onChange={setBatch}
              options={["2025", "2026", "2027"]}
              value={batch}
            />
            <LabeledSelect
              id="register-group"
              label="Group"
              onChange={setGroup}
              options={["Science", "Business Studies", "Humanities"]}
              value={group}
            />
            <LabeledSelect
              id="register-version"
              label="Version"
              onChange={setVersion}
              options={["English", "Bangla"]}
              value={version}
            />
            <LabeledField
              id="register-password"
              label="Password"
              name="password"
              onChange={setPassword}
              placeholder="Password"
              type="password"
              value={password}
            />
            <LabeledField
              id="register-confirm-password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={setConfirmPassword}
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
            />
          </>
        ) : null}
      </div>

      <Button
        className="h-9 min-h-9 w-full rounded-[4px] bg-[linear-gradient(90deg,#8a0fe8,#b40fe3)] px-4 text-[11px] font-bold shadow-none hover:brightness-105"
        type="submit"
      >
        {isLogin ? "Login" : "Register"}
      </Button>

      {isLogin ? (
        <>
          <p className="text-center text-[10px] text-slate-400">OR</p>
          <div className="grid gap-2">
            <SocialButton icon={<GoogleIcon />} label="Continue with Google" />
            <SocialButton icon={<FacebookIcon />} label="Continue with Facebook" />
          </div>
        </>
      ) : null}

      <p className="text-center text-[10px] text-slate-500">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          className="font-semibold text-fuchsia-700 hover:text-fuchsia-800"
          href={isLogin ? "/register" : "/login"}
        >
          {isLogin ? "Sign up" : "Login"}
        </Link>
      </p>
    </form>
  );
}

function InputField({
  error,
  id,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  error?: string;
  id: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <div className="grid gap-1">
      <Input
        className={fieldClassName}
        hasError={Boolean(error)}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? <p className="text-[10px] text-red-600">{error}</p> : null}
    </div>
  );
}

function LabeledField({
  error,
  id,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  error?: string;
  id: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <div className="grid gap-1">
      <Label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor={id}>
        {label}
      </Label>
      <Input
        className={fieldClassName}
        hasError={Boolean(error)}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? <p className="text-[10px] text-red-600">{error}</p> : null}
    </div>
  );
}

function LabeledSelect({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <div className="grid gap-1">
      <Label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor={id}>
        {label}
      </Label>
      <Select
        className={fieldClassName}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        options={options}
        value={value}
      />
    </div>
  );
}

function SocialButton({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      className="flex h-9 items-center justify-center gap-2 rounded-[4px] border border-slate-200 bg-white text-[11px] font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24">
      <path
        d="M21.6 12.23c0-.68-.06-1.34-.18-1.97H12v3.73h5.39a4.6 4.6 0 0 1-1.99 3.02v2.5h3.23c1.89-1.74 2.97-4.29 2.97-7.28Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.23-2.5c-.9.6-2.06.95-3.4.95-2.61 0-4.82-1.76-5.61-4.12H3.05v2.59A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.39 13.9A5.99 5.99 0 0 1 6.08 12c0-.66.11-1.29.31-1.9V7.5H3.05A10 10 0 0 0 2 12c0 1.61.39 3.14 1.05 4.5l3.34-2.6Z"
        fill="#FBBC04"
      />
      <path
        d="M12 5.98c1.47 0 2.78.5 3.82 1.49l2.87-2.87C16.96 2.98 14.69 2 12 2A10 10 0 0 0 3.05 7.5l3.34 2.6C7.18 7.74 9.39 5.98 12 5.98Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.44H7.08v-3.5h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.97.94-1.97 1.9v2.28h3.36l-.54 3.5h-2.82V24C19.61 23.07 24 18.1 24 12.07Z" />
    </svg>
  );
}
