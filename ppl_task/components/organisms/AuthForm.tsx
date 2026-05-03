"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { FormField } from "@/components/molecules/FormField";

type AuthFormProps = {
  error?: string | null;
  mode: "login" | "register";
  onSubmit: (values: { name: string; email: string }) => void;
};

export function AuthForm({ error, mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    <Card className="w-full p-6 sm:p-8">
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <h2 className="text-xl font-bold text-slate-950">
            {isLogin ? "Login to continue" : "Create your account"}
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            {isLogin
              ? "Use the same name and email you registered with."
              : "Register locally with your name and email."}
          </p>
        </div>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <FormField
          error={fieldErrors.name}
          id={`${mode}-name`}
          label="Name"
          name="name"
          onChange={setName}
          placeholder="Your name"
          value={name}
        />
        <FormField
          error={fieldErrors.email}
          id={`${mode}-email`}
          label="Email"
          name="email"
          onChange={setEmail}
          placeholder="name@example.com"
          type="email"
          value={email}
        />

        <Button className="w-full" type="submit">
          {isLogin ? "Login" : "Register"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          {isLogin ? "Need an account?" : "Already registered?"}{" "}
          <Link
            className="font-semibold text-sky-700 hover:text-sky-900"
            href={isLogin ? "/register" : "/login"}
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </form>
    </Card>
  );
}
