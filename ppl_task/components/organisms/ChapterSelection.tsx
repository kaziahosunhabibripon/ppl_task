"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { configureChapters } from "@/lib/features/exam/examSlice";
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
    <div className="grid min-h-[calc(100vh-3rem)] grid-rows-[auto_1fr_auto] gap-5">
      <div className="grid gap-3">
        <p className="text-sm font-bold text-slate-900">পরীক্ষা দাও <span className="text-slate-400">›</span> {exam.subject}</p>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-sm font-bold text-slate-900">কোন কোন চ্যাপ্টারের উপর পরীক্ষা দিতে চাও?</h1>
          <span className="text-xs font-semibold text-slate-700">১/৯ সেট</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <span className="h-1 rounded-full bg-fuchsia-700" />
          <span className="h-1 rounded-full bg-white" />
          <span className="h-1 rounded-full bg-white" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div className="rounded-2xl bg-white/75 p-4 shadow-sm" key={columnIndex}>
            {column.map((chapter, index) => {
              const checked = session.selectedChapters.includes(chapter);

              return (
                <button
                  className="flex w-full items-center justify-between border-b border-slate-100 py-3 text-left text-sm font-semibold text-slate-900 last:border-b-0"
                  key={chapter}
                  onClick={() => toggle(chapter)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-slate-400">{index % 3 === 0 ? "⌄" : "›"}</span>
                    {chapter}
                  </span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-md border text-[10px] ${
                      checked ? "border-fuchsia-700 bg-fuchsia-700 text-white" : "border-slate-300 bg-white"
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

      <div className="-mx-4 flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:-mx-10 lg:px-10">
        <label className="grid gap-1 text-xs font-semibold text-slate-700">
          প্রশ্ন সংখ্যা
          <input
            className="h-10 w-72 rounded-lg border border-slate-200 px-3 text-sm"
            readOnly
            value={session.questionCount}
          />
        </label>
        <Button className="h-12 min-h-12 w-full sm:w-64" onClick={() => router.push(`/exams/${exam.id}/setup`)}>
          পরীক্ষা দাও
        </Button>
      </div>
    </div>
  );
}
