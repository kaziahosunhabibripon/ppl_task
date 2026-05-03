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
  icon: string;
  accent: string;
  durationMinutes: number;
  chapters: string[];
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
      id: "chemistry",
      title: "মক পরীক্ষা (রসায়ন)",
      subject: "রসায়ন",
      icon: "ক",
      accent: "bg-amber-100 text-amber-600",
      durationMinutes: 30,
      chapters: [
        "১ম পত্র",
        "মৌলের পর্যায়বৃত্ত ধর্ম",
        "গ্যাস",
        "গ্যাসের সূত্রাবলি",
        "রাসায়নিক বন্ধন",
        "পরিবেশ রসায়ন",
        "২য় পত্র",
        "জৈব রসায়ন",
        "অ্যালডিহাইড ও কিটোন",
        "কার্বক্সিলিক এসিড",
      ],
      questions: [
        {
          id: "q1",
          prompt:
            "একটি যৌগে কার্বনের শতকরা সংযোজন 46.6। এর আণবিক ভর 250। যৌগটির সংকেত কোনটি?",
          options: ["46 J", "77 J", "44 J", "78 J"],
          correctAnswer: "44 J",
        },
        {
          id: "q2",
          prompt: "জাতীয় সমস্যা সমাধানে ব্যবহারের জন্য নিচের কোনটি আদর্শ নমুনা?",
          options: ["অম্ল", "অ্যামোনিয়া", "বাফার", "লবণ"],
          correctAnswer: "বাফার",
        },
        {
          id: "q3",
          prompt: "কোনটির তাপমাত্রা সবচেয়ে বেশি?",
          options: ["সিট", "গ্লাস প্লেট", "আয়নমণ্ডল", "ইলেকট্রন"],
          correctAnswer: "আয়নমণ্ডল",
        },
        {
          id: "q4",
          prompt:
            "একটি বস্তু 1200 K তাপমাত্রায় উত্তপ্ত করা হলো। 100 K তাপমাত্রার বস্তু অপেক্ষা কত গুণ বেশি তাপীয় শক্তি প্রদর্শন করবে?",
          options: ["80 K", "70 K", "50 K", "60 K"],
          correctAnswer: "50 K",
        },
      ],
    },
    {
      id: "biology",
      title: "মক পরীক্ষা (জীববিজ্ঞান)",
      subject: "জীববিজ্ঞান",
      icon: "A",
      accent: "bg-emerald-100 text-emerald-600",
      durationMinutes: 25,
      chapters: ["কোষ ও টিস্যু", "জীবপ্রযুক্তি", "জিনতত্ত্ব", "উদ্ভিদ শারীরতত্ত্ব"],
      questions: [
        {
          id: "q1",
          prompt: "কোষের শক্তিঘর বলা হয় কাকে?",
          options: ["রাইবোসোম", "মাইটোকন্ড্রিয়া", "নিউক্লিয়াস", "গলজি বডি"],
          correctAnswer: "মাইটোকন্ড্রিয়া",
        },
        {
          id: "q2",
          prompt: "DNA এর পূর্ণরূপ কোনটি?",
          options: ["ডাই অক্সি নিউক্লিক এসিড", "ডাইনামিক এসিড", "ডাবল এসিড", "ডাই নাইট্রোজেন"],
          correctAnswer: "ডাই অক্সি নিউক্লিক এসিড",
        },
        {
          id: "q3",
          prompt: "সালোকসংশ্লেষণ কোথায় ঘটে?",
          options: ["ক্লোরোপ্লাস্ট", "নিউক্লিয়াস", "মাইটোকন্ড্রিয়া", "রাইবোসোম"],
          correctAnswer: "ক্লোরোপ্লাস্ট",
        },
      ],
    },
    {
      id: "physics",
      title: "মক পরীক্ষা (পদার্থবিজ্ঞান)",
      subject: "পদার্থবিজ্ঞান",
      icon: "⦿",
      accent: "bg-pink-100 text-pink-600",
      durationMinutes: 30,
      chapters: ["ভৌত জগৎ", "ভেক্টর", "নিউটনিয়ান বলবিদ্যা", "কাজ, শক্তি ও ক্ষমতা"],
      questions: [
        {
          id: "q1",
          prompt: "ত্বরণের একক কোনটি?",
          options: ["m/s", "m/s²", "kg", "N"],
          correctAnswer: "m/s²",
        },
        {
          id: "q2",
          prompt: "বল নির্ণয়ের সূত্র কোনটি?",
          options: ["F = ma", "E = mc", "P = VI", "v = u + at²"],
          correctAnswer: "F = ma",
        },
      ],
    },
    {
      id: "math",
      title: "মক পরীক্ষা (গণিত)",
      subject: "গণিত",
      icon: "∑",
      accent: "bg-blue-100 text-blue-600",
      durationMinutes: 20,
      chapters: ["ম্যাট্রিক্স", "সরলরেখা", "ত্রিকোণমিতি", "সম্ভাবনা"],
      questions: [
        {
          id: "q1",
          prompt: "২ + ৩ × ৪ = কত?",
          options: ["২০", "১৪", "২৪", "৯"],
          correctAnswer: "১৪",
        },
        {
          id: "q2",
          prompt: "sin 90° এর মান কত?",
          options: ["০", "১", "২", "-১"],
          correctAnswer: "১",
        },
      ],
    },
    {
      id: "botany",
      title: "মক পরীক্ষা (উদ্ভিদবিজ্ঞান)",
      subject: "উদ্ভিদবিজ্ঞান",
      icon: "✿",
      accent: "bg-violet-100 text-violet-600",
      durationMinutes: 20,
      chapters: ["উদ্ভিদ পরিচিতি", "টিস্যু", "প্রজনন", "শারীরতত্ত্ব"],
      questions: [
        {
          id: "q1",
          prompt: "উদ্ভিদের খাদ্য তৈরির প্রক্রিয়া কোনটি?",
          options: ["শ্বসন", "সালোকসংশ্লেষণ", "পরিপাক", "রেচন"],
          correctAnswer: "সালোকসংশ্লেষণ",
        },
      ],
    },
    {
      id: "zoology",
      title: "মক পরীক্ষা (প্রাণিবিজ্ঞান)",
      subject: "প্রাণিবিজ্ঞান",
      icon: "⚗",
      accent: "bg-orange-100 text-orange-600",
      durationMinutes: 20,
      chapters: ["প্রাণী পরিচিতি", "মানবদেহ", "রক্ত", "স্নায়ুতন্ত্র"],
      questions: [
        {
          id: "q1",
          prompt: "মানবদেহে রক্ত পাম্প করে কোন অঙ্গ?",
          options: ["ফুসফুস", "হৃদপিণ্ড", "কিডনি", "লিভার"],
          correctAnswer: "হৃদপিণ্ড",
        },
      ],
    },
    {
      id: "ict",
      title: "মক পরীক্ষা (আইসিটি)",
      subject: "আইসিটি",
      icon: "⌘",
      accent: "bg-teal-100 text-teal-600",
      durationMinutes: 15,
      chapters: ["ডেটা", "ওয়েব", "প্রোগ্রামিং", "ডাটাবেজ"],
      questions: [
        {
          id: "q1",
          prompt: "HTML কী ধরনের ভাষা?",
          options: ["মার্কআপ", "প্রোগ্রামিং", "ডাটাবেজ", "অপারেটিং"],
          correctAnswer: "মার্কআপ",
        },
      ],
    },
    {
      id: "bangla",
      title: "মক পরীক্ষা (বাংলা)",
      subject: "বাংলা",
      icon: "✺",
      accent: "bg-rose-100 text-rose-600",
      durationMinutes: 15,
      chapters: ["ব্যাকরণ", "গদ্য", "পদ্য", "নির্মিতি"],
      questions: [
        {
          id: "q1",
          prompt: "সন্ধি কোন বিষয়ের অংশ?",
          options: ["ব্যাকরণ", "গদ্য", "পদ্য", "উপন্যাস"],
          correctAnswer: "ব্যাকরণ",
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
