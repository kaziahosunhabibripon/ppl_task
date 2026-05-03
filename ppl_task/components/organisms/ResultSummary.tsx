import Link from "next/link";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import type { Exam, ExamResult } from "@/lib/features/exam/examSlice";

type ResultSummaryProps = {
  exam: Exam;
  result: ExamResult;
};

export function ResultSummary({ exam, result }: ResultSummaryProps) {
  const percentage = Math.round((result.score / result.total) * 100);

  return (
    <div className="grid gap-5">
      <Card className="grid gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone={percentage >= 70 ? "green" : "blue"}>{percentage}%</Badge>
          <Badge>{exam.title}</Badge>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-600">Your score</p>
          <p className="mt-1 text-4xl font-bold text-slate-950">
            {result.score}/{result.total}
          </p>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          Submitted on {new Date(result.submittedAt).toLocaleString()}.
        </p>
      </Card>

      <div className="grid gap-3">
        {exam.questions.map((question, index) => {
          const selected = result.answers[question.id];
          const isCorrect = selected === question.correctAnswer;

          return (
            <Card className="grid gap-2 p-4" key={question.id}>
              <p className="text-sm font-semibold text-slate-500">Question {index + 1}</p>
              <h2 className="font-semibold text-slate-950">{question.prompt}</h2>
              <p className={isCorrect ? "text-sm text-emerald-700" : "text-sm text-red-700"}>
                Your answer: {selected || "Not answered"}
              </p>
              {!isCorrect ? (
                <p className="text-sm text-slate-600">Correct answer: {question.correctAnswer}</p>
              ) : null}
            </Card>
          );
        })}
      </div>

      <Link href="/exams">
        <Button variant="secondary">Back to exams</Button>
      </Link>
    </div>
  );
}
