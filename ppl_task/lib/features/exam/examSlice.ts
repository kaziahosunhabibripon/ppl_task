import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ExamQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  questions: ExamQuestion[];
};

export type ExamResult = {
  id: string;
  userId: string;
  examId: string;
  answers: Record<string, string>;
  score: number;
  total: number;
  submittedAt: string;
};

type ExamState = {
  exams: Exam[];
  results: ExamResult[];
};

type SubmitExamPayload = {
  userId: string;
  examId: string;
  answers: Record<string, string>;
};

const initialState: ExamState = {
  exams: [
    {
      id: "frontend-basics",
      title: "Frontend Fundamentals",
      subject: "React and Web",
      durationMinutes: 15,
      questions: [
        {
          id: "q1",
          prompt: "Which hook is commonly used to store local component state?",
          options: ["useMemo", "useState", "useRouter", "usePathname"],
          correctAnswer: "useState",
        },
        {
          id: "q2",
          prompt: "What does TailwindCSS primarily provide?",
          options: [
            "Database queries",
            "Utility-first CSS classes",
            "Server hosting",
            "Email delivery",
          ],
          correctAnswer: "Utility-first CSS classes",
        },
        {
          id: "q3",
          prompt: "In Redux Toolkit, which helper creates reducers and actions together?",
          options: ["createSlice", "createRoute", "createPage", "createClient"],
          correctAnswer: "createSlice",
        },
      ],
    },
    {
      id: "next-routing",
      title: "Next.js Routing",
      subject: "App Router",
      durationMinutes: 12,
      questions: [
        {
          id: "q1",
          prompt: "Which directory is used for App Router routes in this project?",
          options: ["pages", "routes", "app", "views"],
          correctAnswer: "app",
        },
        {
          id: "q2",
          prompt: "What directive marks a component as a Client Component?",
          options: ["use server", "use client", "client only", "next client"],
          correctAnswer: "use client",
        },
        {
          id: "q3",
          prompt: "Which package provides the Link component for navigation?",
          options: ["react-router", "next/navigation", "next/link", "redux"],
          correctAnswer: "next/link",
        },
      ],
    },
  ],
  results: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    submitExam: (state, action: PayloadAction<SubmitExamPayload>) => {
      const exam = state.exams.find((item) => item.id === action.payload.examId);

      if (!exam) {
        return;
      }

      const score = exam.questions.reduce((total, question) => {
        return total + (action.payload.answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);

      state.results.push({
        id: crypto.randomUUID(),
        userId: action.payload.userId,
        examId: action.payload.examId,
        answers: action.payload.answers,
        score,
        total: exam.questions.length,
        submittedAt: new Date().toISOString(),
      });
    },
  },
});

export const { submitExam } = examSlice.actions;

export default examSlice.reducer;
