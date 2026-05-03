"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import type { Exam } from "@/lib/features/exam/examSlice";

type ExamSetupPanelProps = {
  exam: Exam;
};

export function ExamSetupPanel({ exam }: ExamSetupPanelProps) {
  const router = useRouter();

  return (
    <div className="grid min-h-[calc(100vh-3rem)] grid-rows-[auto_1fr_auto] gap-5">
      <div className="grid gap-3">
        <p className="text-sm font-bold text-slate-900">মক টেস্ট <span className="text-slate-400">›</span> {exam.subject}</p>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-bold text-slate-900">নির্বাচন কর</h1>
          <span className="text-xs font-semibold text-slate-700">২/৩ সেট</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <span className="h-1 rounded-full bg-fuchsia-700" />
          <span className="h-1 rounded-full bg-fuchsia-700" />
          <span className="h-1 rounded-full bg-white" />
        </div>
      </div>

      <section className="rounded-2xl bg-white/70 p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-bold text-slate-900">প্রশ্নের ধরন</p>
            <div className="grid grid-cols-2 rounded-xl bg-white p-1">
              <button className="h-11 rounded-lg bg-fuchsia-700 text-sm font-bold text-white" type="button">
                MCQ
              </button>
              <button className="h-11 rounded-lg text-sm font-bold text-slate-400" type="button">
                WRITTEN
              </button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-slate-900">মোট সময়</p>
            <div className="flex h-12 items-center rounded-xl bg-white px-4 text-sm font-semibold text-slate-500">
              {exam.durationMinutes} মিনিট
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-600">
          <li>• প্রতিটি MCQ প্রশ্নের জন্য চারটি করে অপশন থাকবে।</li>
          <li>• প্রতিটি প্রশ্নের সঠিক উত্তর নির্বাচন করলে স্কোর যোগ হবে।</li>
          <li>• পরীক্ষা শেষে সঠিক, ভুল ও অনুত্তরিত উত্তর দেখা যাবে।</li>
          <li>• নির্ধারিত সময়ের মধ্যে পরীক্ষা শেষ করার অনুশীলন কর।</li>
        </ul>
      </section>

      <div className="-mx-4 flex justify-end border-t border-slate-200 bg-white px-4 py-4 lg:-mx-10 lg:px-10">
        <Button className="h-12 min-h-12 w-full sm:w-64" onClick={() => router.push(`/exams/${exam.id}/take`)}>
          পরীক্ষা শুরু কর →
        </Button>
      </div>
    </div>
  );
}
