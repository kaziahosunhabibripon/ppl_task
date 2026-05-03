import { Card } from "@/components/atoms/Card";
import { OptionChoice } from "@/components/molecules/OptionChoice";
import type { ExamQuestion } from "@/lib/features/exam/examSlice";

type ExamQuestionCardProps = {
  answer?: string;
  index: number;
  question: ExamQuestion;
  onAnswer: (value: string) => void;
};

export function ExamQuestionCard({ answer, index, onAnswer, question }: ExamQuestionCardProps) {
  return (
    <Card className="grid gap-4 p-5">
      <div className="grid gap-2">
        <p className="text-sm font-semibold text-sky-700">Question {index + 1}</p>
        <h2 className="text-base font-bold leading-7 text-slate-950">{question.prompt}</h2>
      </div>
      <div className="grid gap-3">
        {question.options.map((option) => (
          <OptionChoice
            checked={answer === option}
            key={option}
            label={option}
            name={question.id}
            onChange={() => onAnswer(option)}
          />
        ))}
      </div>
    </Card>
  );
}
