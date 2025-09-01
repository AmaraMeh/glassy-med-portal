const { app, BrowserWindow, ipcMain, clipboard, shell, nativeTheme, globalShortcut } = require('electron');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const Store = require('electron-store');

/**
 * Application persistent store
 */
const store = new Store({
  name: 'student-page-helper',
  defaults: {
    replies: [
      { id: 'r1', text: 'Hi! Thanks for reaching out. I\'ll get back to you soon.', category: 'General' },
      { id: 'r2', text: 'Scholarship details are posted every Monday. Stay tuned!', category: 'Scholarships' }
    ],
    categories: ['Scholarships', 'Exams', 'General', 'Memes'],
    links: [
      { id: 'l1', label: 'E-Minha', url: 'https://www.eminha.dz' },
      { id: 'l2', label: 'Telegram', url: 'https://web.telegram.org' },
      { id: 'l3', label: 'Google Drive', url: 'https://drive.google.com' },
      { id: 'l4', label: 'E-Campus', url: 'https://ecampus.univ.example' }
    ],
    notes: '',
    settings: {
      theme: 'system', // 'light' | 'dark' | 'system'
      accentColor: '#6C5CE7',
      alwaysOnTop: true,
      autoPaste: false
    }
  }
});

/** @type {BrowserWindow | null} */
let mainWindow = null;

function createMainWindow() {
  const { settings } = store.store;

  mainWindow = new BrowserWindow({
    width: 420,
    height: 640,
    minWidth: 360,
    minHeight: 480,
    title: 'Student Page Helper',
    alwaysOnTop: Boolean(settings?.alwaysOnTop),
    resizable: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  applyThemeFromSettings();
}

function applyThemeFromSettings() {
  const themeSource = store.get('settings.theme');
  if (['light', 'dark', 'system'].includes(themeSource)) {
    nativeTheme.themeSource = themeSource;
  }
}

function simulatePasteKeystroke() {
  const platform = os.platform();
  if (platform === 'win32') {
    // Use PowerShell SendKeys to simulate Ctrl+V
    const command = 'powershell -NoProfile -Command "$wshell = New-Object -ComObject wscript.shell; $wshell.SendKeys(\'^v\')"';
    exec(command, () => {});
  } else if (platform === 'darwin') {
    // Use AppleScript to simulate Command+V
    const command = 'osascript -e "tell application \"System Events\" to keystroke \"v\" using command down"';
    exec(command, () => {});
  } else {
    // Linux: try xdotool, otherwise do nothing
    const command = 'bash -lc "if command -v xdotool >/dev/null 2>&1; then xdotool key ctrl+v; fi"';
    exec(command, () => {});
  }
}

function copyTextAndMaybePaste(text, shouldAutoPaste) {
  if (typeof text !== 'string' || text.length === 0) return;
  clipboard.writeText(text);
  if (shouldAutoPaste) {
    setTimeout(() => simulatePasteKeystroke(), 120);
  }
}

function registerGlobalReplyShortcuts() {
  globalShortcut.unregisterAll();
  const settings = store.get('settings');
  const replies = store.get('replies') || [];
  const maxShortcuts = Math.min(9, replies.length);
  for (let i = 1; i <= maxShortcuts; i += 1) {
    const accelerator = `CommandOrControl+${i}`;
    const reply = replies[i - 1];
    try {
      const success = globalShortcut.register(accelerator, () => {
        copyTextAndMaybePaste(reply.text, Boolean(settings.autoPaste));
      });
      if (!success) {
        // noop; registration may fail if taken
      }
    } catch (error) {
      // ignore registration errors
    }
  }
}

// IPC handlers
ipcMain.handle('store:getAll', () => {
  return store.store;
});

ipcMain.handle('store:set', (_evt, payload) => {
  if (payload && typeof payload === 'object') {
    Object.entries(payload).forEach(([key, value]) => {
      store.set(key, value);
    });
  }
  const updated = store.store;
  if (mainWindow) {
    mainWindow.webContents.send('store:changed', updated);
  }
  if (payload?.settings) {
    // Apply settings that affect the shell
    if (typeof payload.settings.alwaysOnTop === 'boolean' && mainWindow) {
      mainWindow.setAlwaysOnTop(Boolean(payload.settings.alwaysOnTop));
    }
    if (payload.settings.theme) {
      applyThemeFromSettings();
    }
  }
  if (payload?.replies) {
    registerGlobalReplyShortcuts();
  }
  return updated;
});

ipcMain.handle('replies:add', (_evt, reply) => {
  const replies = store.get('replies') || [];
  const newReply = {
    id: `r_${Date.now()}`,
    text: String(reply?.text || ''),
    category: String(reply?.category || 'General')
  };
  replies.push(newReply);
  store.set('replies', replies);
  registerGlobalReplyShortcuts();
  const updated = store.store;
  mainWindow?.webContents.send('store:changed', updated);
  return newReply;
});

ipcMain.handle('replies:update', (_evt, reply) => {
  const replies = store.get('replies') || [];
  const index = replies.findIndex(r => r.id === reply?.id);
  if (index >= 0) {
    replies[index] = { ...replies[index], text: String(reply.text || ''), category: String(reply.category || 'General') };
    store.set('replies', replies);
    registerGlobalReplyShortcuts();
    const updated = store.store;
    mainWindow?.webContents.send('store:changed', updated);
    return replies[index];
  }
  return null;
});

ipcMain.handle('replies:delete', (_evt, replyId) => {
  const replies = store.get('replies') || [];
  const next = replies.filter(r => r.id !== replyId);
  store.set('replies', next);
  registerGlobalReplyShortcuts();
  const updated = store.store;
  mainWindow?.webContents.send('store:changed', updated);
  return true;
});

ipcMain.handle('links:add', (_evt, link) => {
  const links = store.get('links') || [];
  const newLink = { id: `l_${Date.now()}` , label: String(link?.label || 'Link'), url: String(link?.url || 'https://') };
  links.push(newLink);
  store.set('links', links);
  const updated = store.store;
  mainWindow?.webContents.send('store:changed', updated);
  return newLink;
});

ipcMain.handle('links:update', (_evt, link) => {
  const links = store.get('links') || [];
  const index = links.findIndex(l => l.id === link?.id);
  if (index >= 0) {
    links[index] = { ...links[index], label: String(link.label || 'Link'), url: String(link.url || 'https://') };
    store.set('links', links);
    const updated = store.store;
    mainWindow?.webContents.send('store:changed', updated);
    return links[index];
  }
  return null;
});

ipcMain.handle('links:delete', (_evt, linkId) => {
  const links = store.get('links') || [];
  const next = links.filter(l => l.id !== linkId);
  store.set('links', next);
  const updated = store.store;
  mainWindow?.webContents.send('store:changed', updated);
  return true;
});

ipcMain.handle('notes:set', (_evt, notes) => {
  store.set('notes', String(notes || ''));
  const updated = store.store;
  mainWindow?.webContents.send('store:changed', updated);
  return updated.notes;
});

ipcMain.handle('settings:set', (_evt, settings) => {
  const current = store.get('settings') || {};
  const merged = { ...current, ...settings };
  store.set('settings', merged);
  if (typeof settings?.alwaysOnTop === 'boolean' && mainWindow) {
    mainWindow.setAlwaysOnTop(Boolean(settings.alwaysOnTop));
  }
  if (settings?.theme) {
    applyThemeFromSettings();
  }
  const updated = store.store;
  mainWindow?.webContents.send('store:changed', updated);
  return merged;
});

ipcMain.handle('clipboard:copyAndMaybePaste', (_evt, text) => {
  const settings = store.get('settings');
  copyTextAndMaybePaste(String(text || ''), Boolean(settings.autoPaste));
  return true;
});

ipcMain.handle('openExternal', (_evt, url) => {
  if (typeof url === 'string' && url.startsWith('http')) {
    shell.openExternal(url);
  }
  return true;
});

app.whenReady().then(() => {
  createMainWindow();
  registerGlobalReplyShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

