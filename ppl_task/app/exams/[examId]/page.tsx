"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { ExamQuestionCard } from "@/components/organisms/ExamQuestionCard";
import { PageHeading } from "@/components/molecules/PageHeading";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { submitExam } from "@/lib/features/exam/examSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function ExamPage() {
  const router = useRouter();
  const params = useParams<{ examId: string }>();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const exam = useAppSelector((state) =>
    state.exam.exams.find((item) => item.id === params.examId),
  );
  const latestResult = useAppSelector((state) => state.exam.results.at(-1));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showMissing, setShowMissing] = useState(false);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const isComplete = exam ? answeredCount === exam.questions.length : false;

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  if (!exam) {
    return (
      <AppTemplate>
        <div className="grid gap-4">
          <PageHeading title="Exam not found">Please choose an available exam.</PageHeading>
          <Button onClick={() => router.push("/exams")} variant="secondary">
            Back to exams
          </Button>
        </div>
      </AppTemplate>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowMissing(true);

    if (!isComplete) {
      return;
    }

    dispatch(
      submitExam({
        answers,
        examId: exam.id,
        userId: currentUser.id,
      }),
    );

    const resultId = latestResult?.id;
    setTimeout(() => {
      const resultPath = resultId ? `/results/${resultId}` : "/results/latest";
      router.push(resultPath);
    }, 0);
  };

  return (
    <AppTemplate>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <PageHeading eyebrow={exam.subject} title={exam.title}>
            Answered {answeredCount} of {exam.questions.length}. Time allowed:{" "}
            {exam.durationMinutes} minutes.
          </PageHeading>
          <Button onClick={() => router.push("/exams")} variant="secondary">
            Back
          </Button>
        </div>

        {showMissing && !isComplete ? (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            Please answer all questions before submitting.
          </p>
        ) : null}

        <div className="grid gap-4">
          {exam.questions.map((question, index) => (
            <ExamQuestionCard
              answer={answers[question.id]}
              index={index}
              key={question.id}
              onAnswer={(value) =>
                setAnswers((current) => ({
                  ...current,
                  [question.id]: value,
                }))
              }
              question={question}
            />
          ))}
        </div>

        <Button className="w-full sm:w-auto sm:justify-self-end" type="submit">
          Submit exam
        </Button>
      </form>
    </AppTemplate>
  );
}
