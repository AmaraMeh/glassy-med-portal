const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAll: () => ipcRenderer.invoke('store:getAll'),

  // Replies
  addReply: (text, category) => ipcRenderer.invoke('replies:add', { text, category }),
  updateReply: (id, text, category) => ipcRenderer.invoke('replies:update', { id, text, category }),
  deleteReply: (id) => ipcRenderer.invoke('replies:delete', { id }),
  copyReply: (id, autoPaste) => ipcRenderer.invoke('replies:copy', { id, autoPaste }),

  // Links
  addLink: (label, url) => ipcRenderer.invoke('links:add', { label, url }),
  updateLink: (id, label, url) => ipcRenderer.invoke('links:update', { id, label, url }),
  deleteLink: (id) => ipcRenderer.invoke('links:delete', { id }),
  openLink: (url) => ipcRenderer.invoke('links:open', { url }),

  // Notes
  getNotes: () => ipcRenderer.invoke('notes:get'),
  setNotes: (content) => ipcRenderer.invoke('notes:set', { content }),

  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (patch) => ipcRenderer.invoke('settings:set', patch),

  // Window controls
  minimize: () => ipcRenderer.send('window:minimize'),
  close: () => ipcRenderer.send('window:close'),

  // Events
  onRepliesUpdated: (cb) => ipcRenderer.on('replies:updated', (_, payload) => cb(payload)),
  onLinksUpdated: (cb) => ipcRenderer.on('links:updated', (_, payload) => cb(payload)),
  onThemeChanged: (cb) => ipcRenderer.on('theme:changed', (_, payload) => cb(payload)),
});

