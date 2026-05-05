import type { Exam, ExamQuestion, ExamSession } from "@/lib/features/exam/examTypes";

const normalizeAnswer = (value: string) => value.trim().toLowerCase();

export function getAvailableQuestions(
  exam: Exam,
  selectedChapters: ExamSession["selectedChapters"],
) {
  if (selectedChapters.length === 0) {
    return exam.questions;
  }

  const selected = new Set(selectedChapters);

  return exam.questions.filter(
    (question) =>
      selected.has(question.chapter) ||
      (question.paper ? selected.has(question.paper) : false),
  );
}

export function getSessionQuestions(exam: Exam, session: ExamSession) {
  const availableQuestions = getAvailableQuestions(exam, session.selectedChapters);
  const safeCount = Math.min(
    Math.max(1, session.questionCount),
    Math.max(1, availableQuestions.length),
  );

  return availableQuestions.slice(0, safeCount);
}

export function getQuestionTypeLabel(questionType: ExamSession["questionType"]) {
  return questionType === "WRITTEN" ? "লিখিত" : "বহুনির্বাচনি";
}

export function isCorrectAnswer(question: ExamQuestion, answer?: string) {
  if (!answer) {
    return false;
  }

  return normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
}
