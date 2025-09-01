const { app, BrowserWindow, ipcMain, globalShortcut, clipboard, screen } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialize electron-store
const store = new Store();

let mainWindow;

function createWindow() {
  // Get primary display size
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    x: width - 420,
    y: 50,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    minimizable: false,
    maximizable: false,
    skipTaskbar: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // Prevent window from being closed
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  // Handle window focus
  mainWindow.on('focus', () => {
    mainWindow.setAlwaysOnTop(true);
  });
}

// App event handlers
app.whenReady().then(() => {
  createWindow();

  // Register global shortcuts
  registerGlobalShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Register global shortcuts for quick replies
function registerGlobalShortcuts() {
  // Get saved replies from store
  const replies = store.get('replies', []);
  
  replies.forEach((reply, index) => {
    if (index < 9) { // Limit to 9 shortcuts (Ctrl+1 to Ctrl+9)
      const shortcut = `CommandOrControl+${index + 1}`;
      globalShortcut.register(shortcut, () => {
        clipboard.writeText(reply.text);
        // Try to paste into active window
        mainWindow.webContents.send('paste-reply', reply.text);
      });
    }
  });
}

// IPC handlers for communication with renderer process
ipcMain.handle('get-replies', () => {
  return store.get('replies', []);
});

ipcMain.handle('save-reply', (event, reply) => {
  const replies = store.get('replies', []);
  if (reply.id) {
    // Update existing reply
    const index = replies.findIndex(r => r.id === reply.id);
    if (index !== -1) {
      replies[index] = reply;
    }
  } else {
    // Add new reply
    reply.id = Date.now().toString();
    replies.push(reply);
  }
  store.set('replies', replies);
  
  // Re-register shortcuts
  globalShortcut.unregisterAll();
  registerGlobalShortcuts();
  
  return replies;
});

ipcMain.handle('delete-reply', (event, replyId) => {
  const replies = store.get('replies', []);
  const filteredReplies = replies.filter(r => r.id !== replyId);
  store.set('replies', filteredReplies);
  
  // Re-register shortcuts
  globalShortcut.unregisterAll();
  registerGlobalShortcuts();
  
  return filteredReplies;
});

ipcMain.handle('get-notes', () => {
  return store.get('notes', []);
});

ipcMain.handle('save-notes', (event, notes) => {
  store.set('notes', notes);
  return notes;
});

ipcMain.handle('get-settings', () => {
  return store.get('settings', {
    theme: 'dark',
    accentColor: '#3b82f6'
  });
});

ipcMain.handle('save-settings', (event, settings) => {
  store.set('settings', settings);
  return settings;
});

ipcMain.handle('get-links', () => {
  return store.get('links', [
    { name: 'E-Minha', url: 'https://e-minha.umontreal.ca/', icon: '🎓' },
    { name: 'Telegram', url: 'https://web.telegram.org/', icon: '📱' },
    { name: 'Google Drive', url: 'https://drive.google.com/', icon: '☁️' },
    { name: 'E-Campus', url: 'https://ecampus.umontreal.ca/', icon: '🌐' }
  ]);
});

ipcMain.handle('save-links', (event, links) => {
  store.set('links', links);
  return links;
});

// Handle window dragging
ipcMain.on('window-drag', (event, { x, y }) => {
  const [currentX, currentY] = mainWindow.getPosition();
  mainWindow.setPosition(currentX + x, currentY + y);
});

// Handle minimize
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

// Handle toggle visibility
ipcMain.on('toggle-window', () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
  }
});

// Handle copy to clipboard
ipcMain.on('copy-to-clipboard', (event, text) => {
  clipboard.writeText(text);
});

// Handle open external link
ipcMain.on('open-external-link', (event, url) => {
  require('electron').shell.openExternal(url);
});