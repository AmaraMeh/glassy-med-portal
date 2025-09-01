/* globals api */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Tabs
  $$('.tab').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  function switchTab(name) {
    $$('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
    $$('.tabview').forEach((v) => v.classList.toggle('active', v.id === `tab-${name}`));
  }

  // Window controls
  $('#minimizeBtn').addEventListener('click', () => window.api.minimize());
  $('#closeBtn').addEventListener('click', () => window.api.close());

  // State
  let replies = [];
  let links = [];
  let settings = {};
  let saveNotesTimer = null;

  function applyTheme() {
    const root = document.documentElement;
    const theme = settings.theme || 'system';
    const accent = settings.accentColor || '#7c3aed';
    root.style.setProperty('--accent', accent);
    if (theme === 'light') {
      root.classList.add('light');
    } else if (theme === 'dark') {
      root.classList.remove('light');
    } else {
      // system: default to dark for looks; could query prefers-color-scheme
      root.classList.remove('light');
    }
  }

  // Renderers
  function renderReplies(filterCategory = '') {
    const list = $('#repliesList');
    list.innerHTML = '';
    const normalized = filterCategory.trim().toLowerCase();
    const filtered = normalized
      ? replies.filter((r) => (r.category || '').toLowerCase().includes(normalized))
      : replies;
    filtered.forEach((r, idx) => {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
        <div class="item-header">
          <span class="badge">${r.category || 'General'}</span>
          <div class="item-actions">
            <button class="icon" data-action="copy" title="Copy${idx < 9 ? ` (Ctrl+${idx + 1})` : ''}">Copy</button>
            <button class="icon" data-action="edit">Edit</button>
            <button class="icon" data-action="delete">Delete</button>
          </div>
        </div>
        <div class="item-body">
          <textarea data-field="text" rows="2">${r.text || ''}</textarea>
        </div>
      `;
      li.querySelector('[data-action="copy"]').addEventListener('click', async () => {
        await window.api.copyReply(r.id);
        li.querySelector('[data-action="copy"]').textContent = 'Copied';
        setTimeout(() => (li.querySelector('[data-action="copy"]').textContent = 'Copy'), 800);
      });
      li.querySelector('[data-action="edit"]').addEventListener('click', async () => {
        const text = li.querySelector('textarea[data-field="text"]').value;
        const category = prompt('Category', r.category || 'General') || r.category || 'General';
        await window.api.updateReply(r.id, text, category);
      });
      li.querySelector('[data-action="delete"]').addEventListener('click', async () => {
        if (confirm('Delete this reply?')) await window.api.deleteReply(r.id);
      });
      list.appendChild(li);
    });
  }

  function renderLinks() {
    const list = $('#linksList');
    list.innerHTML = '';
    links.forEach((l) => {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
        <div class="item-header">
          <strong>${l.label}</strong>
          <div class="item-actions">
            <button class="icon" data-action="open">Open</button>
            <button class="icon" data-action="edit">Edit</button>
            <button class="icon" data-action="delete">Delete</button>
          </div>
        </div>
        <div class="item-body">
          <small class="subtle">${l.url}</small>
        </div>
      `;
      li.querySelector('[data-action="open"]').addEventListener('click', () => window.api.openLink(l.url));
      li.querySelector('[data-action="edit"]').addEventListener('click', async () => {
        const label = prompt('Label', l.label) || l.label;
        const url = prompt('URL', l.url) || l.url;
        await window.api.updateLink(l.id, label, url);
      });
      li.querySelector('[data-action="delete"]').addEventListener('click', async () => {
        if (confirm('Delete this link?')) await window.api.deleteLink(l.id);
      });
      list.appendChild(li);
    });
  }

  // Forms
  $('#replyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = $('#replyText').value.trim();
    if (!text) return;
    const category = $('#replyCategory').value.trim() || 'General';
    await window.api.addReply(text, category);
    $('#replyText').value = '';
  });

  $('#filterCategory').addEventListener('input', (e) => renderReplies(e.target.value));

  $('#linkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const label = $('#linkLabel').value.trim();
    const url = $('#linkUrl').value.trim();
    if (!label || !url) return;
    await window.api.addLink(label, url);
    $('#linkLabel').value = '';
    $('#linkUrl').value = '';
  });

  // Notes
  const notesArea = $('#notesArea');
  notesArea.addEventListener('input', () => {
    $('#saveIndicator').textContent = 'Saving…';
    clearTimeout(saveNotesTimer);
    saveNotesTimer = setTimeout(async () => {
      await window.api.setNotes(notesArea.value);
      $('#saveIndicator').textContent = 'Saved';
    }, 400);
  });

  // Settings UI
  function bindSettingsUI() {
    const themeInputs = $$('input[name="theme"]');
    themeInputs.forEach((i) => (i.checked = (settings.theme || 'system') === i.value));
    $('#accentColor').value = settings.accentColor || '#7c3aed';
    $('#alwaysOnTop').checked = !!settings.alwaysOnTop;
    $('#autoPaste').checked = !!settings.autoPasteEnabled;

    themeInputs.forEach((i) => i.addEventListener('change', async () => {
      settings.theme = i.value;
      await window.api.setSettings({ theme: settings.theme });
      applyTheme();
    }));
    $('#accentColor').addEventListener('input', async (e) => {
      settings.accentColor = e.target.value;
      applyTheme();
      await window.api.setSettings({ accentColor: settings.accentColor });
    });
    $('#alwaysOnTop').addEventListener('change', async (e) => {
      settings.alwaysOnTop = e.target.checked;
      await window.api.setSettings({ alwaysOnTop: settings.alwaysOnTop });
    });
    $('#autoPaste').addEventListener('change', async (e) => {
      settings.autoPasteEnabled = e.target.checked;
      await window.api.setSettings({ autoPasteEnabled: settings.autoPasteEnabled });
    });
  }

  // Event bindings from main
  window.api.onRepliesUpdated((data) => {
    replies = data;
    renderReplies($('#filterCategory').value);
  });
  window.api.onLinksUpdated((data) => {
    links = data;
    renderLinks();
  });
  window.api.onThemeChanged((_theme) => applyTheme());

  // Initial load
  (async function init() {
    const all = await window.api.getAll();
    replies = all.replies || [];
    links = all.links || [];
    settings = all.settings || {};
    notesArea.value = all.notes || '';
    bindSettingsUI();
    applyTheme();
    renderReplies();
    renderLinks();
  })();
})();

