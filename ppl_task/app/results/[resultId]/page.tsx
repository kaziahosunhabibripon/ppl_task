"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { PageHeading } from "@/components/molecules/PageHeading";
import { ResultSummary } from "@/components/organisms/ResultSummary";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { useAppSelector } from "@/lib/hooks";

export default function ResultPage() {
  const router = useRouter();
  const params = useParams<{ resultId: string }>();
  const result = useAppSelector((state) => {
    if (params.resultId === "latest") {
      return state.exam.results.at(-1);
    }

    return state.exam.results.find((item) => item.id === params.resultId);
  });
  const exam = useAppSelector((state) =>
    result ? state.exam.exams.find((item) => item.id === result.examId) : undefined,
  );

  if (!result || !exam) {
    return (
      <AppTemplate>
        <div className="grid gap-4">
          <PageHeading title="Result not found">
            আগে একটি পরীক্ষা সাবমিট কর, তারপর ফলাফল দেখা যাবে।
          </PageHeading>
          <Button onClick={() => router.push("/exams")} variant="secondary">
            ফিরে যাও
          </Button>
        </div>
      </AppTemplate>
    );
  }

  return (
    <AppTemplate>
      <div className="grid gap-5 pt-2">
        <div>
          <h1 className="text-[15px] font-black text-slate-950">
            মক পরীক্ষা ({exam.subject})
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold text-slate-500">
            <span>▣ ফলাফল</span>
            <span>▣ {result.total} টি</span>
            <span>◷ {exam.durationMinutes} মিনিট</span>
          </p>
        </div>
        <ResultSummary exam={exam} result={result} />
      </div>
    </AppTemplate>
  );
}
