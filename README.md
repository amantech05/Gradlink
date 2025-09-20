# Grad Link Alumni Connection Platform

A comprehensive web application designed to connect graduates and alumni, fostering mentorship, networking, and career development opportunities.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login and signup system with role-based access
- **Personalized Dashboard**: Overview of user activities, achievements, and connections
- **Profile Management**: Comprehensive user profiles with achievements and experience tracking
- **Mentorship System**: Connect with experienced mentors and schedule guidance sessions

### Communication & Collaboration
- **Noticeboard**: Stay updated with important announcements and events
- **Article Sharing**: Publish and read career advice, success stories, and industry insights
- **Messaging System**: Direct communication between users
- **Meeting Scheduler**: Book virtual or in-person meetings with mentors

### Content Management
- **File Uploads**: Share documents, portfolios, and resources
- **Achievement Tracking**: Monitor progress and earn badges
- **Article Categories**: Organized content by topics like career advice, networking, etc.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Real-time subscriptions** for live updates

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account (for backend services)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd grad-link-alumni-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your Supabase configuration:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📖 Usage

### For New Users
1. Visit the application and click "Sign Up"
2. Complete your profile with educational background and career interests
3. Explore available mentors and connect with alumni

### For Alumni/Mentors
1. Update your profile with expertise and availability
2. Respond to mentorship requests
3. Share articles and insights on the platform

### Navigation
- **Dashboard**: Overview of your activity and connections
- **Mentors**: Browse and connect with available mentors
- **Noticeboard**: View announcements and events
- **Articles**: Read and write career-related content
- **Messages**: Communicate with other users
- **Meetings**: Schedule and manage mentorship sessions

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (LoadingSpinner, LevelBadge)
│   └── layout/         # Layout components (Header, Footer, Layout)
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Mentors.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication logic
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Ensure all tests pass before submitting PR
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

For support, email support@gradlink.com or join our Discord community.

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced mentorship matching algorithm
- [ ] Video call integration for meetings
- [ ] Job board integration
- [ ] Alumni directory with advanced search
- [ ] Analytics dashboard for administrators

---

**Made with ❤️ for graduates and alumni worldwide**
