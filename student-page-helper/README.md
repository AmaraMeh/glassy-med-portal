# 🎓 Student Page Helper

A floating desktop application built with Electron.js to help manage your student Instagram/Telegram page with quick replies, saved links, and notes.

## ✨ Features

### 🪟 Always on Top Window
- Small floating window that stays above all other applications
- Draggable and resizable
- Custom title bar with minimize and hide/show functionality

### 💬 Quick Reply Manager
- Add, edit, and delete saved replies
- Categorize replies (Scholarships, Exams, General, Memes, Support)
- One-click copy to clipboard
- Keyboard shortcuts (Ctrl+1 to Ctrl+9) for instant access
- Auto-paste functionality for web applications

### 🔗 Quick Links & Resources
- Save important links (E-Minha, Telegram, Google Drive, E-Campus)
- Click to open in default browser
- Customizable icons and names

### 📝 Notes & Ideas
- Save meme ideas, captions, or tasks
- Simple text-based note system
- Edit and delete functionality

### 🎨 Customization
- Dark/Light theme toggle
- Customizable accent colors
- Modern, responsive design

## 🛠 Tech Stack

- **Electron.js** - Cross-platform desktop application framework
- **HTML/CSS/JavaScript** - Frontend implementation
- **electron-store** - Local data persistence
- **Font Awesome** - Icons

## 📋 Prerequisites

Before installing Student Page Helper, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Installing Node.js

#### Windows
1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation: `node --version` and `npm --version`

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

## 🚀 Installation & Setup

### 1. Clone or Download the Project
```bash
git clone <repository-url>
cd student-page-helper
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run in Development Mode
```bash
npm start
```

### 4. Build for Production

#### Build for Current Platform
```bash
npm run build
```

#### Build for Specific Platform
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## 📱 Usage Guide

### Getting Started
1. **Launch the app**: Run `npm start` or double-click the built executable
2. **Position the window**: Drag the title bar to position the app where you want it
3. **Keep it on top**: The app automatically stays above other windows

### Managing Quick Replies
1. **Add a reply**: Click the "+" button in the Quick Replies section
2. **Set category**: Choose from General, Scholarships, Exams, Memes, or Support
3. **Assign shortcut**: Optionally assign a keyboard shortcut (Ctrl+1 to Ctrl+9)
4. **Use quickly**: Click the copy button or use the keyboard shortcut

### Using Keyboard Shortcuts
- **Ctrl+1** to **Ctrl+9**: Instantly copy the corresponding quick reply
- **Escape**: Close any open modal
- **Tab**: Navigate between form fields

### Managing Links
1. **Add a link**: Click the "+" button in the Quick Links section
2. **Enter details**: Provide name, URL, and choose an emoji icon
3. **Access quickly**: Click any link to open it in your default browser

### Taking Notes
1. **Add a note**: Click the "+" button in the Notes section
2. **Write your idea**: Enter your meme idea, caption, or task
3. **Edit anytime**: Click the edit button to modify existing notes

### Customizing the App
1. **Change theme**: Toggle between Dark and Light modes
2. **Customize colors**: Choose your preferred accent color
3. **Resize window**: Drag the window edges to resize

## 🔧 Development

### Project Structure
```
student-page-helper/
├── main.js              # Main Electron process
├── index.html           # Main HTML file
├── styles.css           # CSS styles and theming
├── renderer.js          # Frontend JavaScript logic
├── package.json         # Dependencies and scripts
├── assets/              # Icons and assets
└── README.md            # This file
```

### Available Scripts
- `npm start` - Run the app in development mode
- `npm run dev` - Run with DevTools open
- `npm run build` - Build for current platform
- `npm run build:win` - Build for Windows
- `npm run build:mac` - Build for macOS
- `npm run build:linux` - Build for Linux

### Data Storage
The app uses `electron-store` to save all data locally:
- Quick replies are stored with categories and shortcuts
- Links are saved with names, URLs, and icons
- Notes are stored with timestamps
- Settings include theme and accent color preferences

## 🚀 Building for Distribution

### Windows
```bash
npm run build:win
```
Generates an NSIS installer in the `dist` folder.

### macOS
```bash
npm run build:mac
```
Creates a DMG file for distribution.

### Linux
```bash
npm run build:linux
```
Generates an AppImage file.

## 🐛 Troubleshooting

### Common Issues

#### App won't start
- Ensure Node.js is properly installed: `node --version`
- Check if dependencies are installed: `npm install`
- Verify the main.js file exists and is readable

#### Keyboard shortcuts not working
- Make sure the app has focus
- Check if shortcuts conflict with other applications
- Verify that replies have shortcuts assigned

#### Data not saving
- Check if the app has write permissions to the user directory
- Verify that electron-store is properly installed
- Check the console for error messages

#### Window not staying on top
- Ensure the app is not minimized
- Check if other applications are forcing focus
- Try restarting the app

### Getting Help
1. Check the console for error messages (DevTools)
2. Verify all dependencies are installed
3. Ensure you have the latest Node.js version
4. Check file permissions in your user directory

## 🔮 Future Features

- **Notifications system** - Reminders and alerts
- **AI reply suggestions** - Smart reply recommendations
- **Cloud sync** - Backup and sync across devices
- **Plugin system** - Extensible functionality
- **Statistics** - Usage analytics and insights

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions:
1. Check this README for solutions
2. Review the console for error messages
3. Ensure all prerequisites are met
4. Try reinstalling dependencies

---

**Happy studying! 🎓✨**
