import Link from "next/link";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import type { Exam } from "@/lib/features/exam/examSlice";

type ExamListProps = {
  exams: Exam[];
};

export function ExamList({ exams }: ExamListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {exams.map((exam) => (
        <Card className="grid gap-5 p-5" key={exam.id}>
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">{exam.subject}</Badge>
            <Badge>{exam.durationMinutes} min</Badge>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-bold text-slate-950">{exam.title}</h2>
            <p className="text-sm leading-6 text-slate-600">
              {exam.questions.length} questions. Submit once to see your score immediately.
            </p>
          </div>
          <Link href={`/exams/${exam.id}`}>
            <Button className="w-full">Start Exam</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
