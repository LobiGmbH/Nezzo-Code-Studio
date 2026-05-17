import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createTerminalSession, writeTerminal, resizeTerminal } from '../terminal/pty';

let win: BrowserWindow | null = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1200,
    minHeight: 800,
    backgroundColor: '#0a0f1a',
    title: 'Nezzo Code Studio',
    icon: path.join(process.cwd(), 'resources', 'logo.png'),
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL(process.env.VITE_DEV_SERVER_URL ?? `file://${path.join(__dirname, '../ui/index.html')}`);
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('workspace:open', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    return result.filePaths[0] ?? null;
  });

  ipcMain.handle('fs:readDir', async (_, dir: string) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.map((e) => ({ name: e.name, isDirectory: e.isDirectory(), path: path.join(dir, e.name) }));
  });

  ipcMain.handle('fs:readFile', async (_, filePath: string) => fs.readFile(filePath, 'utf8'));
  ipcMain.handle('fs:writeFile', async (_, filePath: string, content: string) => fs.writeFile(filePath, content, 'utf8'));

  ipcMain.handle('terminal:create', (_, shell: string) => createTerminalSession(shell));
  ipcMain.handle('terminal:write', (_, id: string, data: string) => writeTerminal(id, data));
  ipcMain.handle('terminal:resize', (_, id: string, cols: number, rows: number) => resizeTerminal(id, cols, rows));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
