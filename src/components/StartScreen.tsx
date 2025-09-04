import React from 'react';

interface StartScreenProps {
  onStartQuiz: () => void;
  totalQuestions: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz, totalQuestions }) => {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="quiz-title">🧠 Quiz Game</h1>
        <div className="quiz-description">
          <p>Test your knowledge with our fun and challenging quiz!</p>
          <div className="quiz-info">
            <div className="info-item">
              <span className="icon">📝</span>
              <span>{totalQuestions} Questions</span>
            </div>
            <div className="info-item">
              <span className="icon">⏱️</span>
              <span>No Time Limit</span>
            </div>
            <div className="info-item">
              <span className="icon">🎯</span>
              <span>Multiple Choice</span>
            </div>
          </div>
        </div>
        <div className="quiz-instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Read each question carefully</li>
            <li>Select the best answer from the options</li>
            <li>You can review your answers at the end</li>
            <li>Good luck and have fun!</li>
          </ul>
        </div>
        <button className="btn btn-start" onClick={onStartQuiz}>
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
