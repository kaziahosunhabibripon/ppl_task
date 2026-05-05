import { OptionChoice } from "@/components/molecules/OptionChoice";
import type { ExamQuestion } from "@/lib/features/exam/examSlice";
import { toBanglaNumber } from "@/lib/utils/banglaNumber";

type ExamQuestionCardProps = {
  answer?: string;
  index: number;
  questionType: "MCQ" | "WRITTEN";
  question: ExamQuestion;
  onAnswer: (value: string) => void;
  reviewAnswer?: string;
};

export function ExamQuestionCard({
  answer,
  index,
  onAnswer,
  questionType,
  question,
  reviewAnswer,
}: ExamQuestionCardProps) {
  if (questionType === "WRITTEN") {
    return (
      <section className="grid gap-3">
        <div className="grid gap-1">
          <h2 className="text-sm font-extrabold leading-7 text-slate-950">
            {toBanglaNumber(index + 1)}. {question.prompt}
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            সঠিক উত্তরটি নিজের ভাষায় লেখো।
          </p>
        </div>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
          onChange={(event) => onAnswer(event.target.value)}
          placeholder="তোমার উত্তর লিখো"
          value={answer ?? ""}
        />
        {reviewAnswer !== undefined ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="font-bold">সঠিক উত্তর</p>
            <p className="mt-1">{question.correctAnswer}</p>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className="grid gap-3">
      <h2 className="text-sm font-extrabold leading-7 text-slate-950">
        {toBanglaNumber(index + 1)}. {question.prompt}
      </h2>
      <div className="grid gap-2.5 md:grid-cols-2">
        {question.options.map((option) => {
          const isCorrect = reviewAnswer !== undefined && option === question.correctAnswer;
          const isWrong = reviewAnswer === option && option !== question.correctAnswer;

          return (
            <div
              className={
                isCorrect
                  ? "rounded-xl border border-emerald-500 bg-emerald-50"
                  : isWrong
                    ? "rounded-xl border border-rose-400 bg-rose-50"
                    : ""
              }
              key={option}
            >
              <OptionChoice
                checked={answer === option}
                label={option}
                name={question.id}
                onChange={() => onAnswer(option)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
