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
          <PageHeading title="ফলাফল পাওয়া যায়নি">
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
      <ResultSummary exam={exam} result={result} />
    </AppTemplate>
  );
}
