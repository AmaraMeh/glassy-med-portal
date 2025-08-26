# University of Béjaïa - Faculty Websites Summary

## ✅ Completed Faculties

### 1. Faculty of Technology (`faculties/technologie/`)
- **Port**: 3001
- **Specialties**: ST LMD / ST ING 1er année et Architecture
- **First Year Subjects**: ST LMD, ST ING, Architecture, Computer Science
- **Features**: 
  - Programming Fundamentals
  - Computer Architecture
  - Software Engineering
  - Database Systems
  - Web Development
  - Mobile Apps
  - AI/ML
  - Cybersecurity

### 2. Faculty of Letters & Languages (`faculties/lettres-langues/`)
- **Port**: 3002
- **Specialties**: Anglais / Français / Arabe / Tamazight / Traduction
- **First Year Subjects**: English, French, Arabic, Tamazight, Translation
- **Features**:
  - Language Studies
  - Literature
  - Linguistics
  - Cultural Studies
  - Translation Studies
  - Interpretation
  - Technical Writing
  - Media Studies

### 3. Faculty of Law & Political Sciences (`faculties/droit-sciences-politiques/`)
- **Port**: 3003
- **Specialties**: Droit
- **First Year Subjects**: Constitutional Law, Civil Law, Criminal Law, Legal Methods
- **Features**:
  - Legal Studies
  - Political Science
  - International Law
  - Human Rights
  - Public Policy
  - Legal Research
  - Court Procedures
  - Legal Ethics

### 4. Faculty of Economics & Management (`faculties/sciences-economiques/`)
- **Port**: 3004
- **Specialties**: SEGC
- **First Year Subjects**: Accounting, Finance, Marketing, Economics
- **Features**:
  - Business Management
  - Financial Analysis
  - Market Research
  - Economic Theory
  - Business Strategy
  - Corporate Finance
  - International Business
  - Entrepreneurship

### 5. Faculty of Humanities & Social Sciences (`faculties/sciences-humaines/`)
- **Port**: 3005
- **Specialties**: STAPS / Sciences Humaines / Sciences Sociales
- **First Year Subjects**: Psychology, Sociology, Anthropology, Education
- **Features**:
  - Human Sciences
  - Social Sciences
  - Sports Science (STAPS)
  - Educational Psychology
  - Social Research
  - Cultural Anthropology
  - Human Development
  - Social Policy

### 6. Faculty of Exact Sciences (`faculties/sciences-exactes/`)
- **Port**: 3006
- **Specialties**: Informatique LMD / Informatique ING / Sciences de la Matière / Mathématiques
- **First Year Subjects**: Computer Science, Mathematics, Physics, Chemistry
- **Features**:
  - Computer Science
  - Mathematics
  - Physics
  - Chemistry
  - Statistics
  - Applied Sciences
  - Scientific Computing
  - Research Methods

### 7. Faculty of Natural & Life Sciences (`faculties/sciences-nature-vie/`)
- **Port**: 3007
- **Specialties**: Biologie 1er année / Sciences de la Matière 1er année
- **First Year Subjects**: Biology, Ecology, Genetics, Microbiology
- **Features**:
  - Life Sciences
  - Environmental Science
  - Genetics
  - Microbiology
  - Ecology
  - Biochemistry
  - Molecular Biology
  - Environmental Studies

## 🎯 Common Features Across All Faculties

### Academic Structure
- **Undergraduate Cycle** (Years 1-3): Foundation and specialized studies
- **Graduate Cycle** (Years 4-7): Advanced studies and research
- **Year-based Course Organization**: Each year has specific subjects and requirements

### User Interface
- **Responsive Design**: Mobile-first approach
- **Dark Mode Toggle**: Light and dark theme support
- **Modern UI**: Clean, professional design using shadcn/ui components
- **Navigation**: Intuitive navigation with faculty-specific branding

### Admin Panel Features
- **Dashboard**: Overview of students, courses, resources, and system health
- **User Management**: Faculty-specific user roles and permissions
- **Course Management**: Add, edit, and organize courses by year
- **Resource Management**: Upload and manage study materials
- **Announcement System**: Publish faculty-specific announcements
- **Analytics**: Track usage and engagement metrics

### Student Features
- **Course Access**: Year-specific course materials
- **Resource Library**: Download PDFs, videos, and study materials
- **Timetable**: View and manage class schedules
- **Announcements**: Real-time updates and notifications
- **Profile Management**: Student information and matricule validation

## 🛠️ Technical Implementation

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Backend**: Supabase
- **Build Tool**: Vite

### Database Schema
- **Profiles**: User information with matricule validation
- **User Roles**: Admin, moderator, and user roles
- **Courses**: Faculty-specific course management
- **Resources**: File uploads and management
- **Announcements**: Faculty-specific announcements
- **Timetables**: Schedule management

### Security Features
- **Authentication**: Secure login system
- **Authorization**: Role-based access control
- **Data Validation**: Matricule format validation
- **Row Level Security**: Database-level security policies

## 🚀 Deployment Information

### Development
```bash
# Install all dependencies
./install_all.sh

# Start all faculty websites
./start_all.sh
```

### Individual Faculty
```bash
cd faculties/[faculty-name]
npm install
npm run dev
```

### Production Build
```bash
cd faculties/[faculty-name]
npm run build
```

## 📊 Port Assignments

| Faculty | Port | URL |
|---------|------|-----|
| Technology | 3001 | http://localhost:3001 |
| Letters & Languages | 3002 | http://localhost:3002 |
| Law & Political Sciences | 3003 | http://localhost:3003 |
| Economics & Management | 3004 | http://localhost:3004 |
| Humanities & Social Sciences | 3005 | http://localhost:3005 |
| Exact Sciences | 3006 | http://localhost:3006 |
| Natural & Life Sciences | 3007 | http://localhost:3007 |

## 🔄 Maintenance

### Adding New Features
1. Make changes in the base faculty (e.g., `technologie/`)
2. Run the update script to propagate changes to other faculties
3. Test across all faculties to ensure consistency

### Customization
Each faculty can be customized independently while maintaining the core functionality and design consistency.

## ✅ Status: Complete

All 7 faculty websites have been successfully created with:
- ✅ Individual admin panels
- ✅ Faculty-specific content and specialties
- ✅ Consistent design and functionality
- ✅ Separate ports for independent operation
- ✅ Complete documentation and scripts
- ✅ Ready for development and deployment