"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { PageHeading } from "@/components/molecules/PageHeading";
import { ExamQuestionCard } from "@/components/organisms/ExamQuestionCard";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { getSessionQuestions, submitExam } from "@/lib/features/exam/examSlice";
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

  const questions = useMemo(
    () => (exam ? getSessionQuestions(exam, session) : []),
    [exam, session],
  );
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const isComplete = questions.length > 0 && answeredCount === questions.length;
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;

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
      <form className="grid gap-5 pt-2" onSubmit={handleSubmit}>
        <div className="grid gap-3 rounded-2xl bg-white/22 px-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[15px] font-black text-slate-950">{exam.title}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold text-slate-500">
                <span>▣ {session?.questionType ?? "MCQ"}</span>
                <span>▣ {questions.length} টি</span>
                <span>◷ {exam.durationMinutes} মিনিট</span>
              </p>
            </div>
            <button
              className="h-11 rounded-md bg-[#9200bd] px-8 text-[12px] font-bold text-white transition hover:bg-[#7c00a2]"
              type="submit"
            >
              সাবমিট কর
            </button>
          </div>

          <div className="relative h-1 rounded-full bg-slate-200">
            <div className="h-1 rounded-full bg-[#9d00df]" style={{ width: `${progress}%` }} />
            <span
              className="absolute top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-[#9d00df] text-[10px] text-white"
              style={{ left: `calc(${progress}% - 10px)` }}
            >
              ◷
            </span>
          </div>

          {showMissing && !isComplete ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] font-semibold text-amber-800">
              সব প্রশ্নের উত্তর দিয়ে সাবমিট কর।
            </p>
          ) : null}
        </div>

        <div className="grid gap-8 rounded-2xl bg-white/35 p-1">
          {questions.map((question, index) => (
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
