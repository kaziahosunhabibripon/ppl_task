import Link from "next/link";

import type { Exam } from "@/lib/features/exam/examSlice";

type ExamListProps = {
  exams: Exam[];
};

const examOrder = ["physics", "chemistry", "biology", "math", "botany", "zoology", "ict", "bangla"];

export function ExamList({ exams }: ExamListProps) {
  const orderedExams = [...exams].sort((first, second) => {
    const firstIndex = examOrder.indexOf(first.id);
    const secondIndex = examOrder.indexOf(second.id);

    return (firstIndex === -1 ? exams.length : firstIndex) - (secondIndex === -1 ? exams.length : secondIndex);
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {orderedExams.map((exam) => (
        <Link
          className="group grid min-h-28 place-items-center rounded-2xl bg-white/90 px-5 py-5 text-center shadow-sm ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:shadow-md"
          href={`/exams/${exam.id}`}
          key={exam.id}
        >
          <span className={`grid h-10 w-10 place-items-center rounded-xl text-lg font-black ${exam.accent}`}>
            {exam.icon}
          </span>
          <span className="mt-3 text-sm font-extrabold text-slate-950 group-hover:text-fuchsia-800">
            {exam.subject}
          </span>
        </Link>
      ))}
    </div>
  );
}
