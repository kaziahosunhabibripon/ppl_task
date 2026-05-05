export type ExamQuestion = {
  id: string;
  chapter: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  icon: string;
  accent: string;
  durationMinutes: number;
  chapters: string[];
  questions: ExamQuestion[];
};

export type ExamSession = {
  examId: string;
  selectedChapters: string[];
  questionCount: number;
  questionType: "MCQ" | "WRITTEN";
  startedAt: string | null;
};

export type ExamResult = {
  id: string;
  userId: string;
  examId: string;
  answers: Record<string, string>;
  questionIds: string[];
  score: number;
  total: number;
  submittedAt: string;
  durationSeconds: number;
};
