## Student Page Helper

Floating always-on-top desktop helper to manage a student page: quick replies, saved links, and notes. Built with Electron and electron-store.

### Features
- Always-on-top draggable window with custom title bar
- Quick Reply Manager: add/edit/delete, categories, one-click copy, global shortcuts (Ctrl/Cmd + 1..9)
- Saved Links: open in default browser
- Notes: lightweight editor with auto-save
- Settings: theme (system/light/dark), accent color, always-on-top, optional auto-paste

### Auto Paste
When enabled, the app attempts to paste into the current text field after copying a reply using a platform helper:
- macOS: `osascript`
- Windows: PowerShell `wscript.shell`
- Linux: `xdotool` (you may need to install it: `sudo apt install xdotool`)

If the helper is missing, the app will just copy to clipboard silently.

---

## Prerequisites
1. Install Node.js (LTS) and npm
   - Linux: use your package manager or `nvm`
   - macOS: install from `https://nodejs.org` or `brew install node`
   - Windows: install from `https://nodejs.org`
2. Verify:
   ```bash
   node -v
   npm -v
   ```

## Install
```bash
npm install
```

## Run (Development)
```bash
npm start
```

## Build (Production)
This project uses electron-builder.

- All platforms:
  ```bash
  npm run build
  ```

- Windows only:
  ```bash
  npm run build:win
  ```

- Linux only:
  ```bash
  npm run build:linux
  ```

- macOS only:
  ```bash
  npm run build:mac
  ```

The built artifacts will be in the `dist/` folder created by electron-builder.

---

## Shortcuts
- Ctrl/Cmd + 1..9: Copy the corresponding quick reply and optionally auto-paste.

---

## Project Structure
```
student-page-helper/
  main.js          # Electron main process
  preload.js       # IPC bridge
  index.html       # UI shell
  renderer.js      # UI logic
  styles.css       # UI styles
  store.js         # electron-store configuration and defaults
  package.json     # scripts and electron-builder config
```

