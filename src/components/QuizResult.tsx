import React from 'react';
import { QuizResult as QuizResultType, Question } from '../types/Quiz';

interface QuizResultProps {
  result: QuizResultType;
  questions: Question[];
  onRestart: () => void;
  onReview: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  result,
  questions,
  onRestart,
  onReview
}) => {
  const getScoreMessage = (percentage: number): string => {
    if (percentage >= 90) return "Excellent! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Good work! 👍";
    if (percentage >= 60) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return "excellent";
    if (percentage >= 60) return "good";
    return "needs-improvement";
  };

  return (
    <div className="quiz-result">
      <div className="result-header">
        <h1>Quiz Completed!</h1>
        <div className={`score-display ${getScoreColor(result.percentage)}`}>
          <div className="score-number">
            {result.score}/{result.totalQuestions}
          </div>
          <div className="score-percentage">
            {result.percentage.toFixed(1)}%
          </div>
        </div>
        <p className="score-message">{getScoreMessage(result.percentage)}</p>
      </div>

      <div className="result-summary">
        <div className="summary-item">
          <span className="label">Correct Answers:</span>
          <span className="value correct">{result.score}</span>
        </div>
        <div className="summary-item">
          <span className="label">Incorrect Answers:</span>
          <span className="value incorrect">{result.totalQuestions - result.score}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Questions:</span>
          <span className="value">{result.totalQuestions}</span>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn btn-primary" onClick={onRestart}>
          🔄 Take Quiz Again
        </button>
        <button className="btn btn-secondary" onClick={onReview}>
          📋 Review Answers
        </button>
      </div>

      <div className="quick-review">
        <h3>Quick Review:</h3>
        <div className="review-grid">
          {result.answers.map((answer, index) => (
            <div 
              key={answer.questionId} 
              className={`review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <span className="question-number">Q{index + 1}</span>
              <span className="result-icon">
                {answer.isCorrect ? '✅' : '❌'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
