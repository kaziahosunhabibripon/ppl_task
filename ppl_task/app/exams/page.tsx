"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/atoms/Button";
import { ExamList } from "@/components/organisms/ExamList";
import { PageHeading } from "@/components/molecules/PageHeading";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { useAppSelector } from "@/lib/hooks";

export default function ExamsPage() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const exams = useAppSelector((state) => state.exam.exams);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <AppTemplate>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <PageHeading eyebrow="Exam list" title="Choose an exam">
            Select a dummy exam, answer every question, and submit to see your result instantly.
          </PageHeading>
          <Link href="/register">
            <Button variant="secondary">Add user</Button>
          </Link>
        </div>
        <ExamList exams={exams} />
      </div>
    </AppTemplate>
  );
}
