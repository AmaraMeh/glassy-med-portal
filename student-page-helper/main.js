const { app, BrowserWindow, ipcMain, clipboard, shell, globalShortcut, nativeTheme } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const crypto = require('crypto');
const store = require('./store');

let mainWindow = null;

function createMainWindow() {
  const { settings } = store.store;

  mainWindow = new BrowserWindow({
    width: 420,
    height: 560,
    minWidth: 360,
    minHeight: 420,
    show: false,
    alwaysOnTop: settings?.alwaysOnTop ?? true,
    frame: false,
    resizable: true,
    transparent: false,
    skipTaskbar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function platformPasteCommand() {
  const platform = process.platform;
  if (platform === 'darwin') {
    return `osascript -e 'tell application "System Events" to keystroke "v" using command down'`;
  } else if (platform === 'win32') {
    return `powershell -NoProfile -NonInteractive -Command "$wshell = New-Object -ComObject wscript.shell; $wshell.SendKeys('^v')"`;
  } else {
    return `xdotool key --clearmodifiers ctrl+v`;
  }
}

function tryAutoPaste() {
  const { settings } = store.store;
  if (!settings?.autoPasteEnabled) return false;
  const cmd = platformPasteCommand();
  exec(cmd, (error) => {
    if (error) {
      // Silent fallback: do nothing if the system tool is missing
    }
  });
  return true;
}

function triggerQuickReplyByIndex(index) {
  const replies = store.store.replies || [];
  if (index < 0 || index >= replies.length) return;
  const reply = replies[index];
  if (!reply || !reply.text) return;
  clipboard.writeText(reply.text);
  tryAutoPaste();
}

function registerGlobalShortcuts() {
  globalShortcut.unregisterAll();
  // Register Ctrl/Cmd + 1..9 for first 9 replies
  for (let n = 1; n <= 9; n++) {
    const accelerator = `CommandOrControl+${n}`;
    globalShortcut.register(accelerator, () => triggerQuickReplyByIndex(n - 1));
  }
}

function broadcast(channel, payload) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send(channel, payload);
  }
}

app.whenReady().then(() => {
  const theme = store.store.settings?.theme || 'system';
  nativeTheme.themeSource = theme;
  createMainWindow();
  registerGlobalShortcuts();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC: Store read
ipcMain.handle('store:getAll', () => {
  return store.store;
});

// Replies CRUD
ipcMain.handle('replies:add', (event, { text, category }) => {
  const replies = store.store.replies || [];
  const newReply = { id: crypto.randomUUID(), text: String(text || ''), category: String(category || 'General') };
  store.set('replies', [newReply, ...replies]);
  registerGlobalShortcuts();
  broadcast('replies:updated', store.store.replies);
  return newReply;
});

ipcMain.handle('replies:update', (event, { id, text, category }) => {
  const replies = (store.store.replies || []).map(r => r.id === id ? { ...r, text: text ?? r.text, category: category ?? r.category } : r);
  store.set('replies', replies);
  broadcast('replies:updated', store.store.replies);
  return true;
});

ipcMain.handle('replies:delete', (event, { id }) => {
  const replies = (store.store.replies || []).filter(r => r.id !== id);
  store.set('replies', replies);
  registerGlobalShortcuts();
  broadcast('replies:updated', store.store.replies);
  return true;
});

ipcMain.handle('replies:copy', (event, { id, autoPaste }) => {
  const reply = (store.store.replies || []).find(r => r.id === id);
  if (!reply) return false;
  clipboard.writeText(reply.text || '');
  if (autoPaste === true || (autoPaste === undefined && store.store.settings?.autoPasteEnabled)) {
    tryAutoPaste();
  }
  return true;
});

// Links CRUD + open
ipcMain.handle('links:add', (event, { label, url }) => {
  const links = store.store.links || [];
  const newLink = { id: crypto.randomUUID(), label: String(label || 'Link'), url: String(url || 'https://') };
  store.set('links', [...links, newLink]);
  broadcast('links:updated', store.store.links);
  return newLink;
});

ipcMain.handle('links:update', (event, { id, label, url }) => {
  const links = (store.store.links || []).map(l => l.id === id ? { ...l, label: label ?? l.label, url: url ?? l.url } : l);
  store.set('links', links);
  broadcast('links:updated', store.store.links);
  return true;
});

ipcMain.handle('links:delete', (event, { id }) => {
  const links = (store.store.links || []).filter(l => l.id !== id);
  store.set('links', links);
  broadcast('links:updated', store.store.links);
  return true;
});

ipcMain.handle('links:open', (event, { url }) => {
  if (url) shell.openExternal(url);
  return true;
});

// Notes
ipcMain.handle('notes:get', () => {
  return store.store.notes || '';
});

ipcMain.handle('notes:set', (event, { content }) => {
  store.set('notes', String(content || ''));
  return true;
});

// Settings
ipcMain.handle('settings:get', () => {
  return store.store.settings || {};
});

ipcMain.handle('settings:set', (event, patch) => {
  const settings = { ...(store.store.settings || {}), ...patch };
  store.set('settings', settings);

  if (typeof settings.alwaysOnTop === 'boolean' && mainWindow) {
    mainWindow.setAlwaysOnTop(!!settings.alwaysOnTop);
  }
  if (settings.theme) {
    nativeTheme.themeSource = settings.theme;
    broadcast('theme:changed', settings.theme);
  }
  return settings;
});

// Window controls
ipcMain.on('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window:close', () => {
  if (mainWindow) mainWindow.close();
});

