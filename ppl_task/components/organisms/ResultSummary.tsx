import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import type { Exam, ExamResult } from "@/lib/features/exam/examSlice";

type ResultSummaryProps = {
  exam: Exam;
  result: ExamResult;
};

export function ResultSummary({ exam, result }: ResultSummaryProps) {
  const wrong = result.total - result.score;
  const unanswered = exam.questions.filter((question) => !result.answers[question.id]).length;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-2xl bg-white/70 p-4 shadow-sm sm:grid-cols-2">
        <StatTile color="bg-emerald-500" label="সঠিক উত্তর" value={`${result.score} টি`} />
        <StatTile color="bg-rose-500" label="ভুল উত্তর" value={`${wrong} টি`} />
        <StatTile color="bg-amber-500" label="উত্তর দেইনি" value={`${unanswered} টি`} />
        <StatTile color="bg-sky-500" label="সময় নিয়েছ" value="০২ ঘ ০৭ মিনিট" />
      </div>

      <section className="grid gap-6 rounded-2xl bg-white/60 p-5">
        <h2 className="text-lg font-bold text-slate-950">সঠিক/ভুল উত্তর দেখে নাও</h2>
        {exam.questions.map((question, index) => {
          const selected = result.answers[question.id];

          return (
            <div className="grid gap-4" key={question.id}>
              <h3 className="text-sm font-bold leading-7 text-slate-950">
                {index + 1}. {question.prompt}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {question.options.map((option) => {
                  const isCorrect = option === question.correctAnswer;
                  const isWrong = option === selected && option !== question.correctAnswer;

                  return (
                    <div
                      className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 text-sm font-medium ${
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
    <div className="flex items-center gap-3 rounded-xl bg-white p-4">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <div>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
      </div>
    </div>
  );
}
