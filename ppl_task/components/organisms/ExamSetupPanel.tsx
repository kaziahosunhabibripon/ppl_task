"use client";

import { useRouter } from "next/navigation";

import { configureSetup, startExam } from "@/lib/features/exam/examSlice";
import type { Exam, ExamSession } from "@/lib/features/exam/examSlice";
import { useAppDispatch } from "@/lib/hooks";

type ExamSetupPanelProps = {
  exam: Exam;
  session: ExamSession;
};

const rules = [
  "প্রতিটি MCQ প্রশ্নে চারটি অপশন থাকবে, শুধু একটি সঠিক উত্তর নির্বাচন কর।",
  "প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর যোগ হবে।",
  "ভুল উত্তরের জন্য নম্বর কাটা হবে না।",
  "সাবমিট করার পর সঠিক, ভুল ও অনুত্তরিত উত্তর দেখা যাবে।",
  "নির্ধারিত সময়ের মধ্যে পরীক্ষা শেষ করার অনুশীলন কর।",
];

export function ExamSetupPanel({ exam, session }: ExamSetupPanelProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const start = () => {
    dispatch(startExam({ examId: exam.id, startedAt: new Date().toISOString() }));
    router.push(`/exams/${exam.id}/take`);
  };

  const setType = (questionType: ExamSession["questionType"]) => {
    dispatch(
      configureSetup({
        examId: exam.id,
        questionCount: session.questionCount,
        questionType,
      }),
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-3rem)] grid-rows-[auto_1fr_auto] gap-5 pt-2">
      <div className="grid gap-3">
        <p className="text-[13px] font-bold text-slate-950">
          মক টেস্ট <span className="px-2 text-slate-400">›</span> {exam.subject}
        </p>
        <div className="flex items-center justify-between">
          <h1 className="text-[14px] font-black text-slate-950">নির্বাচন কর</h1>
          <span className="text-[11px] font-semibold text-slate-700">২/৩ সেট</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <span className="h-1 rounded-full bg-[#9d00df]" />
          <span className="h-1 rounded-full bg-[#9d00df]" />
          <span className="h-1 rounded-full bg-[#9d00df]" />
        </div>
      </div>

      <section className="content-start rounded-2xl bg-white/50 p-7 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[13px] font-black text-slate-950">প্রশ্নের ধরন</p>
            <div className="grid grid-cols-2 rounded-xl bg-white p-1">
              <button
                className={`h-12 rounded-lg text-[12px] font-black transition ${
                  session.questionType === "MCQ" ? "bg-[#9d00df] text-white" : "text-slate-500"
                }`}
                onClick={() => setType("MCQ")}
                type="button"
              >
                MCQ
              </button>
              <button
                className={`h-12 rounded-lg text-[12px] font-black transition ${
                  session.questionType === "WRITTEN" ? "bg-[#9d00df] text-white" : "text-slate-500"
                }`}
                onClick={() => setType("WRITTEN")}
                type="button"
              >
                WRITTEN
              </button>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[13px] font-black text-slate-950">মোট সময়</p>
            <div className="flex h-12 items-center rounded-xl bg-white px-5 text-[12px] font-semibold text-slate-500">
              {exam.durationMinutes} মিনিট
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 text-[12px] leading-6 text-slate-700">
          {rules.map((rule) => (
            <li className="flex gap-3" key={rule}>
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="-mx-4 flex justify-end border-t border-slate-200 bg-white px-4 py-5 lg:-mx-12 lg:px-12">
        <button
          className="h-12 rounded-md bg-[#9200bd] px-10 text-[12px] font-bold text-white transition hover:bg-[#7c00a2] sm:w-[212px]"
          onClick={start}
          type="button"
        >
          পরীক্ষা শুরু কর →
        </button>
      </div>
    </div>
  );
}
