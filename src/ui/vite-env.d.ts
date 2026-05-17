/// <reference types="vite/client" />

declare global {
  interface Window {
    ncs: {
      openWorkspace: () => Promise<string | null>;
      readDir: (dir: string) => Promise<Array<{ name: string; isDirectory: boolean; path: string }>>;
      readFile: (path: string) => Promise<string>;
      writeFile: (path: string, content: string) => Promise<void>;
      createTerminal: (shell: string) => Promise<string>;
      writeTerminal: (id: string, data: string) => Promise<void>;
      resizeTerminal: (id: string, cols: number, rows: number) => Promise<void>;
      onTerminalData: (cb: (payload: { id: string; data: string }) => void) => void;
    };
  }
}

export {};
