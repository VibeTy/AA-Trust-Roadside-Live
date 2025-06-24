# replit.md

## Overview

AA Trust Roadside is a full-stack web application for a mobile tire repair and roadside assistance service company, specializing in mobile tire repair/replacement (60-70%) and light diesel/mechanic services (30-40%). The application features a customer-facing website with service information, contact forms, quote requests, and booking systems, along with an administrative dashboard for managing submissions.

## System Architecture

**Frontend Architecture**
- React 18 with TypeScript
- Vite as the build tool and development server
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom diesel industry color scheme
- Wouter for client-side routing
- React Hook Form with Zod validation for form handling
- TanStack Query for state management and API communication

**Backend Architecture**
- Express.js server with TypeScript
- RESTful API endpoints for form submissions and admin operations
- Session-based authentication for admin access
- Middleware for request logging and error handling

**Database Layer**
- Drizzle ORM for database operations
- PostgreSQL database (configured for Neon serverless)
- Schema includes tables for users, contact submissions, quote submissions, and booking submissions

## Key Components

**Frontend Components**
- Navigation with smooth scrolling
- Hero section with call-to-action buttons
- Service showcase sections
- Interactive image gallery with auto-advancing slides
- Customer testimonials carousel
- Contact, quote, and booking forms with validation
- Service area map integration
- Admin login and dashboard interfaces
- Theme provider for dark/light mode support

**Backend Services**
- Contact form submission handling
- Quote request processing with contacted status tracking
- Booking submission management
- Admin authentication system
- Storage abstraction layer (currently using in-memory storage with database interface)

**Database Schema**
- `users` table for admin authentication
- `contact_submissions` table for general inquiries
- `quote_submissions` table for service quotes with tracking
- `booking_submissions` table for service bookings with scheduling

## Data Flow

1. **Customer Interactions**: Users fill out contact, quote, or booking forms on the frontend
2. **Form Validation**: Client-side validation using Zod schemas before submission
3. **API Processing**: Express server validates and stores submissions in the database
4. **Admin Management**: Administrators can view submissions and mark them as contacted
5. **Real-time Updates**: TanStack Query handles cache invalidation and UI updates

## External Dependencies

**Frontend Dependencies**
- React ecosystem (React, React DOM, React Hook Form)
- UI libraries (Radix UI components, shadcn/ui)
- Styling (Tailwind CSS, class-variance-authority)
- State management (TanStack Query)
- Utilities (date-fns, clsx, zod)

**Backend Dependencies**
- Express.js and middleware
- Database (Drizzle ORM, Neon PostgreSQL client)
- Session management (express-session, connect-pg-simple)
- Development tools (tsx for TypeScript execution)

**Build Tools**
- Vite for frontend bundling
- esbuild for server bundling
- TypeScript compiler
- PostCSS with Tailwind CSS

## Deployment Strategy

**Development Environment**
- Replit-based development with hot module replacement
- Vite dev server proxying API requests to Express backend
- PostgreSQL database provisioned through Replit

**Production Build**
- Frontend built with Vite to static assets
- Backend bundled with esbuild for Node.js execution
- Static files served by Express server
- Session management with secure cookies
- Environment variable configuration for database connection

**Replit Configuration**
- Uses Node.js 20, web, and PostgreSQL 16 modules
- Configured for autoscale deployment
- Port 5000 mapped to external port 80
- Build and start scripts defined for production deployment

## Recent Changes

**January 24, 2025:**
- Implemented complete black/white/blue color scheme redesign per user specifications
- Updated hero section with "Mobile Tire Repair & Roadside Help, 24/7" messaging and stats row
- Restructured services section with "Tire Services – Fast, Mobile, & Affordable" emphasis
- Applied black backgrounds with blue accent colors throughout site components
- Changed all primary action buttons from red to blue (#2D72D9)
- Updated navigation with black background and blue hover states
- Modified contact section with blue contact cards and black form backgrounds
- Updated testimonials section with dark theme and blue accents
- Added stats display: 15min avg response, 100% mobile, 60+ trusted drivers
- Updated footer with blue accents and proper attribution
- Changed sticky call button to blue theme
- Updated About section with "Fast Arrival • Fully Equipped • 24/7 Coverage" badges

**June 24, 2025:**
- Initial setup with 4.8-star rating system and comprehensive booking functionality

## User Preferences

Preferred communication style: Simple, everyday language.