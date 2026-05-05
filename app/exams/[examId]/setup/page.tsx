"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { PageHeading } from "@/components/molecules/PageHeading";
import { ExamSetupPanel } from "@/components/organisms/ExamSetupPanel";
import { AppTemplate } from "@/components/templates/AppTemplate";
import { useAppSelector } from "@/lib/hooks";

export default function ExamSetupPage() {
  const router = useRouter();
  const params = useParams<{ examId: string }>();
  const exam = useAppSelector((state) =>
    state.exam.exams.find((item) => item.id === params.examId),
  );
  const session = useAppSelector((state) =>
    params.examId ? state.exam.sessions[params.examId] : undefined,
  );

  if (!exam || !session) {
    return (
      <AppTemplate>
        <div className="grid gap-4">
          <PageHeading title="পরীক্ষা পাওয়া যায়নি">তালিকা থেকে একটি পরীক্ষা বেছে নাও।</PageHeading>
          <Button onClick={() => router.push("/exams")} variant="secondary">
            ফিরে যাও
          </Button>
        </div>
      </AppTemplate>
    );
  }

  return (
    <AppTemplate>
      <ExamSetupPanel exam={exam} session={session} />
    </AppTemplate>
  );
}
