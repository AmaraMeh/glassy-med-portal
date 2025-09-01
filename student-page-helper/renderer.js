const { ipcRenderer } = require('electron');

// App state
let currentReplies = [];
let currentLinks = [];
let currentNotes = [];
let currentSettings = {};
let editingReply = null;
let editingLink = null;
let editingNote = null;

// DOM elements
const titleBar = document.getElementById('titleBar');
const minimizeBtn = document.getElementById('minimizeBtn');
const toggleBtn = document.getElementById('toggleBtn');
const repliesContainer = document.getElementById('repliesContainer');
const linksContainer = document.getElementById('linksContainer');
const notesContainer = document.getElementById('notesContainer');
const addReplyBtn = document.getElementById('addReplyBtn');
const addLinkBtn = document.getElementById('addLinkBtn');
const addNoteBtn = document.getElementById('addNoteBtn');
const themeToggle = document.getElementById('themeToggle');
const accentColor = document.getElementById('accentColor');

// Modal elements
const replyModal = document.getElementById('replyModal');
const linkModal = document.getElementById('linkModal');
const noteModal = document.getElementById('noteModal');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
    setupEventListeners();
    setupWindowDragging();
});

// Initialize app data
async function initializeApp() {
    try {
        // Load all data from main process
        currentReplies = await ipcRenderer.invoke('get-replies');
        currentLinks = await ipcRenderer.invoke('get-links');
        currentNotes = await ipcRenderer.invoke('get-notes');
        currentSettings = await ipcRenderer.invoke('get-settings');

        // Apply settings
        applySettings(currentSettings);

        // Render data
        renderReplies();
        renderLinks();
        renderNotes();
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Title bar buttons
    minimizeBtn.addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    });

    toggleBtn.addEventListener('click', () => {
        ipcRenderer.send('toggle-window');
    });

    // Add buttons
    addReplyBtn.addEventListener('click', () => openReplyModal());
    addLinkBtn.addEventListener('click', () => openLinkModal());
    addNoteBtn.addEventListener('click', () => openNoteModal());

    // Settings
    themeToggle.addEventListener('change', handleThemeChange);
    accentColor.addEventListener('change', handleAccentColorChange);

    // Modal close buttons
    document.getElementById('closeReplyModal').addEventListener('click', closeReplyModal);
    document.getElementById('closeLinkModal').addEventListener('click', closeLinkModal);
    document.getElementById('closeNoteModal').addEventListener('click', closeNoteModal);

    // Modal cancel buttons
    document.getElementById('cancelReplyBtn').addEventListener('click', closeReplyModal);
    document.getElementById('cancelLinkBtn').addEventListener('click', closeLinkModal);
    document.getElementById('cancelNoteBtn').addEventListener('click', closeNoteModal);

    // Modal save buttons
    document.getElementById('saveReplyBtn').addEventListener('click', saveReply);
    document.getElementById('saveLinkBtn').addEventListener('click', saveLink);
    document.getElementById('saveNoteBtn').addEventListener('click', saveNote);

    // Close modals on outside click
    window.addEventListener('click', (event) => {
        if (event.target === replyModal) closeReplyModal();
        if (event.target === linkModal) closeLinkModal();
        if (event.target === noteModal) closeNoteModal();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Setup window dragging
function setupWindowDragging() {
    let isDragging = false;
    let startX, startY;

    titleBar.addEventListener('mousedown', (e) => {
        if (e.target.closest('.title-bar-right')) return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        ipcRenderer.send('window-drag', { x: deltaX, y: deltaY });

        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl+1 to Ctrl+9 for quick replies
    if (e.ctrlKey && e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (currentReplies[index]) {
            copyReplyToClipboard(currentReplies[index]);
        }
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        closeReplyModal();
        closeLinkModal();
        closeNoteModal();
    }
}

// Apply settings
function applySettings(settings) {
    document.documentElement.setAttribute('data-theme', settings.theme);
    themeToggle.value = settings.theme;
    accentColor.value = settings.accentColor;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    document.documentElement.style.setProperty('--accent-hover', adjustBrightness(settings.accentColor, -20));
}

// Adjust color brightness
function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Handle theme change
async function handleThemeChange() {
    const newSettings = { ...currentSettings, theme: themeToggle.value };
    currentSettings = await ipcRenderer.invoke('save-settings', newSettings);
    applySettings(currentSettings);
}

// Handle accent color change
async function handleAccentColorChange() {
    const newSettings = { ...currentSettings, accentColor: accentColor.value };
    currentSettings = await ipcRenderer.invoke('save-settings', newSettings);
    applySettings(currentSettings);
}

// Reply functions
function openReplyModal(reply = null) {
    editingReply = reply;
    const modalTitle = document.getElementById('replyModalTitle');
    const replyText = document.getElementById('replyText');
    const replyCategory = document.getElementById('replyCategory');
    const replyShortcut = document.getElementById('replyShortcut');

    if (reply) {
        modalTitle.textContent = 'Edit Reply';
        replyText.value = reply.text;
        replyCategory.value = reply.category;
        replyShortcut.value = reply.shortcut || '';
    } else {
        modalTitle.textContent = 'Add New Reply';
        replyText.value = '';
        replyCategory.value = 'General';
        replyShortcut.value = '';
    }

    replyModal.classList.add('show');
    replyText.focus();
}

function closeReplyModal() {
    replyModal.classList.remove('show');
    editingReply = null;
}

async function saveReply() {
    const replyText = document.getElementById('replyText').value.trim();
    const replyCategory = document.getElementById('replyCategory').value;
    const replyShortcut = document.getElementById('replyShortcut').value;

    if (!replyText) return;

    const reply = {
        id: editingReply?.id,
        text: replyText,
        category: replyCategory,
        shortcut: replyShortcut || null
    };

    try {
        currentReplies = await ipcRenderer.invoke('save-reply', reply);
        renderReplies();
        closeReplyModal();
    } catch (error) {
        console.error('Failed to save reply:', error);
    }
}

function renderReplies() {
    if (currentReplies.length === 0) {
        repliesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-reply"></i>
                <p>No quick replies yet. Add your first one!</p>
            </div>
        `;
        return;
    }

    repliesContainer.innerHTML = currentReplies.map(reply => `
        <div class="reply-item" data-id="${reply.id}">
            <div class="reply-content">
                <div class="reply-text">${escapeHtml(reply.text)}</div>
                <div class="reply-meta">
                    <span class="reply-category">${reply.category}</span>
                    ${reply.shortcut ? `<span class="reply-shortcut">Ctrl+${reply.shortcut}</span>` : ''}
                </div>
            </div>
            <div class="reply-actions">
                <button class="action-btn copy" title="Copy to clipboard" onclick="copyReplyToClipboard('${reply.id}')">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="action-btn edit" title="Edit reply" onclick="editReply('${reply.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete reply" onclick="deleteReply('${reply.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function copyReplyToClipboard(replyId) {
    const reply = typeof replyId === 'string' 
        ? currentReplies.find(r => r.id === replyId)
        : replyId;
    
    if (reply) {
        ipcRenderer.send('copy-to-clipboard', reply.text);
        showNotification(`Copied: ${reply.text.substring(0, 50)}${reply.text.length > 50 ? '...' : ''}`);
    }
}

function editReply(replyId) {
    const reply = currentReplies.find(r => r.id === replyId);
    if (reply) {
        openReplyModal(reply);
    }
}

async function deleteReply(replyId) {
    if (confirm('Are you sure you want to delete this reply?')) {
        try {
            currentReplies = await ipcRenderer.invoke('delete-reply', replyId);
            renderReplies();
        } catch (error) {
            console.error('Failed to delete reply:', error);
        }
    }
}

// Link functions
function openLinkModal(link = null) {
    editingLink = link;
    const modalTitle = document.getElementById('linkModalTitle');
    const linkName = document.getElementById('linkName');
    const linkUrl = document.getElementById('linkUrl');
    const linkIcon = document.getElementById('linkIcon');

    if (link) {
        modalTitle.textContent = 'Edit Link';
        linkName.value = link.name;
        linkUrl.value = link.url;
        linkIcon.value = link.icon;
    } else {
        modalTitle.textContent = 'Add New Link';
        linkName.value = '';
        linkUrl.value = '';
        linkIcon.value = '🔗';
    }

    linkModal.classList.add('show');
    linkName.focus();
}

function closeLinkModal() {
    linkModal.classList.remove('show');
    editingLink = null;
}

async function saveLink() {
    const linkName = document.getElementById('linkName').value.trim();
    const linkUrl = document.getElementById('linkUrl').value.trim();
    const linkIcon = document.getElementById('linkIcon').value.trim();

    if (!linkName || !linkUrl) return;

    const link = {
        id: editingLink?.id || Date.now().toString(),
        name: linkName,
        url: linkUrl,
        icon: linkIcon || '🔗'
    };

    try {
        if (editingLink) {
            // Update existing link
            const index = currentLinks.findIndex(l => l.id === editingLink.id);
            if (index !== -1) {
                currentLinks[index] = link;
            }
        } else {
            // Add new link
            currentLinks.push(link);
        }
        
        await ipcRenderer.invoke('save-links', currentLinks);
        renderLinks();
        closeLinkModal();
    } catch (error) {
        console.error('Failed to save link:', error);
    }
}

function renderLinks() {
    if (currentLinks.length === 0) {
        linksContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-link"></i>
                <p>No quick links yet. Add your first one!</p>
            </div>
        `;
        return;
    }

    linksContainer.innerHTML = currentLinks.map(link => `
        <div class="link-item" onclick="openLink('${link.url}')" title="${link.name}">
            <div class="link-icon">${link.icon}</div>
            <div class="link-name">${escapeHtml(link.name)}</div>
        </div>
    `).join('');
}

function openLink(url) {
    ipcRenderer.send('open-external-link', url);
}

// Note functions
function openNoteModal(note = null) {
    editingNote = note;
    const modalTitle = document.getElementById('noteModalTitle');
    const noteText = document.getElementById('noteText');

    if (note) {
        modalTitle.textContent = 'Edit Note';
        noteText.value = note.text;
    } else {
        modalTitle.textContent = 'Add New Note';
        noteText.value = '';
    }

    noteModal.classList.add('show');
    noteText.focus();
}

function closeNoteModal() {
    noteModal.classList.remove('show');
    editingNote = null;
}

async function saveNote() {
    const noteText = document.getElementById('noteText').value.trim();

    if (!noteText) return;

    const note = {
        id: editingNote?.id || Date.now().toString(),
        text: noteText,
        timestamp: new Date().toISOString()
    };

    try {
        if (editingNote) {
            // Update existing note
            const index = currentNotes.findIndex(n => n.id === editingNote.id);
            if (index !== -1) {
                currentNotes[index] = note;
            }
        } else {
            // Add new note
            currentNotes.push(note);
        }
        
        await ipcRenderer.invoke('save-notes', currentNotes);
        renderNotes();
        closeNoteModal();
    } catch (error) {
        console.error('Failed to save note:', error);
    }
}

function renderNotes() {
    if (currentNotes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sticky-note"></i>
                <p>No notes yet. Add your first one!</p>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = currentNotes.map(note => `
        <div class="note-item" data-id="${note.id}">
            <div class="note-text">${escapeHtml(note.text)}</div>
            <div class="note-actions">
                <button class="action-btn edit" title="Edit note" onclick="editNote('${note.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete note" onclick="deleteNote('${note.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function editNote(noteId) {
    const note = currentNotes.find(n => n.id === noteId);
    if (note) {
        openNoteModal(note);
    }
}

async function deleteNote(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        try {
            currentNotes = currentNotes.filter(n => n.id !== noteId);
            await ipcRenderer.invoke('save-notes', currentNotes);
            renderNotes();
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Listen for paste reply events from main process
ipcRenderer.on('paste-reply', (event, text) => {
    showNotification(`Quick reply copied: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
});

// Make functions globally available for onclick handlers
window.copyReplyToClipboard = copyReplyToClipboard;
window.editReply = editReply;
window.deleteReply = deleteReply;
window.openLink = openLink;
window.editNote = editNote;
window.deleteNote = deleteNote;