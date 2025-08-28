## Overview

AA Trust Roadside is a full-stack web application for a mobile tire repair and roadside assistance service company. It aims to provide a comprehensive platform for managing mobile tire repair/replacement and light diesel/mechanic services. The application features a customer-facing website for service information, contact, quote requests, and booking, alongside an administrative dashboard for managing submissions and operations. The business vision is to provide fast, reliable, and honest roadside assistance, emphasizing 24/7 availability and quick response times within a 100-mile service radius.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**UI/UX Decisions:**
The application uses React 18 with TypeScript, `shadcn/ui` and Radix UI for components, and Tailwind CSS for styling, featuring a custom diesel industry color scheme (black, white, and blue) consistent with the company's branding and logo. Key UI elements include a sticky mobile call banner, enhanced navigation with service dropdowns, and an interactive image gallery. The admin dashboard is organized into five main sections (Dashboard, Leads, Jobs, Analytics, Settings) with a professional, color-coded design for streamlined workflow. Performance optimization is a priority, with critical asset preloading, lazy loading, optimized icon systems, critical CSS inlining, and GPU acceleration for instant page loading and smooth animations.

**Technical Implementations:**
- **Frontend:** React 18, TypeScript, Vite, Wouter for routing, React Hook Form with Zod for validation, and TanStack Query for state management and API communication.
- **Backend:** Express.js with TypeScript, implementing RESTful API endpoints for submissions and admin operations, session-based authentication, and middleware for logging and error handling.
- **Database:** PostgreSQL with Drizzle ORM, including tables for users, contact submissions, quote submissions, and booking submissions. GPS location tracking data is integrated into the database for precise emergency response coordination.
- **Data Flow:** Customer form submissions are validated client-side with Zod, processed by the Express server, and stored in the database. Administrators manage submissions via the dashboard, with real-time updates handled by TanStack Query.
- **Features:**
    - Comprehensive forms for contact, quotes, and bookings with validation.
    - Admin dashboard for lead management (quotes, contacts, smart analyzer), job management (bookings with urgency coding), analytics (website, calls, chat, GPS locations), and settings.
    - Automated GPS capture with "Share Location" quick action in chatbot, displaying coordinates on the admin dashboard with "View on Map" links.
    - SEO optimization across all pages, including dynamic title tags, meta descriptions, and dedicated landing pages for high-converting keywords (e.g., "Diesel Roadside Assistance Near Me," "Mobile Tire Repair Near Me").
    - Integration of official company branding, colors, and logo throughout the site.

## External Dependencies

- **Frontend:** React, React DOM, React Hook Form, Radix UI, shadcn/ui, Tailwind CSS, class-variance-authority, TanStack Query, date-fns, clsx, zod.
- **Backend:** Express.js, Drizzle ORM, Neon PostgreSQL client, express-session, connect-pg-simple, tsx.
- **Build Tools:** Vite, esbuild, TypeScript, PostCSS.