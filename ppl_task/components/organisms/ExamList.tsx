import Link from "next/link";

import type { Exam } from "@/lib/features/exam/examSlice";

type ExamListProps = {
  exams: Exam[];
};

export function ExamList({ exams }: ExamListProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {exams.map((exam) => (
        <Link
          className="grid h-[136px] place-items-center rounded-2xl bg-white/90 px-5 py-5 text-center shadow-[0_1px_0_rgba(15,23,42,0.02)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
          href={`/exams/${exam.id}`}
          key={exam.id}
        >
          <span className={`grid h-10 w-10 place-items-center rounded-xl text-[24px] font-black ${exam.accent}`}>
            {exam.icon}
          </span>
          <span className="mt-3 text-[13px] font-black text-slate-950">{exam.subject}</span>
        </Link>
      ))}
    </div>
  );
}
