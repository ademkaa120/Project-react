export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: { questionId: number; selectedAnswer: number; isCorrect: boolean }[];
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: { [questionId: number]: number };
  showResult: boolean;
  timeRemaining?: number;
}
