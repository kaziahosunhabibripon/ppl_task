"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { configureChapters, configureSetup, getSessionQuestions } from "@/lib/features/exam/examSlice";
import type { Exam, ExamSession } from "@/lib/features/exam/examSlice";
import { useAppDispatch } from "@/lib/hooks";

type ChapterSelectionProps = {
  exam: Exam;
  session: ExamSession;
};

export function ChapterSelection({ exam, session }: ChapterSelectionProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const columns = useMemo(() => {
    const middle = Math.ceil(exam.chapters.length / 2);
    return [exam.chapters.slice(0, middle), exam.chapters.slice(middle)];
  }, [exam.chapters]);
  const availableQuestionCount = getSessionQuestions(exam, session).length;
  const hasSelectedChapters = session.selectedChapters.length > 0;

  const toggle = (chapter: string) => {
    dispatch(
      configureChapters({
        examId: exam.id,
        selectedChapters: session.selectedChapters.includes(chapter)
          ? session.selectedChapters.filter((item) => item !== chapter)
          : [...session.selectedChapters, chapter],
      }),
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-3rem)] grid-rows-[auto_1fr_auto] gap-5 pt-2">
      <div className="grid gap-3">
        <p className="text-[13px] font-bold text-slate-950">
          পরীক্ষা দাও <span className="px-2 text-slate-400">›</span> {exam.subject}
        </p>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[14px] font-black text-slate-950">
            কোন কোন চ্যাপ্টারের উপর পরীক্ষা দিতে চাও ?
          </h1>
          <span className="text-[11px] font-semibold text-slate-700">৯/৯ টি</span>
        </div>
        <ProgressBar active={1} />
      </div>

      <div className="grid content-start gap-4 lg:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div className="overflow-hidden rounded-xl bg-white/58 shadow-[0_1px_0_rgba(15,23,42,0.03)]" key={columnIndex}>
            {column.map((chapter, index) => {
              const checked = session.selectedChapters.includes(chapter);

              return (
                <button
                  className="flex h-14 w-full items-center justify-between border-b border-slate-200/70 px-5 text-left text-[12px] font-bold text-slate-900 transition last:border-b-0 hover:bg-white/80"
                  key={chapter}
                  onClick={() => toggle(chapter)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[13px] text-slate-700">{index % 3 === 0 ? "⌄" : "›"}</span>
                    {chapter}
                  </span>
                  <span
                    className={`grid h-4 w-4 place-items-center rounded border text-[9px] ${
                      checked
                        ? "border-[#9d00df] bg-[#9d00df] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="-mx-4 flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-5 sm:flex-row sm:items-end sm:justify-between lg:-mx-12 lg:px-12">
        <label className="grid gap-1 text-[11px] font-medium text-slate-700">
          প্রশ্ন সংখ্যা
          <input
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-[12px] text-slate-950 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100 sm:w-[260px]"
            max={availableQuestionCount}
            min={1}
            onChange={(event) =>
              dispatch(
                configureSetup({
                  examId: exam.id,
                  questionCount: Number(event.target.value),
                  questionType: session.questionType,
                }),
              )
            }
            type="number"
            value={session.questionCount}
          />
        </label>
        <button
          className="h-12 rounded-md bg-[#9200bd] px-10 text-[12px] font-bold text-white transition hover:bg-[#7c00a2] disabled:cursor-not-allowed disabled:opacity-50 sm:w-[212px]"
          disabled={!hasSelectedChapters}
          onClick={() => router.push(`/exams/${exam.id}/setup`)}
          type="button"
        >
          পরীক্ষা দাও
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ active }: { active: number }) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {[0, 1, 2].map((item) => (
        <span
          className={`h-1 rounded-full ${item < active ? "bg-[#9d00df]" : "bg-white"}`}
          key={item}
        />
      ))}
    </div>
  );
}
