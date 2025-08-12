import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message on component mount
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm YuktiBot, your AI interview preparation assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          userId: 'test-user' // In a real app, this would be the actual user ID
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          debug: data.debug // Include debug info in development
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble processing your request right now. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <span className="bot-icon">🤖</span>
          YuktiBot
        </div>
        <div className="chatbot-subtitle">AI Interview Assistant</div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
          >
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
              {message.debug && process.env.NODE_ENV === 'development' && (
                <div className="message-debug">
                  Intent: {message.debug.matchedIntent} 
                  (Confidence: {message.debug.confidence.toFixed(2)})
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="send-button"
          >
            <span>➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 