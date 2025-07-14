import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

function CodeEditor({ language, theme, onRun }) {
  const [code, setCode] = useState(getDefaultCode(language));
  const [output, setOutput] = useState('');

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  function getDefaultCode(lang) {
    const defaults = {
      javascript: '// Write your JavaScript code here\nfunction hello() {\n  return "Hello, World!";\n}\n\nhello();',
      python: '# Write your Python code here\ndef hello():\n    return "Hello, World!"\n\nprint(hello())',
      java: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      csharp: '// Write your C# code here\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}'
    };
    return defaults[lang] || defaults.javascript;
  }

  const handleRun = () => {
    try {
      // In a real app, this would call an API or Web Worker
      const result = `Executing ${language} code:\n\n${code}`;
      setOutput(result);
      onRun(code);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="editor-wrapper">
        <Editor
          height="60vh"
          defaultLanguage={language}
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true
          }}
        />
      </div>
      <button className="run-button" onClick={handleRun}>
        Run Code
      </button>
      <div className="output-container">
        <h3>Output</h3>
        <pre className="output-content">{output || 'Your output will appear here...'}</pre>
      </div>
    </div>
  );
}

export default CodeEditor;