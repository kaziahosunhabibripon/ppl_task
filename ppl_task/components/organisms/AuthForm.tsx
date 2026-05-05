"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Select } from "@/components/atoms/Select";

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  level: string;
  batch: string;
  group: string;
  version: string;
  password: string;
  confirmPassword: string;
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
      phone: submitted && !phone.trim() ? "Phone is required." : "",
      password: submitted && !password.trim() ? "Password is required." : "",
      name: !isLogin && submitted && !name.trim() ? "Name is required." : "",
      email: submitted && !email.trim() ? "Email is required." : "",
      confirmPassword:
        !isLogin && submitted && password !== confirmPassword
          ? "Passwords do not match."
          : "",
    }),
    [confirmPassword, email, isLogin, name, password, phone, submitted],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (isLogin) {
      if (!email.trim() || !password.trim()) {
        return;
      }

      props.onSubmit({ email, password });
      return;
    }

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      password !== confirmPassword
    ) {
      return;
    }

    props.onSubmit({
      name,
      email,
      phone,
      level,
      batch,
      group,
      version,
      password,
      confirmPassword,
    });
  };

  return (
    <form
      className={`mx-auto grid w-full ${
        isLogin ? "max-w-[264px] gap-4" : "max-w-[286px] gap-3.5"
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

      {isLogin ? (
        <div className="grid gap-3">
          <InputField
            error={fieldErrors.email}
            id="login-email"
            name="email"
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
            value={email}
          />
          <InputField
            error={fieldErrors.password}
            id="login-password"
            name="password"
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
            value={password}
          />
        </div>
      ) : (
        <div className="grid gap-3">
          <LabeledField
            error={fieldErrors.name}
            id="register-name"
            label="Name"
            name="name"
            onChange={setName}
            placeholder="Muhidul Hasan"
            value={name}
          />
          <LabeledField
            error={fieldErrors.phone}
            id="register-phone"
            label="Phone"
            name="phone"
            onChange={setPhone}
            placeholder="+880"
            type="tel"
            value={phone}
          />
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
            error={fieldErrors.password}
            id="register-password"
            label="Password"
            name="password"
            onChange={setPassword}
            placeholder="Password"
            type="password"
            value={password}
          />
          <LabeledField
            error={fieldErrors.confirmPassword}
            id="register-confirm-password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
          />
        </div>
      )}

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
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={fieldClassName}
        hasError={Boolean(error)}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="text-[10px] text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
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
      <Label className="text-[10px] font-medium text-slate-700" htmlFor={id}>
        {label}
      </Label>
      <Input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={fieldClassName}
        hasError={Boolean(error)}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="text-[10px] text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
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
      <Label className="text-[10px] font-medium text-slate-700" htmlFor={id}>
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

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      className="flex h-8 items-center justify-center gap-1.5 rounded-[4px] border border-slate-200 bg-white px-3 text-[10px] font-medium text-slate-700 transition hover:bg-slate-50"
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z"
        fill="#1877F2"
      />
      <path
        d="m16.67 15.56.53-3.49h-3.33V9.81c0-.96.47-1.89 1.96-1.89h1.51V4.96s-1.37-.24-2.68-.24c-2.74 0-4.53 1.67-4.53 4.69v2.66H7.08v3.49h3.05V24a12.25 12.25 0 0 0 3.74 0v-8.44h2.8Z"
        fill="#fff"
      />
    </svg>
  );
}
