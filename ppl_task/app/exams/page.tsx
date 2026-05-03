"use client";

import { ExamList } from "@/components/organisms/ExamList";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { useAppSelector } from "@/lib/hooks";

export default function ExamsPage() {
  const exams = useAppSelector((state) => state.exam.exams);

  return (
    <AppTemplate>
      <div className="grid gap-5">
        <p className="text-sm font-bold text-slate-900">পরীক্ষা দাও</p>
        <h1 className="text-lg font-bold text-slate-950">কি বিষয়ের পরীক্ষা দিতে চাও?</h1>
        <ExamList exams={exams} />
      </div>
    </AppTemplate>
  );
}
