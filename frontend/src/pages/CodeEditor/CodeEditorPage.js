import React, { useState } from 'react';
import CodeEditor from '../../components/codeeditor/CodeEditor';
import './CodeEditorPage.css';

function CodeEditorPage() {
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');

  const handleRunCode = (code) => {
    console.log('Executing code:', code);
    // Add code execution logic here
  };

  return (
    <div className="code-editor-page">
      <div className="editor-header">
        <h1>Code Editor</h1>
        <div className="editor-options">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </div>
      </div>
      <CodeEditor 
        language={language}
        theme={theme}
        onRun={handleRunCode}
      />
    </div>
  );
}

export default CodeEditorPage;