"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { configureSetup, startExam } from "@/lib/features/exam/examSlice";
import type { Exam, ExamSession } from "@/lib/features/exam/examSlice";
import { useAppDispatch } from "@/lib/hooks";
import { toBanglaNumber } from "@/lib/utils/banglaNumber";

type ExamSetupPanelProps = {
  exam: Exam;
  session: ExamSession;
};

type QuestionKind = {
  label: string;
  value: string;
  type: ExamSession["questionType"];
};

const questionKinds: QuestionKind[] = [
  { label: "বহুনির্বাচনি", value: "mcq", type: "MCQ" },
  { label: "জ্ঞান মূলক", value: "knowledge", type: "WRITTEN" },
  { label: "সৃজনশীল", value: "creative", type: "WRITTEN" },
  { label: "মেডিকেল", value: "medical", type: "MCQ" },
];

const rules = [
  "প্রতিটি বহুনির্বাচনি প্রশ্নের জন্য চারটি করে অপশন থাকবে।",
  "প্রতিটি প্রশ্নের সঠিক উত্তর নির্বাচন করলে স্কোর যোগ হবে।",
  "প্রতিটি ভুল উত্তরের জন্য ২৫% নম্বর কাটা যাবে।",
  "সময় শেষ হলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হবে।",
  "নির্ধারিত সময়ের মধ্যে পরীক্ষা শেষ করার অনুশীলন কর।",
  "উত্তর দেওয়ার সময় পৃষ্ঠা রিফ্রেশ করা থেকে বিরত থাকো।",
];

export function ExamSetupPanel({ exam, session }: ExamSetupPanelProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<"kind" | "details">("kind");
  const [selectedKind, setSelectedKind] = useState(questionKinds[0].value);

  const configureType = (questionType: ExamSession["questionType"]) => {
    dispatch(
      configureSetup({
        examId: exam.id,
        questionCount: session.questionCount,
        questionType,
      }),
    );
  };

  const chooseKind = (kind: QuestionKind) => {
    setSelectedKind(kind.value);
    configureType(kind.type);
  };

  const start = () => {
    dispatch(startExam({ examId: exam.id, startedAt: new Date().toISOString() }));
    router.push("/exams/" + exam.id + "/take");
  };

  if (step === "kind") {
    return (
      <div className="grid min-h-[calc(100vh-3rem)] grid-rows-[auto_1fr_auto] gap-5">
      <SetupHeader
        activeBars={2}
        eyebrow="পরীক্ষা দাও"
        progress={`২/${toBanglaNumber(exam.durationMinutes)} মিনিট`}
        subject={exam.subject}
        title="প্রশ্নের ধরন?"
      />

        <section className="grid content-start gap-4 sm:grid-cols-2">
          {questionKinds.map((kind) => {
            const checked = selectedKind === kind.value;

            return (
              <button
                className={`flex h-14 items-center justify-between rounded-xl bg-white/90 px-5 text-left text-sm font-bold text-slate-800 shadow-sm ring-1 ring-white/70 transition hover:bg-white ${
                  checked ? "ring-2 ring-fuchsia-600" : ""
                }`}
                key={kind.value}
                onClick={() => chooseKind(kind)}
                type="button"
              >
                {kind.label}
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${
                    checked ? "border-fuchsia-700 bg-fuchsia-700 text-white" : "border-slate-300 bg-white"
                  }`}
                >
                  {checked ? "●" : ""}
                </span>
              </button>
            );
          })}
        </section>

        <BottomBar>
          <Button className="h-12 min-h-12 w-full sm:w-64" onClick={() => setStep("details")}>পরীক্ষা দাও</Button>
        </BottomBar>
      </div>
    );
  }

  return (
    <div className="grid min-h-[calc(100vh-3rem)] grid-rows-[auto_1fr_auto] gap-5">
      <SetupHeader
        activeBars={3}
        eyebrow="মক টেস্ট"
        progress={`২/${toBanglaNumber(exam.durationMinutes)} মিনিট`}
        subject={exam.subject}
        title="নির্বাচন কর"
      />

      <section className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-white/70">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-extrabold text-slate-950">প্রশ্নের ধরন</p>
            <div className="grid grid-cols-2 rounded-xl bg-white p-1 shadow-inner">
              <button
                className={`h-11 rounded-lg text-sm font-extrabold transition ${
                  session.questionType === "MCQ" ? "bg-fuchsia-700 text-white" : "text-slate-400 hover:text-slate-700"
                }`}
                onClick={() => configureType("MCQ")}
                type="button"
              >
                বহুনির্বাচনি
              </button>
              <button
                className={`h-11 rounded-lg text-sm font-extrabold transition ${
                  session.questionType === "WRITTEN" ? "bg-fuchsia-700 text-white" : "text-slate-400 hover:text-slate-700"
                }`}
                onClick={() => configureType("WRITTEN")}
                type="button"
              >
                লিখিত
              </button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-extrabold text-slate-950">মোট সময়</p>
            <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-500">
              {toBanglaNumber(exam.durationMinutes)} মিনিট
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-600">
          {rules.map((rule) => (
            <li className="flex gap-2" key={rule}>
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <BottomBar>
        <Button className="h-12 min-h-12 w-full sm:w-64" onClick={start}>
          পরীক্ষা শুরু কর →
        </Button>
      </BottomBar>
    </div>
  );
}

function SetupHeader({
  activeBars,
  eyebrow,
  progress,
  subject,
  title,
}: {
  activeBars: number;
  eyebrow: string;
  progress: string;
  subject: string;
  title: string;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-extrabold text-slate-950">
        {eyebrow} <span className="text-slate-400">›</span> {subject}
      </p>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-sm font-bold text-slate-950">{title}</h1>
        <span className="text-xs font-bold text-slate-700">{progress}</span>
      </div>
      <div className="grid grid-cols-3 gap-5 pr-2">
        {[1, 2, 3].map((bar) => (
          <span className={`h-1.5 rounded-full ${bar <= activeBars ? "bg-fuchsia-700" : "bg-white"}`} key={bar} />
        ))}
      </div>
    </div>
  );
}

function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-4 flex justify-end border-t border-slate-200 bg-white px-4 py-4 shadow-[0_-10px_30px_rgba(15,23,42,0.04)] lg:-mx-9 lg:px-9">
      {children}
    </div>
  );
}
