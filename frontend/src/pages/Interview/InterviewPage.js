import React, { useState } from 'react';
import QuestionPanel from '../../components/interview/QuestionPanel';
import Terminal from '../../components/interview/Terminal';
import { interviewQuestions } from '../../utils/constants';
import './InterviewPage.css';

function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const handleCodeExecute = (code, questionId) => {
    console.log(`Executing code for question ${questionId}:`, code);
    // Add your code execution logic here
  };

  const startInterview = () => {
    setInterviewStarted(true);
    setIsRecording(true);
  };

  const endInterview = () => {
    setIsRecording(false);
    // Add submission logic here
  };

  const handleQuestionChange = (questionId) => {
    setCurrentQuestionId(questionId);
  };

  return (
    <div className="interview-container">
      <div className="question-panel-container">
        {interviewStarted ? (
          <QuestionPanel 
            questions={interviewQuestions} 
            onQuestionChange={handleQuestionChange}
          />
        ) : (
          <div className="loading-state">
            <h2>Ready to begin your interview?</h2>
            <button 
              className="control-button primary-button"
              onClick={startInterview}
            >
              Start Interview
            </button>
          </div>
        )}
      </div>

      <div className="terminal-container">
        {interviewStarted ? (
          <>
            <Terminal 
              onExecute={handleCodeExecute} 
              questionId={currentQuestionId}
            />
            <div className="interview-controls">
              <div className="status-indicator">
                <div className={`status-dot ${isRecording ? 'status-recording' : 'status-active'}`} />
                <span>{isRecording ? 'Recording' : 'Paused'}</span>
              </div>
              <button 
                className="control-button danger-button"
                onClick={endInterview}
              >
                End Interview
              </button>
            </div>
          </>
        ) : (
          <div className="loading-state">
            Terminal will activate when interview begins
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;