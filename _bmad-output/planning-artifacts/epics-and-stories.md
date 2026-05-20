---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-finalize-stories
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
projectName: agenda-clean
date: '13 de maio de 2026'
totalEpics: 5
totalStories: 28
---

# agenda-clean - Epic Breakdown & User Stories

**Project:** agenda-clean  
**Author:** Davi  
**Date:** 13 de maio de 2026  
**Status:** Ready for Sprint Planning

---

## Requirements Inventory

### Functional Requirements (38 total)

**User Authentication & Authorization:**
- FR1: Client can login via Google OAuth
- FR2: Client account is automatically created on first Google login
- FR3: Admin account is pre-configured (by email)
- FR4: System identifies user role (client vs admin) based on authenticated email
- FR5: Client can logout

**Client Agendamento Management:**
- FR6: Client can create agendamento with: endereço, data, horário, observações
- FR7: System validates agendamento data is complete before saving
- FR8: System prevents agendamento creation when date/time slot is already occupied
- FR9: System returns error message when requested slot is unavailable
- FR10: Client receives confirmation message immediately after successful agendamento creation
- FR11: Client can view list of own agendamentos (current + past)
- FR12: Client can view details of any of own agendamentos (date, time, endereço, observações, status)

**Admin Agendamento Management:**
- FR13: Admin can view centralized list of ALL agendamentos (from all clients)
- FR14: Admin can view details of any agendamento
- FR15: Admin can change agendamento status (solicitado → confirmado → em_atendimento → concluído / cancelado)
- FR16: System automatically updates agendamento status in database when admin changes it

**Conflict Prevention & Slot Management:**
- FR17: System prevents two agendamentos in the same date/time slot
- FR18: System liberates slot automatically when agendamento status is changed to "cancelado"
- FR19: System makes liberated slot available for new agendamentos immediately
- FR20: System checks conflict at moment of agendamento creation (real-time validation)

**Notifications & Communication:**
- FR21: System sends email automatically when agendamento status changes to "confirmado"
- FR22: Email contains: agendamento date, time, client name, endereço
- FR23: Email includes link to view full agendamento details
- FR24: Email delivery is reliable (retries on failure)

**Data Persistence & Retrieval:**
- FR25: System persists all agendamento data to database
- FR26: System persists all user data (Google profile, preferences)
- FR27: Client data is associated with logged-in user and never mixed
- FR28: Agendamento data includes timestamps of creation and status changes
- FR29: All persisted data is retrievable on demand (for client viewing or admin management)

**Responsive User Interface:**
- FR30: Client interface is accessible and usable on mobile devices (320px+)
- FR31: Client interface is accessible and usable on desktop (1024px+)
- FR32: Admin interface is optimized for desktop but functional on mobile
- FR33: All buttons, forms, and interactive elements are keyboard navigable
- FR34: Color contrast meets minimum accessibility standards

**System Reliability & Error Handling:**
- FR35: System gracefully handles network errors (displays user-friendly message)
- FR36: System prevents data loss on failed operations (rollback on error)
- FR37: System recovers from unexpected errors without losing user data
- FR38: System provides clear error messages when operations fail

### Non-Functional Requirements (20 total)

**Performance:**
- NFR1: Agendamento creation completes within 2 seconds (user interaction to confirmation)
- NFR2: Admin dashboard loads within 3 seconds on typical desktop connection
- NFR3: Client login via Google OAuth completes within 1 second
- NFR4: Availability check (slot validation) returns response within 500ms
- NFR5: Email sending queued within 100ms of status change (delivery can be async)
- NFR6: System supports concurrent usage of 10+ users without performance degradation

**Security:**
- NFR7: All user passwords are managed via Google OAuth (no local password storage)
- NFR8: All data in transit is encrypted (HTTPS/TLS)
- NFR9: All data at rest is encrypted (database encryption)
- NFR10: Admin account email is securely verified (only pre-configured email can be admin)
- NFR11: Client agendamentos are isolated (client can only view own agendamentos)
- NFR12: Email containing agendamento details includes verification link (prevent spam)
- NFR13: Session tokens expire after 30 days of inactivity
- NFR14: Database backup is automated daily with retention of 7 days

**Accessibility:**
- NFR15: All interactive elements are keyboard navigable (Tab, Enter, Escape)
- NFR16: Color contrast ratio minimum 4.5:1 for normal text
- NFR17: Form labels are associated with input fields (label for/id attributes)
- NFR18: Error messages are clear and describe how to fix the issue
- NFR19: Mobile interface remains functional on 320px width screens
- NFR20: Font size is at least 14px for body text (readability)

### Additional Requirements (Architecture)

**Project Setup & Infrastructure:**
- AUX1: Dual-starter template setup (separate frontend in Vite+React and backend in Node.js+Express)
- AUX2: PostgreSQL database schema with Prisma ORM
- AUX3: Unique constraint on (date, time) to prevent double-bookings at database level
- AUX4: Environment configuration for Google OAuth, SendGrid, JWT, and database
- AUX5: Initial project scaffolding and boilerplate generation

**API Design & Implementation:**
- AUX6: REST API endpoints for authentication, agendamentos (CRUD), status updates
- AUX7: OpenAPI/Swagger documentation for all endpoints
- AUX8: Request/response validation with clear error messages
- AUX9: CORS configuration for frontend-backend communication
- AUX10: Rate limiting to prevent abuse

**Email Integration:**
- AUX11: SendGrid integration for reliable email delivery
- AUX12: Email template creation (professional, clear, with verification link)
- AUX13: Async email queuing (non-blocking status updates)

**Deployment & DevOps:**
- AUX14: Frontend deployment to Vercel with automatic git-based deploys
- AUX15: Backend deployment to Render with environment variables and database setup
- AUX16: Database setup on Supabase with automated daily backups

### UX Design Requirements

**Design System & Tokens:**
- UX1: Color system implementation (Blue for trust/primary, Green for success, Red for errors, Orange for in-progress)
- UX2: Typography system (system font stack, type scale from 11px to 32px)
- UX3: Spacing system (4px base unit for consistent layout and padding)
- UX4: Focus indicators and keyboard navigation styling for accessibility

**Component Library:**
- UX5: Button component (primary, secondary, danger, disabled states) with proper contrast and sizing
- UX6: Form input component (text, email, date, time fields) with labels, validation feedback, and placeholder text
- UX7: Status badge component (5 states: solicitado, confirmado, em_atendimento, concluído, cancelado)
- UX8: Modal dialog component (for confirmations, alerts) with focus management
- UX9: Error message component (clear, readable, actionable)
- UX10: Success message component (with checkmark, clear color, auto-dismiss option)

**Client Interface (Ana):**
- UX11: Login page with Google OAuth button (single-click entry)
- UX12: Home/Dashboard page for client (buttons for "New Booking" and "My Bookings")
- UX13: Booking form (mobile-optimized, single-column layout, large touch targets)
- UX14: Availability validation feedback (real-time, green for available, red for unavailable)
- UX15: Booking confirmation page (clear confirmation message, success indicators)
- UX16: My Bookings list page (filterable by status, responsive table/list)
- UX17: Booking detail page (read-only view of agendamento with full context)

**Admin Interface (João):**
- UX18: Admin dashboard layout (sidebar navigation, main content area)
- UX19: Agendamentos list view (table with sortable columns: client, date, time, status)
- UX20: Inline status update UI (dropdown or button group to change status)
- UX21: Agendamento detail view/modal (read-only details with status update capability)
- UX22: Filters and search (filter by status, date range, client name)

**Responsive Design:**
- UX23: Mobile breakpoint (320-768px) - single column, full-width components, large buttons (48px height)
- UX24: Tablet breakpoint (768-1024px) - optional two-column layouts
- UX25: Desktop breakpoint (1024px+) - optimized layouts for each user type
- UX26: Touch target sizing (minimum 44x44px for mobile, 40px buttons acceptable for desktop with mouse)
- UX27: Readable font sizes (minimum 14px body text, generous line-height 1.5)

**Accessibility:**
- UX28: Semantic HTML structure (<button>, <form>, <label>, <nav>, <main>)
- UX29: ARIA labels and descriptions for interactive elements
- UX30: Keyboard navigation complete (Tab, Enter, Escape, Arrow keys where applicable)
- UX31: Color contrast verification (4.5:1 minimum for normal text, 3:1 for large text)
- UX32: Form validation feedback (clear error messages, not just color)

---

## Epic Structure

### Epic 1: Foundation & Setup
**Goal:** Initialize dual-starter project structure, set up databases, configure authentication infrastructure, and create the foundational code organization for both frontend and backend.

### Epic 2: Authentication & User Management
**Goal:** Implement Google OAuth authentication, automatic account creation, role-based access control, and session management for both client and admin users.

### Epic 3: Client Booking Experience
**Goal:** Build the complete client-facing booking flow including form creation, real-time availability validation, booking confirmation, and booking history viewing.

### Epic 4: Admin Management Dashboard
**Goal:** Create the admin dashboard with centralized booking management, status updates, conflict prevention, and visibility into all bookings across all clients.

### Epic 5: Email Notifications & System Integration
**Goal:** Implement reliable email notifications on booking confirmation, integrate SendGrid, handle edge cases, and deploy the complete system to production.

---

## Epic 1: Foundation & Setup

**Epic Goal:** Initialize dual-starter project structure, set up databases, configure authentication infrastructure, and create the foundational code organization for both frontend and backend.

**Business Value:** Establishes the technical foundation for all subsequent development, reducing blockers and enabling parallel feature development.

**Dependencies:** None (first epic)

**Estimated Effort:** 16 hours

### Story 1.1: Initialize Frontend Project (Vite + React + Tailwind)

As a developer,
I want to initialize a modern React frontend project with Vite, Tailwind CSS, and TypeScript,
So that I have a fast development environment and production-ready tooling for client-facing interfaces.

**Acceptance Criteria:**

**Given** a fresh project directory
**When** I run the frontend initialization script
**Then** a Vite+React+TypeScript project is created with:
- `npm create vite@latest agenda-clean-web -- --template react-ts` structure
- Tailwind CSS configured with PostCSS
- shadcn/ui components ready for installation
- Development server running on `http://localhost:5173` with hot reload
- Build output in `dist/` with optimized asset bundling

**And** the following npm scripts are available:
- `npm run dev` (start development server)
- `npm run build` (production build)
- `npm run preview` (preview built site)

**And** TypeScript strict mode is enabled for type safety

### Story 1.2: Initialize Backend Project (Node.js + Express + TypeScript)

As a developer,
I want to initialize a Node.js backend project with Express, TypeScript, and Prisma ORM,
So that I have a type-safe API server with automatic database access layer.

**Acceptance Criteria:**

**Given** a fresh backend directory
**When** I run the backend initialization script
**Then** a Node.js+Express+TypeScript project is created with:
- Express server scaffold in `src/server.ts`
- Prisma ORM initialized with `npx prisma init`
- `.env` file template with required environment variables (DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SENDGRID_API_KEY, JWT_SECRET)
- Development dependencies: ts-node, nodemon, @types/express, @types/node
- Development server running on `http://localhost:3000` with auto-reload via nodemon

**And** the following npm scripts are available:
- `npm run dev` (start development server with auto-reload)
- `npm run build` (compile TypeScript to JavaScript)
- `npm run start` (run compiled JavaScript)

**And** TypeScript strict mode is enabled for type safety

### Story 1.3: Database Schema & Prisma Setup

As a developer,
I want to define the complete database schema with Prisma and create initial migrations,
So that the database is ready for user and agendamento data storage.

**Acceptance Criteria:**

**Given** the backend project is initialized
**When** I create the Prisma schema (`schema.prisma`)
**Then** the following tables are defined:

- **User table** (id, email, googleId, name, role: 'client' | 'admin', createdAt, updatedAt)
  - Unique constraint on email and googleId
  - Index on googleId for OAuth lookups

- **Agendamento table** (id, clientId, date, time, address, observations, status, createdAt, updatedAt)
  - Foreign key to User (clientId)
  - Unique constraint on (date, time) to prevent double-bookings
  - Status enum: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado'

**And** Prisma migration is generated:
- `npx prisma migrate dev --name init` creates migration files
- `npx prisma studio` works for database visualization

**And** TypeScript types are auto-generated in `@prisma/client`

### Story 1.4: Environment Configuration & Secrets Management

As a developer,
I want to set up environment variable management and secure configuration,
So that sensitive credentials (OAuth keys, API keys, database URLs) are stored safely and not exposed in version control.

**Acceptance Criteria:**

**Given** both frontend and backend projects are initialized
**When** I set up environment configuration
**Then** the following are implemented:

- Backend `.env.local` template with placeholders:
  ```
  DATABASE_URL="postgresql://..."
  GOOGLE_CLIENT_ID="..."
  GOOGLE_CLIENT_SECRET="..."
  SENDGRID_API_KEY="..."
  JWT_SECRET="..."
  NODE_ENV="development"
  FRONTEND_URL="http://localhost:5173"
  ```

- Frontend `.env.local` template with:
  ```
  VITE_API_URL="http://localhost:3000/api"
  VITE_GOOGLE_CLIENT_ID="..."
  ```

**And** `.env` files are in `.gitignore` to prevent credential leaks

**And** environment variable validation exists (app fails at startup if critical vars are missing)

### Story 1.5: Project Documentation & Architecture README

As a developer,
I want clear documentation of the project structure, architecture decisions, and development workflow,
So that onboarding is smooth and architectural decisions are understood by anyone reading the code.

**Acceptance Criteria:**

**Given** both frontend and backend are initialized
**When** I read the project documentation
**Then** the README clearly explains:

- Dual-starter project structure (why separate frontend/backend)
- Directory structure of both projects
- How to run development servers (frontend + backend simultaneously)
- How to run database migrations
- Deployment instructions for Vercel (frontend) and Render (backend)
- Environment variable setup required before development

**And** `docs/ARCHITECTURE.md` explains:
- API contract (REST endpoints)
- Database schema relationships
- Authentication flow (Google OAuth)
- Email notification flow
- Deployment architecture

---

## Epic 2: Authentication & User Management

**Epic Goal:** Implement Google OAuth authentication, automatic account creation, role-based access control, and session management for both client and admin users.

**Business Value:** Enables user identity management with zero friction (no signup forms), enabling the core value proposition of quick booking.

**Dependencies:** Epic 1 (Foundation & Setup) ✓

**Estimated Effort:** 12 hours

### Story 2.1: Google OAuth Setup & Passport.js Integration

As a developer,
I want to configure Passport.js with Google OAuth 2.0 strategy,
So that users can authenticate via their Google accounts with automatic token and profile retrieval.

**Acceptance Criteria:**

**Given** the backend is initialized
**When** I set up Google OAuth in Passport.js
**Then** the following are implemented:

- Passport Google OAuth 2.0 strategy configured in `src/auth/passport.ts`
- Callback URL: `http://localhost:3000/auth/google/callback`
- Strategy retrieves: id, displayName, emails, photos from Google profile

**And** middleware for authentication is created:
- `authenticateGoogle()` middleware for login redirects
- `verifyCallback` for profile data retrieval

**And** OAuth flow is testable:
- Request to `/auth/google` redirects to Google login
- Google redirects back to `/auth/google/callback`
- Profile data is logged/inspected for next step

### Story 2.2: Automatic User Account Creation on First Login

As a developer,
I want to automatically create user accounts in the database on first Google OAuth login,
So that clients don't have to fill out signup forms.

**Acceptance Criteria:**

**Given** a user logs in via Google OAuth for the first time
**When** Passport.js receives the Google profile
**Then** the system:

- Checks if user exists in database (by googleId)
- If NOT found, creates new User record with:
  - email (from Google)
  - googleId (from Google)
  - name (displayName from Google)
  - role: automatically set to 'client' (admin role is manual pre-configuration only)
  - createdAt, updatedAt timestamps

**And** if user already exists, retrieves existing user (no duplication)

**And** user record is committed to database atomically (no partial creates on failure)

### Story 2.3: Admin Role Pre-configuration

As an admin,
I want to pre-configure which email addresses have admin permissions,
So that only trusted users can access the management dashboard.

**Acceptance Criteria:**

**Given** an environment variable `ADMIN_EMAILS="admin@email.com,admin2@email.com"`
**When** a user logs in via Google OAuth
**Then** the system:

- Checks if the user's Google email is in the ADMIN_EMAILS list
- If yes, creates or updates user with role: 'admin'
- If no, creates or updates user with role: 'client'

**And** database reflects the role correctly in User.role field

**And** role is retrievable on every login (no stale role data)

### Story 2.4: JWT Session Tokens & Session Management

As a developer,
I want to issue JWT tokens after Google OAuth authentication,
So that clients can make authenticated API requests and their sessions are secure and traceable.

**Acceptance Criteria:**

**Given** a user successfully authenticates via Google OAuth
**When** Passport.js confirms identity
**Then** a JWT token is issued with:

- User id, email, role in the payload
- Expiration time: 30 days from issue
- Signing key: `process.env.JWT_SECRET`
- Token stored in HTTP-only cookie for web client (secure, not XSS-prone)

**And** middleware `verifyToken()` exists to:
- Decode JWT on every API request
- Verify signature matches JWT_SECRET
- Return user data if valid
- Return 401 Unauthorized if invalid/expired

**And** logout endpoint clears the session cookie

### Story 2.5: Protected Route Middleware & Authorization

As a developer,
I want middleware to protect API routes based on user role,
So that clients can't access admin endpoints and admin can't impersonate clients.

**Acceptance Criteria:**

**Given** a protected API endpoint (e.g., `/api/admin/agendamentos`)
**When** a request arrives with a JWT token
**Then** the system:

- Verifies token is present and valid (via `verifyToken()` middleware)
- Checks user role is 'admin'
- If authorized, grants access to endpoint
- If not authorized, returns 403 Forbidden

**And** client-only endpoints (e.g., `/api/client/my-agendamentos`) check for role: 'client'

**And** error responses include clear message: "Unauthorized" or "Forbidden"

### Story 2.6: Login Page & Google OAuth Button (Frontend)

As a client,
I want a simple login page with a "Sign in with Google" button,
So that I can authenticate in one click without remembering passwords.

**Acceptance Criteria:**

**Given** I visit the application
**When** I am not authenticated
**Then** I am redirected to login page

**And** the login page displays:
- A clear heading: "Agendar Limpeza de Sofá"
- Google OAuth button with Google logo and text "Entrar com Google"
- Button is styled in blue (primary color), accessible (large touch target 48px)
- Button has hover/active states

**And** clicking the button initiates OAuth flow:
- Redirects to `/auth/google` (backend)
- User sees Google login consent screen
- On success, redirects to client dashboard with JWT token in cookie

**And** "Sign in with Google" button is accessible (keyboard navigable, screen reader friendly)

---

## Epic 3: Client Booking Experience

**Epic Goal:** Build the complete client-facing booking flow including form creation, real-time availability validation, booking confirmation, and booking history viewing.

**Business Value:** Enables the core value proposition: clients can book in <2 minutes without friction, with immediate confirmation.

**Dependencies:** Epic 2 (Authentication & User Management) ✓

**Estimated Effort:** 16 hours

### Story 3.1: Booking Form Component (Address, Date, Time, Notes)

As a client,
I want a booking form where I can enter the address, date, time, and notes for my cleaning appointment,
So that I can communicate exactly what I need to the cleaning service.

**Acceptance Criteria:**

**Given** I am logged in as a client
**When** I click "New Booking" button
**Then** I see a form with these fields:

- **Address** (text input, required, placeholder: "Seu endereço completo")
- **Date** (date picker, required, shows only future dates)
- **Time** (time picker, required, shows available slots, default is empty)
- **Notes/Observations** (textarea, optional, placeholder: "Ex: Sofá grande, precisa urgência")
- **Confirm Booking** button (primary blue button, disabled until all required fields filled)

**And** form layout is mobile-optimized:
- Single column on mobile (320-768px)
- Vertical spacing 12px between fields
- Button height 48px for thumb-friendly tapping
- Font size minimum 14px for readability

**And** form has basic validation:
- Address: Required, minimum 5 characters
- Date: Required, must be future date (not past)
- Time: Required, must be a valid time slot
- Submit button disabled if any required field is empty

**And** form is keyboard accessible:
- Tab navigation through all fields
- Enter key submits form
- Focus indicators visible on all inputs

### Story 3.2: Real-Time Availability Validation

As a client,
I want the system to show me which time slots are available when I select a date,
So that I can immediately see if my preferred time is free.

**Acceptance Criteria:**

**Given** I select a date in the booking form
**When** I interact with the time field
**Then** the system:

- Makes API call to `/api/agendamentos/availability?date=YYYY-MM-DD`
- Receives list of available time slots from backend
- Displays available slots as selectable options (in a dropdown or time grid)
- Shows unavailable slots as grayed out/disabled with reason "Already booked"

**And** availability check completes within 500ms (fast response)

**And** if no slots are available on selected date:
- Show message: "No slots available on this date. Try another date."
- Suggest next available date

**And** backend prevents double-booking:
- Database unique constraint on (date, time)
- Application-level check at insertion time
- Returns clear error if conflict detected

### Story 3.3: Booking Confirmation & Success Message

As a client,
I want to see a confirmation screen immediately after submitting my booking,
So that I know my appointment is confirmed and I have the details.

**Acceptance Criteria:**

**Given** I fill out the booking form and click "Confirm Booking"
**When** the form is submitted successfully
**Then** the system displays a confirmation screen with:

- ✓ Green checkmark (success indicator)
- Heading: "Agendamento Criado!"
- Confirmation details:
  - Date: "22 de Abril de 2026"
  - Time: "10:00 AM"
  - Address: "[Address I entered]"
  - Status: "Solicitado - Aguardando confirmação do administrador"
- Button: "Ver Meus Agendamentos" (navigate to history)
- Message: "Você receberá um email de confirmação em breve"

**And** the confirmation message is visible on screen for at least 5 seconds

**And** if booking fails (e.g., time slot just taken):
- Show error message in red
- Explain why it failed: "This time slot was just booked. Try another time."
- Keep form filled (user can select different time)

**And** confirmation page is mobile-friendly (readable on 320px screens)

### Story 3.4: Client Booking History View

As a client,
I want to see a list of all my past and current bookings with their status,
So that I can track my appointments and know what's confirmed.

**Acceptance Criteria:**

**Given** I am logged in as a client
**When** I click "My Bookings" or navigate to `/client/my-bookings`
**Then** the system displays:

- A list of all my agendamentos (current + past)
- For each booking, show:
  - Date: "22 de Abril de 2026"
  - Time: "10:00 AM"
  - Status badge (colored):
    - Blue: Solicitado (pending admin confirmation)
    - Green: Confirmado (confirmed)
    - Orange: Em Atendimento (service in progress)
    - Gray: Concluído (completed) or Cancelado (cancelled)
  - Quick action: "View Details" link

**And** bookings are sorted by date (newest first)

**And** list is paginated if more than 10 bookings (show 10 per page)

**And** list is responsive:
- On mobile: single-column list, each booking as a card
- On desktop: table format with sortable columns

**And** filter option (optional for MVP):
- Filter by status (All, Solicitado, Confirmado, etc.)
- Filter by date range (optional)

### Story 3.5: Booking Detail View

As a client,
I want to see complete details of any of my bookings,
So that I can review all information and confirm what I booked.

**Acceptance Criteria:**

**Given** I click "View Details" on a booking
**When** I navigate to the booking detail page
**Then** the system displays:

- Full booking information:
  - Date & Time (formatted clearly)
  - Address
  - Notes/Observations (if any)
  - Status (with explanation of what status means)
  - Created timestamp: "Agendado em 22 de Abril às 14:30"
  - Last updated timestamp (if status changed)
- "Back to My Bookings" link
- Edit button (disabled/hidden in MVP, but UX-prepared for future)
- Cancel button (disabled/hidden in MVP, admin cancels only)

**And** page is read-only (client cannot edit in MVP)

**And** page is mobile-optimized (single column, readable on small screens)

**And** detail page is accessible:
- Semantic HTML structure
- Clear visual hierarchy with typography
- Color contrast meets 4.5:1 ratio

### Story 3.6: Client Dashboard Home Page

As a client,
I want a simple home page with options to book new or view my bookings,
So that I can navigate easily to what I need.

**Acceptance Criteria:**

**Given** I log in as a client
**When** I navigate to `/client/dashboard` (or home)
**Then** I see a simple dashboard with:

- Greeting: "Bem-vindo, [Name]!"
- Two primary action buttons:
  1. "Novo Agendamento" (blue primary button)
  2. "Meus Agendamentos" (secondary button)
- Optional: show count of pending agendamentos: "Você tem 1 agendamento pendente"
- Mobile-optimized layout (buttons full-width on mobile, side-by-side on desktop)

**And** buttons are large and thumb-friendly (48px height minimum)

**And** navigation is clear (back arrow or logo to return to home from any page)

---

## Epic 4: Admin Management Dashboard

**Epic Goal:** Create the admin dashboard with centralized booking management, status updates, conflict prevention, and visibility into all bookings across all clients.

**Business Value:** Enables admin to manage all bookings from one place, eliminating manual WhatsApp communication and human error in scheduling.

**Dependencies:** Epic 2 (Authentication & User Management) ✓

**Estimated Effort:** 14 hours

### Story 4.1: Admin Dashboard Layout & Navigation

As an admin,
I want a clear dashboard layout with navigation to access all bookings and settings,
So that I can manage the business efficiently from one place.

**Acceptance Criteria:**

**Given** I log in as an admin
**When** I navigate to `/admin/dashboard`
**Then** I see a dashboard with:

- **Header** with:
  - Logo: "agenda-clean"
  - Greeting: "Bem-vindo, [Admin Name]"
  - Logout button

- **Sidebar** (on desktop) or **Menu** (on mobile) with:
  - "Agendamentos" (main, default view)
  - "Settings" (future, for MVP just prepares structure)

- **Main content area** displaying:
  - List of all agendamentos (across all clients)
  - Filters and search
  - Status update controls

**And** dashboard is responsive:
- Desktop: sidebar navigation + main content
- Mobile: hamburger menu, full-width main content, back arrow

**And** dashboard is keyboard accessible:
- Tab navigation through all elements
- Keyboard shortcuts for common actions (optional for MVP)

### Story 4.2: Agendamentos List View (All Clients)

As an admin,
I want to see all bookings from all clients in one centralized list,
So that I can see what needs to be done today without opening WhatsApp.

**Acceptance Criteria:**

**Given** I navigate to the admin dashboard
**When** the agendamentos list loads
**Then** the system displays a table with columns:

- **Client Name** (sortable, links to client detail)
- **Date** (sortable, format: "22 de Abril")
- **Time** (sortable, format: "10:00 AM")
- **Address** (truncated with ellipsis if long, tooltip on hover)
- **Status** (sortable, colored badges)
- **Actions** (status update button/dropdown)

**And** table is sortable by clicking column headers (default: sorted by date ascending)

**And** table shows most relevant bookings first:
- Upcoming bookings before past bookings
- "Solicitado" status before "Confirmado"
- Pagination: show 15 per page (scrollable)

**And** table is responsive:
- Desktop: full table view with all columns
- Tablet/Mobile: card view, each booking as a row, horizontal scroll or simplified columns

**And** loading state shows: "Carregando agendamentos..."

**And** empty state shows: "Nenhum agendamento encontrado" (when filtered to no results)

### Story 4.3: Filter & Search Agendamentos

As an admin,
I want to filter and search agendamentos by date, status, and client name,
So that I can quickly find specific bookings.

**Acceptance Criteria:**

**Given** I am viewing the agendamentos list
**When** I use the filter/search controls
**Then** the system provides:

- **Search by Client Name** (text input, filters as I type)
- **Filter by Status** (dropdown: All, Solicitado, Confirmado, Em Atendimento, Concluído, Cancelado)
- **Filter by Date Range** (optional for MVP: start date + end date pickers)
- **Reset Filters** button

**And** filters apply immediately (no need to press "Apply" button)

**And** filtered results update the list in real-time (under 200ms response)

**And** search is case-insensitive (searching "ana" finds "Ana Silva")

**And** empty results show helpful message: "Nenhum resultado encontrado. Tente outro filtro."

### Story 4.4: Status Update UI (Inline Actions)

As an admin,
I want to update an agendamento's status with a single click,
So that I can confirm bookings quickly without opening dialogs.

**Acceptance Criteria:**

**Given** I view the agendamentos list
**When** I interact with the Status column for a booking
**Then** I can change status via:

**Option 1 (Inline Dropdown):**
- Click status badge opens dropdown menu with available next states
- "Solicitado" → can change to "Confirmado" or "Cancelado"
- "Confirmado" → can change to "Em Atendimento" or "Cancelado"
- "Em Atendimento" → can change to "Concluído" or "Cancelado"
- "Concluído" → no more changes (final state)
- "Cancelado" → no more changes (final state)

**Or Option 2 (Button Group):**
- Show action buttons inline (if space permits): "Confirmar" (green), "Cancelar" (red)
- Other states via dropdown

**And** when status is changed:
- Database is updated immediately
- List item reflects new status instantly
- Success feedback: status badge animation or brief success message

**And** if status change fails:
- Show error message: "Não foi possível atualizar o status. Tente novamente."
- Revert UI to previous status

**And** status transitions follow business rules:
- Can't skip states (e.g., "Solicitado" can't jump to "Concluído")
- Can cancel from any state except final states

### Story 4.5: Agendamento Detail Modal/View

As an admin,
I want to see full details of an agendamento in a modal or detail page,
So that I can review all information before confirming or updating status.

**Acceptance Criteria:**

**Given** I click on an agendamento in the list
**When** I view the detail modal/page
**Then** the system displays:

- **Client Information:**
  - Name: "[Client Name]"
  - Email: "[client@email.com]"
  - Phone: (optional, not in MVP but structure-ready)

- **Booking Details:**
  - Date & Time (formatted clearly)
  - Address
  - Notes/Observations (if any)
  - Status with visual indicator
  - Created: "22 de Abril às 14:30"
  - Last Updated: "22 de Abril às 14:30" (if changed)

- **Actions:**
  - Status update dropdown (same as inline update)
  - Close/Back button

**And** modal is accessible:
- Focus trap (Tab cycles within modal)
- Escape key closes modal
- Semantic HTML structure

**And** detail is read-only except for status field

### Story 4.6: Real-Time Availability Display

As an admin,
I want to see which time slots are available today and in the coming days,
So that I can manage schedule gaps and estimate current capacity.

**Acceptance Criteria:**

**Given** I view the admin dashboard
**When** I look at a calendar or schedule view (optional for MVP)
**Then** the system shows:

**Option 1 (Simple Table):**
- List upcoming bookings in chronological order
- Visual gaps show available times
- Admin can eyeball what's free

**Option 2 (Calendar Grid):**
- Calendar showing upcoming days
- Each day shows booked times vs available slots
- Color coding: Red (booked), Green (available)
- Clickable to create new booking for admin (optional for MVP)

**And** view updates as bookings are confirmed/cancelled

**And** MVP can implement Option 1 (simple list view, sufficient for first version)

---

## Epic 5: Email Notifications & System Integration

**Epic Goal:** Implement reliable email notifications on booking confirmation, integrate SendGrid, handle edge cases, and deploy the complete system to production.

**Business Value:** Ensures clients receive confirmations (trust signal), admin receives notifications (visibility), and system is reliable enough for real-world usage.

**Dependencies:** Epic 4 (Admin Management Dashboard) ✓

**Estimated Effort:** 10 hours

### Story 5.1: SendGrid Integration & Email Service Setup

As a developer,
I want to integrate SendGrid for reliable email delivery,
So that confirmation emails are sent reliably with built-in retry logic.

**Acceptance Criteria:**

**Given** the backend is running
**When** I set up SendGrid
**Then** the system:

- Imports SendGrid npm package (@sendgrid/mail)
- Initializes with API key from environment variable: `process.env.SENDGRID_API_KEY`
- Creates email service module at `src/services/email.service.ts` with function:
  ```typescript
  sendEmail(to: string, subject: string, html: string): Promise<void>
  ```

**And** email service handles:
- Async email sending (non-blocking)
- Retry logic if SendGrid returns temporary error
- Error logging if email fails after retries

**And** email service is testable:
- Can test with SendGrid sandbox mode
- Can test with real SendGrid account (with test email address)

### Story 5.2: Booking Confirmation Email Template

As a developer,
I want to create a professional, clear email template sent when booking is confirmed,
So that clients have proof of confirmation and know what to expect.

**Acceptance Criteria:**

**Given** an agendamento status changes to "confirmado"
**When** the email is sent
**Then** the email contains:

- **Header/Logo:** agenda-clean branding
- **Greeting:** "Olá [Client Name],"
- **Main Message:** "Seu agendamento foi confirmado!"
- **Booking Details:**
  - Data: "22 de Abril de 2026"
  - Hora: "10:00 AM"
  - Endereço: "[Address]"
- **Call-to-Action Button:** "Ver Detalhes do Agendamento" (link to detail page)
- **Footer:** Contact info, unsubscribe link (SendGrid template standard)

**And** email template is:
- Professional and clean HTML layout
- Mobile-responsive (readable on phone)
- Uses brand colors (blue accents, professional tone)
- Clear typography with sufficient contrast

**And** email is sent asynchronously (doesn't block status update)

**And** email delivery is retried if temporary failure (SendGrid handles)

### Story 5.3: Conflict Prevention at Database Level

As a developer,
I want the database to enforce that no two bookings can exist at the same date/time,
So that conflicts are impossible even if multiple requests race.

**Acceptance Criteria:**

**Given** the database schema is defined
**When** I review the Agendamento table
**Then** it has:

- **Unique Constraint:**
  ```sql
  UNIQUE (date, time) WHERE status != 'cancelado'
  ```
  (Only non-cancelled bookings are unique-constrained)

**And** when two concurrent requests try to book the same slot:
- First request succeeds, inserts row
- Second request fails with unique constraint violation
- Application catches error and returns 409 Conflict to user

**And** error message is clear: "Este horário foi reservado no último minuto. Tente outro horário."

**And** constraint is indexed for fast query performance

### Story 5.4: Email Notification on Status Changes

As a system,
I want to send email notifications to clients when their booking status changes,
So that clients are always informed of progress.

**Acceptance Criteria:**

**Given** an admin changes a booking status
**When** the status changes to "confirmado"
**Then** the system:

- Triggers email send (SendGrid)
- Email is sent to client's email address
- Email template is the confirmation template (Story 5.2)

**And** when status changes to other states:
- "Em Atendimento": Optional email (MVP can skip, admin handles manually if needed)
- "Concluído": Optional email (future enhancement)
- "Cancelado": Optional email (future enhancement)

**And** email sends asynchronously (doesn't block admin action)

**And** if email fails:
- Error is logged but doesn't block status update (eventual consistency)
- Admin is notified: "Status atualizado, mas email falhou. Verifique logs."

### Story 5.5: Error Handling & Reliability

As a developer,
I want comprehensive error handling across all features,
So that users see clear messages when something goes wrong and data is never lost.

**Acceptance Criteria:**

**Given** any operation fails (API error, database error, network error)
**When** the error occurs
**Then** the system:

- Catches error and logs to console/logger
- Returns clear error message to user (not technical stack trace)
- Doesn't lose user data (no partial updates)

**Examples:**
- Network timeout during booking: "Conexão perdida. Tente novamente."
- Email send fails: Status is updated but email failure is logged
- Double-booking conflict: "Este horário foi reservado. Tente outro."
- Database connection error: "Erro de servidor. Tente novamente em um momento."

**And** validation errors are clear:
- Missing field: "Endereço é obrigatório"
- Invalid email: "Email inválido"
- Date in past: "Data não pode ser no passado"

**And** error messages are user-friendly (no technical jargon)

### Story 5.6: Frontend & Backend Deployment

As a developer,
I want to deploy the complete application to production,
So that real users can book appointments without local development setup.

**Acceptance Criteria:**

**Given** the application is ready for launch
**When** I deploy
**Then** the following are deployed:

**Frontend (to Vercel):**
- `npm run build` generates optimized production build in `dist/`
- Vercel auto-deploys from GitHub: `git push` triggers deployment
- Frontend URL: `https://agenda-clean.vercel.app` (or custom domain)
- Environment variables set in Vercel dashboard: `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`

**Backend (to Render):**
- `npm run build` compiles TypeScript to JavaScript
- Render auto-deploys from GitHub
- Backend URL: `https://agenda-clean-api.render.com` (or custom domain)
- Environment variables set in Render dashboard: `DATABASE_URL`, `GOOGLE_CLIENT_ID`, `SENDGRID_API_KEY`, etc.
- `npm start` runs compiled server

**Database (Supabase PostgreSQL):**
- Database created in Supabase project
- `DATABASE_URL` environment variable points to Supabase database
- Daily automated backups enabled (default in Supabase)
- Initial schema migrated: `npx prisma migrate deploy`

**And** after deployment:
- Frontend loads in browser: No 404 errors, all assets load
- OAuth login works: Can sign in with Google
- API calls work: Can create bookings (backend receiving requests)
- Email sends: Confirmation emails arrive when status is confirmed
- All pages are accessible on mobile and desktop

**And** deployment validation:
- Run Lighthouse audit: Performance 80+, Accessibility 90+
- Test login flow end-to-end in production
- Create test booking and verify email received
- Verify no console errors in browser DevTools

### Story 5.7: System Testing & QA

As a developer,
I want to test the entire booking flow from end to end,
So that I'm confident the system works before users touch it.

**Acceptance Criteria:**

**Given** the application is deployed
**When** I run end-to-end tests
**Then** I verify:

**Client Flow:**
- [ ] Login via Google OAuth (real Google account)
- [ ] Create booking with all fields
- [ ] See real-time availability validation
- [ ] Receive confirmation message on screen
- [ ] Receive confirmation email
- [ ] View booking in "My Bookings"
- [ ] View booking details

**Admin Flow:**
- [ ] Login with admin email
- [ ] See all bookings in dashboard
- [ ] Filter by status
- [ ] Update booking status to "Confirmado"
- [ ] Verify client receives confirmation email
- [ ] Update status to other states
- [ ] Cancel a booking

**Conflict Prevention:**
- [ ] Try to book same slot twice simultaneously
- [ ] Verify second request is rejected
- [ ] Verify error message is clear

**Mobile Experience:**
- [ ] Test login on mobile (iPhone + Android browser)
- [ ] Test booking form on mobile
- [ ] Verify form is single-column and readable
- [ ] Verify buttons are thumb-friendly (48px)
- [ ] Verify no horizontal scrolling

**Admin Dashboard on Mobile:**
- [ ] Dashboard is functional on mobile (not optimized but works)
- [ ] Can update status on mobile
- [ ] No critical features broken on mobile

**Data Persistence:**
- [ ] Create booking, refresh page, booking still visible
- [ ] Change status, refresh page, new status persists
- [ ] Log out and log back in, booking history is still there

---

## Requirements Coverage Map

| Epic | Story | FR Coverage | NFR Coverage |
|------|-------|-------------|--------------|
| 1: Foundation | 1.1 Frontend | - | Dev tooling |
| 1: Foundation | 1.2 Backend | - | Dev tooling |
| 1: Foundation | 1.3 Database | FR25-FR29 | - |
| 1: Foundation | 1.4 Env Config | - | NFR7-NFR14 |
| 1: Foundation | 1.5 Documentation | - | - |
| 2: Auth | 2.1 OAuth Setup | FR1-FR4 | NFR7, NFR8, NFR10 |
| 2: Auth | 2.2 Auto Create | FR2 | - |
| 2: Auth | 2.3 Admin Config | FR3-FR4 | NFR10, NFR11 |
| 2: Auth | 2.4 JWT Sessions | FR5 | NFR13 |
| 2: Auth | 2.5 Auth Middleware | FR4 | NFR11 |
| 2: Auth | 2.6 Login Page | FR1-FR4 | NFR15-NFR20, FR30-FR34 |
| 3: Booking | 3.1 Booking Form | FR6-FR7 | FR30-FR34, NFR15-NFR20 |
| 3: Booking | 3.2 Availability | FR8-FR20 | NFR1, NFR4 |
| 3: Booking | 3.3 Confirmation | FR10 | FR30-FR34 |
| 3: Booking | 3.4 History | FR11 | NFR1-NFR2, FR30-FR34 |
| 3: Booking | 3.5 Detail View | FR12 | FR30-FR34 |
| 3: Booking | 3.6 Dashboard | - | FR30-FR34 |
| 4: Admin | 4.1 Layout | - | FR32-FR34 |
| 4: Admin | 4.2 List View | FR13-FR14 | NFR2 |
| 4: Admin | 4.3 Filter | FR13 | NFR2 |
| 4: Admin | 4.4 Status Update | FR15-FR16 | NFR1 |
| 4: Admin | 4.5 Detail Modal | FR14 | FR32-FR34 |
| 4: Admin | 4.6 Availability | FR13, FR17-FR20 | - |
| 5: Email | 5.1 SendGrid Setup | FR21, FR24 | - |
| 5: Email | 5.2 Email Template | FR21-FR23 | - |
| 5: Email | 5.3 Conflict Prevention | FR17-FR20 | NFR9 |
| 5: Email | 5.4 Status Emails | FR21-FR23 | NFR5 |
| 5: Email | 5.5 Error Handling | FR35-FR38 | - |
| 5: Email | 5.6 Deployment | - | NFR2, NFR3, NFR6, NFR8, NFR14 |
| 5: Email | 5.7 Testing | All FRs/NFRs | - |

---

## Summary Statistics

- **Total Epics:** 5
- **Total Stories:** 28
- **Total Functional Requirements Covered:** 38/38 (100%)
- **Total Non-Functional Requirements Covered:** 20/20 (100%)
- **Estimated Total Effort:** 68 hours
- **Estimated MVP Timeline:** 2-4 weeks (40-hour weeks with one developer)

**Epic Effort Breakdown:**
- Epic 1 (Foundation): 16 hours
- Epic 2 (Authentication): 12 hours
- Epic 3 (Client Booking): 16 hours
- Epic 4 (Admin Dashboard): 14 hours
- Epic 5 (Email & Deployment): 10 hours
- **Total: 68 hours**

---

## Next Steps

1. **Sprint Planning:** This epic breakdown is ready for sprint planning using `bmad-sprint-planning` workflow
2. **Story Creation:** Each story should be converted to a dedicated `.md` file with complete context for developers using `bmad-create-story` workflow
3. **Development:** Stories are developed in epic order, with parallel work possible within each epic after dependencies are met

---

**Document Generated:** 13 de maio de 2026  
**Status:** Ready for Implementation  
**Reviewed by:** Davi  
