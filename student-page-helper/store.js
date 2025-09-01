const Store = require('electron-store');

const defaultLinks = [
  { id: 'link-eminha', label: 'E-Minha', url: 'https://www.e-minha.com/' },
  { id: 'link-telegram', label: 'Telegram', url: 'https://web.telegram.org/' },
  { id: 'link-drive', label: 'Google Drive', url: 'https://drive.google.com/' },
  { id: 'link-ecampus', label: 'E-Campus', url: 'https://ecampus.university/' }
];

const schema = {
  replies: {
    type: 'array',
    default: [],
  },
  links: {
    type: 'array',
    default: defaultLinks,
  },
  notes: {
    type: 'string',
    default: '',
  },
  settings: {
    type: 'object',
    properties: {
      theme: { type: 'string', enum: ['system', 'light', 'dark'], default: 'system' },
      alwaysOnTop: { type: 'boolean', default: true },
      accentColor: { type: 'string', default: '#7c3aed' },
      autoPasteEnabled: { type: 'boolean', default: false },
    },
    default: {
      theme: 'system',
      alwaysOnTop: true,
      accentColor: '#7c3aed',
      autoPasteEnabled: false,
    }
  }
};

const store = new Store({ schema, watch: true });

module.exports = {
  store,
  get: (key) => store.get(key),
  set: (key, value) => store.set(key, value),
};

