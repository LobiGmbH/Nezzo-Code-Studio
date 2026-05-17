import { useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

type Entry = { name: string; isDirectory: boolean; path: string };

export const App = () => {
  const [workspace, setWorkspace] = useState<string>('');
  const [files, setFiles] = useState<Entry[]>([]);
  const [activeFile, setActiveFile] = useState<string>('');
  const [content, setContent] = useState('// Willkommen zu Nezzo Code Studio');
  const [terminalId, setTerminalId] = useState('');
  const termEl = useRef<HTMLDivElement>(null);
  const terminal = useMemo(() => new Terminal({ theme: { background: '#0b1220', foreground: '#b8d4ff' } }), []);

  useEffect(() => {
    const fit = new FitAddon();
    terminal.loadAddon(fit);
    if (termEl.current) {
      terminal.open(termEl.current);
      fit.fit();
    }
    terminal.onData((d) => terminalId && window.ncs.writeTerminal(terminalId, d));
    window.ncs.onTerminalData((p) => p.id === terminalId && terminal.write(p.data));
  }, [terminal, terminalId]);

  const openWorkspace = async () => {
    const dir = await window.ncs.openWorkspace();
    if (!dir) return;
    setWorkspace(dir);
    setFiles(await window.ncs.readDir(dir));
  };

  const openFile = async (filePath: string) => {
    setActiveFile(filePath);
    setContent(await window.ncs.readFile(filePath));
  };

  const startTerminal = async () => setTerminalId(await window.ncs.createTerminal(''));

  return (
    <div className="layout">
      <header><strong>NEZZO CODE STUDIO</strong><button onClick={openWorkspace}>Workspace öffnen</button><button onClick={startTerminal}>Terminal starten</button></header>
      <aside>{workspace}<ul>{files.map((f) => <li key={f.path} onClick={() => !f.isDirectory && openFile(f.path)}>{f.isDirectory ? '📁' : '📄'} {f.name}</li>)}</ul></aside>
      <main>
        <Editor theme="vs-dark" language="typescript" value={content} onChange={(v) => setContent(v ?? '')} />
        <button onClick={() => activeFile && window.ncs.writeFile(activeFile, content)}>Speichern</button>
      </main>
      <section className="ai">AI Agent
        <p>Modelle: ChatGPT, Claude, Gemini, DeepSeek</p>
        <textarea placeholder="Prompt eingeben..." />
      </section>
      <footer ref={termEl} />
    </div>
  );
};
