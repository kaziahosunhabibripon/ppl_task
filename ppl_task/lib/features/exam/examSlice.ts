import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { exams } from "@/lib/data/exams";
import type { Exam, ExamResult, ExamSession } from "@/lib/features/exam/examTypes";

type ExamState = {
  exams: Exam[];
  results: ExamResult[];
  sessions: Record<string, ExamSession>;
};

type ConfigureChaptersPayload = {
  examId: string;
  selectedChapters: string[];
};

type ConfigureSetupPayload = {
  examId: string;
  questionCount: number;
  questionType: ExamSession["questionType"];
};

type StartExamPayload = {
  examId: string;
  startedAt: string;
};

type SubmitExamPayload = {
  id: string;
  userId: string;
  examId: string;
  answers: Record<string, string>;
  submittedAt: string;
};

const createDefaultSession = (exam: Exam): ExamSession => ({
  examId: exam.id,
  selectedChapters: exam.chapters,
  questionCount: Math.min(12, exam.questions.length),
  questionType: "MCQ",
  startedAt: null,
});

export const getSessionQuestions = (exam: Exam, session?: ExamSession) => {
  if (!session) {
    return exam.questions;
  }

  const chapterQuestions = exam.questions.filter((question) =>
    session.selectedChapters.includes(question.chapter),
  );
  const availableQuestions = chapterQuestions.length > 0 ? chapterQuestions : exam.questions;

  return availableQuestions.slice(0, Math.min(session.questionCount, availableQuestions.length));
};

const initialState: ExamState = {
  exams,
  results: [],
  sessions: exams.reduce<Record<string, ExamSession>>((sessions, exam) => {
    sessions[exam.id] = createDefaultSession(exam);
    return sessions;
  }, {}),
};

const getSession = (state: ExamState, exam: Exam) => {
  state.sessions[exam.id] ??= createDefaultSession(exam);
  return state.sessions[exam.id];
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    configureChapters: (state, action: PayloadAction<ConfigureChaptersPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      const session = getSession(state, exam);
      const selectedChapters = action.payload.selectedChapters;
      const availableQuestionCount = exam.questions.filter((question) =>
        selectedChapters.includes(question.chapter),
      ).length;

      session.selectedChapters = selectedChapters;
      session.questionCount = Math.min(
        Math.max(1, session.questionCount),
        Math.max(1, availableQuestionCount),
      );
    },
    configureSetup: (state, action: PayloadAction<ConfigureSetupPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      const session = getSession(state, exam);
      const availableQuestionCount = exam.questions.filter((question) =>
        session.selectedChapters.includes(question.chapter),
      ).length;

      session.questionCount = Math.min(
        Math.max(1, action.payload.questionCount),
        Math.max(1, availableQuestionCount || exam.questions.length),
      );
      session.questionType = action.payload.questionType;
    },
    startExam: (state, action: PayloadAction<StartExamPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      getSession(state, exam).startedAt = action.payload.startedAt;
    },
    submitExam: (state, action: PayloadAction<SubmitExamPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      const session = getSession(state, exam);
      const questions = getSessionQuestions(exam, session);
      const score = questions.reduce((total, question) => {
        return total + (action.payload.answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);
      const startedAt = session.startedAt
        ? new Date(session.startedAt).getTime()
        : new Date(action.payload.submittedAt).getTime();
      const submittedAt = new Date(action.payload.submittedAt).getTime();

      state.results.push({
        id: action.payload.id,
        userId: action.payload.userId,
        examId: action.payload.examId,
        answers: action.payload.answers,
        questionIds: questions.map((question) => question.id),
        score,
        total: questions.length,
        submittedAt: action.payload.submittedAt,
        durationSeconds: Math.max(0, Math.round((submittedAt - startedAt) / 1000)),
      });
    },
  },
});

export const { configureChapters, configureSetup, startExam, submitExam } =
  examSlice.actions;

export type { Exam, ExamQuestion, ExamResult, ExamSession } from "@/lib/features/exam/examTypes";

export default examSlice.reducer;
