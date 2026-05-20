# Implementation Checklist - agenda-clean

**Status:** Ready to Begin  
**Timeline:** 2-4 weeks (solo developer)  
**Architecture:** Complete & Validated ✅

---

## 📋 Pre-Implementation Checklist

### Prerequisites
- [ ] Node.js 18+ LTS installed (`node --version`)
- [ ] npm or yarn package manager available
- [ ] PostgreSQL installed locally OR Supabase account created
- [ ] GitHub account for version control
- [ ] Google OAuth application created (for authentication)
- [ ] SendGrid API key obtained (for email)

### Essential Setup
- [ ] Architecture document reviewed (`planning-artifacts/architecture.md`)
- [ ] 13 implementation patterns understood
- [ ] Folder structure for both frontend and backend planned
- [ ] API endpoints list confirmed (7 total)
- [ ] Database schema understood (3 models: User, Agendamento, EmailJob)

---

## 🚀 Week 1: Foundation (Days 1-7)

### Day 1-2: Project Initialization
- [ ] Create `agenda-clean-web/` directory (frontend)
- [ ] Run: `npm create vite@latest -- --template react-ts`
- [ ] Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
- [ ] Create `agenda-clean-api/` directory (backend)
- [ ] Initialize Node project: `npm init -y`
- [ ] Install Express + TypeScript dependencies

**Verification:**
- [ ] Frontend runs on `localhost:5173` with HMR
- [ ] Backend server can start without errors
- [ ] Both projects compile TypeScript without errors

### Day 3-4: Database Schema
- [ ] Create PostgreSQL database (or Supabase project)
- [ ] Initialize Prisma: `npx prisma init`
- [ ] Define schema in `schema.prisma`:
  - [ ] User model (id, googleId, email, name, role)
  - [ ] Agendamento model (id, userId, date, time, address, notes, status, unique(date,time))
  - [ ] EmailJob model (id, recipient, subject, body, sent, retries)
- [ ] Create migration: `npx prisma migrate dev --name init`
- [ ] Verify database created in PostgreSQL

**Verification:**
- [ ] `npx prisma studio` opens and shows empty tables
- [ ] Schema matches architecture.md exactly
- [ ] All fields and relationships are correct

### Day 5-6: Authentication Implementation
- [ ] Create Google OAuth application (get CLIENT_ID and CLIENT_SECRET)
- [ ] Create `.env` file with database URL and OAuth credentials
- [ ] Implement `src/routes/auth.ts` with 3 endpoints:
  - [ ] `GET /auth/google` (initiates OAuth)
  - [ ] `GET /auth/google/callback` (OAuth callback)
  - [ ] `POST /auth/logout` (clears session)
- [ ] Set up Passport.js with Google strategy
- [ ] Create JWT token generation logic
- [ ] Set httpOnly cookie on successful auth

**Verification:**
- [ ] Can start OAuth flow and authenticate with Google
- [ ] JWT token generated and stored in httpOnly cookie
- [ ] Cookie sent on subsequent requests
- [ ] Admin detection works (check ADMIN_EMAIL env var)

### Day 7: API Stubs
- [ ] Create `src/routes/agendamentos.ts` with 4 stubs:
  - [ ] `POST /agendamentos` (create)
  - [ ] `GET /agendamentos` (list)
  - [ ] `GET /agendamentos/:id` (get one)
  - [ ] (Admin) `PATCH /admin/agendamentos/:id` (update status)
- [ ] Create `src/routes/admin.ts` with 1 stub:
  - [ ] `GET /admin/agendamentos` (list all)
- [ ] Set up auth middleware to validate JWT
- [ ] Return placeholder responses

**Verification:**
- [ ] All 7 endpoints respond without errors
- [ ] Auth middleware blocks unauthenticated requests
- [ ] Response format matches Pattern 5 spec (`{data, success, error}`)

---

## 🎯 Week 2: Core Features (Days 8-14)

### Day 8-9: Agendamento CRUD Implementation
- [ ] `POST /agendamentos` - create new booking
  - [ ] Validate request (date, time, address, notes)
  - [ ] Check for duplicate slot (unique constraint)
  - [ ] Return 409 if slot taken
  - [ ] Queue confirmation email in email_jobs
- [ ] `GET /agendamentos` - list user's bookings
  - [ ] Return only user's own agendamentos
  - [ ] Include all fields (date, time, address, status, timestamps)
- [ ] `GET /agendamentos/:id` - get one booking
  - [ ] Check ownership (user can only see own)
  - [ ] Return full details

**Verification:**
- [ ] Can create booking successfully
- [ ] Cannot create duplicate time slots (gets 409)
- [ ] Can list own bookings
- [ ] Can get individual booking details

### Day 10-11: Frontend Pages (Login + ClientBooking)
- [ ] Create `src/pages/Login/Login.tsx`
  - [ ] Google login button
  - [ ] Redirect to OAuth flow
  - [ ] Handle successful auth and redirect
- [ ] Create `src/context/AuthContext.tsx`
  - [ ] Manage user state (user, token, role, loading)
  - [ ] Provide login/logout methods
  - [ ] Check httpOnly cookie on load
- [ ] Create `src/pages/ClientBooking/ClientBooking.tsx`
  - [ ] Date picker (future dates only)
  - [ ] Time slot selector
  - [ ] Address input
  - [ ] Notes input
  - [ ] Submit button
- [ ] Create `src/services/api_client.ts`
  - [ ] Wrapper for POST/GET/PATCH requests
  - [ ] Auto-include auth header from cookie
  - [ ] Handle errors and format responses

**Verification:**
- [ ] Can login with Google
- [ ] Redirected to dashboard after login
- [ ] ClientBooking form renders and submits
- [ ] Backend receives booking data correctly

### Day 12-13: Frontend State + History Page
- [ ] Create `src/context/AgendamentosContext.tsx`
  - [ ] Manage agendamentos list
  - [ ] Load bookings on app start
  - [ ] Add new booking to list
- [ ] Create `src/pages/ClientHistory/ClientHistory.tsx`
  - [ ] Display user's agendamentos in list
  - [ ] Show date, time, address, status
  - [ ] Show timestamps (created, updated)
  - [ ] Status badge with color coding

**Verification:**
- [ ] Agendamentos context loads and persists
- [ ] Can see bookings in history after creating
- [ ] Timestamps display correctly

### Day 14: Error Handling + UI Polish
- [ ] Error boundary component
- [ ] Toast notifications for success/error
- [ ] Loading indicators
- [ ] Form validation messages
- [ ] Responsive design on mobile

**Verification:**
- [ ] Booking works on mobile (Ana's use case)
- [ ] Error messages are clear and actionable
- [ ] No console errors

---

## 👨‍💼 Week 3: Admin Features (Days 15-21)

### Day 15-16: Admin Dashboard + Status Updates
- [ ] Create `src/pages/AdminDashboard/AdminDashboard.tsx`
  - [ ] Display all agendamentos (admin only)
  - [ ] Show client name, date, time, address, status
  - [ ] Status update button (inline, no modal)
- [ ] Implement `GET /admin/agendamentos`
  - [ ] Return all agendamentos (admin only)
  - [ ] Join with user table to include client names
- [ ] Implement `PATCH /admin/agendamentos/:id`
  - [ ] Update status to new value
  - [ ] Validate status enum (5 valid values)
  - [ ] Queue confirmation email to client
  - [ ] Return updated agendamento

**Verification:**
- [ ] Can access admin dashboard (João only)
- [ ] Client sees their bookings, not admin page
- [ ] Can update status (instant update in UI)
- [ ] Client receives email when status changes

### Day 17-18: Email Service Implementation
- [ ] Create `src/services/email_service.ts`
  - [ ] `queue_confirmation_email()` - add to email_jobs table
  - [ ] `send_via_sendgrid()` - call SendGrid API
  - [ ] Retry logic (max 3 attempts)
- [ ] Create `src/jobs/email_job.ts`
  - [ ] Poll email_jobs table every 10 seconds
  - [ ] Send unsent emails via SendGrid
  - [ ] Update sent status and timestamp

**Verification:**
- [ ] Email queued when booking created
- [ ] Email queued when status updated
- [ ] Background job sends emails
- [ ] Ana/João receive confirmation emails

### Day 19-20: Role-Based Access Control
- [ ] Create auth middleware functions
  - [ ] `authenticateToken` - verify JWT
  - [ ] `authorizeAdmin` - check role === "admin"
- [ ] Apply middleware to all protected routes
  - [ ] All `/agendamentos/*` require auth
  - [ ] All `/admin/*` require auth + admin role
- [ ] Frontend role-based routing
  - [ ] Logo/navigation changes for admin
  - [ ] Redirect non-admins from `/admin`

**Verification:**
- [ ] Unauthenticated requests get 401
- [ ] Non-admin users get 403 on admin endpoints
- [ ] Admin can access admin endpoints
- [ ] Frontend shows correct UI for role

### Day 21: Testing + Bug Fixes
- [ ] Manual testing of full flows
  - [ ] Ana booking a time slot
  - [ ] João updating status
  - [ ] Email delivery
- [ ] Test error cases
  - [ ] Try to book duplicate time (should fail)
  - [ ] Try to access admin as client (should fail)
  - [ ] Try invalid status (should fail)
- [ ] Fix any bugs found

**Verification:**
- [ ] All happy-path flows work
- [ ] All error cases handled gracefully
- [ ] No console errors or warnings

---

## 🧪 Week 4: Testing & Deployment (Days 22-28)

### Day 22-23: Unit & Integration Tests
- [ ] Backend tests (if time permits)
  - [ ] Test auth flow
  - [ ] Test duplicate booking prevention
  - [ ] Test status updates
  - [ ] Test email queueing
- [ ] Frontend tests (if time permits)
  - [ ] Component rendering
  - [ ] Form submission
  - [ ] Context state management

### Day 24: Performance Optimization
- [ ] Check bundle size: `npm run build`
  - [ ] Target: <500KB gzipped ✅
- [ ] Optimize images (if any)
- [ ] Lazy load components if needed
- [ ] Check Lighthouse score

**Verification:**
- [ ] Bundle size < 500KB
- [ ] Lighthouse score > 90

### Day 25-26: Deployment Setup
- [ ] Frontend deployment (Vercel)
  - [ ] Connect GitHub repo
  - [ ] Set up environment variables
  - [ ] Deploy to production
  - [ ] Test form submission to production API
- [ ] Backend deployment (Render)
  - [ ] Connect GitHub repo
  - [ ] Set up environment variables (DATABASE_URL, JWT_SECRET, etc.)
  - [ ] Set up build command: `npm run build && npx prisma migrate deploy`
  - [ ] Deploy to production
  - [ ] Verify API responds

### Day 27: Final Testing + Adjustments
- [ ] End-to-end testing on production
  - [ ] Ana booking on mobile (production URL)
  - [ ] João updating status
  - [ ] Emails received
- [ ] Fix any production issues
- [ ] Performance testing on production

### Day 28: Documentation + Handoff
- [ ] Update README files
- [ ] Document environment variables needed
- [ ] Document deployment process
- [ ] Create user guide for João
- [ ] List Phase 2 features to implement later

---

## 🎯 Daily Pattern

Each day:
1. Review yesterday's verification checklist
2. Check that all items passed ✅
3. Implement items for today
4. Run verification tests
5. Commit changes to Git with clear messages
6. Review code against 13 implementation patterns

---

## 📌 Key Reminders

**Follow the 13 Implementation Patterns:**
1. Database naming: snake_case (users, agendamentos, email_jobs)
2. API endpoints: plural (POST /agendamentos, GET /agendamentos/:id)
3. Code naming: snake_case (create_agendamento, fetch_user)
4. Project structure: by feature (Login/, ClientBooking/, AdminDashboard/)
5. API response format: {data, success, error}
6. Date/time: ISO 8601 always (2026-04-25T15:30:00Z)
7. Error handling: try-catch + global middleware
8. Loading states: Context-managed
9. Status enum: 5 fixed values (solicitado, confirmado, em_atendimento, concluido, cancelado)
10. Validation: Backend exhaustive, frontend UX feedback
11. Authentication: Middleware-enforced on all protected routes
12. Async/await: Always use, never .then() chains
13. TypeScript: interface for objects, type for unions

**Critical Constraints:**
- ✅ Double-booking prevention is database-level (unique constraint on date+time)
- ✅ Email must be async (no blocking the booking response)
- ✅ Admin detection is email-based (ADMIN_EMAIL env var)
- ✅ All dates in ISO 8601 format
- ✅ Role extracted from JWT token
- ✅ HTTPS required for production
- ✅ httpOnly cookies for token storage (never localStorage)

---

## 🆘 If Stuck

1. Reference the architecture.md document
2. Search for the specific pattern or decision
3. Look at code examples in architecture.md
4. Check the requirements-to-file mapping
5. Review data flow diagrams

**Common Issues:**
- "How do I prevent double-booking?" → Step 4: Database Schema, Pattern 10
- "Where do I put email logic?" → Step 6: Backend Structure, services/email_service.ts
- "What's the response format?" → Step 5: Pattern 5, API Response Format
- "How is admin detected?" → Step 4: Authentication & Security

---

## ✨ Success Criteria

- ✅ Ana can book a sofa cleaning appointment in <2 minutes
- ✅ Ana receives email confirmation within 30 seconds
- ✅ João can see all bookings and update status
- ✅ No double-bookings possible (database prevents)
- ✅ WCAG Level A accessible
- ✅ <500KB JavaScript bundle
- ✅ Works on mobile (Ana's primary device)
- ✅ Works on desktop (João's primary device)

---

**Start Date:** 29 de abril de 2026  
**Target Completion:** Mid-May 2026 (2-4 weeks)  
**Architecture Quality:** ✅ 100% Complete & Validated
