# Frontend - APPIT Next.js Application

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

The frontend application for APPIT - AI-Powered Resume Screener and Interview Prep Tool. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Pages
- **Landing Page**: Modern hero section with feature highlights
- **Authentication**: Login/Register with JWT-based auth
- **Dashboard**: User overview with statistics and quick actions
- **Resume Analyzer**: File upload and job description input
- **Analysis Results**: Detailed fit score and recommendations
- **Analysis History**: Complete history of all analyses

### UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Protected Routes**: Authentication-based route protection
- **Smart Navigation**: Context-aware navigation based on auth status
- **File Upload**: Drag-and-drop resume upload with validation
- **Real-time Feedback**: Loading states and error handling
- **Modern Components**: Clean, accessible UI components

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT tokens with HTTP-only cookies
- **File Handling**: Native HTML5 file upload with validation
- **Icons**: Heroicons and custom SVG icons
- **Fonts**: Inter font family

## 📁 Project Structure

```
frontend-nextjs/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication group
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── analysis/                # Analysis pages
│   │   └── [id]/               # Dynamic analysis detail page
│   ├── analysis-history/        # Analysis history page
│   ├── analyze/                 # Resume analyzer page
│   ├── dashboard/               # User dashboard
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # Reusable components
│   ├── layouts/                # Layout components
│   │   └── RootLayout.tsx      # Main layout with navigation
│   ├── ProtectedRoute.tsx      # Route protection wrapper
│   └── PublicRoute.tsx         # Public route wrapper
├── contexts/                   # React Context providers
│   └── AuthContext.tsx         # Authentication context
├── lib/                        # Utility libraries
├── public/                     # Static assets
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🎨 Styling & Design

### Tailwind CSS Configuration
- **Custom Colors**: Brand-specific color palette
- **Typography**: Inter font with custom font sizes
- **Components**: Reusable utility classes
- **Responsive**: Mobile-first breakpoints

### Design System
- **Primary Color**: Black (#000000)
- **Secondary Colors**: Gray scale palette
- **Accent Colors**: Blue, Green, Red for status indicators
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system

## 🔐 Authentication System

### Features
- JWT-based authentication
- Protected and public route wrappers
- Automatic token refresh
- Persistent login state
- Secure logout functionality

### Context API Structure
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Touch-friendly interface
- Optimized navigation
- Responsive typography
- Flexible grid layouts

## 🔄 API Integration

### HTTP Client Configuration
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Automatic token attachment
// Error handling and retry logic
// Request/response interceptors
```

### API Endpoints Used
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/analysis/analyze` - Submit analysis
- `GET /api/analysis/history` - Get analysis history
- `GET /api/analysis/:id` - Get analysis details

## 🧩 Component Architecture

### Layout Components
- **RootLayout**: Main layout with navigation
- **Header**: Navigation bar with auth-aware links
- **Footer**: Site footer with links

### Route Protection
- **ProtectedRoute**: Requires authentication
- **PublicRoute**: Redirects authenticated users

### Form Components
- File upload with drag-and-drop
- Form validation and error handling
- Loading states and feedback

## 🎯 Key Features Implementation

### File Upload
```typescript
// Drag-and-drop file upload
// File type validation (PDF, DOCX)
// File size limits (10MB)
// Preview and error handling
```

### Analysis Results
```typescript
// Fit score visualization
// Skills gap analysis display
// Interview questions presentation
// Downloadable results (future)
```

### History Management
```typescript
// Paginated analysis history
// Search and filter functionality
// Quick access to past results
// Delete and manage analyses
```

## 🚀 Performance Optimizations

- **Next.js App Router**: Optimized routing and rendering
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and images
- **Bundle Analysis**: webpack-bundle-analyzer

## 🧪 Testing

### Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm run test
```

### Testing Strategy
- Unit tests for components
- Integration tests for user flows
- E2E tests with Playwright
- Accessibility testing

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deployment Options
- **Vercel**: Recommended for Next.js apps
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment
- **AWS/GCP**: Cloud platform deployment

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_ENV=production
```

## 🔧 Configuration Files

### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig;
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript types and imports
2. **API Connection**: Verify NEXT_PUBLIC_API_URL
3. **Authentication**: Clear browser storage and cookies
4. **File Upload**: Check file size and format restrictions

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Implement proper error handling
4. Add loading states for async operations
5. Ensure mobile responsiveness
6. Write meaningful commit messages

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**
