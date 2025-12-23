# Courses Website

A full-stack web application for an online courses platform, featuring user authentication, course management, blogging, job postings, and an admin dashboard.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is a comprehensive online courses website that allows users to browse and enroll in courses, read blogs, apply for jobs, and interact with the platform. Administrators can manage content through a dedicated dashboard. The application follows a client-server architecture with a React frontend and a Node.js/Express backend.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js (Local and Google OAuth 2.0)
- **File Upload**: Multer
- **Email**: Nodemailer
- **Session Management**: Express Session with MongoDB store
- **Other Libraries**:
  - bcrypt for password hashing
  - cors for cross-origin requests
  - dotenv for environment variables
  - otp-generator for OTP generation
  - uuidv4 for unique identifiers

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit with Redux Thunk
- **UI Library**: Material-UI (MUI) with Emotion for styling
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Chart.js and Recharts
- **Rich Text Editor**: React Quill
- **Other Libraries**:
  - React Hot Toast for notifications
  - React Infinite Scroll for pagination
  - React Paginate for pagination controls
  - Swiper for carousels
  - Styled Components
  - React Helmet for SEO
  - React Top Loading Bar for loading indicators

### Development Tools
- **Build Tool**: Create React App (for frontend)
- **Process Manager**: Nodemon (for backend development)
- **Testing**: Jest and React Testing Library

## Architecture

The application follows a layered architecture:

### Backend Architecture
- **Controllers**: Handle business logic for different features (auth, courses, blogs, etc.)
- **Models**: Mongoose schemas for data modeling (User, Course, Blog, etc.)
- **Routers**: Define API endpoints and route handlers
- **Middleware**: Authentication, validation, IP tracking, etc.
- **Services**: Email sending, file uploads, etc.

### Frontend Architecture
- **Components**: Reusable UI components
- **Pages**: Main application pages
- **Actions/Reducers**: Redux state management
- **Store**: Centralized state store
- **Services**: API calls and data fetching

### Database Schema
Key models include:
- User: User accounts and profiles
- Course: Course information and content
- Blog: Blog posts
- Job: Job postings
- Cart: Shopping cart for courses
- Messages: Contact messages
- Admin: Administrative users
- And more...

## Features

### User Features
- User registration and login (local and Google OAuth)
- Password reset with OTP
- Course browsing and enrollment
- Shopping cart functionality
- Blog reading
- Job application
- Contact form
- Profile management

### Admin Features
- Dashboard with analytics
- Course management (add, edit, delete)
- Blog management
- Job posting management
- FAQ management
- User management
- Message handling
- Site traffic monitoring

### General Features
- Responsive design
- SEO optimization
- Sitemap generation
- Email notifications
- File uploads
- Search and filtering

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   SESSION_SECRET=your_session_secret
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (if needed for API URLs):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

The application will be running at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Usage

1. **User Registration/Login**: Users can create accounts or log in using email/password or Google OAuth.
2. **Browse Courses**: Users can view available courses, filter by categories, and add to cart.
3. **Admin Dashboard**: Administrators can log in to manage content, view analytics, and handle user interactions.
4. **Content Management**: Admins can add/edit courses, blogs, jobs, and FAQs through the dashboard.

## API Endpoints

The backend provides RESTful APIs for various functionalities:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/google` - Google OAuth

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Add new course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog post (admin)
- `PUT /api/blogs/:id` - Update blog post (admin)

### And more endpoints for jobs, FAQs, messages, cart, etc.

For a complete list, refer to the router files in `backend/Router/`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.