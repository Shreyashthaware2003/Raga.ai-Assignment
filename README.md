# B2B Healthcare SaaS Frontend

A frontend assignment project that simulates a B2B healthcare platform with authentication, analytics, patient management, responsive navigation, and local notifications.

## Live Demo
- Add your deployed URL here: `https://<your-vercel-app>.vercel.app`

## Repository
- Add your GitHub repo URL here: `https://github.com/<your-username>/<repo-name>`

## Tech Stack
- React
- TypeScript
- Redux Toolkit + React Redux
- React Router
- Firebase Authentication
- Tailwind CSS
- Recharts
- Sonner (toasts)
- Vite

## Implemented Features

### 1) Authentication (Firebase)
- Email/password login with Firebase Auth
- Basic client-side validation and error messaging
- Protected routes for dashboard modules
- Logout flow integrated with Redux auth state

### 2) Application Pages
- Login Page
- Dashboard Overview Page
- Analytics Page
- Patient Details Page

### 3) Patient Details Module
- Grid view and List view
- View toggle (Redux-managed state)
- Search support (name, id, condition, doctor)
- Status badges and last-visit information
- Loading, error, and empty states
- Responsive layout for desktop/tablet/mobile

### 4) Notifications (Service Worker)
- Service worker registration
- Local notification trigger use case (demo)
- Permission handling with fallback toast messages

### 5) State Management
- Redux Toolkit store setup
- Auth slice for login/session state
- Patient slice for records, view mode, and search state

### 6) UI/UX
- Collapsible desktop sidebar
- Mobile hamburger sidebar drawer with overlay
- Sidebar tooltips in collapsed mode
- Toast feedback for unavailable/upcoming modules

## Project Structure (High Level)
```text
src/
  app/
    layout/
    routes/
  modules/
    auth/
    dashboard/
    analytics/
    patient-details/
  services/
    auth/
    firebase.ts
    notifications.ts
  store/
    slices/
  mockData/
public/
  sw.js
```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm

### Installation
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## Firebase Setup
This project uses Firebase Authentication.  
Update Firebase config in `src/services/firebase.ts` with your project credentials if needed.

## Demo Credentials
If your Firebase project contains the demo user:
- Email: `demo@gmail.com`
- Password: `demo123`

If not, create this user in Firebase Authentication (Email/Password) before testing login.

## Key Routes
- `/login`
- `/dashboard`
- `/dashboard/analytics`
- `/dashboard/patient-details`

## Notification Demo
1. Open **Patient Details** page.
2. Click the notification trigger button (if added in your module UI).
3. Allow notification permission in browser prompt.
4. Confirm local notification appears.

## Deployment (Vercel)
1. Push code to GitHub.
2. Import project in Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.

For SPA routing, ensure Vercel fallback is configured to serve `index.html` for client routes.

## Evaluation Alignment
- Code quality and modular structure: achieved with module-based folders and Redux slices.
- UI/UX and responsiveness: handled in dashboard, patient module, and mobile sidebar flow.
- State management: centralized via Redux Toolkit.
- Feature completeness: login, pages, patient views, notifications demo, protected routes.
- Scalability: clean structure ready for additional modules and APIs.
