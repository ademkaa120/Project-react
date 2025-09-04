import React, { useState, useEffect } from 'react';
import { Question, QuizResult as QuizResultType, QuizState } from '../types/Quiz';
import { quizQuestions } from '../data/quizData';
import StartScreen from './StartScreen';
import QuestionCard from './QuestionCard';
import QuizProgress from './QuizProgress';
import QuizResult from './QuizResult';

const Quiz: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showResult: false,
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizQuestions.length - 1;

  const startQuiz = () => {
    setGameStarted(true);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      showResult: false,
    });
    setShowReview(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [currentQuestion.id]: answerIndex
      }
    }));
  };

  const goToNextQuestion = () => {
    
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const goToPreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const finishQuiz = () => {
    setQuizState(prev => ({ ...prev, showResult: true }));
  };

  const calculateResult = (): QuizResultType => {
    const answers = quizQuestions.map(question => {
      const selectedAnswer = quizState.selectedAnswers[question.id] ?? -1;
      const isCorrect = selectedAnswer === question.correctAnswer;
      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect
      };
    });

    const score = answers.filter(answer => answer.isCorrect).length;
    const percentage = (score / quizQuestions.length) * 100;

    return {
      score,
      totalQuestions: quizQuestions.length,
      percentage,
      answers
    };
  };

  const restartQuiz = () => {
    setGameStarted(false);
    setShowReview(false);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      showResult: false,
    });
  };

  const reviewAnswers = () => {
    setShowReview(true);
    setQuizState(prev => ({ ...prev, currentQuestionIndex: 0 }));
  };

  const getCurrentSelectedAnswer = () => {
    return quizState.selectedAnswers[currentQuestion.id] ?? null;
  };

  if (!gameStarted) {
    return <StartScreen onStartQuiz={startQuiz} totalQuestions={quizQuestions.length} />;
  }

  if (quizState.showResult && !showReview) {
    const result = calculateResult();
    return (
      <QuizResult
        result={result}
        questions={quizQuestions}
        onRestart={restartQuiz}
        onReview={reviewAnswers}
      />
    );
  }

  return (
    <div className="quiz-container">
      <QuizProgress
        currentQuestion={quizState.currentQuestionIndex}
        totalQuestions={quizQuestions.length}
      />
      
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={getCurrentSelectedAnswer()}
        onAnswerSelect={handleAnswerSelect}
        showResult={showReview}
      />

      <div className="quiz-navigation">
        <button
          className="btn btn-secondary"
          onClick={goToPreviousQuestion}
          disabled={quizState.currentQuestionIndex === 0}
        >
          ← Previous
        </button>

        {showReview ? (
          <div className="review-navigation">
            <span className="review-indicator">Review Mode</span>
            {quizState.currentQuestionIndex === quizQuestions.length - 1 ? (
              <button className="btn btn-primary" onClick={restartQuiz}>
                🏠 Back to Start
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={goToNextQuestion}>
                Next →
              </button>
            )}
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={goToNextQuestion}
            disabled={getCurrentSelectedAnswer() === null}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
