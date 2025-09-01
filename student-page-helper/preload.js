const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAll: () => ipcRenderer.invoke('store:getAll'),
  setStore: (payload) => ipcRenderer.invoke('store:set', payload),

  addReply: (reply) => ipcRenderer.invoke('replies:add', reply),
  updateReply: (reply) => ipcRenderer.invoke('replies:update', reply),
  deleteReply: (id) => ipcRenderer.invoke('replies:delete', id),

  addLink: (link) => ipcRenderer.invoke('links:add', link),
  updateLink: (link) => ipcRenderer.invoke('links:update', link),
  deleteLink: (id) => ipcRenderer.invoke('links:delete', id),

  setNotes: (notes) => ipcRenderer.invoke('notes:set', notes),
  setSettings: (settings) => ipcRenderer.invoke('settings:set', settings),

  copyAndPaste: (text) => ipcRenderer.invoke('clipboard:copyAndMaybePaste', text),
  openExternal: (url) => ipcRenderer.invoke('openExternal', url),

  onStoreChanged: (callback) => {
    ipcRenderer.removeAllListeners('store:changed');
    ipcRenderer.on('store:changed', (_evt, data) => callback(data));
  }
});

