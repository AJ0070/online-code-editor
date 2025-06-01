'use client';

import React, { useState, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { FaPlay, FaCode, FaCog } from 'react-icons/fa';

// Dynamically import the CodeEditor component with no SSR
const CodeEditor = dynamic(
  () => import('../components/CodeEditor'),
  { ssr: false, loading: () => <div className="editor-loading">Loading editor...</div> }
);

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
] as const;

// Memoize the header component
const Header = memo(({ language, setLanguage, onRun, isLoading }: {
  language: string;
  setLanguage: (lang: string) => void;
  onRun: () => void;
  isLoading: boolean;
}) => (
  <header className="editor-header">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaCode className="text-[var(--accent-primary)] text-xl" />
          <h1 className="text-lg font-semibold">Code Editor</h1>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onRun}
        disabled={isLoading}
        className="primary-button"
      >
        <FaPlay className="text-sm" />
        {isLoading ? 'Running...' : 'Run Code'}
      </button>
    </div>
  </header>
));

Header.displayName = 'Header';

// Memoize the output component
const Output = memo(({ output, status }: {
  output: string;
  status: { type: 'success' | 'error' | null; message: string; }
}) => (
  <section className="editor-section lg:w-[400px]">
    <div className="flex items-center justify-between p-3 border-b border-[var(--editor-border)]">
      <div className="flex items-center gap-2">
        <FaCog className="text-[var(--accent-primary)]" />
        <h2 className="font-medium">Output</h2>
      </div>
      {status.type && (
        <div className={`status-bar ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
          {status.message}
        </div>
      )}
    </div>
    <pre className="output-content">
      {output || '// Code output will appear here...'}
    </pre>
  </section>
));

Output.displayName = 'Output';

export default function Home() {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string; }>({
    type: null,
    message: '',
  });

  const runCode = useCallback(async () => {
    if (!code.trim()) {
      setStatus({ type: 'error', message: 'Please enter some code to run' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, message: '' });
    setOutput('');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setStatus({ type: 'error', message: 'Execution failed' });
        setOutput(data.error);
      } else {
        setStatus({ type: 'success', message: 'Code executed successfully' });
        setOutput(data.output || 'No output generated');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to execute code' });
      setOutput('An error occurred while executing the code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const handleCodeChange = useCallback((value: string | undefined) => {
    setCode(value || '');
  }, []);

  return (
    <div className="editor-layout">
      <Header
        language={language}
        setLanguage={setLanguage}
        onRun={runCode}
        isLoading={isLoading}
      />
      <main className="editor-main">
        <section className="editor-section lg:flex-1">
          <CodeEditor
            defaultLanguage={language}
            defaultValue={`// Welcome to the Code Editor
// Start typing your code here...

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
            onChange={handleCodeChange}
          />
        </section>
        <Output output={output} status={status} />
      </main>
    </div>
  );
} 