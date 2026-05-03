"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/atoms/Button";
import { PageHeading } from "@/components/molecules/PageHeading";
import { ResultSummary } from "@/components/organisms/ResultSummary";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { useAppSelector } from "@/lib/hooks";

export default function ResultPage() {
  const router = useRouter();
  const params = useParams<{ resultId: string }>();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const result = useAppSelector((state) => {
    if (params.resultId === "latest") {
      return state.exam.results.at(-1);
    }

    return state.exam.results.find((item) => item.id === params.resultId);
  });
  const exam = useAppSelector((state) =>
    result ? state.exam.exams.find((item) => item.id === result.examId) : undefined,
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  if (!result || !exam) {
    return (
      <AppTemplate>
        <div className="grid gap-4">
          <PageHeading title="Result not found">
            Submit an exam first, then your score will appear here.
          </PageHeading>
          <Button onClick={() => router.push("/exams")} variant="secondary">
            Back to exams
          </Button>
        </div>
      </AppTemplate>
    );
  }

  return (
    <AppTemplate>
      <div className="grid gap-6">
        <PageHeading eyebrow="Result" title="Your exam score">
          Review your score and see the correct answers immediately after submission.
        </PageHeading>
        <ResultSummary exam={exam} result={result} />
      </div>
    </AppTemplate>
  );
}
