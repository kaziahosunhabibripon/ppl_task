"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select";
import { FormField } from "@/components/molecules/FormField";

type AuthFormProps = {
  error?: string | null;
  mode: "login" | "register";
  onSubmit: (values: { name: string; email: string }) => void;
};

export function AuthForm({ error, mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    onSubmit({ name, email });
  };

  const isLogin = mode === "login";

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <div className="grid gap-1 text-center">
        <h1 className="text-lg font-bold text-slate-950">
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

      <FormField
        error={fieldErrors.name}
        id={`${mode}-name`}
        label={isLogin ? "" : "Name"}
        name="name"
        onChange={setName}
        placeholder={isLogin ? "Enter your name" : "Muhidul Hasan"}
        value={name}
      />
      <FormField
        error={fieldErrors.email}
        id={`${mode}-email`}
        label={isLogin ? "" : "Email"}
        name="email"
        onChange={setEmail}
        placeholder={isLogin ? "Enter your email" : "student@example.com"}
        type="email"
        value={email}
      />

      {isLogin ? (
        <input
          className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          type="password"
          value={password}
        />
      ) : (
        <>
          <FieldSelect id="level" label="Level" options={["HSC", "SSC", "Admission"]} />
          <FieldSelect id="batch" label="Batch" options={["2025", "2026", "2027"]} />
          <FieldSelect id="group" label="Group" options={["Science", "Business Studies", "Humanities"]} />
          <FieldSelect id="version" label="Version" options={["English", "Bangla"]} />
          <input
            className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
          <input
            className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100"
            placeholder="Confirm Password"
            type="password"
          />
        </>
      )}

      <Button className="mt-1 h-9 min-h-9 w-full text-xs" type="submit">
        {isLogin ? "Login" : "Register"}
      </Button>

      {isLogin ? (
        <>
          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] uppercase text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <button className="h-9 rounded-md bg-white text-xs font-medium text-slate-700 shadow-sm" type="button">
            G&nbsp; Continue with Google
          </button>
          <button className="h-9 rounded-md bg-white text-xs font-medium text-slate-700 shadow-sm" type="button">
            f&nbsp; Continue with Facebook
          </button>
        </>
      ) : null}

      <p className="pt-2 text-center text-[10px] text-slate-600">
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
    <div className="grid gap-1.5">
      <label className="text-xs font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      <Select id={id} options={options} />
    </div>
  );
}
