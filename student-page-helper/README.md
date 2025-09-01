## Student Page Helper

Floating, always-on-top desktop helper to manage quick replies, links, and notes for student Instagram/Telegram pages.

### Features
- Always-on-top, draggable, resizable window
- Quick Reply Manager: add/edit/delete, categories, copy or auto-paste, global shortcuts Ctrl+1..9
- Saved Links & Resources: one-click open in default browser
- Post Ideas & Notes: quick text area persisted locally
- Customization: dark/light/system theme, accent color, always-on-top toggle, auto-paste toggle

### Tech
- Electron + vanilla HTML/CSS/JS
- electron-store for persistence
- electron-builder for packaging

### Prerequisites
1. Install Node.js (LTS recommended) and npm
   - Windows/macOS: download from `https://nodejs.org`
   - Linux: use your package manager or NodeSource
2. Verify:
```bash
node -v
npm -v
```

### Install
```bash
cd student-page-helper
npm install
```

### Run (Development)
```bash
npm start
```

### Build (Production)
- Windows installer (NSIS):
```bash
npm run build:win
```
- Linux AppImage:
```bash
npm run build:linux
```
- Cross (Windows/Linux where supported):
```bash
npm run build
```

Artifacts will appear in the `dist/` folder.

### Keyboard Shortcuts
- Ctrl/Cmd + 1..9: paste corresponding quick reply (1-based) if available

### Notes about Auto-Paste
Auto-paste uses OS-level keystroke simulation:
- Windows: PowerShell SendKeys
- macOS: AppleScript (requires Accessibility permission on first use)
- Linux: tries `xdotool` if installed (optional)

If auto-paste fails, the text is still copied to clipboard; press Ctrl+V manually.

### Project Structure
```
student-page-helper/
  main.js            # Electron main process
  preload.js         # Safe IPC bridge for renderer
  package.json
  README.md
  renderer/
    index.html
    renderer.js
    styles.css
```

### App Title
The window title and product name are set to "Student Page Helper".

