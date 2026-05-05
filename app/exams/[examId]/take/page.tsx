"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { PageHeading } from "@/components/molecules/PageHeading";
import { ExamQuestionCard } from "@/components/organisms/ExamQuestionCard";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { submitExam } from "@/lib/features/exam/examSlice";
import { getQuestionTypeLabel, getSessionQuestions } from "@/lib/features/exam/examUtils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toBanglaNumber } from "@/lib/utils/banglaNumber";

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

  const selectedQuestions = useMemo(() => {
    if (!exam || !session) {
      return [];
    }

    return getSessionQuestions(exam, session);
  }, [exam, session]);
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const isComplete = selectedQuestions.length > 0 && answeredCount === selectedQuestions.length;
  const questionTypeLabel = session ? getQuestionTypeLabel(session.questionType) : "বহুনির্বাচনি";

  if (!currentUser) {
    return null;
  }

  if (!exam || !session) {
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
      <form className="grid gap-5 rounded-3xl bg-white/50 p-5 shadow-sm ring-1 ring-white/70" onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-base font-extrabold text-slate-950">{exam.title}</h1>
              <p className="mt-2 text-xs font-bold text-slate-500">
                ◷ {questionTypeLabel} &nbsp;&nbsp; ▣ {toBanglaNumber(exam.durationMinutes)} মিনিট
                &nbsp;&nbsp; □ {toBanglaNumber(selectedQuestions.length)} টি
              </p>
            </div>
            <Button className="h-11 min-h-11 w-32" type="submit">
              সাবমিট কর
            </Button>
          </div>
          <div className="relative h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-fuchsia-700"
              style={{
                width: `${selectedQuestions.length === 0 ? 0 : (answeredCount / selectedQuestions.length) * 100}%`,
              }}
            />
            <span
              className="absolute top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-fuchsia-700 text-[9px] text-white shadow-sm"
              style={{
                left: `${selectedQuestions.length === 0 ? 0 : (answeredCount / selectedQuestions.length) * 100}%`,
              }}
            >
              {toBanglaNumber(answeredCount)}
            </span>
          </div>
          {showMissing && !isComplete ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              সব প্রশ্নের উত্তর দিয়ে সাবমিট কর।
            </p>
          ) : null}
        </div>

        <div className="grid gap-7">
          {selectedQuestions.map((question, index) => (
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
              questionType={session.questionType}
              question={question}
            />
          ))}
        </div>
      </form>
    </AppTemplate>
  );
}
