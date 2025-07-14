import React, { useState, useEffect } from 'react';
import './QuestionPanel.css';

function QuestionPanel({ questions = [] }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  // Set first question on load
  useEffect(() => {
    if (questions.length > 0 && !currentQuestion) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions, currentQuestion]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
    }
  };

  const handlePrevQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    if (currentIndex > 0) {
      setCurrentQuestion(questions[currentIndex - 1]);
    }
  };

  if (!currentQuestion) return <div>Loading questions...</div>;

  return (
    <div className="question-panel">
      <div className="question-header">
        <h3>Question {questions.findIndex(q => q.id === currentQuestion.id) + 1}/{questions.length}</h3>
        <div className="timer">Time Remaining: {formatTime(timeLeft)}</div>
      </div>
      
      <div className="question-content">
        <h4>{currentQuestion.title}</h4>
        <p>{currentQuestion.description}</p>
        
        {currentQuestion.examples && (
          <div className="examples">
            <h5>Examples:</h5>
            {currentQuestion.examples.map((ex, i) => (
              <div key={i} className="example">
                <p>Input: {ex.input}</p>
                <p>Output: {ex.output}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="question-navigation">
        <button onClick={handlePrevQuestion} disabled={questions[0].id === currentQuestion.id}>
          Previous
        </button>
        <button onClick={handleNextQuestion} disabled={questions[questions.length - 1].id === currentQuestion.id}>
          Next
        </button>
      </div>
    </div>
  );
}

export default QuestionPanel;