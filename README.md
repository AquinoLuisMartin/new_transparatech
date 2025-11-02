# PUPSMB TransparaTech

A comprehensive transparency portal and management system designed for the Polytechnic University of the Philippines Sta. Maria Branch (PUPSMB). This digital platform promotes openness, accountability, and responsible governance within the university community through modern web technologies.

## 📋 Project Description

The PUPSMB Transparency Portal is a digital platform dedicated to promoting openness, accountability, and responsible governance within the university community. It serves as a central hub for managing, submitting, and reviewing organizational and financial reports with clarity and integrity.

### Key Features

- **🏛️ Role-based Dashboard System**: Three distinct user roles with specialized interfaces
  - **Admin Dashboard**: Complete system oversight, user management, document approvals, analytics, and system settings
  - **Officer Dashboard**: Document submission, activity tracking, and organizational announcements
  - **Viewer Dashboard**: Public access to transparency reports, documents, and feedback submission

- **📊 Transparency Dashboard**: Real-time visibility and control with performance data and operational metrics
- **🤖 Automation Solutions**: Intelligent automation tools that handle repetitive tasks and data entry
- **📁 Data Management Services**: Comprehensive data handling with enhanced organization and accessibility
- **📱 Responsive Design**: Fully responsive interface built with Tailwind CSS
- **🔐 Authentication & Authorization**: Secure login system with role-based access control
- **📈 Analytics & Reporting**: Built-in analytics with ApexCharts integration
- **📅 Calendar Integration**: FullCalendar integration for scheduling and events

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.0.0** - Modern React with latest features
- **TypeScript 5.7.2** - Type-safe development
- **React Router DOM 7.9.5** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.0.8** - Utility-first CSS framework
- **Tailwind Merge** - Dynamic class merging
- **Custom CSS** - Additional styling for specific components

### Charts & Visualization
- **ApexCharts 4.1.0** - Interactive charts and graphs
- **React ApexCharts** - React wrapper for ApexCharts
- **React JVectorMap** - Interactive vector maps

### Form & Input Handling
- **React Dropzone** - File upload interface
- **Flatpickr** - Date/time picker
- **React DnD** - Drag and drop functionality

### Development Tools
- **Vite 6.1.0** - Fast build tool and development server
- **ESLint 9.19.0** - Code linting and formatting
- **PostCSS** - CSS processing

### Additional Libraries
- **React Helmet Async** - Document head management
- **Swiper** - Touch slider component
- **FullCalendar** - Calendar component
- **CLSX** - Conditional class names utility

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/transparatech-typescript.git
   cd transparatech-typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The development server will automatically reload when you make changes

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
transparatech-typescript/
├── public/                          # Static assets
│   └── images/                      # Public images
│       ├── country/                 # Country-related images
│       ├── error/                   # Error page images
│       ├── logo/                    # Logo assets
│       └── user/                    # User avatar images
│
├── src/                             # Source code
│   ├── components/                  # Reusable React components
│   │   ├── PrivateRoute.tsx         # Route protection component
│   │   ├── charts/                  # Chart components
│   │   │   ├── bar/                 # Bar chart components
│   │   │   └── line/                # Line chart components
│   │   ├── common/                  # Common UI components
│   │   │   ├── ComponentCard.tsx    # Card wrapper component
│   │   │   ├── GridShape.tsx        # Grid layout component
│   │   │   ├── PageBreadCrumb.tsx   # Breadcrumb navigation
│   │   │   ├── PageMeta.tsx         # Page metadata component
│   │   │   ├── ScrollToTop.tsx      # Scroll to top functionality
│   │   │   ├── ThemeToggleButton.tsx # Theme switching
│   │   │   └── ThemeTogglerTwo.tsx  # Alternative theme toggler
│   │   ├── form/                    # Form components
│   │   │   ├── date-picker.tsx      # Date picker component
│   │   │   ├── Form.tsx             # Main form component
│   │   │   ├── Label.tsx            # Form label component
│   │   │   ├── MultiSelect.tsx      # Multi-select component
│   │   │   ├── Select.tsx           # Select dropdown
│   │   │   ├── form-elements/       # Form input elements
│   │   │   ├── group-input/         # Grouped input components
│   │   │   ├── input/               # Input components
│   │   │   └── switch/              # Toggle switch components
│   │   ├── header/                  # Header components
│   │   │   ├── Header.tsx           # Main header
│   │   │   ├── NotificationDropdown.tsx # Notifications
│   │   │   └── UserDropdown.tsx     # User menu dropdown
│   │   ├── tables/                  # Table components
│   │   │   └── BasicTables/         # Basic table implementations
│   │   ├── ui/                      # UI components
│   │   │   ├── alert/               # Alert components
│   │   │   ├── avatar/              # Avatar components
│   │   │   ├── badge/               # Badge components
│   │   │   ├── button/              # Button components
│   │   │   ├── dropdown/            # Dropdown components
│   │   │   ├── images/              # Image components
│   │   │   ├── modal/               # Modal components
│   │   │   ├── table/               # Table UI components
│   │   │   └── videos/              # Video components
│   │   └── UserProfile/             # User profile components
│   │       ├── UserAddressCard.tsx  # Address card component
│   │       ├── UserInfoCard.tsx     # User info card
│   │       └── UserMetaCard.tsx     # User metadata card
│   │
│   ├── context/                     # React Context providers
│   │   ├── AuthContext.ts           # Authentication context
│   │   ├── AuthProvider.tsx         # Auth provider component
│   │   ├── SidebarContext.tsx       # Sidebar state management
│   │   └── ThemeContext.tsx         # Theme management
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts               # Authentication hook
│   │   ├── useGoBack.ts             # Navigation hook
│   │   └── useModal.ts              # Modal management hook
│   │
│   ├── icons/                       # Icon components and assets
│   │   └── index.ts                 # Icon exports
│   │
│   ├── images/                      # Application images
│   │
│   ├── layout/                      # Layout components
│   │   ├── AppHeader.tsx            # Application header
│   │   ├── AppLayout.tsx            # Main layout wrapper
│   │   ├── AppSidebar.tsx           # Sidebar navigation
│   │   ├── Backdrop.tsx             # Modal backdrop
│   │   └── SidebarWidget.tsx        # Sidebar widget component
│   │
│   ├── pages/                       # Page components
│   │   ├── AccountSettings.tsx      # Account settings page
│   │   ├── Blank.tsx                # Blank page template
│   │   ├── Calendar.tsx             # Calendar page
│   │   ├── FileUpload.tsx           # File upload page
│   │   ├── UserProfiles.tsx         # User profiles page
│   │   ├── AuthPages/               # Authentication pages
│   │   │   ├── AuthPageLayout.tsx   # Auth layout wrapper
│   │   │   ├── Login.css            # Login page styles
│   │   │   ├── LogIn.tsx            # Login page
│   │   │   ├── Signup.css           # Signup page styles
│   │   │   └── SignUp.tsx           # Signup page
│   │   ├── Charts/                  # Chart pages
│   │   │   ├── BarChart.tsx         # Bar chart page
│   │   │   └── LineChart.tsx        # Line chart page
│   │   ├── Dashboard/               # Dashboard pages
│   │   │   ├── index.tsx            # Main dashboard
│   │   │   ├── Admin/               # Admin dashboard pages
│   │   │   │   ├── DocumentApprovals.tsx
│   │   │   │   ├── UserManagement.tsx
│   │   │   │   ├── OrganizationManagement.tsx
│   │   │   │   ├── AnnouncementsManagement.tsx
│   │   │   │   ├── AnalyticsReports.tsx
│   │   │   │   └── SystemSettings.tsx
│   │   │   ├── Officer/             # Officer dashboard pages
│   │   │   │   ├── UploadDocuments.tsx
│   │   │   │   ├── MySubmissions.tsx
│   │   │   │   ├── ActivityLog.tsx
│   │   │   │   └── Announcements.tsx
│   │   │   └── Viewer/              # Viewer dashboard pages
│   │   │       ├── DocumentsViewer.tsx
│   │   │       ├── TransparencyReportViewer.tsx
│   │   │       ├── AnnouncementsViewer.tsx
│   │   │       └── FeedbackViewer.tsx
│   │   ├── Forms/                   # Form pages
│   │   │   └── FormElements.tsx     # Form elements showcase
│   │   ├── Landing/                 # Landing pages
│   │   │   ├── Home.css             # Home page styles
│   │   │   └── Home.tsx             # Landing page
│   │   ├── OtherPage/               # Other pages
│   │   │   ├── NotFound.tsx         # 404 error page
│   │   │   └── Unauthorized.tsx     # 401 error page
│   │   ├── Tables/                  # Table pages
│   │   │   └── BasicTables.tsx      # Basic tables page
│   │   └── UiElements/              # UI showcase pages
│   │       ├── Alerts.tsx           # Alerts showcase
│   │       ├── Avatars.tsx          # Avatars showcase
│   │       ├── Badges.tsx           # Badges showcase
│   │       ├── Buttons.tsx          # Buttons showcase
│   │       ├── Images.tsx           # Images showcase
│   │       └── Videos.tsx           # Videos showcase
│   │
│   ├── routes/                      # Application routing
│   │   └── index.tsx                # Route definitions
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── auth.ts                  # Authentication types
│   │
│   ├── App.tsx                      # Main application component
│   ├── index.css                    # Global styles
│   ├── main.tsx                     # Application entry point
│   ├── permissions.ts               # Permission management
│   ├── svg.d.ts                     # SVG type declarations
│   └── vite-env.d.ts               # Vite environment types
│
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template
├── package.json                     # Project dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── README.md                        # Project documentation
├── tsconfig.app.json               # TypeScript config for app
├── tsconfig.json                   # Main TypeScript configuration
├── tsconfig.node.json              # TypeScript config for Node.js
└── vite.config.ts                  # Vite configuration
```

## 🔐 User Roles & Permissions

### Admin Role
- **System Management**: Complete oversight of the entire system
- **User Management**: Create, edit, and manage user accounts
- **Document Approvals**: Review and approve submitted documents
- **Organization Management**: Manage student organizations
- **Analytics & Reports**: Access to system-wide analytics
- **System Settings**: Configure system parameters

### Officer Role
- **Document Upload**: Submit organizational documents and reports
- **Submission Tracking**: Monitor status of submitted documents
- **Activity Logging**: Track personal activities and submissions
- **Announcements**: View organizational announcements

### Viewer Role
- **Document Access**: View approved public documents
- **Transparency Reports**: Access transparency reports
- **Public Announcements**: View public announcements
- **Feedback Submission**: Submit feedback and suggestions

## 🌍 Supported Organizations

The system currently supports the following PUPSMB student organizations:

- **SC** - Student Council
- **CEM** - Chamber of Entrepreneurs and Managers
- **iSITE** - Integrated Students in Information Technology Education
- **ACES** - Alliance of Computer Engineering Students
- **AFT** - Association of Future Teachers
- **HMSOC** - Hospitality Management Society
- **JPIA** - Junior Philippine Institute of Accountancy - Sta Maria

## 🔧 Configuration

### Environment Setup
Create environment variables for:
- Database connections
- Authentication secrets
- API endpoints
- File upload configurations

### Development Configuration
The project uses several configuration files:
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - Code linting rules
- `postcss.config.js` - PostCSS processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Note**: This project is specifically designed for PUPSMB's transparency initiatives and governance requirements. The system promotes accountability, openness, and efficient document management within the university community.#
