import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import type { Exam, ExamResult } from "@/lib/features/exam/examSlice";
import { getQuestionTypeLabel, isCorrectAnswer } from "@/lib/features/exam/examUtils";
import { toBanglaNumber } from "@/lib/utils/banglaNumber";

type ResultSummaryProps = {
  exam: Exam;
  result: ExamResult;
};

export function ResultSummary({ exam, result }: ResultSummaryProps) {
  const resultQuestions = exam.questions.filter((question) =>
    result.questionIds.includes(question.id),
  );
  const wrong = resultQuestions.filter((question) => {
    const selected = result.answers[question.id];

    return Boolean(selected) && !isCorrectAnswer(question, selected);
  }).length;
  const unanswered = resultQuestions.filter((question) => !result.answers[question.id]).length;
  const duration = formatDuration(result.durationSeconds);

  return (
    <div className="grid gap-6 rounded-3xl bg-white/50 p-5 shadow-sm ring-1 ring-white/70">
      <div className="grid gap-2">
        <h1 className="text-base font-extrabold text-slate-950">{exam.title}</h1>
        <p className="text-xs font-bold text-slate-500">
          ◷ {getQuestionTypeLabel(result.questionType)} &nbsp;&nbsp; □ {toBanglaNumber(result.total)} প্রশ্ন
          &nbsp;&nbsp; ▣ {duration}
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-white/70 p-3 sm:grid-cols-2">
        <StatTile color="bg-emerald-500" label="সঠিক উত্তর" value={`${toBanglaNumber(result.score)} টি`} />
        <StatTile color="bg-rose-500" label="ভুল উত্তর" value={`${toBanglaNumber(wrong)} টি`} />
        <StatTile color="bg-amber-500" label="উত্তর দেইনি" value={`${toBanglaNumber(unanswered)} টি`} />
        <StatTile color="bg-sky-500" label="সময় নিয়েছ" value={duration} />
      </div>

      <section className="grid gap-6">
        <h2 className="text-lg font-extrabold text-slate-950">সঠিক/ভুল উত্তর দেখে নাও</h2>
        {resultQuestions.map((question, index) => {
          const selected = result.answers[question.id];

          return (
            <div className="grid gap-3" key={question.id}>
              <h3 className="text-sm font-extrabold leading-7 text-slate-950">
                {toBanglaNumber(index + 1)}. {question.prompt}
              </h3>
              {result.questionType === "WRITTEN" ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                    <p className="font-bold text-slate-950">তোমার উত্তর</p>
                    <p className="mt-1">{selected || "উত্তর দেওয়া হয়নি"}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                    <p className="font-bold">সঠিক উত্তর</p>
                    <p className="mt-1">{question.correctAnswer}</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-2.5 md:grid-cols-2">
                  {question.options.map((option) => {
                    const isCorrect = option === question.correctAnswer;
                    const isWrong = option === selected && option !== question.correctAnswer;

                    return (
                      <div
                        className={`flex min-h-11 items-center gap-3 rounded-xl border px-4 text-sm font-medium ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                            : isWrong
                              ? "border-rose-400 bg-rose-50 text-rose-900"
                              : "border-white bg-white text-slate-700"
                        }`}
                        key={option}
                      >
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : isWrong
                                ? "border-rose-500 bg-rose-500 text-white"
                                : "border-slate-300"
                          }`}
                        >
                          {isCorrect ? "✓" : isWrong ? "×" : ""}
                        </span>
                        {option}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <Link href="/exams">
        <Button className="w-full sm:w-52" variant="secondary">
          ড্যাশবোর্ডে যাও
        </Button>
      </Link>
    </div>
  );
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${toBanglaNumber(minutes)} মিনিট ${toBanglaNumber(seconds)} সেকেন্ড`;
}

function StatTile({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`grid h-8 w-8 place-items-center rounded-full ${color} text-white`}>●</span>
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
        </div>
      </div>
      <span className="text-slate-300">⊙</span>
    </div>
  );
}
