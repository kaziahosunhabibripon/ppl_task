"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ExamList } from "@/components/organisms/ExamList";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { useAppSelector } from "@/lib/hooks";

export default function ExamsPage() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const exams = useAppSelector((state) => state.exam.exams);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

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
