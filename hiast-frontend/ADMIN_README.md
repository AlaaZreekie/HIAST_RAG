# HIAST Admin Dashboard

## Overview

This is the admin dashboard for the HIAST Institute website. It provides a secure interface for administrators to manage content, courses, posts, and other site features.

## Features

- **Secure Authentication**: JWT-based login system
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Dashboard Overview**: Statistics and quick actions
- **API Integration**: Connected to ASP.NET Core backend

## File Structure

```
hiast-frontend/
├── app/
│   ├── admin/                 # Admin routes
│   │   ├── login/            # Login page
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── layout.js         # Admin layout
│   │   └── admin.css         # Admin styles
├── components/
│   ├── admin/                # Admin components
│   │   └── LoginForm.jsx     # Login form component
├── lib/
│   └── api.js                # API service functions
└── middleware.js             # Next.js middleware
```

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Development settings
NEXT_PUBLIC_APP_ENV=development
```

### 2. Backend Requirements

Ensure your ASP.NET Core backend is running and accessible at the configured API URL. The backend should have:

- Authentication controller at `/api/auth/`
- JWT token generation
- CORS configured for frontend domain

### 3. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## API Endpoints

The frontend connects to these backend endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/GetAuthenticatedUser` - Get current user
- `POST /api/auth/register` - User registration

## Authentication Flow

1. User visits `/admin/login`
2. Enters email and password
3. Frontend sends login request to backend
4. Backend validates credentials and returns JWT token
5. Frontend stores token in localStorage
6. User is redirected to `/admin/dashboard`
7. Dashboard checks authentication on load

## Security Features

- JWT token storage in localStorage
- Automatic token inclusion in API requests
- Client-side authentication checks
- Secure logout functionality
- Form validation and error handling

## Styling

The admin dashboard uses:
- **Tailwind CSS** for utility-first styling
- **Custom admin classes** for consistent design
- **Responsive design** for mobile compatibility
- **Modern UI components** with hover effects

## Development

### Adding New Admin Pages

1. Create new route in `app/admin/`
2. Add authentication check in component
3. Use admin layout and styling classes
4. Connect to backend API as needed

### API Integration

Use the `authAPI` functions from `lib/api.js`:

```javascript
import { authAPI } from '@/lib/api';

// Login
const response = await authAPI.login(email, password);

// Logout
await authAPI.logout();

// Check authentication
const isAuth = isAuthenticated();
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend has CORS configured for frontend domain
2. **API Connection**: Check that backend is running and API URL is correct
3. **Authentication**: Verify JWT token format and backend validation
4. **Styling**: Ensure Tailwind CSS is properly configured

### Debug Mode

Enable debug logging by adding to `.env.local`:

```env
NEXT_PUBLIC_DEBUG=true
```

## Next Steps

- [ ] Add more admin pages (Posts, Courses, Users, etc.)
- [ ] Implement role-based access control
- [ ] Add file upload functionality
- [ ] Create data tables for content management
- [ ] Add search and filtering capabilities 