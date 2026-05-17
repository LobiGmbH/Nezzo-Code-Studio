import * as pty from 'node-pty';
import { BrowserWindow } from 'electron';
import crypto from 'node:crypto';

const sessions = new Map<string, pty.IPty>();

export const createTerminalSession = (shell: string) => {
  const id = crypto.randomUUID();
  const proc = pty.spawn(shell || defaultShell(), [], {
    name: 'xterm-color',
    cols: 100,
    rows: 25,
    cwd: process.cwd(),
    env: process.env as Record<string, string>
  });

  proc.onData((data) => {
    BrowserWindow.getAllWindows().forEach((w) => w.webContents.send('terminal:data', { id, data }));
  });

  sessions.set(id, proc);
  return id;
};

export const writeTerminal = (id: string, data: string) => sessions.get(id)?.write(data);
export const resizeTerminal = (id: string, cols: number, rows: number) => sessions.get(id)?.resize(cols, rows);

const defaultShell = () => (process.platform === 'win32' ? 'powershell.exe' : process.env.SHELL || 'bash');
