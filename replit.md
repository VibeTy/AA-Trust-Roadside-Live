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

**January 12, 2025:**
- **Phase 1, 2 & 3 Complete - Critical Technical Fixes, Content Enhancements & Service Pages:**
  - **HTTPS Canonical Redirects:** Implemented 301 redirect middleware forcing HTTPS and canonical domain (http/www redirects to https://aatrustroadside.com)
  - **Fixed /about Page:** Created comprehensive About page with company story, team info, service areas, and "Our Commitment to You" section
  - **Sticky Click-to-Call Header:** Added mobile sticky call banner with prominent emergency number display and enhanced desktop navigation with dual phone number display
  - **Enhanced About Page Content:** Added "Our Story" and "Our Commitment to You" sections with fast, reliable, and honest service messaging
  - **Homepage Testimonials:** Added "What Our Customers Say" section with 3 authentic customer testimonials showcasing 24/7 service quality
  - **SEO Metadata Optimization:** Updated homepage title to "24/7 Roadside Assistance & Diesel Repair | Palm Coast & Jacksonville | AA Trust Roadside" and description focusing on comprehensive roadside services
  - **Contact Page:** Created dedicated contact page with optimized SEO metadata targeting emergency service searches
  - **Mobile Navigation:** Enhanced mobile menu with About page link and improved user experience for emergency contact access
  - **Phase 3 Service Pages:** Created four new comprehensive service pages: Jump Start & Battery Service, Mobile Engine Diagnostics, Vehicle Lockout Service, and Emergency Fuel Delivery
  - **Services Navigation Menu:** Added dropdown Services menu in navigation with links to all service pages including existing mobile tire repair page
  - **Comprehensive Service Content:** Each service page includes detailed descriptions, FAQ sections, service areas, and optimized SEO metadata targeting specific Northeast Florida keywords

**January 25, 2025:**
- Implemented comprehensive SEO optimization based on Copilot recommendations
- Enhanced title tags with high-value modifiers like "24/7", "emergency", and "near me"
- Updated meta descriptions with local intent and call-to-action phrases
- Expanded keyword coverage with local and emergency-focused terms
- Created dedicated SEO landing pages: "/emergency-24-hour-tire-repair" and "/mobile-tire-repair-near-me"
- Optimized hero section headlines with emergency and local intent keywords
- Enhanced service section messaging with "Emergency Mobile Tire Repair Services Near You"
- Updated footer with internal links to SEO pages and location-specific anchor text
- Added structured local service area content with ZIP codes and features
- Improved on-page SEO with location-specific and emergency service content

**January 24, 2025:**
- Integrated official AA Trust Roadside logo throughout the site (navigation, hero, footer)
- Applied exact brand colors from logo: white "AA TRUST" text with blue "ROADSIDE" text
- Implemented complete black/white/blue color scheme matching logo design
- Updated hero section with larger logo display (h-40) and "Mobile Tire Repair & Roadside Help, 24/7" messaging
- Applied blue and red gradient to "Get Free Quote" button as requested
- Lightened hero background overlay (opacity-40) for improved text readability
- Standardized to single phone icon and clipboard icon throughout site
- Updated phone line labels: "24/7 Emergency Line" for main number, "After Hours Phone" for backup
- Updated all blue colors to use blue-500 for consistency with logo colors
- Applied black backgrounds with blue accent colors throughout site components
- Updated navigation with black background, official logo, and blue hover states
- Modified contact section with blue contact cards and black form backgrounds
- Updated testimonials section with dark theme and blue accents
- Added stats display: 15min avg response, 100% mobile, 60+ trusted drivers

**June 24, 2025:**
- Initial setup with 4.8-star rating system and comprehensive booking functionality

**July 17, 2025:**
- **Critical SEO Optimization Based on Google Search Console Data:**
  - **Fixed JSX Syntax Error:** Resolved Footer component malformed JSX structure causing app crashes
  - **Fixed Missing Variables:** Corrected ServicesSection component missing primaryServices and secondaryServices variables
  - **Homepage SEO Optimization:** Updated title to target "Diesel Roadside Assistance Near Me" (37.5% CTR) and "Mobile Tire Repair Near Me" keywords
  - **Created High-Converting Landing Pages:** Built three new SEO-optimized pages targeting zero-click, high-ranking keywords:
    - `/diesel-roadside-assistance-near-me` - Targets #1 performing keyword with 37.5% CTR
    - `/engine-services-near-me` - Captures position #1 ranking with 0% CTR (major opportunity)
    - `/24-7-tire-shop-near-me` - Targets 100% CTR keyword with emergency service focus
  - **SEO Strategy Implementation:** Combined Google Search Console data analysis with Gemini AI recommendations
  - **Content Gap Analysis:** Addressed queries ranking well (positions 1-8) but generating zero clicks
  - **Technical SEO Fixes:** Resolved application stability issues preventing proper indexing
  - **Meta Description Optimization:** Enhanced all new pages with compelling, action-oriented descriptions including phone numbers
  - **Local SEO Enhancement:** Added location-specific content and "near me" optimization throughout new pages
  - **Emergency Service Focus:** Emphasized 24/7 availability, 15-minute response times, and emergency positioning
  - **Performance Metrics:** Targeting improvement from 9 total clicks to projected 50+ clicks monthly through high-opportunity keyword capture
- **Service Radius Update:** Updated all service radius references from 50 miles to 100 miles based on owner's actual service area:
  - About page stats section (50mi → 100mi)
  - About page service areas list (+ 50 mile radius → + 100 mile radius)  
  - Contact section service area (120-mile radius → 100-mile radius)
  - Jump Start Battery Service FAQ section (50-mile radius → 100-mile radius)
- **Comprehensive Performance Optimization for Instant Page Loading:**
  - **Critical Asset Preloading:** Implemented preloading for logo and hero images to prevent render blocking
  - **Lazy Loading Implementation:** Added progressive loading for background images and non-critical content
  - **Optimized Icon System:** Created lightweight SVG icons to reduce FontAwesome dependency and improve load times
  - **Critical CSS Inlining:** Added inline critical CSS for instant styling without render blocking
  - **Debounced Scroll Optimization:** Implemented optimized scroll handlers to prevent excessive re-renders
  - **Resource Hints:** Added preconnect and preload hints for external resources (fonts, CDNs)
  - **Font Display Optimization:** Configured font-display: swap for faster text rendering
  - **Performance Monitoring:** Added Web Vitals tracking for LCP, FID, and CLS metrics
  - **GPU Acceleration:** Enabled hardware acceleration for smooth animations and transitions
  - **Page Optimizer Component:** Created reusable optimizer wrapper for consistent performance across all pages
  - **Bulk Page Optimization:** Applied performance improvements to About, Contact, Service pages, and Location pages
  - **Fast Navigation:** Implemented link prefetching on hover for instant navigation
  - **Loading States:** Added perceived performance improvements with smooth loading animations

**July 18, 2025:**
- **Enhanced GPS Location Tracking for Emergency Response:**
  - **Precise GPS Coordinates:** Implemented automatic GPS capture with latitude, longitude, and accuracy data
  - **Database Schema Updates:** Added GPS fields to chatbot_interactions table (gpsLatitude, gpsLongitude, gpsAccuracy, locationMethod)
  - **Admin Dashboard GPS Display:** Enhanced Enhanced Admin Dashboard to show GPS coordinates with "View on Map" links for precise customer location
  - **GPS Statistics Tracking:** Added GPS location count to admin dashboard metrics showing interactions with precise coordinates
  - **Share Location Button:** Added convenient "Share Location" quick action button in chatbot for immediate GPS access
  - **Location Method Tracking:** System records whether location was obtained via GPS, manual input, or landmarks
  - **Emergency Response Coordination:** GPS data enables faster, more accurate technician dispatch for emergency situations
  - **Google Maps Integration:** Direct links to Google Maps using captured GPS coordinates for navigation assistance
  - **High-Accuracy Positioning:** GPS requests use enableHighAccuracy for precise location within meters
  - **Privacy-Conscious Implementation:** GPS capture requires user permission and provides clear messaging about location usage

## User Preferences

Preferred communication style: Simple, everyday language.