# Nezzo Code Studio

Professionelle Electron + TypeScript IDE mit modernem Dark-UI, Datei-Explorer, Monaco-Editor, integriertem Terminal und AI-Panel.

## Features
- Custom Desktop Window für Windows
- Datei-Explorer + Datei öffnen/speichern
- Monaco Editor (VS-Code Engine)
- Integriertes Terminal über `node-pty`
- AI-Modul-Architektur für ChatGPT/Claude/Gemini/DeepSeek
- NEZZOCODE (.nc) Sprachgrundlage mit Interpreter und Grammar-Datei
- Windows-Installer über NSIS (`.exe`) mit Desktop-Shortcut und Branding-Konfiguration

## Setup
```bash
npm install
npm run dev
```

## Windows Build
```bash
npm run dist:win
```

Ergebnis liegt im Ordner `release/` als installierbare `.exe`.

## Branding Assets
Lege folgende Dateien in `resources/`:
- `logo.png` (App, Splash, About)
- `logo.ico` (Windows Icon/Installer)
- `nc.png` (NEZZOCODE Branding)
