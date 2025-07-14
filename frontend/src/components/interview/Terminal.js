import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

function Terminal({ onExecute, questionId }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Simulate code execution
    const newOutput = [...output, { type: 'input', text: input }];
    const result = `Output for: ${input}`; // Replace with actual execution
    newOutput.push({ type: 'output', text: result });
    
    setOutput(newOutput);
    setInput('');
    onExecute(input, questionId); // Pass to parent if needed
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <h3>Code Terminal</h3>
        <div className="terminal-controls">
          <span className="control red"></span>
          <span className="control yellow"></span>
          <span className="control green"></span>
        </div>
      </div>
      <div className="terminal-output" ref={terminalRef}>
        {output.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'input' ? '> ' : ''}{item.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input">
        <span>{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your code here..."
          autoFocus
        />
      </form>
    </div>
  );
}

export default Terminal;