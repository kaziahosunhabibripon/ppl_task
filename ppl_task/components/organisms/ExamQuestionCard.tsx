import { OptionChoice } from "@/components/molecules/OptionChoice";
import type { ExamQuestion } from "@/lib/features/exam/examSlice";
import { toBanglaNumber } from "@/lib/utils/banglaNumber";

type ExamQuestionCardProps = {
  answer?: string;
  index: number;
  question: ExamQuestion;
  onAnswer: (value: string) => void;
  reviewAnswer?: string;
};

export function ExamQuestionCard({
  answer,
  index,
  onAnswer,
  question,
  reviewAnswer,
}: ExamQuestionCardProps) {
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
