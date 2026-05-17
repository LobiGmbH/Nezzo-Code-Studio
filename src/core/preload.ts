import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ncs', {
  openWorkspace: () => ipcRenderer.invoke('workspace:open'),
  readDir: (dir: string) => ipcRenderer.invoke('fs:readDir', dir),
  readFile: (filePath: string) => ipcRenderer.invoke('fs:readFile', filePath),
  writeFile: (filePath: string, content: string) => ipcRenderer.invoke('fs:writeFile', filePath, content),
  createTerminal: (shell: string) => ipcRenderer.invoke('terminal:create', shell),
  writeTerminal: (id: string, data: string) => ipcRenderer.invoke('terminal:write', id, data),
  resizeTerminal: (id: string, cols: number, rows: number) => ipcRenderer.invoke('terminal:resize', id, cols, rows),
  onTerminalData: (cb: (payload: { id: string; data: string }) => void) => ipcRenderer.on('terminal:data', (_, p) => cb(p))
});
