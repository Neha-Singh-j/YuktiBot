import React from 'react';
import ChatBot from '../../components/common/ChatBot';
import './ChatBotPage.css';

const ChatBotPage = () => {
  return (
    <div className="chatbot-page">
      <div className="chatbot-page-header">
        <h1>YuktiBot Chat Demo</h1>
        <p>Test the intent management system with different messages</p>
      </div>
      
      <div className="chatbot-demo-container">
        <div className="demo-info">
          <h3>Try these example messages:</h3>
          <ul>
            <li>"hello" or "hi" - Greeting</li>
            <li>"help with interview" - Interview assistance</li>
            <li>"code editor" - Coding practice</li>
            <li>"python" or "javascript" - Programming languages</li>
            <li>"easy questions" - Difficulty levels</li>
            <li>"thank you" - Gratitude</li>
            <li>"goodbye" - Farewell</li>
            <li>Any random text - Fallback response</li>
          </ul>
          
          <div className="features-list">
            <h4>Features Demonstrated:</h4>
            <ul>
              <li>✅ Fuzzy intent matching</li>
              <li>✅ Confidence scoring</li>
              <li>✅ Fallback error handling</li>
              <li>✅ Debug mode (development)</li>
              <li>✅ Real-time chat interface</li>
            </ul>
          </div>
        </div>
        
        <div className="chatbot-wrapper">
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage; 