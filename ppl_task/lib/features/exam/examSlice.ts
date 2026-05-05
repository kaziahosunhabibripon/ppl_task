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

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    configureChapters: (state, action: PayloadAction<ConfigureChaptersPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      getSession(state, exam).selectedChapters = action.payload.selectedChapters;
    },
    configureSetup: (state, action: PayloadAction<ConfigureSetupPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      const session = getSession(state, exam);
      session.questionCount = Math.max(1, action.payload.questionCount);
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
      const score = exam.questions.reduce((total, question) => {
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
        score,
        total: exam.questions.length,
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
