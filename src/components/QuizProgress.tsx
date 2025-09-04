import React from 'react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  timeRemaining
}) => {
  const progressPercentage = ((currentQuestion) / totalQuestions) * 100;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="quiz-progress">
      <div className="progress-info">
        <span className="question-counter">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        {timeRemaining !== undefined && (
          <span className="timer">
            Time: {formatTime(timeRemaining)}
          </span>
        )}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgress;
