# University of Béjaïa - Faculty Websites

This repository contains 7 separate faculty websites for the University of Béjaïa, each with its own specialized content and admin panel.

## 🏛️ Faculties

### 1. Faculty of Technology
- **Specialties**: ST LMD / ST ING 1er année et Architecture
- **Directory**: `faculties/technologie/`
- **Port**: 3001

### 2. Faculty of Letters & Languages
- **Specialties**: Anglais / Français / Arabe / Tamazight / Traduction
- **Directory**: `faculties/lettres-langues/`
- **Port**: 3002

### 3. Faculty of Law & Political Sciences
- **Specialties**: Droit
- **Directory**: `faculties/droit-sciences-politiques/`
- **Port**: 3003

### 4. Faculty of Economics & Management
- **Specialties**: SEGC
- **Directory**: `faculties/sciences-economiques/`
- **Port**: 3004

### 5. Faculty of Humanities & Social Sciences
- **Specialties**: STAPS / Sciences Humaines / Sciences Sociales
- **Directory**: `faculties/sciences-humaines/`
- **Port**: 3005

### 6. Faculty of Exact Sciences
- **Specialties**: Informatique LMD / Informatique ING / Sciences de la Matière / Mathématiques
- **Directory**: `faculties/sciences-exactes/`
- **Port**: 3006

### 7. Faculty of Natural & Life Sciences
- **Specialties**: Biologie 1er année / Sciences de la Matière 1er année
- **Directory**: `faculties/sciences-nature-vie/`
- **Port**: 3007

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-bejaia-faculties
   ```

2. **Install dependencies for all faculties**
   ```bash
   ./install_all.sh
   ```

3. **Start all faculty websites**
   ```bash
   ./start_all.sh
   ```

### Individual Faculty Setup

To work with a specific faculty:

```bash
cd faculties/[faculty-name]
npm install
npm run dev
```

## 🛠️ Technology Stack

Each faculty website is built with:
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Backend**: Supabase
- **Build Tool**: Vite

## 📁 Project Structure

```
faculties/
├── technologie/                 # Faculty of Technology
├── lettres-langues/            # Faculty of Letters & Languages
├── droit-sciences-politiques/  # Faculty of Law & Political Sciences
├── sciences-economiques/       # Faculty of Economics & Management
├── sciences-humaines/          # Faculty of Humanities & Social Sciences
├── sciences-exactes/           # Faculty of Exact Sciences
└── sciences-nature-vie/        # Faculty of Natural & Life Sciences
```

Each faculty directory contains:
- `src/` - Source code
- `public/` - Static assets
- `supabase/` - Database migrations
- `package.json` - Dependencies and scripts

## 🎨 Features

### Common Features (All Faculties)
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Toggle between light and dark themes
- **Admin Panel**: Separate admin interface for each faculty
- **Course Management**: Year-based course organization
- **Resource Library**: PDFs, videos, and study materials
- **Timetable**: Interactive schedule management
- **Announcements**: Real-time updates and notifications
- **User Authentication**: Secure login system

### Faculty-Specific Features
- **Customized Content**: Each faculty has specialized courses and subjects
- **Year Selection**: Undergraduate (Years 1-3) and Graduate (Years 4-7) cycles
- **Specialized Resources**: Faculty-specific study materials
- **Department Management**: Faculty-specific departments and instructors

## 🔧 Development

### Adding New Features
1. Make changes in the base faculty (e.g., `technologie/`)
2. Run the update script to propagate changes to other faculties:
   ```bash
   ./update_all_faculties.sh
   ```

### Customizing Individual Faculties
Each faculty can be customized independently by modifying files in their respective directories.

## 🌐 Deployment

### Production Build
```bash
cd faculties/[faculty-name]
npm run build
```

### Environment Variables
Each faculty uses the same Supabase configuration. Update the environment variables in each faculty's `.env` file if needed.

## 📊 Database Schema

The Supabase database includes:
- **Profiles**: User information and matricule validation
- **User Roles**: Admin, moderator, and user roles
- **Courses**: Faculty-specific course management
- **Resources**: File uploads and management
- **Announcements**: Faculty-specific announcements
- **Timetables**: Schedule management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across all faculties
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in each faculty directory

## 🔄 Updates

To update all faculties with new features:
```bash
./update_all_faculties.sh
```

This script will propagate changes from the base faculty to all other faculties while preserving their individual customizations.
