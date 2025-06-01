import React, { useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { FaCode } from 'react-icons/fa';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultLanguage = 'javascript',
  defaultValue = '// Start coding here...',
  onChange,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    // Optimize editor performance
    editor.getModel()?.setEOL(0); // Use \n for line endings
    editor.updateOptions({
      renderWhitespace: "none",
      guides: {
        indentation: false
      },
      renderValidationDecorations: "editable",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add Ctrl+S (or Cmd+S) handler if needed
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="editor-container">
      <div className="flex justify-between items-center bg-[rgba(15,23,42,0.98)] p-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <FaCode className="text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">{defaultLanguage.charAt(0).toUpperCase() + defaultLanguage.slice(1)}</span>
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        theme="vs-dark"
        onChange={onChange}
        onMount={handleEditorDidMount}
        loading={<div className="text-center p-4">Loading editor...</div>}
        options={{
          fontSize: 14,
          fontFamily: 'Consolas, "Courier New", monospace',
          lineHeight: 21,
          minimap: {
            enabled: false, // Disable minimap for better performance
          },
          scrollbar: {
            useShadows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
            alwaysConsumeMouseWheel: false, // Improve scrolling performance
          },
          renderLineHighlight: "none",
          roundedSelection: false,
          wordWrap: "on",
          lineNumbers: "on",
          folding: false, // Disable folding for better performance
          automaticLayout: true,
          tabSize: 2,
          quickSuggestions: false, // Disable quick suggestions for better performance
          formatOnPaste: false, // Disable format on paste for better performance
          formatOnType: false, // Disable format on type for better performance
          suggest: {
            showWords: false,
          },
          scrollBeyondLastLine: false, // Prevent unnecessary scrolling
        }}
      />
    </div>
  );
};

export default CodeEditor; 