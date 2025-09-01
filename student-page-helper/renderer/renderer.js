/* global api */
(function () {
  const root = document.documentElement;
  const state = {
    replies: [],
    categories: [],
    links: [],
    notes: '',
    settings: { theme: 'system', accentColor: '#6C5CE7', alwaysOnTop: true, autoPaste: false }
  };

  // Elements
  const themeToggle = document.getElementById('themeToggle');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('searchInput');
  const repliesList = document.getElementById('repliesList');
  const addReplyBtn = document.getElementById('addReplyBtn');
  const linksList = document.getElementById('linksList');
  const addLinkBtn = document.getElementById('addLinkBtn');
  const notesArea = document.getElementById('notesArea');
  const alwaysOnTopToggle = document.getElementById('alwaysOnTopToggle');
  const autoPasteToggle = document.getElementById('autoPasteToggle');
  const accentColorPicker = document.getElementById('accentColorPicker');

  // Dialogs
  const replyDialog = document.getElementById('replyDialog');
  const replyForm = document.getElementById('replyForm');
  const replyDialogTitle = document.getElementById('replyDialogTitle');
  const replyText = document.getElementById('replyText');
  const replyCategory = document.getElementById('replyCategory');
  const cancelReplyBtn = document.getElementById('cancelReplyBtn');

  const linkDialog = document.getElementById('linkDialog');
  const linkForm = document.getElementById('linkForm');
  const linkDialogTitle = document.getElementById('linkDialogTitle');
  const linkLabel = document.getElementById('linkLabel');
  const linkUrl = document.getElementById('linkUrl');
  const cancelLinkBtn = document.getElementById('cancelLinkBtn');

  let editingReplyId = null;
  let editingLinkId = null;

  function setTheme(theme) {
    if (theme === 'dark') {
      root.removeAttribute('data-theme');
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      // system default -> keep dark as base and let OS decide in main process; here just no-op
      root.removeAttribute('data-theme');
    }
  }

  function setAccent(color) {
    root.style.setProperty('--accent', color);
  }

  function renderCategoryFilter() {
    const selected = categoryFilter.value || 'All';
    categoryFilter.innerHTML = '';
    const categories = ['All', ...state.categories];
    categories.forEach((cat) => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      if (cat === selected) option.selected = true;
      categoryFilter.appendChild(option);
    });
  }

  function renderReplyCategoryOptions() {
    const current = replyCategory.value;
    replyCategory.innerHTML = '';
    state.categories.forEach((cat) => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      replyCategory.appendChild(option);
    });
    if (current) replyCategory.value = current;
  }

  function renderReplies() {
    const filter = categoryFilter.value || 'All';
    const q = searchInput.value?.toLowerCase() || '';
    repliesList.innerHTML = '';
    const filtered = state.replies.filter((r) => {
      const inCat = filter === 'All' || r.category === filter;
      const inSearch = r.text.toLowerCase().includes(q);
      return inCat && inSearch;
    });
    filtered.forEach((reply, idx) => {
      const item = document.createElement('div');
      item.className = 'reply-item';
      const left = document.createElement('div');
      const text = document.createElement('div');
      text.textContent = reply.text;
      const meta = document.createElement('div');
      meta.className = 'reply-meta';
      meta.textContent = `${reply.category} • Shortcut: Ctrl+${idx + 1}`;
      left.appendChild(text);
      left.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'reply-actions';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'primary';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => api.copyAndPaste(reply.text));

      const pasteBtn = document.createElement('button');
      pasteBtn.className = 'secondary';
      pasteBtn.textContent = 'Paste';
      pasteBtn.addEventListener('click', () => api.copyAndPaste(reply.text));

      const editBtn = document.createElement('button');
      editBtn.className = 'secondary';
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => openReplyDialog(reply));

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'secondary';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', async () => {
        await api.deleteReply(reply.id);
        await loadAll();
      });

      actions.appendChild(copyBtn);
      actions.appendChild(pasteBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      item.appendChild(left);
      item.appendChild(actions);
      repliesList.appendChild(item);
    });
  }

  function renderLinks() {
    linksList.innerHTML = '';
    state.links.forEach((link) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.textContent = link.label;
      chip.title = link.url;
      chip.addEventListener('click', () => api.openExternal(link.url));

      const editBtn = document.createElement('button');
      editBtn.className = 'secondary';
      editBtn.textContent = '✎';
      editBtn.style.marginLeft = '4px';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLinkDialog(link);
      });

      const wrap = document.createElement('div');
      wrap.style.display = 'flex';
      wrap.style.alignItems = 'center';
      wrap.style.gap = '4px';
      wrap.appendChild(chip);
      wrap.appendChild(editBtn);
      linksList.appendChild(wrap);
    });
  }

  function hydrateSettingsUI() {
    setTheme(state.settings.theme);
    setAccent(state.settings.accentColor);
    alwaysOnTopToggle.checked = Boolean(state.settings.alwaysOnTop);
    autoPasteToggle.checked = Boolean(state.settings.autoPaste);
    accentColorPicker.value = state.settings.accentColor || '#6C5CE7';
  }

  function openReplyDialog(reply) {
    if (reply) {
      editingReplyId = reply.id;
      replyDialogTitle.textContent = 'Edit Reply';
      replyText.value = reply.text;
      replyCategory.value = reply.category;
    } else {
      editingReplyId = null;
      replyDialogTitle.textContent = 'Add Reply';
      replyText.value = '';
      replyCategory.value = state.categories[0] || 'General';
    }
    replyDialog.showModal();
  }

  function openLinkDialog(link) {
    if (link) {
      editingLinkId = link.id;
      linkDialogTitle.textContent = 'Edit Link';
      linkLabel.value = link.label;
      linkUrl.value = link.url;
    } else {
      editingLinkId = null;
      linkDialogTitle.textContent = 'Add Link';
      linkLabel.value = '';
      linkUrl.value = 'https://';
    }
    linkDialog.showModal();
  }

  async function loadAll() {
    const data = await api.getAll();
    state.replies = data.replies || [];
    state.categories = data.categories || [];
    state.links = data.links || [];
    state.notes = data.notes || '';
    state.settings = data.settings || state.settings;

    renderCategoryFilter();
    renderReplyCategoryOptions();
    renderReplies();
    renderLinks();
    hydrateSettingsUI();
    notesArea.value = state.notes;
  }

  // Event listeners
  addReplyBtn.addEventListener('click', () => openReplyDialog(null));
  cancelReplyBtn.addEventListener('click', () => replyDialog.close());
  replyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = { text: replyText.value.trim(), category: replyCategory.value };
    if (!payload.text) return;
    if (editingReplyId) {
      await api.updateReply({ id: editingReplyId, ...payload });
    } else {
      await api.addReply(payload);
    }
    replyDialog.close();
    await loadAll();
  });

  categoryFilter.addEventListener('change', renderReplies);
  searchInput.addEventListener('input', renderReplies);

  addLinkBtn.addEventListener('click', () => openLinkDialog(null));
  cancelLinkBtn.addEventListener('click', () => linkDialog.close());
  linkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = { label: linkLabel.value.trim(), url: linkUrl.value.trim() };
    if (!payload.label || !payload.url) return;
    if (editingLinkId) {
      await api.updateLink({ id: editingLinkId, ...payload });
    } else {
      await api.addLink(payload);
    }
    linkDialog.close();
    await loadAll();
  });

  notesArea.addEventListener('change', async () => {
    await api.setNotes(notesArea.value);
  });

  alwaysOnTopToggle.addEventListener('change', async () => {
    const settings = { ...state.settings, alwaysOnTop: alwaysOnTopToggle.checked };
    await api.setSettings(settings);
    await loadAll();
  });

  autoPasteToggle.addEventListener('change', async () => {
    const settings = { ...state.settings, autoPaste: autoPasteToggle.checked };
    await api.setSettings(settings);
    await loadAll();
  });

  themeToggle.addEventListener('click', async () => {
    const next = state.settings.theme === 'dark' ? 'light' : state.settings.theme === 'light' ? 'system' : 'dark';
    const settings = { ...state.settings, theme: next };
    await api.setSettings(settings);
    await loadAll();
  });

  accentColorPicker.addEventListener('change', async () => {
    const settings = { ...state.settings, accentColor: accentColorPicker.value };
    await api.setSettings(settings);
    setAccent(settings.accentColor);
  });

  api.onStoreChanged(async () => {
    await loadAll();
  });

  // Initial load
  loadAll();
})();

