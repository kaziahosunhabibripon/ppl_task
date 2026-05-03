import Link from "next/link";

import type { Exam } from "@/lib/features/exam/examSlice";

type ExamListProps = {
  exams: Exam[];
};

export function ExamList({ exams }: ExamListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {exams.map((exam) => (
        <Link
          className="grid min-h-28 place-items-center rounded-2xl bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          href={`/exams/${exam.id}`}
          key={exam.id}
        >
          <span className={`grid h-11 w-11 place-items-center rounded-xl text-xl font-black ${exam.accent}`}>
            {exam.icon}
          </span>
          <span className="mt-3 text-sm font-bold text-slate-950">{exam.subject}</span>
        </Link>
      ))}
    </div>
  );
}
