"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { PageHeading } from "@/components/molecules/PageHeading";
import { ExamQuestionCard } from "@/components/organisms/ExamQuestionCard";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { submitExam } from "@/lib/features/exam/examSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function ExamTakePage() {
  const router = useRouter();
  const params = useParams<{ examId: string }>();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const exam = useAppSelector((state) =>
    state.exam.exams.find((item) => item.id === params.examId),
  );
  const session = useAppSelector((state) =>
    params.examId ? state.exam.sessions[params.examId] : undefined,
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showMissing, setShowMissing] = useState(false);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const isComplete = exam ? answeredCount === exam.questions.length : false;

  if (!currentUser) {
    return null;
  }

  if (!exam) {
    return (
      <AppTemplate>
        <PageHeading title="পরীক্ষা পাওয়া যায়নি">তালিকা থেকে একটি পরীক্ষা বেছে নাও।</PageHeading>
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
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        userId: currentUser.id,
      }),
    );
    router.push("/results/latest");
  };

  return (
    <AppTemplate>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-slate-950">{exam.title}</h1>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                ◷ {session?.questionType ?? "MCQ"} &nbsp;&nbsp; ▣ {exam.durationMinutes} মিনিট
                &nbsp;&nbsp; □ {exam.questions.length} টি
              </p>
            </div>
            <Button className="h-11 min-h-11 w-32" type="submit">
              সাবমিট কর
            </Button>
          </div>
          <div className="h-2 rounded-full bg-white">
            <div
              className="h-2 rounded-full bg-fuchsia-700"
              style={{ width: `${(answeredCount / exam.questions.length) * 100}%` }}
            />
          </div>
          {showMissing && !isComplete ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              সব প্রশ্নের উত্তর দিয়ে সাবমিট কর।
            </p>
          ) : null}
        </div>

        <div className="grid gap-8 rounded-2xl bg-white/60 p-5">
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
      </form>
    </AppTemplate>
  );
}
