import Link from "next/link";

import type { Exam, ExamResult } from "@/lib/features/exam/examSlice";

type ResultSummaryProps = {
  exam: Exam;
  result: ExamResult;
};

export function ResultSummary({ exam, result }: ResultSummaryProps) {
  const questions = exam.questions.filter((question) => result.questionIds.includes(question.id));
  const unanswered = questions.filter((question) => !result.answers[question.id]).length;
  const wrong = result.total - result.score - unanswered;
  const duration = formatDuration(result.durationSeconds);

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 rounded-2xl bg-white/35 p-4 md:grid-cols-2">
        <StatTile dot="bg-emerald-500" label="সঠিক উত্তর" value={`${result.score} টি`} />
        <StatTile dot="bg-rose-500" label="ভুল উত্তর" value={`${wrong} টি`} />
        <StatTile dot="bg-amber-500" label="উত্তর দেইনি" value={`${unanswered} টি`} />
        <StatTile dot="bg-sky-500" label="সময় নিয়েছ" value={duration} />
      </div>

      <section className="grid gap-6 rounded-2xl bg-white/25 p-1">
        <h2 className="text-[16px] font-black text-slate-950">সঠিক/ভুল উত্তর দেখে নাও</h2>
        {questions.map((question, index) => {
          const selected = result.answers[question.id];

          return (
            <div className="grid gap-3" key={question.id}>
              <h3 className="text-[13px] font-bold leading-6 text-slate-950">
                {index + 1}. {question.prompt}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {question.options.map((option) => {
                  const isCorrect = option === question.correctAnswer;
                  const isWrong = option === selected && option !== question.correctAnswer;

                  return (
                    <div
                      className={`flex min-h-10 items-center gap-3 rounded-xl border px-4 py-2 text-[12px] font-medium ${
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                          : isWrong
                            ? "border-rose-400 bg-rose-50 text-rose-950"
                            : "border-white bg-white text-slate-700"
                      }`}
                      key={option}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : isWrong
                              ? "border-rose-500 bg-rose-500 text-white"
                              : "border-slate-400 bg-white"
                        }`}
                      >
                        {isCorrect ? "✓" : isWrong ? "×" : ""}
                      </span>
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <Link
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-white text-[12px] font-bold text-slate-900 transition hover:bg-slate-50 sm:w-48"
        href="/exams"
      >
        ড্যাশবোর্ডে যাও
      </Link>
    </div>
  );
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes} মিনিট ${seconds} সেকেন্ড`;
}

function StatTile({
  dot,
  label,
  value,
}: {
  dot: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-16 items-center justify-between gap-4 rounded-xl bg-white px-5 py-3">
      <div className="flex items-center gap-3">
        <span className={`grid h-5 w-5 place-items-center rounded-full ${dot} text-white`}>
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-slate-500">{label}</p>
          <p className="mt-0.5 text-[18px] font-black text-slate-950">{value}</p>
        </div>
      </div>
      <span className="text-[13px] text-slate-400">ⓘ</span>
    </div>
  );
}
