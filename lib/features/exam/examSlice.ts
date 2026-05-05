import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { exams } from "@/lib/data/exams";
import type { Exam, ExamResult, ExamSession } from "@/lib/features/exam/examTypes";
import { getAvailableQuestions, getSessionQuestions, isCorrectAnswer } from "@/lib/features/exam/examUtils";

type ExamState = {
  exams: Exam[];
  results: ExamResult[];
  sessions: Record<string, ExamSession>;
};

type HydratedExamPayload = {
  results?: ExamResult[];
  sessions?: Record<string, ExamSession>;
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
  selectedChapters: exam.chapters.slice(0, 4),
  questionCount: Math.min(12, exam.questions.length),
  questionType: "MCQ",
  startedAt: null,
});

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

const normalizeSession = (exam: Exam, session?: ExamSession) => {
  const fallback = createDefaultSession(exam);

  if (!session) {
    return fallback;
  }

  const selectedChapters =
    session.selectedChapters.length > 0 ? session.selectedChapters : fallback.selectedChapters;
  const questionType = session.questionType ?? fallback.questionType;
  const startedAt = session.startedAt ?? null;
  const maxQuestions = Math.max(
    1,
    getAvailableQuestions(exam, selectedChapters).length,
  );

  return {
    examId: exam.id,
    selectedChapters,
    questionCount: Math.min(Math.max(1, session.questionCount), maxQuestions),
    questionType,
    startedAt,
  };
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
      session.selectedChapters = action.payload.selectedChapters;
      const availableQuestions = getAvailableQuestions(exam, session.selectedChapters);
      session.questionCount = Math.min(
        Math.max(1, session.questionCount),
        Math.max(1, availableQuestions.length),
      );
    },
    configureSetup: (state, action: PayloadAction<ConfigureSetupPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      const session = getSession(state, exam);
      const maxQuestions = Math.max(
        1,
        getAvailableQuestions(exam, session.selectedChapters).length,
      );
      session.questionCount = Math.min(
        Math.max(1, action.payload.questionCount),
        maxQuestions,
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
      const selectedQuestions = getSessionQuestions(exam, session);
      const score = selectedQuestions.reduce((total, question) => {
        return total + (isCorrectAnswer(question, action.payload.answers[question.id]) ? 1 : 0);
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
        questionIds: selectedQuestions.map((question) => question.id),
        questionType: session.questionType,
        score,
        total: selectedQuestions.length,
        submittedAt: action.payload.submittedAt,
        durationSeconds: Math.max(0, Math.round((submittedAt - startedAt) / 1000)),
      });
    },
    hydrateExamState: (state, action: PayloadAction<HydratedExamPayload>) => {
      state.results = action.payload.results ?? [];
      state.sessions = state.exams.reduce<Record<string, ExamSession>>((sessions, exam) => {
        sessions[exam.id] = normalizeSession(
          exam,
          action.payload.sessions?.[exam.id],
        );
        return sessions;
      }, {});
    },
  },
});

export const {
  configureChapters,
  configureSetup,
  hydrateExamState,
  startExam,
  submitExam,
} =
  examSlice.actions;

export type { Exam, ExamQuestion, ExamResult, ExamSession } from "@/lib/features/exam/examTypes";

export default examSlice.reducer;
