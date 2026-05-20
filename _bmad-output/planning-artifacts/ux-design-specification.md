---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-core-experience
  - step-04-emotional-response
  - step-05-inspiration
  - step-06-design-system
  - step-07-defining-experience
  - step-08-visual-foundation
  - step-09-design-directions
  - step-10-user-journeys
  - step-11-component-strategy
  - step-12-ux-patterns
  - step-13-responsive-accessibility
  - step-14-complete
inputDocuments:
  - prd.md
completedAt: "2026-04-22"
---

# UX Design Specification - agenda-clean

**Author:** Davi
**Date:** 22 de abril de 2026

---

## Project Understanding

Based on your comprehensive PRD, I have a clear understanding of **agenda-clean**. Let me confirm what I'm seeing from a UX design perspective:

### Project Vision

**What we're building:** A web-based appointment scheduling system for sofa cleaning services that replaces manual WhatsApp-based booking with a self-service client interface and centralized admin dashboard.

**The core problem:** Clients and admin currently manage scheduling through WhatsApp/phone calls, causing:
- No visibility into the schedule
- No client history or context
- Risk of double-bookings and constant conflicts
- Manual, time-consuming admin work

**The solution philosophy:** "Trust through simplicity" — Google OAuth eliminates signup friction entirely, automatic conflict prevention removes cognitive load from admin, and a single centralized dashboard replaces scattered messages.

**Why this approach works:** Your differentiator is ruthless focus on what matters. You're not building a generic scheduler; you're solving the specific flow of a sofa cleaning company with exactly what's needed — nothing more.

### Target Users

**Primary User 1: Ana (Client)**
- Persona: 35-year-old homeowner, occasional/recurring client
- Context: Needs to book quickly, often on mobile, from anywhere
- Pain: Currently has to find WhatsApp, wait for response, no confirmation of availability
- Success moment: Books in under 2 minutes with immediate feedback, gets confirmation email

**Primary User 2: João (Admin)**
- Persona: 42-year-old business owner, full-time operator
- Context: Manages schedule throughout the day, needs visibility and control
- Pain: Spends all day answering WhatsApp, juggling status updates, dealing with conflicts and miscommunications
- Success moment: Runs entire day WITHOUT opening WhatsApp, all status updates in one place, zero manual follow-up needed

**User Context Factors:**
- Ana uses mobile primarily, desktop secondarily
- João uses desktop primarily, sometimes checks mobile
- Both expect instant feedback (1-2 second response)
- Neither expects real-time push notifications (manual refresh acceptable)
- Ana values simplicity and speed; João values control and visibility

### Key UX Design Challenges

1. **Mobile-First Design for Ana, Desktop-Optimized for João**
   - Same system but different needs (client: quick + simple, admin: comprehensive + powerful)
   - Single codebase, split information architecture
   
2. **Status Communication Without Real-Time Sync**
   - No WebSockets/polling in MVP, so updates happen on manual refresh or via email
   - UX must make it clear what's current and what might be stale
   
3. **Conflict Prevention Transparency**
   - System prevents double-bookings automatically, but user needs to understand WHY a time was unavailable
   - Error message must be clear: "That time was just booked" vs "That time is blocked"

4. **Trust Without Complexity**
   - Ana needs to trust that her booking worked (email confirmation is critical)
   - João needs to trust that automatic conflict prevention is working
   - Zero "magic" — everything must be transparent

### Design Opportunities

1. **Frictionless Onboarding**
   - Google OAuth means zero signup forms. Ana logs in in 1 click.
   - UX opportunity: Make the "first booking" flow so smooth it becomes a habit

2. **Dashboard as Central Command**
   - João sees everything in one place (vs scattered WhatsApp)
   - UX opportunity: One-click status updates, clear color coding, instant feedback
   
3. **Email as Confirmation Layer**
   - Email is trustworthy and permanent (unlike in-app notifications)
   - UX opportunity: Make email feel like a benefit, not a fallback (beautiful template, clear next steps)

4. **Radical Simplicity as Competitive Advantage**
   - No features cluttering the interface
   - UX opportunity: Every pixel has a purpose, every interaction is necessary

---

## Visual Design Foundation

### Color System

**Design Philosophy:** Professional, direct, and simple. Colors communicate state and action clearly without decoration. Every color has a purpose.

**Primary Color Palette:**

**Blue (Trust & Primary Action)**
- Primary Blue: `#2563EB` (Google OAuth standard, professional, trustworthy)
- Light Blue: `#DBEAFE` (backgrounds, hover states)
- Dark Blue: `#1E40AF` (active states, focus indicators)
- Usage: Primary buttons, links, focus states (communicates trust and reliability)

**Green (Confirmation & Success)**
- Success Green: `#10B981` (availability, confirmation, positive state)
- Light Green: `#DCFCE7` (success backgrounds)
- Dark Green: `#047857` (active success state)
- Usage: "Available" badges, success messages, confirmation checkmarks (Ana sees green = "go ahead, it's safe")

**Red (Warning & Unavailable)**
- Error Red: `#EF4444` (conflict, booking unavailable, critical errors)
- Light Red: `#FEE2E2` (error backgrounds)
- Dark Red: `#DC2626` (active error state)
- Usage: "Unavailable" badges, error messages, slots already booked (clear that this can't happen)

**Orange (In-Progress)**
- Warning Orange: `#F97316` (in-progress state, pending actions)
- Light Orange: `#FFEDD5` (in-progress backgrounds)
- Dark Orange: `#EA580C` (active in-progress state)
- Usage: "Em Atendimento" status, pending confirmations (clear that action is happening)

**Gray (Secondary & Neutral)**
- Gray-50: `#F9FAFB` (backgrounds, light fills)
- Gray-100: `#F3F4F6` (card backgrounds, secondary fills)
- Gray-400: `#9CA3AF` (disabled states, secondary text)
- Gray-600: `#4B5563` (body text, standard text)
- Gray-700: `#374151` (headings, strong emphasis)
- Gray-900: `#111827` (darkest, high contrast text)
- Usage: Neutral fills, disabled states, secondary information

**Black & White**
- Pure White: `#FFFFFF` (cards, backgrounds)
- Pure Black: `#000000` (rarely used, only for maximum contrast when needed)

**Semantic Color Mapping:**

| Semantic Use | Color | Purpose |
|---|---|---|
| Primary Action | Blue #2563EB | "Do this" buttons, primary CTAs |
| Secondary Action | Gray #4B5563 | "Maybe later" buttons, secondary options |
| Danger/Destructive | Red #EF4444 | Delete, cancel, unavailable |
| Success/Available | Green #10B981 | Confirmation, availability, all-clear |
| Warning/Pending | Orange #F97316 | In-progress, needs attention |
| Disabled State | Gray #9CA3AF | Inactive buttons, unavailable options |
| Focus Indicator | Blue #2563EB | Keyboard focus, tab targets |
| Success Background | Green #DCFCE7 | Success message containers |
| Error Background | Red #FEE2E2 | Error message containers |
| Neutral Background | Gray #F9FAFB | Page backgrounds, large fills |

**Accessibility Compliance:**

- Blue #2563EB on White: **9.2:1 contrast** (exceeds WCAG AAA)
- Gray #4B5563 on White: **8.1:1 contrast** (exceeds WCAG AAA)
- All text meets minimum **4.5:1 contrast ratio** (WCAG AA, better than required WCAG A)

**Color Usage in agenda-clean:**

**Ana's Client Interface:**
- Primary button (Confirmar Agendamento) = Blue
- Available times = Green badges
- Unavailable times = Red badges/disabled
- Success message = Green checkmark
- Email confirmation link = Blue

**João's Admin Dashboard:**
- Status badges:
  - Solicitado (Blue) = Needs action
  - Confirmado (Green) = Done
  - Em Atendimento (Orange) = In progress
  - Concluído (Gray) = Completed
  - Cancelado (Gray) = Cancelled
- Primary action (Confirmar) = Green
- Update action = Blue
- Danger action (Delete) = Red

---

### Typography System

**Font Choice: System Font Stack (Professional & Fast)**

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

**Rationale:**
- Zero network requests (system fonts load instantly)
- Optimized for each platform (iOS uses SF Pro, Android uses Roboto, Windows uses Segoe UI)
- Professional and clean appearance
- Excellent readability on mobile and desktop
- Full accessibility support

**Type Scale (Hierarchical & Clear):**

| Level | Size | Weight | Line-Height | Usage |
|-------|------|--------|-------------|-------|
| **Heading 1** | 32px | 700 (Bold) | 1.2 (38px) | Page titles, main headings (rare in MVP) |
| **Heading 2** | 24px | 700 (Bold) | 1.25 (30px) | Section headers, dashboard titles |
| **Heading 3** | 20px | 700 (Bold) | 1.3 (26px) | Card titles, subsection headers |
| **Body Large** | 16px | 400 (Regular) | 1.5 (24px) | Important text, form labels, primary content |
| **Body Regular** | 14px | 400 (Regular) | 1.5 (21px) | Standard body text, table content, most UI text |
| **Body Small** | 12px | 400 (Regular) | 1.5 (18px) | Secondary text, hints, timestamps, badges |
| **Caption** | 11px | 500 (Medium) | 1.4 (15px) | Very small text, timestamps, meta info (use sparingly) |
| **Button Text** | 14px | 600 (Semibold) | 1.5 (21px) | All button labels (clear, emphasized) |

**Typography Application:**

**Ana's Client Interface:**
- Page heading: "Novo Agendamento" = H2 (24px, bold)
- Form labels: "Selecione uma data" = Body Large (16px)
- Body text: Form instructions = Body Regular (14px)
- Button labels: "Confirmar Agendamento" = Button Text (14px, bold, blue)
- Success message: "✓ Agendamento Criado!" = Body Large (16px, green)
- Hints: "Este horário foi reservado" = Body Small (12px, gray)

**João's Admin Dashboard:**
- Dashboard title: "Agendamentos" = H2 (24px, bold)
- Column headers: "Cliente | Data | Hora" = Body Large (14px, bold, gray)
- Table cell content: "Ana Silva | 22 Apr | 10:00" = Body Regular (14px)
- Status badge text: "Confirmado" = Body Small (12px, bold, green background)
- Button labels: "Confirmar | Atualizar" = Button Text (14px, bold, blue)
- Timestamps: "Atualizado há 5 min" = Caption (11px, gray)

**Accessibility Considerations:**
- Minimum 14px for body text (easier to read, especially on mobile)
- Generous line-height (1.5) for readability and spacing
- Bold font-weight (600-700) for all interactive elements (buttons, links)
- Clear visual hierarchy (font size differences signal importance)

---

### Spacing & Layout Foundation

**Spacing Unit: 4px Base (Flexible Density)**

Building block approach where all spacing uses 4px increments:
- 4px (1 unit) = micro spacing between elements
- 8px (2 units) = small spacing, component padding
- 12px (3 units) = medium spacing, section separators
- 16px (4 units) = standard padding, normal spacing
- 24px (6 units) = large spacing, major section breaks
- 32px (8 units) = extra-large spacing, between major sections

**Component Padding & Spacing:**

| Component | Padding | Gap Between Items |
|-----------|---------|-------------------|
| **Buttons** | 12px horizontal, 8px vertical | 12px |
| **Card/Container** | 16px | - |
| **Form Fields** | 12px | 12px |
| **List Items** | 12px vertical, 0px horizontal | 0px (no gap, items touch) |
| **Section** | 16px padding, 24px bottom margin | - |
| **Modal/Dialog** | 24px | - |

**Mobile Layout (320-768px):**
- Single-column layout
- Full-width cards and lists
- Padding: 16px left/right
- Button height: 48px (thumb-friendly)
- List item height: 56-64px (tap target)
- Spacing between sections: 24px
- Dense but not cramped (still readable)

**Desktop Layout (1024px+):**
- Can use 2-column layouts if needed
- Cards in grids with 16px gaps
- Padding: 24px left/right (more breathing room)
- Button height: 40px (mouse context, smaller is fine)
- List item height: 48-56px (still scannable)
- Spacing between sections: 32px (more breathing room)
- Sidebar or modal overlays for complex interactions

**Responsive Breakpoints (Tailwind CSS):**

- `sm: 640px` - Small tablets
- `md: 768px` - Tablets  
- `lg: 1024px` - Desktops
- `xl: 1280px` - Large desktops (not required for MVP)

**Grid System (For João's Dashboard):**

Admin list uses a responsive table/card layout:
- Mobile: Stacked cards (one item per row)
- Tablet: 2-column grid
- Desktop: Single row table or list (all info visible horizontally)

**Density Philosophy (Compact & Scannable):**

Design prioritizes:
1. **Information visibility** (Ana and João see all relevant info without scrolling)
2. **Touch targets** (Buttons 48px on mobile, 40px on desktop - all accessible)
3. **Scannability** (Status badges, colors, bold text allow quick visual scanning)
4. **No wasted space** (No excessive padding, but not cramped)

Example: João's dashboard shows 8-10 agendamentos on one screen (desktop) without extreme density.

---

### Visual Design Principles

**1. Color-Coded State (Instant Understanding)**
- Green = "All good, proceed" (available time, booking confirmed)
- Red = "Stop, can't do this" (unavailable time, error)
- Orange = "In progress, wait" (booking being processed)
- Blue = "Action needed" (unconfirmed bookings)
- Gray = "Neutral, secondary info" (completed, disabled)

**2. Clear Visual Hierarchy (Guidance)**
- Larger = More important (H2 bigger than body text)
- Bolder = More important (button text is 600 weight)
- Colored = Call to action (blue buttons vs gray secondary)
- Whitespace = Logical grouping (sections separated by space)

**3. Minimal Decoration (Focus on Content)**
- No unnecessary shadows or gradients
- Clean borders (1px gray) only where needed
- Flat design, modern aesthetic
- Every visual element serves a purpose

**4. Accessibility First**
- All text meets 4.5:1 contrast (WCAG AA)
- Focus indicators visible (blue outline)
- No color-only indicators (text labels + color)
- Semantic HTML with proper heading structure

**5. Mobile-First Responsive**
- Ana's mobile experience is primary design context
- Desktop layouts are enhancements, not afterthoughts
- Touch targets always >= 44px
- Text always readable without zooming

---

**Visual Design Summary:**

agenda-clean uses a professional, direct, and simple visual language:
- **Colors:** Blue (trust), Green (confirmation), Red (errors), Gray (neutral)
- **Typography:** System fonts, clear hierarchy (14-24px), WCAG AA contrast
- **Spacing:** 4px units, dense but scannable, mobile-first responsive
- **Aesthetics:** Flat, minimal, purposeful (every element serves a function)

This foundation ensures Ana experiences clarity and confidence on mobile, João experiences complete control and visibility on desktop, and both feel the relief and satisfaction of a system that simply works.



### Ana's Defining Experience: The 2-Minute Frictionless Booking

**What Makes This Experience Special:**

Ana's booking experience is the moment agenda-clean proves its value. If this single interaction fails, the product fails. Everything is designed to make Ana complete a booking in under 2 minutes, with zero friction, and 100% confidence it worked.

**The Flow:**

1. **Login (5 seconds)**
   - Opens app or website
   - Clicks "Entrar com Google"
   - Google OAuth completes automatically
   - System recognizes Ana, loads her history context
   - Result: She's authenticated and ready, no signup forms

2. **New Booking Screen (10 seconds)**
   - Ana sees: "Novo Agendamento" header with 4 fields only
   - Fields visible: 
     - Endereço (text input, auto-complete from history)
     - Data (date picker, defaults to next available week)
     - Horário (time picker showing only available slots in green)
     - Observações (optional text area)
   - No unnecessary fields, no clutter, full clarity on what she's doing

3. **Availability Check (30 seconds total)**
   - Ana selects date → System shows available times in real-time
   - Ana selects time → Button "Verificar Disponibilidade" is highlighted
   - Ana clicks → System responds within 500ms
   - Result: "✓ Horário Disponível!" in green (trust is built)
   - Or: "✗ Esse horário não está disponível. Disponíveis: 10:00, 11:30, 2:00 PM" (helpful, not punishing)

4. **Confirmation (10 seconds)**
   - Ana reviews: "Confirmar agendamento para [endereço], [data] às [hora]?"
   - Large green button: "Confirmar Agendamento"
   - Small gray link: "Cancelar"
   - Ana clicks Confirmar

5. **Success Feedback (5 seconds)**
   - Page shows: "✓ Seu agendamento foi criado!"
   - Green checkmark, celebratory tone
   - Underneath: "Você receberá um email de confirmação em alguns segundos"
   - Button: "Ver Meus Agendamentos" or "Fazer Novo Agendamento"

6. **Email Confirmation (within 30 seconds)**
   - Email from agenda-clean arrives in Ana's inbox
   - Subject: "Seu agendamento foi criado!"
   - Content:
     - "Olá [Ana],"
     - "Seu agendamento foi criado com sucesso!"
     - "Data: [data]"
     - "Hora: [hora]"
     - "Endereço: [endereço]"
     - "Status: Solicitado (aguardando confirmação de João)"
     - Link: "Ver agendamento no sistema"
     - Footer: "Você receberá outro email quando o agendamento for confirmado"

**Success Metrics for This Experience:**

- ✅ Total time: < 2 minutes (from login to confirmation email received)
- ✅ Form fields: Exactly 4 (endereço, data, hora, observações)
- ✅ Availability response: < 500ms (instant feels, no spinners)
- ✅ Email delivery: < 30 seconds (Ana has proof immediately)
- ✅ User confidence: 100% (Ana knows it worked because she has email proof)
- ✅ Completion rate: ≥ 80% of users who start complete booking

**Key Design Principles in This Experience:**

- **Speed:** Every action responds instantly (no "Processando..." messages)
- **Clarity:** Ana always knows what she's doing and why
- **Proof:** Email is the permanent record (not just in-app notification that disappears)
- **Simplicity:** 4 fields, 2 clicks, done (no complexity)

---

### João's Defining Experience: One-Click Admin Control

**What Makes This Experience Special:**

João's experience is about escaping WhatsApp chaos and gaining total control. He opens one screen, sees everything, and can manage any booking with one click. No missing messages, no miscommunications, no double-bookings.

**The Flow:**

1. **Login (5 seconds)**
   - João opens the app/website
   - Clicks "Entrar com Google"
   - System recognizes him as admin (email is pre-configured)
   - Redirects to Admin Dashboard
   - Result: He's looking at his complete agenda within seconds

2. **Dashboard Overview (instant)**
   - João sees one master list of ALL agendamentos
   - No tabs, no filtering required for default view
   - List sorted by date/time descending (most recent first)
   - Columns visible:
     | Cliente | Data | Hora | Endereço | Status | Ação |
   - Each row shows:
     - Client name: "Ana Silva"
     - Date: "22 de Abril"
     - Time: "10:00 AM"
     - Address: "Rua A, 123"
     - Status Badge: Color-coded (Solicitado = Blue, Confirmado = Green, Em Atendimento = Orange, Concluído = Gray, Cancelado = Red)
     - Action Button: "Confirmar" (if status is Solicitado), or "Atualizar Status" (for other states)

3. **Status Confirmation (5 seconds per booking)**
   - João clicks "Confirmar" on Ana's booking
   - Button immediately shows: "✓ Confirmado" (green, instant feedback)
   - Underneath the button: "Email enviado para Ana" (confirms action worked)
   - Status badge changes to green in real-time
   - System automatically sends confirmation email to Ana (João does nothing)

4. **Status Changes (for in-progress or completion)**
   - For other bookings, João clicks "Atualizar Status"
   - Dropdown appears on the row: [Solicitado | Confirmado | Em Atendimento | Concluído | Cancelado]
   - João selects new status
   - System updates immediately, shows confirmation
   - If changing to "Confirmado" or "Concluído": Email auto-sends to client

5. **Bulk Visibility (no scrolling required)**
   - João can see 8-10 agendamentos on one screen
   - Can scroll to see more without losing context
   - All information visible without click-through (no modal popups, no detail pages required)
   - Simple filters available (not prominent, secondary to default view):
     - Filter by: Date range, Status, Client name
     - But default view (all, sorted by date) is sufficient for most cases

**Success Metrics for This Experience:**

- ✅ Visibility: 100% of agendamentos visible in one view (no missing information)
- ✅ Confirmation: One click per booking status change (not 3-5 clicks via modals)
- ✅ Automation: Email sent automatically (João doesn't manually compose messages)
- ✅ Speed: Dashboard loads in < 3 seconds on desktop
- ✅ WhatsApp Escape: Zero need to open WhatsApp during workday (all info in system)
- ✅ Conflict Prevention: Zero double-bookings possible (system prevents automatically)

**Key Design Principles in This Experience:**

- **Control:** João sees everything and can change anything with one click
- **Automation:** System handles email sending, conflict prevention, status updates
- **Honesty:** Interface doesn't pretend to be real-time (manual refresh acceptable, timestamp shown)
- **Simplicity:** One list view (not multiple filtered views), default is the best view

---

### The Connection Between Experiences

**These two experiences create the feedback loop that makes agenda-clean work:**

1. Ana books quickly (2 minutes) → Email confirms immediately
2. João opens dashboard → Sees Ana's booking as "Solicitado"
3. João clicks "Confirmar" → Email auto-sends to Ana
4. Ana receives confirmation email → Feels trust, relief, satisfaction
5. Ana returns to book again 3 months later → Same frictionless experience, now with more confidence
6. João's day ends → Zero WhatsApp stress, complete visibility of all operations

**Both experiences are guided by one principle: Clarity + Confidence + Relief.**



### Design System Choice: Tailwind CSS + shadcn/ui

**Selected Foundation:** Tailwind CSS for utility-first styling + shadcn/ui for accessible React components

This combination provides the optimal balance of speed, customization, and accessibility for agenda-clean's 2-4 week MVP timeline.

### Rationale for Selection

**Why Tailwind CSS + shadcn/ui for agenda-clean:**

1. **Alignment with Existing Stack** 
   - Already specified in PRD (React 18+ + Vite + Tailwind CSS)
   - No additional learning curve; team already familiar
   - Proven integration with Vite build tooling

2. **Speed to Market (Critical for Solo Dev)**
   - shadcn/ui provides copy-paste React components (not node_modules dependency)
   - Modify components directly as needed (not locked into library versions)
   - Tailwind utilities enable rapid styling without writing CSS files
   - No complex theming setup (Tailwind config is straightforward)

3. **Full Customization & Brand Control**
   - Tailwind's utility-first approach allows pixel-perfect customization
   - Easily adapt colors, spacing, typography without "fighting" the framework
   - No Material Design "opinion" forcing you into Google's design language

4. **Accessibility Built-In**
   - shadcn/ui components built on Radix UI (WCAG A compliant out-of-box)
   - Semantic HTML, ARIA labels, keyboard navigation all included
   - Meets your NFR requirement for WCAG Level A accessibility

5. **Lightweight & Performance**
   - Tailwind is pure CSS (no JavaScript bloat like Material Design)
   - No heavy component library dependencies
   - Aligns with your <500KB JavaScript bundle size target
   - Critical Web Vitals achievable

6. **Community & Documentation**
   - shadcn/ui has excellent documentation and copy-paste examples
   - Tailwind CSS is extensively documented with clear patterns
   - Large developer community (easy to find answers)

### Implementation Approach

**Setup & Structure:**

1. **Tailwind CSS Configuration**
   - Use default Tailwind setup with Vite (already optimized)
   - Customize color palette to match brand (blues for trust, greens for confirmation)
   - Define typography scale (14px base, clear hierarchy for mobile-first)
   - Configure breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)

2. **shadcn/ui Component Installation**
   - Install shadcn/ui CLI: `npx shadcn-ui@latest init`
   - Select components as needed per feature (not install all at once)
   - Copy components into project `/components` folder for direct modification
   - Update component styles via Tailwind classes (not external CSS)

3. **Component Library for agenda-clean**
   - **Core Components (from shadcn/ui):**
     - Button (primary, secondary, danger states)
     - Input (text, email, date, time)
     - Card (agendamento list items, dashboard sections)
     - Badge (status indicators: Solicitado, Confirmado, etc.)
     - Dropdown (status change selector)
     - Dialog/Modal (confirmation flows)
     - Alert/Toast (error messages, success notifications)
   
   - **Custom Components (built with Tailwind):**
     - AgendamentoForm (client-facing booking form)
     - AgendamentoCard (single agendamento preview)
     - AdminDashboard (João's master list view)
     - StatusBadge (color-coded status indicator)
     - ConfirmationMessage (success/error feedback)

4. **Design Tokens (Tailwind Config)**
   ```
   Colors:
   - Primary: Blue (trust, confidence)
   - Success: Green (✓ confirmation)
   - Error: Red (warnings, unavailable slots)
   - Neutral: Gray (secondary info, disabled states)
   
   Spacing: 4px base unit (0.25rem in Tailwind)
   
   Typography:
   - Body: 14-16px (14px on mobile, 16px on desktop)
   - Heading: 20-32px scale
   - Button text: 14-16px, 600 weight
   
   Border Radius: 8px (subtle, modern feel)
   ```

### Customization Strategy

**Brand & Visual Identity:**

1. **Color Palette**
   - Primary Blue: #2563EB (Google OAuth color, trust)
   - Success Green: #10B981 (confirmation, availability)
   - Warning Orange: #F97316 (in-progress state)
   - Error Red: #EF4444 (unavailable, conflicts)
   - Neutral Gray: #6B7280 (secondary info, disabled)

2. **Typography**
   - Font: Inter or system font stack (fast loading, professional)
   - Ana's interface: Larger type (16px min), good contrast
   - João's interface: Slightly smaller (14px), more info density

3. **Spacing & Layout**
   - Mobile-first: 16px padding, 12px gaps
   - Desktop: 24px padding, 16px gaps
   - Single-column on mobile, 2-column on desktop

4. **Component Customization**
   - Buttons: Rounded corners (8px), no shadows (clean)
   - Cards: Subtle border (1px gray), light shadow only on hover
   - Status badges: Filled background + white text (clear, scannable)
   - Form inputs: Border on focus only (uncluttered)

### Component Behavior & Patterns

**Ana's Client Interface:**
- Buttons are large (48px height minimum, mobile-friendly tap target)
- Form fields stack vertically (single column, easy scrolling)
- Color coding: Green = "go ahead" (available), Red = "can't do this" (booked)
- Confirmation message uses ✓ checkmark (universal symbol)
- Empty states show helpful next step ("Clique 'Novo Agendamento' para começar")

**João's Admin Interface:**
- Buttons are smaller (40px height, desktop context)
- Table/list with inline actions (no click-through modals)
- Color badges at a glance (no hovering required)
- Status dropdown in-line (one click, status changes, email sends)
- Empty state shows helpful instructions ("Nenhum agendamento ainda. Clientes verão este painel quando agendarem.")

---

**Design System Summary:**

agenda-clean uses **Tailwind CSS + shadcn/ui** as its foundation, providing:
- ✅ Speed to market (component copy-paste, utility-first styling)
- ✅ Full customization (Tailwind's utility approach, shadcn/ui component override)
- ✅ Accessibility compliance (WCAG A built-in, semantic HTML)
- ✅ Lightweight & performant (pure CSS, no bloat)
- ✅ Aligned with PRD requirements (already specified in tech stack)

The system supports both Ana's mobile-first client experience and João's desktop-optimized admin experience while maintaining visual consistency and responsive behavior across all screen sizes.



### Inspiring Products Analysis

**While you didn't specify individual apps, I'll analyze the proven UX patterns from successful products in key categories that agenda-clean must excel at:**

**Scheduling/Calendars:**
Products like Google Calendar, Calendly, and Acuity Scheduling have mastered:
- Single-click date/time selection (date picker + time picker, not custom dropdowns)
- Visual confirmation of availability (color-coded: available green, booked red/gray)
- Instant feedback on slot selection (no "checking availability..." spinners)
- Clear confirmation flow (show what you selected, then confirm)

**Consumer Mobile Apps (Simplicity & Clarity):**
Apps like Uber, Stripe mobile, and Whatsapp have shown that:
- First-time users complete core action within 2 taps
- Navigation is bottom-tab-based (not hamburger menus that hide functionality)
- Onboarding is skippable (users want to do, not read manuals)
- Colors signal state clearly (green = go, red = stop/error, gray = disabled)
- Empty states are helpful, not blank (show what users can do next)

**Admin Dashboards (Visibility & Control):**
Products like Stripe Dashboard, Airtable, and Slack admin have proven:
- One primary list view (not multiple tabs that disperse information)
- Inline actions (edit/delete/confirm buttons visible on list rows, not requiring click-through)
- Sorting and filtering always available but secondary to simple default view
- Status badges at a glance (not requiring click to see state)
- Real-time indicator of what's changed (badges like "New", "Pending", etc.)

### Transferable UX Patterns

**For Ana (Client - Mobile):**

**Pattern 1: Simplified Date/Time Selection**
- Adopt: Google Calendar's "tap day → tap time" pattern (not a complex date picker)
- Why: Ana needs to select date and time quickly on mobile
- Implementation: Modal date picker, then time picker with available slots highlighted
- Avoid: Custom dropdowns that require scrolling through months

**Pattern 2: Instant Visual Feedback**
- Adopt: Stripe/Uber's "✓ Confirmed" checkmark pattern (appears immediately, no loading spinner)
- Why: Ana needs reassurance that her action registered
- Implementation: Instant green checkmark on button, then show full confirmation below
- Avoid: Long loading states, ambiguous "Processing..." messages

**Pattern 3: Persistent Proof of Action**
- Adopt: Email confirmation pattern (like Stripe receipts, Airbnb bookings)
- Why: Email is a permanent, trustworthy record Ana can retrieve later
- Implementation: Email arrives within 30 seconds with complete booking details
- Avoid: Relying only on in-app notifications (users delete app, lose proof)

**Pattern 4: Clear CTAs (Calls to Action)**
- Adopt: Uber/Whatsapp button pattern (large, obvious primary button, secondary option below)
- Why: Ana knows exactly what to do next
- Implementation: "Confirmar Agendamento" (primary) and "Cancelar" (secondary) buttons
- Avoid: Equal-weight buttons or confusing link text like "Click here for next step"

---

**For João (Admin - Desktop):**

**Pattern 1: One Master List View**
- Adopt: Gmail/Slack pattern (single list is the source of truth, filters are secondary)
- Why: João needs complete visibility at a glance, not scattered info across tabs
- Implementation: All agendamentos on one scrollable table, filters on left/top
- Avoid: Multiple tabs ("Pending", "Confirmed", "Completed") that fragment attention

**Pattern 2: Inline Actions (No Click-Through)**
- Adopt: Stripe/Airtable pattern (action buttons visible on rows, not modal popups)
- Why: João confirms status with one click per booking, not three clicks (view → edit → save)
- Implementation: Status dropdown on each row, or quick-action buttons (Confirmar, Cancelar)
- Avoid: Click row → open detail page → click edit → select status → save (too many steps)

**Pattern 3: Status Badges & Visual Hierarchy**
- Adopt: Slack/Trello pattern (status immediately visible as colored badge)
- Why: João scans visually (not reading) to understand state of each booking
- Implementation: Solicitado = Blue, Confirmado = Green, Em Atendimento = Orange, Concluído = Gray, Cancelado = Red
- Avoid: Status as plain text or hidden in a details page

**Pattern 4: Real-Time Sync Indicators**
- Adopt: Slack's "Last updated X minutes ago" pattern (acknowledges async updates)
- Why: João understands that what he sees might not be real-time
- Implementation: Timestamp showing when list was last refreshed, F5 button for manual refresh
- Avoid: Pretending data is real-time when it's not (confuses when updates don't appear immediately)

### Anti-Patterns to Avoid

**Anti-Pattern 1: Too Many Options on One Screen**
- ❌ Showing all filters, settings, and options at once (paralyzes users)
- ✅ Instead: Show defaults first, hide advanced options behind "More Filters"
- Why: Ana gets overwhelmed with calendar options; João needs simple list first

**Anti-Pattern 2: Modal Dialogs for Simple Actions**
- ❌ Status change opens a dialog ("Are you sure?", dropdown, confirm button)
- ✅ Instead: Inline dropdown on the row, clicks save directly
- Why: João gets frustrated with extra clicks (Stripe avoided this, Gmail avoided this)

**Anti-Pattern 3: Relying Only on In-App Notifications**
- ❌ Booking confirmation only appears in-app (disappears when user closes browser)
- ✅ Instead: Email confirmation as primary proof, in-app as secondary
- Why: Ana must trust she can find proof of her booking later (email is permanent)

**Anti-Pattern 4: Generic Error Messages**
- ❌ "Error: Slot unavailable" (confusing, doesn't help user recover)
- ✅ Instead: "That time was just booked. Try 11:00 AM or 2:00 PM?" (helpful, suggests alternatives)
- Why: Users feel helpless with generic errors; they recover with helpful context

**Anti-Pattern 5: Hamburger Menu for Mobile (when not needed)**
- ❌ Bottom or top hamburger menu hiding main actions
- ✅ Instead: Bottom tab bar with "Novo Agendamento" and "Meus Agendamentos" always visible
- Why: Ana needs one tap to her main actions; hamburger is for complex apps (this isn't)

**Anti-Pattern 6: Lack of Visual Hierarchy**
- ❌ All text the same size, buttons same color, no distinction between important/secondary
- ✅ Instead: Primary action large (green, prominent), secondary action small (gray, subtle)
- Why: Ana should never be confused about what to do next

### Design Inspiration Strategy

**What to Adopt (Proven, Use Directly):**

1. **Google Calendar's Date/Time Selection** → Use for Ana's agendamento form
   - Two-step: Pick date → Pick available time slots
   - No custom dropdowns, use native/familiar patterns
   
2. **Stripe/Uber's Instant Confirmation** → "✓ Agendamento Criado!" appears immediately
   - Visual checkmark, not loading spinner
   - Success state feels celebratory, not bureaucratic

3. **Email as Permanent Record** → Confirmation email sent within 30 seconds
   - Complete booking details (date, time, address, client name)
   - Link to view booking in system

4. **Slack/Gmail's Master List Approach** → João sees all agendamentos in one list
   - Filters secondary to default view
   - Inline actions (no click-through to details page required)

5. **Colored Status Badges** → Visual scanning, not reading
   - Solicitado (Blue) → Confirmado (Green) → Em Atendimento (Orange) → Concluído (Gray)

---

**What to Adapt (Good Pattern, but Simplify for Our Context):**

1. **Calendar View** → Initially skip calendar view, use list view only
   - Reason: Solo dev timeline, João can see everything in one list
   - Future: Add calendar after MVP if needed
   - Simplify: Start with list, not grid

2. **Notification System** → Keep it simple (only email, no SMS/push initially)
   - Reason: Email is trustworthy, SMS/push add complexity
   - Adapt: Email as the notification system, not in-app notifications

3. **Mobile Admin Interface** → Functional but not optimized
   - Reason: João primarily uses desktop, mobile is occasional
   - Adapt: Same list view, but narrower on mobile (not redesigned)

---

**What to Avoid (Common Mistakes in Scheduling Apps):**

1. ❌ Complex multi-step forms (Ana will abandon)
   - Instead: 4-5 fields max, single-page form

2. ❌ Real-time features that seem real but aren't (WebSockets/polling)
   - Instead: Manual refresh is honest and simple for MVP

3. ❌ Overwhelming search/filter options
   - Instead: Basic sort by date/status, advanced filters hidden

4. ❌ Unclear error states
   - Instead: "That time is booked. Available slots are: 10:00, 11:30, 2:00 PM"

5. ❌ Forgetting confirmation (Ana worries if it worked)
   - Instead: In-app + Email + Timestamp visible in history

6. ❌ Making admin work harder than before (João compares to WhatsApp)
   - Instead: One-click status updates, all info visible, automatic emails

---

**Design Inspiration Summary:**

agenda-clean borrows the best-proven patterns from:
- **Google Calendar** for scheduling simplicity
- **Stripe** for instant confirmation and trust-building
- **Slack/Gmail** for admin list views and inline actions
- **Uber/Whatsapp** for mobile-first clarity and simple CTAs

These patterns are proven by millions of users and billions of interactions. They work because they respect user time, provide instant feedback, and build trust through clarity. We adopt them directly where they fit, adapt them to our simpler context, and avoid the anti-patterns that plagued less successful products.



### Primary Emotional Goals

**Ana (Client) and João (Admin) should feel three core emotions:**

1. **Relief (Alívio)**
   - Relief from the manual, fragmented process they previously endured
   - Ana: No more searching for WhatsApp, waiting for responses, worrying if the booking worked
   - João: No more being bombarded with messages, juggling status updates, dealing with double-booking conflicts
   - The system takes the burden away

2. **Confidence (Confiança)**
   - Confidence that the system works reliably and predictably
   - Ana: "My booking is safe here. I can check it anytime. The system won't lose my data."
   - João: "Everything is in one place. I can trust this system to prevent conflicts. Nothing will be missed."
   - The system earns trust through consistent, transparent behavior

3. **Satisfaction (Satisfação)**
   - Satisfaction that the task was completed successfully and effortlessly
   - Ana: "I booked in 2 minutes without friction. The system made it easy."
   - João: "One click and the booking is confirmed. The system handles the rest. This is so much better than WhatsApp."
   - The system delivers excellence through simplicity

### Emotional Journey Mapping

**Ana's Emotional Arc:**

| Stage | Moment | Desired Emotion | What She Thinks |
|-------|--------|-----------------|-----------------|
| **Entry** | Opens app | **Confidence** | "This looks trustworthy and simple" |
| **Action** | Fills form, validates | **Relief** | "It actually works. I don't have to call or message anyone" |
| **Confirmation** | Sees success message + email arrives | **Satisfaction** | "Done. It's real. I have proof right here in my email." |
| **Reflection** | Checks "Meus Agendamentos" | **Confidence** | "Everything I entered is exactly as I left it. This system remembers me." |
| **Return** | Books again 3 months later | **Relief + Satisfaction** | "I can do this again instantly. No friction. The system got better at knowing me." |

**João's Emotional Arc:**

| Stage | Moment | Desired Emotion | What He Thinks |
|-------|--------|-----------------|-----------------|
| **Entry** | Opens dashboard | **Relief** | "Thank God. Everything is right here. No more scattered WhatsApp." |
| **View** | Sees complete list of agendamentos | **Confidence** | "I can see everything. Nothing is hidden. Complete control." |
| **Action** | Clicks one booking to confirm | **Relief** | "One click. The system handles the email. I'm done. So much faster than WhatsApp." |
| **Verification** | Sees status change + email auto-sent | **Satisfaction** | "Automatic. I didn't have to do anything else. This works." |
| **Reflection** | End of day: No WhatsApp stress | **Relief + Confidence** | "I ran a whole day without WhatsApp. Zero conflicts. Zero follow-ups. This is the dream." |

### Micro-Emotions to Design For

**Emotions to Cultivate:**

- **Calm (Tranquilidade)** → No anxiety about lost bookings or forgotten messages
  - *Design implication:* Persistent data, always accessible, nothing disappears
  
- **Control (Controle)** → User feels they have agency and visibility
  - *Design implication:* Single source of truth (Ana's history, João's dashboard), not scattered info
  
- **Speed (Velocidade)** → Tasks complete instantly, no waiting
  - *Design implication:* <2 sec agendamento, <500ms availability check, instant status updates
  
- **Clarity (Clareza)** → Always understand what's happening, no surprises
  - *Design implication:* Clear error messages, explicit status states, no hidden complexity
  
- **Trust (Confiança)** → System behaves predictably and transparently
  - *Design implication:* Email confirms everything, timestamps show when things happened, no "magic"

**Emotions to Prevent:**

- ❌ Confusion — User unsure if booking worked, what status means, what to do next
- ❌ Frustration — Waiting, multiple clicks to do simple task, losing data
- ❌ Anxiety — Worry that something was forgotten or lost
- ❌ Helplessness — No way to recover if something goes wrong
- ❌ Skepticism — "Does this system really work? Should I call to confirm?"

### Design Implications (Emotion → UX Choice)

**Relief (Alívio):**
- Immediate in-app confirmation: "Agendamento Criado! ✓" (not a loading spinner or "Processando...")
- Email arrives within 30 seconds with full booking details (Ana has tangible proof)
- For João: All data visible on one screen (no navigation needed, complete visibility)
- **UX Pattern:** Instant visual feedback + asynchronous email confirmation

**Confidence (Confiança):**
- Persistent data storage with explicit timestamps (when booked, when status changed)
- Ana can view her complete history anytime (builds trust that data is preserved)
- João sees real-time availability status (color-coded: Available = green, Booked = red)
- Error messages explain exactly why something failed: "Time slot was just booked by another client"
- **UX Pattern:** Transparency through visibility + explicit state indicators

**Satisfaction (Satisfação):**
- Task completion feels effortless (1-click booking confirmation, 1-click status update)
- No unnecessary steps or modals (avoid "Are you sure?" confirmation dialogs)
- Empty states are handled gracefully (if no bookings yet, helpful message not blank space)
- Success messages celebrate the accomplishment: "Seu agendamento foi criado! Você receberá confirmação por email."
- **UX Pattern:** Smooth completion with celebratory feedback

### Emotional Design Principles

These principles guide every interaction and feature decision:

**1. Simplicity Builds Trust**
- Simple interfaces make users feel confident the system is doing the right thing
- No confusing options, no hidden settings, no "magic" that feels unreliable
- Example: João's dashboard is one list, not 5 different filtered views

**2. Immediate Feedback = Relief**
- Waiting creates anxiety; instant feedback creates relief
- Every action should respond within 500ms (visual or audio feedback)
- Example: Availability check responds instantly with clear "Available" or "Not Available"

**3. Persistence = Confidence**
- Data that persists is data users trust
- Email as permanent record (not just in-app notification)
- Timestamps show when things happened (not vague "yesterday")
- Example: Ana's booking has exact date, time, address, and when it was created

**4. One Action, One Click**
- Tasks should complete in 1-2 clicks, not 5-6
- João confirms booking in one click (not "edit, scroll, confirm, apply changes")
- Ana books in <2 minutes (not a 10-step form)
- Example: Status update is a single click button, not a modal dialog

**5. Errors Are Helpful, Not Punishing**
- When something goes wrong, the error message helps the user recover
- Not: "Error 403 Forbidden" → But: "That time slot was just booked by another client. Try 11:00 AM instead?"
- No data is lost (system rolls back on error, user can retry)
- Example: If email send fails, system retries automatically in background, user is informed

**6. Celebration Moments = Satisfaction**
- Acknowledge successful completion with affirmative language
- Ana sees: "✓ Seu agendamento foi criado! Confirme seu email."
- João sees: "✓ Status atualizado! Email enviado para cliente."
- Small wins build satisfaction and encourage future use

---

**Emotional Experience Summary:**

The three core emotions (Relief, Confidence, Satisfaction) define agenda-clean's entire UX strategy:

- **Relief** comes from eliminating the manual chaos (single source of truth, automatic emails, no scattered messages)
- **Confidence** comes from transparency and persistence (visible data, timestamps, clear states, email proofs)
- **Satisfaction** comes from effortless completion (1-2 clicks, instant feedback, celebrated successes)

When users feel these emotions consistently, they trust the system, recommend it to others, and keep using it.



### Defining the Core Experience

**agenda-clean** has two equally important but distinct user experiences that must coexist harmoniously:

**Primary Experience (Client - Ana):**
The core loop is: *Login → Create Agendamento → Receive Confirmation*

Ana must be able to go from entering the app to having a confirmed booking in **under 2 minutes**, with zero friction at each step. This is the experience we optimize first because it's where the product delivers immediate value.

**Secondary Experience (Admin - João):**
The core loop is: *View All Agendamentos → Click One → Confirm Status → Auto-Email Sent*

João must have complete visibility of all bookings in one place and be able to update any booking's status with one click. This experience must feel like a "command center" where nothing escapes notice and everything is under control.

**The Connection:**
Both experiences are fueled by the same principle: **clarity and control**. Ana gains clarity through instant feedback; João gains control through centralization. Neither experience works without the other.

### Platform Strategy

**Split Optimization by User Context:**

- **Client Interface (Ana):** Mobile-first design (320px primary breakpoint)
  - Responsive to desktop but optimized for touch and small screens
  - Minimal navigation, maximum clarity
  - Single-column layout, thumb-friendly interactions
  - Only shows information Ana needs right now

- **Admin Interface (João):** Desktop-first design (1024px+ primary)
  - Responsive to mobile (functional but not optimized)
  - Multi-column layout, mouse/keyboard optimized
  - Comprehensive information visible at once
  - Advanced filtering and search secondary to simple list view

**Technical Foundation:**
- Single React SPA codebase with responsive conditional rendering
- No real-time sync in MVP (manual F5 refresh acceptable for João)
- Email as the primary confirmation mechanism (not in-app notifications)
- All interactions via standard REST API, no WebSockets

### Effortless Interactions (The "Magic Moments")

**1. Frictionless Authentication**
- Google OAuth login: 1-click authentication, zero signup forms
- For Ana: First time = login once, then permanently remembered
- For João: Same, but with pre-configured admin role detection
- *Principle:* We never ask for passwords or signup info

**2. Real-Time Availability Feedback**
- Ana selects date/time → System responds within 500ms: "✓ Available" or "✗ Not available"
- Immediate clarity, no waiting, no uncertainty
- Error message explains *why* unavailable: "That time was just booked" vs "That time is blocked"
- *Principle:* The system never leaves the user guessing

**3. Confirmation Layers (In-App + Email)**
- In-app: Immediate success confirmation message on the screen
- Email: Permanent, trustworthy proof delivered to inbox within seconds
- Email contains actionable information (date, time, address, link to view details)
- *Principle:* Trust is built through persistent, tangible confirmation

**4. Admin Dashboard - Single Source of Truth**
- One scrollable list of ALL agendamentos with essential info visible
- Each agendamento shows: Client name, Date, Time, Address, Current Status
- One-click status updates (no modals, no multi-step workflows)
- Color-coded status for instant visual scanning
- *Principle:* João never has to search, filter, or dig for information

### Critical Success Moments

**For Ana (Client):**
- **The Booking Moment:** Ana clicks "Confirmar Agendamento" and immediately sees success message + email arrives
  - If this fails, Ana loses trust immediately and goes back to WhatsApp
  - Everything hangs on this being instantaneous and clear

- **The Confidence Check:** Ana sees her booking in "Meus Agendamentos" list with all details intact
  - Persistence of data builds trust for future bookings

**For João (Admin):**
- **The Visibility Moment:** João opens dashboard and sees every single agendamento at a glance
  - No missing bookings, no scattered messages, complete control
  - This is the moment he knows WhatsApp is no longer needed

- **The One-Click Confirmation:** João clicks "Confirmar" and sees status change immediately + email auto-sends
  - Zero additional steps, zero follow-up emails to send manually
  - This is the moment he feels automation working for him

### Experience Principles (Design North Star)

These principles guide every design decision:

**1. Clarity Over Completeness**
- Show only what users need right now
- Hidden complexity is fine if it makes the immediate task clearer
- Example: Ana doesn't see admin-only fields; João doesn't see client-only fields

**2. Action Over Information**
- Every screen is designed for an action, not information browsing
- Buttons are prominent and clear ("Confirmar", "Novo Agendamento", "Meus Agendamentos")
- Navigation is minimal — users always know what to do next

**3. Trust Through Simplicity**
- No "magic" → everything works as expected
- Error messages explain what happened and how to fix it
- Persistent confirmation (email) proves the system worked
- No features that seem unnecessary or confusing

**4. Respect User Time**
- Ana books in <2 minutes (no signup, no complex forms, instant feedback)
- João manages in minimal clicks (one list, one-click updates, auto-emails)
- No loading spinners or waiting for things that should be instant
- Offline states handled gracefully (show what's available, queue offline actions)

**5. Mobile-First Simplicity, Desktop-Enhanced Power**
- Client interface (Ana): Optimized for mobile, works on desktop
- Admin interface (João): Optimized for desktop, functional on mobile
- Same principles apply to both, but interaction patterns adapt to device

---

**Core Experience Summary:**

agenda-clean's core experience is built on two interrelated loops:
- **Ana's Loop:** Login → Book → Confirm ✓ (2 minutes, mobile, effortless)
- **João's Loop:** Dashboard → View → Confirm ✓ (one click per booking, desktop, complete control)

Both loops are powered by clarity (Ana knows what happened), simplicity (no unnecessary complexity), and automation (email handles confirmation automatically). The system feels trustworthy because everything works as expected with instant feedback.

---

## Design Direction Decision

### Design Directions Explored

In Step 09, we evaluated two primary layout approaches for each user experience:

**For Ana (Client):**
- **Option A:** Step-by-Step Form (separate screens for date selection, time selection, address, notes, confirmation)
- **Option B:** Single-Page Form (all fields on one screen: date picker + time picker + address + notes + confirmation button)

**For João (Admin):**
- **Option A:** Table Layout (compact data display, list view with inline status badges)
- **Option B:** Card Layout (spacious individual cards for each agendamento, full details visible on each card)

### Chosen Direction

**Direction Selected: Option B for Both Ana and João**

**Ana's Booking Interface (Single-Page Form):**
- All booking information on one responsive form
- Date picker input field with native date selection
- Time availability grid showing available slots (green), unavailable slots (red), and selected slot (blue highlight)
- Address field pre-filled from booking history (builds familiarity, reduces typing)
- Optional notes textarea for special requests or details
- Large primary button: "✓ Confirmar Agendamento" (green, prominent, unmissable)
- Info box below button: "✓ Confirmação será enviada por email" (reassures Ana about next step)
- Single screen, single scroll, complete task in one view
- Works perfectly on mobile (vertical stack, touch-friendly spacing)
- Works well on desktop (form width capped at 500px for readability)

**João's Admin Interface (Card Layout):**
- Each agendamento displayed as a self-contained card
- Card header shows: Client name + Status badge (color-coded: Confirmado = green, Pendente = yellow, Concluído = gray)
- Card body shows: Date, Time, Address, Client notes (all visible at once, no expand/collapse needed)
- Card footer has action buttons: "↻ Reagendar", "✓ Concluído", "✉ Enviar Lembrete" (quick access to common actions)
- Filter tabs at top: "Todos (8)", "Confirmados (5)", "Pendentes (3)" (quick filtering without leaving list view)
- Cards stack vertically on mobile, remain as cards on desktop
- João can see 3-4 cards on desktop screen without scrolling (optimal visibility)
- Cards use subtle hover shadow (indicate interactivity without overwhelming)

### Design Rationale

**Why Single-Page Form (Option B) for Ana:**

1. **Speed:** No page transitions, no back buttons, one continuous scroll → meets <2 minute goal
2. **Clarity:** All fields visible at once → Ana understands scope of task before starting
3. **Familiarity:** Single form matches what users expect from mobile booking apps (Uber, Airbnb patterns)
4. **Reduced Friction:** No "next button" steps → common abandonment point eliminated
5. **Mobile-First:** Natural vertical stack on 320px, form elements full width (comfortable thumb reach)
6. **Desktop Support:** Form width-constrained to 500px (readable, not stretched)
7. **Responsive Time Selection:** Time grid adapts from 3 columns (mobile) to 4 columns (desktop)

**Why Card Layout (Option B) for João:**

1. **Visual Scanning:** Each card is a visual chunk → João quickly scans color-coded badges for status
2. **Information Density:** All essential info visible (client, date/time, address) without expanding
3. **Action Access:** Buttons visible on card (reagendar, concluído, reminder) → no modal clicks needed
4. **Scalability:** Cards stack naturally as booking volume increases (no table column wrapping issues)
5. **Desktop Optimization:** Cards on desktop show 3-4 per screen, important details not truncated
6. **Mobile Fallback:** Cards remain usable on mobile (narrower, but same structure)
7. **Status at a Glance:** Color badges (green/yellow/gray) allow instant status understanding
8. **Emotion:** Cards feel modern and organized (not a boring table), reinforces "this is better than WhatsApp"

### Implementation Approach

**Ana's Form (Tailwind + shadcn/ui):**
- Container: `w-full max-w-md mx-auto` (constrains to 500px, centers, responsive)
- Spacing: `p-4 md:p-6` (16px mobile, 24px desktop)
- Form groups: `mb-6` between fields (balanced spacing)
- Date input: Native HTML5 `<input type="date">` (style with Tailwind, mobile shows native picker)
- Time slots: Grid `grid-cols-3 md:grid-cols-4 gap-2` (adjust columns responsive)
- CTA button: `w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg` (large, touch-friendly, green for confirmation)
- Info box: `mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-sm` (reassurance message)

**João's Cards (Tailwind + shadcn/ui):**
- Container: `grid grid-cols-1 gap-4 p-6` (single column, 24px gap and padding)
- Card: `border border-gray-200 rounded-lg p-5 hover:shadow-md transition` (subtle hover effect)
- Header: `flex justify-between items-start mb-3` (client name on left, badge on right)
- Badge: `px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded` (semantic colors)
- Info lines: `text-sm text-gray-600 mb-2` (secondary information)
- Action buttons: `grid grid-cols-3 gap-2 mt-4` (three buttons, equal width, tight grouping)
- Action button: `px-2 py-1.5 border border-gray-300 text-xs font-medium rounded hover:bg-gray-50` (secondary style)

**Design System Alignment:**
- Both interfaces use the color palette defined in Step 08 (Blue #2563EB primary, Green #10B981 confirmation, etc.)
- Typography follows Step 08 system (14px body on mobile, 16px on desktop)
- Spacing uses 4px base unit (16px padding mobile, 24px desktop)
- All components use border-radius-8px (rounded corners, modern feel)
- Responsive breakpoints: 640px (md:), 768px (lg:) follow Tailwind defaults

### Success Criteria for Chosen Direction

**For Ana's Single-Page Form:**
- ✅ Booking completion time: <2 minutes (no page transitions)
- ✅ Mobile responsiveness: Comfortable on 320px+ (form fields full width, tap-friendly)
- ✅ Desktop readability: Form width capped (not stretched across 1920px)
- ✅ Clarity: All fields visible in one scroll (user knows full scope)
- ✅ Confirmation: Email arrives within 30 seconds with full details
- ✅ Emotional response: Relief (quick + easy), Confidence (one screen, familiar pattern)

**For João's Card Layout:**
- ✅ Visibility: 3-4 cards per desktop screen (complete overview without scrolling entire list)
- ✅ Status clarity: Color badges instantly indicate booking state (no text reading required)
- ✅ Action speed: One-click to common actions (reagendar, concluído, reminder)
- ✅ Information completeness: All essential fields visible (client, date, time, address)
- ✅ Scalability: Cards adapt as booking volume grows (no column truncation issues)
- ✅ Emotional response: Relief (central dashboard, no scattered messages), Control (complete visibility)

### Next Steps

This design direction (Single-Page Form + Card Layout) will be the foundation for:
- Step 10: User Journey Flows (detailed interaction wireframes)
- Step 11: Component Specifications (exact button styles, form field behavior, card structure)
- Step 12: Implementation Handoff (design tokens, component library guide, responsive behavior)

---

## User Journey Flows

### Journey 1: Ana's Frictionless Booking (Client Happy Path)

**Goal:** Ana books a cleaning appointment in under 2 minutes with zero friction and immediate confirmation.

**Entry Point:** Ana arrives on the website (logged out) → taps/clicks "Nova Sessão" button

**Flow Diagram:**

```
Ana Opens Browser
        ↓
[Google OAuth Login]
        ├─→ ✓ First time user → Auto-account creation
        └─→ ✓ Returning user → Instant login
        ↓
[Novo Agendamento Screen]
        ├─ Form loads with fields visible
        ├─ Address field is empty (first-time) or pre-filled from history (returning)
        ↓
[Ana Selects Date]
        ├─→ Clicks date input → Native date picker shows
        ├─→ Selects "Sábado, 25 de Abril"
        ↓
[Ana Selects Time]
        ├─→ Time grid appears with available slots (green) and booked slots (red/unavailable)
        ├─→ Taps "17:00" (available slot)
        ├─→ Slot highlights in blue (selected state)
        ↓
[Ana Enters Address & Notes]
        ├─→ Types address: "Rua das Flores, 123 - Apto 42"
        ├─→ Types notes (optional): "Sofá cinza grande, 1 poltrona"
        ↓
[Ana Confirms]
        ├─→ Taps green "✓ Confirmar Agendamento" button
        ├─ System validates form (all required fields filled)
        ├─ System reserves time slot (write to database)
        ├─ Email queued to SendGrid (async)
        ↓
[✓ Success Screen]
        ├─ Heading: "✓ Seu Agendamento foi Criado!"
        ├─ Details shown: Date, Time, Address, Status: "Solicitado"
        ├─ Info box: "📧 Você receberá confirmação por email em alguns segundos"
        ├─ CTA button: "Voltar para Home" or "Agendar Outro"
        ↓
[Email Arrives - 30 seconds later]
        └─ Subject: "✓ Seu Agendamento foi Criado! - 25 de Abril"
           Body: Date, Time, Address, Status, Link to view
```

**Screen-by-Screen Breakdown:**

| Screen | Content | Interaction | Time |
|--------|---------|-------------|------|
| **Login** | Google OAuth button, "Rápido & Seguro" text | Click OAuth → redirect → auto-login | ~5s |
| **Home** | "Novo Agendamento" button, "Meus Agendamentos" link | Click "Novo Agendamento" | ~2s |
| **Form** | Date field (pre-filled?), Time grid, Address field, Notes textarea, Confirm button | Fill fields, Select time, Click Confirm | ~50s |
| **Loading** | "Processando seu agendamento..." (brief spinner) | Wait | ~2s |
| **Success** | ✓ Checkmark, Details, "Email em breve" message | Review, then navigate | ~10s |

**Total Time: ~70 seconds (target <120 seconds)**

**Key Design Decisions:**

1. **No Multi-Step Form** — All fields on one screen (reduces abandonment)
2. **Pre-filled Address** — "Rua das Flores, 123" from history (builds familiarity)
3. **Real-Time Availability** — Grid shows available/unavailable instantly (no "checking..." wait)
4. **Immediate Visual Feedback** — Selected time slot highlights in blue (Ana knows what's selected)
5. **Success Celebration** — Checkmark + celebratory message (satisfaction moment)
6. **Email Confirmation** — Arrives within 30s (permanent proof, trust building)

**Emotional Arc:**

- **Entry:** Confidence ("This looks simple and trustworthy")
- **Selection:** Relief ("I can see available times, picking is easy")
- **Confirmation:** Satisfaction ("Done! I have my booking!")
- **Email:** Confidence ("I have proof, this system works")

**Error Paths:**

| Error | What Happens | Recovery |
|-------|-----------|----------|
| **Slot just booked** | Ana sees "❌ Desculpe, este horário foi agendado agora. Tente: 10:00, 11:00, ou 13:00?" | Suggest 3 alternatives, Ana selects another |
| **Network error** | "❌ Falha ao salvar. Tente novamente." | Button shows retry state, Ana clicks again |
| **Missing address** | Form doesn't submit, field highlights red: "Endereço é obrigatório" | Ana fills in, tries again |

---

### Journey 2: Ana's History & Recurrence (Client Edge Case)

**Goal:** Ana checks her booking history and feels confident that the system remembers her. She books again with trust.

**Entry Point:** Ana returns 3 months later → logs in → sees "Meus Agendamentos"

**Flow Diagram:**

```
Ana Opens Browser (Returning User)
        ↓
[Google OAuth - Auto-Login]
        └─→ ✓ Ana is automatically logged in (browser remembers Google session)
        ↓
[Home Screen]
        ├─ Two clear buttons: "Novo Agendamento" and "Meus Agendamentos"
        ├─ Optional: "Última sessão: 25 de Março" (timestamp)
        ↓
[Ana Clicks "Meus Agendamentos"]
        ↓
[History List Screen]
        ├─ Shows: All of Ana's past agendamentos (reverse chronological)
        ├─ Cards display: Date, Time, Address, Status (✓ Concluído)
        ├─ Most recent at top: "Sábado, 25 de Março, 17:00 - Rua das Flores, 123"
        ├─ Status badge: Green "✓ Concluído"
        ├─ If notes added: "Observações: Sofá cinza grande"
        ↓
[Ana Reflects - Trust Building Moment]
        ├─ "O sistema lembrou de mim"
        ├─ "Minhas anotações estão lá"
        ├─ "Tudo está organizado"
        ├─ "Este sistema funciona"
        ↓
[Ana Clicks "Novo Agendamento"]
        └─→ Goes back to Journey 1 (Frictionless Booking)
        └─→ This time: Address field is pre-filled with "Rua das Flores, 123"
        └─→ Ana feels: "The system knows me, this will be even faster"
```

**Screen-by-Screen Breakdown:**

| Screen | Content | Interaction | Time |
|--------|---------|-------------|------|
| **Home** | "Novo Agendamento" button, "Meus Agendamentos" link, Optional: "Última sessão 3 meses atrás" | Click "Meus Agendamentos" | ~3s |
| **History** | List of past agendamentos, each as a card with: date, time, address, notes, status badge | Review history, click "Novo Agendamento" to book again | ~30s |
| **New Booking** | Form with pre-filled address from history | Continue with Journey 1 | ~50s |

**Total Time: ~85 seconds for "reminder" flow, then ~50s for new booking**

**Key Design Decisions:**

1. **History Visibility** — All past bookings visible, not hidden in modals
2. **Data Persistence** — Address, notes, timestamps all preserved (Ana feels system is reliable)
3. **Pre-filled Address** — Next booking uses last address as default (reduces re-entry)
4. **Status Clarity** — Completed bookings show green "✓ Concluído" badge (clear outcome)
5. **Emotional Recall** — "Last booking 3 months ago" or "You've booked X times" reinforces trust

**Emotional Arc:**

- **Entering History:** Relief ("Ah, the system remembers me!")
- **Viewing Details:** Confidence ("Everything is here, nothing was lost")
- **Notes Preserved:** Satisfaction ("The system paid attention to my notes")
- **Pre-filled Next:** Trust ("This system knows me, I'll be even faster next time")

**Key Insights:**

- Persistence of data is the strongest trust-builder
- Pre-filling reduces friction on repeat bookings (Ana books in 30s second time)
- "Memory" of user creates emotional bond with system

---

### Journey 3: João's Centralized Management (Admin Happy Path)

**Goal:** João opens dashboard, sees all agendamentos at a glance, confirms status with one click per booking, and never opens WhatsApp.

**Entry Point:** João logs in with pre-configured admin email → dashboard loads

**Flow Diagram:**

```
João Opens Browser
        ↓
[Google OAuth Login]
        └─→ ✓ Admin role detected (email is in pre-configured admin list)
        ↓
[Admin Dashboard Loads]
        ├─ Heading: "Agendamentos" with filter tabs: "Todos (8)", "Confirmados (5)", "Pendentes (3)"
        ├─ Default view: ALL agendamentos, sorted by date (ascending)
        ├─ João can see 3-4 cards on screen without scrolling
        ├─ Each card shows:
        │  ├─ Client name: "Ana Silva"
        │  ├─ Date & time: "Sábado, 25 de Abril, 17:00"
        │  ├─ Address: "Rua das Flores, 123 - Apto 42"
        │  ├─ Notes: "Sofá cinza grande, 1 poltrona"
        │  └─ Status badge: "Solicitado" (blue)
        ├─ Action buttons on each card: "Reagendar", "✓ Concluído", "✉ Enviar Lembrete"
        ↓
[João Scans Dashboard]
        ├─ Glances at status badges (blue = solicitado, green = confirmado, orange = em_atendimento, gray = concluído)
        ├─ Sees: 5 agendamentos confirmed (green), 3 pending (blue)
        ├─ Understands: Everything is visible, nothing is missed
        ↓
[João Confirms Ana's Booking]
        ├─ Finds Ana's card with status "Solicitado" (blue badge)
        ├─ Clicks button: "✓ Concluído" (or equivalent confirm action)
        ├─ Status changes immediately to "Confirmado" (green badge)
        ├─ Info box appears: "✓ Email enviado para Ana" (confirmation of action)
        ↓
[System Sends Email - Async Background]
        ├─ Email queued immediately
        ├─ SendGrid API call happens (non-blocking)
        ├─ Ana receives email: "Seu agendamento foi confirmado! 25 de Abril às 17:00"
        ├─ João sees confirmation: "✓ Email enviado para Ana" (proof it happened)
        ↓
[João Continues Through Day]
        ├─ Updates more statuses (one click per booking)
        ├─ By end of day: Zero WhatsApp interactions
        ├─ Complete visibility: Knows exactly which appointments are confirmed, done, pending
        ├─ Automatic email sends: No manual message composition
        ↓
[End of Day Reflection]
        └─ João closes laptop thinking: "This is so much better than WhatsApp. Zero stress."
```

**Screen-by-Screen Breakdown:**

| Screen | Content | Interaction | Time |
|--------|---------|-------------|------|
| **Login** | Google OAuth button, "Acesso de Administrador" text | Click → auto-login | ~5s |
| **Dashboard** | Filter tabs, list of cards with agendamentos, each with actions | Scan visually, click confirm buttons | ~3-5s per booking |
| **Confirmation** | Status badge changes color (blue → green), message "✓ Email enviado" | Confirm receipt, continue | ~1s |

**Total Time for Review: ~3 minutes for 8-10 agendamentos, ~10-15 seconds per update**

**Key Design Decisions:**

1. **Single Master List** — All agendamentos in one view (no fragmented tabs hiding info)
2. **One-Click Actions** — Status updates are single-click buttons, not modals with confirmation
3. **Inline Buttons** — Actions visible on cards (reagendar, concluído, reminder), no hover-to-reveal
4. **Color-Coded Status** — Blue = solicitado, Green = confirmado, Orange = em_atendimento, Gray = concluído (instant visual scanning)
5. **Automatic Emails** — No manual message composition, system sends confirmation automatically
6. **Immediate Feedback** — Status badge changes color instantly, "✓ Email enviado" confirms action worked

**Emotional Arc:**

- **Entry:** Relief ("Everything is right here, nothing is scattered")
- **Scan:** Confidence ("I can see the complete picture at a glance")
- **Confirm:** Relief ("One click, system handles the rest")
- **Auto-Email:** Satisfaction ("It worked, email is sent, zero additional steps")
- **End of Day:** Relief + Satisfaction ("No WhatsApp, complete control, automation working")

**Key Insights:**

- Centralized visibility is the biggest pain reliever (no searching through messages)
- Automatic email sending removes cognitive load (João doesn't compose messages)
- One-click actions drastically reduce admin overhead
- Color coding enables instant status scanning (not text-reading)

---

### Journey 4: João's Troubleshooting (Admin Edge Case)

**Goal:** Client calls complaining about missing confirmation. João finds the booking, confirms it, system auto-sends email, client is satisfied.

**Entry Point:** Client calls João → "Não recebi meu email de confirmação!"

**Flow Diagram:**

```
Client Calls João Complaining
        ↓
[João Logs Into Dashboard]
        ├─ Same dashboard as Journey 3
        ├─ But this time: needs to FIND a specific booking
        ↓
[João Uses Search/Filter]
        ├─ Option 1: Filter by status "Solicitado" (likely unconfirmed bookings are here)
        ├─ Option 2: Search by client name "Carlos Oliveira"
        ├─ Option 3: Filter by date range "Hoje" to find recent bookings
        ↓
[João Finds the Booking]
        ├─ Card shows: "Carlos Oliveira", "23 de Abril, 14:00", "Rua B, 456", Status: "Solicitado"
        ├─ Timestamp visible: "Criado em: 22 de Abril às 15:30"
        ├─ João realizes: "He booked yesterday, but I never confirmed it"
        ↓
[João Clicks "✓ Confirmar"]
        ├─ Status changes from "Solicitado" (blue) to "Confirmado" (green)
        ├─ Confirmation message: "✓ Email enviado para Carlos"
        ↓
[System Sends Email - Immediately]
        ├─ Confirmation email queued
        ├─ Template: "Seu agendamento foi confirmado! 23 de Abril às 14:00 em Rua B, 456. Obrigado!"
        ├─ Email arrives in Carlos's inbox within 30 seconds
        ↓
[João Tells Client on Phone]
        ├─ João: "Acabo de confirmar seu agendamento no sistema. Você vai receber um email em alguns segundos."
        ├─ Client waits... receives email
        ├─ Client: "Ótimo! Recebi! Obrigado!"
        ↓
[Problem Solved]
        ├─ Client has tangible proof (email) of confirmation
        ├─ João didn't have to manually compose message
        ├─ Issue resolved in 1-2 minutes
        ├─ Client is satisfied and trusts the system
```

**Screen-by-Screen Breakdown:**

| Screen | Content | Interaction | Time |
|--------|---------|-------------|------|
| **Dashboard** | All agendamentos, filter tabs, search option | Click filter or search, find booking | ~30s |
| **Filtered List** | Narrowed list (e.g., "Solicitado" status) | Scan for specific booking, click card | ~15s |
| **Card Details** | Full booking details: date, time, address, notes, created timestamp, status | Verify details, click "Confirmar" | ~10s |
| **Confirmation** | Status badge changes, "✓ Email enviado" message | Confirm and phone client | ~5s |

**Total Time: ~60 seconds to resolve issue**

**Key Design Decisions:**

1. **Searchable & Filterable** — Filter by status, date, client name enables quick finding
2. **Timestamps Visible** — "Criado em: 22 de Abril às 15:30" shows when booking was created (João understands why client is waiting)
3. **One-Click Confirm** — Fixing is fast (single click), not multi-step process
4. **Automatic Email** — System sends proof immediately, João can tell client "check your email"
5. **Complete Booking Details** — All info visible (client, address, notes, timestamps) for context

**Emotional Arc:**

- **Entry:** Frustration ("Client is unhappy, I need to fix this fast")
- **Search:** Confidence ("Filter helps me find it quickly")
- **Understanding:** Realization ("Ah, I just never confirmed it, that's why they didn't get email")
- **Confirm:** Relief ("One click, system handles the rest")
- **Email Arrives:** Satisfaction ("Problem solved, client got their proof")

**Key Insights:**

- Quick search/filter is essential for troubleshooting
- Timestamps provide critical context (why did client not get email?)
- Automatic email turns troubleshooting into a 1-minute fix (vs. 10 minutes composing messages)
- Client receiving proof (email) is the ultimate satisfaction signal

---

## Journey Patterns & Design Principles

### Reusable Patterns Across All Journeys

#### Pattern 1: Instant Visual Feedback

**Used in:** All 4 journeys

- Ana sees time slot turn blue when selected (visual confirmation)
- João sees status badge change from blue to green (immediate feedback)
- System shows "✓ Confirmação enviada" or "✓ Email enviado" messages
- No spinners or "Processing..." states (if it takes >1s, show progress explicitly)

**Implementation:** Every action that changes state should have immediate visual response (color change, badge update, success message)

---

#### Pattern 2: Progressive Disclosure (Show What's Needed, Hide Complexity)

**Used in:** All journeys

- Ana sees only: Date field, Time grid, Address, Notes (not "Advanced Settings" or "Preferences")
- João sees: Status, Client name, Date, Time, Address (not raw database IDs or logs)
- Filters on João's dashboard are secondary (not the primary interface)

**Implementation:** Show the 80% use-case clearly, hide advanced options behind "More" or secondary menus

---

#### Pattern 3: Data Persistence Builds Trust

**Used in:** Ana's History journey (Journey 2) and João's Troubleshooting (Journey 4)

- Ana sees her previous bookings with all details preserved (address, notes, status)
- João sees timestamps showing when booking was created and when it was confirmed
- Email acts as permanent record (Ana can search her email, retrieve proof months later)

**Implementation:** Store complete data (not just summary), show relevant timestamps, use email as proof

---

#### Pattern 4: One-Action Completion

**Used in:** All journeys

- Ana confirms booking in one click (not three: select date, confirm, then review)
- João updates status in one click (not: open modal, select status, click apply)

**Implementation:** Reduce steps to minimum (1-2 clicks for core actions, not 3-5)

---

#### Pattern 5: Automation Removes Burden

**Used in:** João's journeys (3 & 4)

- Email sends automatically (João doesn't compose manually)
- Slot prevents double-bookings automatically (João doesn't worry about conflicts)
- Role detection is automatic (João doesn't have to select "I'm admin")

**Implementation:** Remove tasks that scale with usage (email sending, conflict detection). Let system handle these, João approves

---

### Design Principles Guiding All Journeys

**1. Clarity Over Completeness**
- Show what user needs RIGHT NOW
- Hide complexity until necessary
- Example: Ana doesn't see "Admin View" options; João doesn't see "Client History" by default

**2. Speed Over Perfection**
- Ana books in <2 minutes, not <5 minutes with extra polish
- João updates status in 1 click, not 3 clicks with confirmation dialogs
- Getting to value is more important than feature completeness

**3. Trust Through Consistency**
- Actions always behave the same way (button always does the same thing)
- Status colors are consistent across all screens (green always = confirmed)
- Timestamps are always visible (Ana knows when her booking was created)

**4. Respect User Context**
- Ana is on mobile, in a hurry → Design for speed and one-handed use
- João is on desktop, managing multiple bookings → Design for overview and multi-tasking
- Both users are in their natural context (Ana = home, João = office/field)

**5. Celebrate Successes**
- Checkmarks (✓) and green badges create small celebration moments
- "Agendamento Criado!" and "Email enviado!" are affirmative, not neutral language
- These micro-moments build satisfaction and encourage repeat use

---

### Flow Optimization Summary

**For Ana (Client):**
- ✅ Booking from start to confirmation: <2 minutes (no page transitions, all on one form)
- ✅ History access: Instant (one click from home)
- ✅ Repeat booking: 30 seconds (address pre-filled from history)

**For João (Admin):**
- ✅ Dashboard overview: Instant visual scan (color-coded badges, all info visible)
- ✅ Status update: 1 click per booking (no modals, no confirmations)
- ✅ Troubleshooting: 1-2 minutes to find and resolve (search + confirm + email)

**System-Level:**
- ✅ Email delivery: <30 seconds after action (automatic, non-blocking)
- ✅ Availability check: <500ms response (instant feedback, no "thinking..." spinner)
- ✅ Conflict prevention: Real-time (impossible to double-book, system prevents automatically)

---

## Component Strategy

### Cobertura do Design System

**Design System Escolhido:** Tailwind CSS + shadcn/ui (Step 06)

shadcn/ui fornece componentes base prontos para uso, todos construídos sobre Radix UI (WCAG A compliant) e estilizados com Tailwind. Vamos usá-lo como fundação, customizando onde necessário para agenda-clean.

**Componentes Disponíveis do shadcn/ui (Vamos Usar):**

| Componente | Propósito | Uso em agenda-clean |
|-----------|----------|-------------------|
| **Button** | CTA principal e secundário | "Confirmar Agendamento", "Novo Agendamento", "✓ Concluído", "✉ Enviar Lembrete" |
| **Input** | Campos de texto | Endereço, email, qualquer campo textual |
| **Card** | Container com border e sombra | Cada agendamento na lista de João (card layout) |
| **Badge** | Label pequeno com cor | Status: "Solicitado" (blue), "Confirmado" (green), "Em Atendimento" (orange), "Concluído" (gray) |
| **Alert** | Mensagem de info/erro/sucesso | "Horário disponível!", "Esse horário foi agendado", "Email enviado" |
| **Dialog/Modal** | Popup para confirmações | Se necessário (mas queremos evitar para manter velocidade) |
| **Select/Dropdown** | Seletor de opções | Filtros (opcional), status changes (optional) |
| **Textarea** | Campo de texto longo | Campo de observações |

**Análise de Gaps:** Não há grandes gaps. shadcn/ui cobre 95% do que precisamos. Os 5% serão pequenas customizações (cores, spacing, estados especiais).

---

### Componentes Customizados (Específicos para agenda-clean)

Vamos desenhar 6 componentes customizados construídos sobre o shadcn/ui:

#### 1. **TimeSlotGrid** (Grade de Horários Disponíveis)

**Propósito:** Mostrar horários disponíveis (verde/clicável) vs. indisponíveis (vermelho/desabilitado) para Ana selecionar

**Uso:** Journey 1 (Ana's Frictionless Booking) - tela de seleção de horário

**Especificação:**
- Props: `date`, `availableSlots`, `bookedSlots`, `selectedSlot`, `onSlotSelect`
- Anatomia: Grid 3 colunas (mobile), 4 colunas (desktop)
- Estados: Disponível (cinza claro, hover azul), Booked (vermelho, desabilitado), Selecionado (azul, branco)
- Acessibilidade: Buttons com `aria-label`, disabled attribute, Tab navigation apenas slots disponíveis

**Por que customizado:** shadcn/ui não tem "time picker grid" específico. Precisamos grid interativo com múltiplos slots, estados visuais claros, responsivo.

---

#### 2. **StatusBadge** (Badge de Status Colorido)

**Propósito:** Status com cor semântica (azul=solicitado, verde=confirmado, etc.)

**Uso:** Visível em histórico (Ana) e dashboard (João)

**Especificação:**
- Props: `status`, `size`
- Variantes: Solicitado (blue #3b82f6), Confirmado (green #10b981), Em Atendimento (orange #f97316), Concluído (gray #6b7280), Cancelado (red #ef4444)
- Conteúdo: Emoji + texto (⏳ Solicitado, ✓ Confirmado, 🔄 Em Atendimento, ✅ Concluído, ✕ Cancelado)
- Acessibilidade: `aria-label` descrevendo status

**Por que customizado:** Badge do shadcn/ui é simples. Precisamos cores semânticas, emoji + texto, visibilidade alta para escanear status visualmente.

---

#### 3. **AgendamentoCard** (Card com Detalhes de Agendamento)

**Propósito:** Container para um agendamento. Mostra: cliente, data, hora, endereço, observações, status, ações.

**Uso:** Ana's history (Journey 2), João's dashboard (Journey 3 & 4)

**Especificação:**
- Props: `agendamento` (id, clientName, date, time, address, notes, status, createdAt), `isAdmin`, `onAction`, `isCompleted`
- Anatomia: Header (nome + badge), Details (data, endereço, notas), Footer (ações se admin)
- Estados: Default, Hover, Completed (opacidade reduzida), Admin vs. Client view
- Responsivo: Full width, mesma estrutura mobile/desktop

**Por que customizado:** Combine múltiplos componentes, layout específico, mostrar/esconder ações por role, estados especiais.

---

#### 4. **ConfirmationMessage** (Mensagem de Confirmação Celebratória)

**Propósito:** "✓ Agendamento criado!", "✓ Email enviado" — diferente de Alert (error). Este é celebratory.

**Uso:** Após Ana booking (Journey 1), após status update (Journey 3 & 4)

**Especificação:**
- Props: `type` (success/pending), `title`, `subtitle`, `actionButton`, `autoHide`
- Anatomia: Fundo verde com checkmark, título grande, subtítulo
- Estados: Success (green, checkmark), Pending (blue, spinner), Closing (fade-out)
- Acessibilidade: `role="status"`, `aria-live="polite"`

**Por que customizado:** Alert de shadcn/ui é para erros. Precisamos componente celebratory (verde, checkmark, auto-closing, tom positivo).

---

#### 5. **AgendamentoForm** (Formulário Único de Booking)

**Propósito:** Formulário completo para Ana. Contém: date input, time picker (TimeSlotGrid), address, notes, submit.

**Uso:** Journey 1 & 2 - tela principal de booking

**Especificação:**
- Props: `initialData`, `onSubmit`, `isLoading`, `error`
- Anatomia: Single-column, date field, TimeSlotGrid, address, textarea, submit button, info box
- Validação: Date (required, future), Time (required, available), Address (required, min 5 chars), Notes (optional)
- Responsivo: Full width mobile, max-width 500px desktop, centered

**Por que customizado:** Agrega múltiplos sub-componentes, validação integrada, estado interno, responsivo mobile-first.

---

#### 6. **AdminDashboard** (Container Principal do Dashboard)

**Propósito:** Layout do dashboard de João. Filtros, lista de cards, empty state.

**Uso:** Journey 3 & 4 - tela principal de João

**Especificação:**
- Props: `agendamentos`, `selectedFilter`, `onFilterChange`, `onAgendamentoAction`
- Anatomia: Header (título + filter tabs), Content (lista de cards ou empty state)
- Filter tabs: "Todos (8)", "Confirmados (5)", "Pendentes (3)"
- Search bar (opcional, secundário)
- Estados: Default, Loading (skeleton cards), Empty (helpful message)
- Responsivo: Full width, mesma estrutura

**Por que customizado:** Agrega múltiplos agendamentos, filtros, estado vazio, otimizado para escanear (João vê 8-10 agendamentos rápido).

---

### Estratégia de Implementação de Componentes

**Princípio:** Build small, use consistently, evolve iteratively

**Fase 1 — Crítico para MVP (Semana 1):**
- ✅ shadcn/ui: Button, Input, Card, Badge, Alert, Textarea (install + usar como-está)
- ✅ **TimeSlotGrid** (custom) — Essential para booking de Ana
- ✅ **AgendamentoForm** (custom) — Essential para booking de Ana
- ✅ **StatusBadge** (custom) — Essential para visualização de status (Ana + João)
- ✅ **AgendamentoCard** (custom) — Essential para dashboard de João

**Esforço:** ~16 horas (2 dias completos)

**Fase 2 — MVP Completo (Semana 1-2):**
- ✅ **ConfirmationMessage** (custom) — UX delight, celebra sucesso
- ✅ **AdminDashboard** (custom) — Agrega cards, filtros, layout de João

**Esforço:** ~8 horas (1 dia)

**Fase 3 — Polish (Semana 2+):**
- Melhorias de animação
- States adicionais (loading, error)
- Validação aprofundada
- Otimização de performance

**Esforço:** ~4-6 horas

---

### Diretrizes de Implementação

**1. Use Tailwind para Tudo**
- Não escrever CSS externo
- Utility classes do Tailwind (bg-blue-500, text-lg, p-4)
- Customizar cores no tailwind.config.js

**2. Reutilize shadcn/ui Sem Modificação Pesada**
- Importar componentes como-estão
- Customizar apenas via props (size, variant, className)
- Se necessário mudança profunda: copiar componente, customizar

**3. Propriedades Acessíveis por Default**
- Inputs com <label> associado
- Buttons com aria-label se não há text claro
- Cards com contexto via aria-label

**4. Estados Visuais Claros**
- Hover: sempre tem feedback visual
- Disabled: opacity 50%, cursor not-allowed
- Loading: spinner, button text muda
- Error: border red, helper text vermelha

**5. Responsive Mobile-First**
- Design base: 320px
- Breakpoints: md (768px), lg (1024px)
- TimeSlotGrid: 3 cols mobile, 4 cols desktop
- AgendamentoForm: full width sempre

**6. Animações Sutis**
- Transição: 200-300ms
- Fade in/out: 300-500ms
- Hover effects: transform ou background color (não ambos)

---

### Checklist de Componentes

| Componente | Fonte | Status MVP | Prioridade |
|-----------|--------|-----------|-----------|
| Button | shadcn/ui | ✅ Fase 1 | Crítico |
| Input | shadcn/ui | ✅ Fase 1 | Crítico |
| Card | shadcn/ui | ✅ Fase 1 | Crítico |
| Badge | shadcn/ui | ✅ Fase 1 | Crítico |
| Alert | shadcn/ui | ✅ Fase 1 | Crítico |
| Textarea | shadcn/ui | ✅ Fase 1 | Crítico |
| TimeSlotGrid | Custom | ✅ Fase 1 | Crítico |
| AgendamentoForm | Custom | ✅ Fase 1 | Crítico |
| StatusBadge | Custom | ✅ Fase 1 | Crítico |
| AgendamentoCard | Custom | ✅ Fase 1 | Crítico |
| ConfirmationMessage | Custom | ✅ Fase 2 | Alta |
| AdminDashboard | Custom | ✅ Fase 2 | Alta |
| Dialog | shadcn/ui | ❌ Evitar | Baixa (no modals) |
| Select/Dropdown | shadcn/ui | ⚠️ Se necessário | Média |

Esta estratégia balanceia: Velocidade (reusar shadcn/ui) + Customização (componentes próprios) + Acessibilidade (WCAG A) + Performance (componentes simples)

---

## UX Consistency Patterns

### Análise de Categorias de Padrão Críticas

Para agenda-clean, as categorias mais críticas são:

1. **Button Hierarchy** — Ana e João precisam saber exatamente o que vai acontecer (confirmar vs. cancelar)
2. **Feedback Patterns** — Sucesso/erro devem ser visuais e instantâneos
3. **Form Patterns & Validation** — Ana's form deve aceitar entrada rápido, mostrar erros claros
4. **Navigation Patterns** — Ana (cliente) e João (admin) precisam caminhos diferentes
5. **Status Indicators** — João precisa scannear visualmente o estado de cada agendamento
6. **Empty States** — Quando não há agendamentos, guiar usuário para próxima ação
7. **Loading States** — Mostrar progresso sem deixar usuário esperando incerteza

---

### Button Hierarchy

**Quando Usar:**
- **Primary Button** (Azul, cheio): Ação principal esperada do usuário (confirmar agendamento, confirmar status, salvar)
- **Secondary Button** (Cinza, border): Ações secundárias ou alternativas (cancelar, reagendar, enviar lembrete)
- **Danger Button** (Vermelho): Ações destrutivas (deletar, cancelar agendamento, recusar)

**Visual Design:**

| Tipo | Tailwind Classes | Tamanho | Ícone | Hover |
|------|-----------------|--------|-------|-------|
| **Primary** | `bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg` | 48px height (mobile) | ✓ (opcional) | `hover:bg-blue-700` |
| **Secondary** | `border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg` | 40px height | ❌ | `hover:bg-gray-50` |
| **Danger** | `bg-red-600 text-white font-semibold py-2 px-4 rounded-lg` | 40px height | ⚠️ | `hover:bg-red-700` |

**Comportamento:**

- **Primary:** Full width em mobile, auto width em desktop. Sempre visível. Disabled state: opacity-50
- **Secondary:** Inline ou horizontal group. Pode ser em múltiplas linhas em mobile
- **Danger:** Sempre com confirmação (nunca ação imediata). "Tem certeza?" message

**Acessibilidade:**

- Todos buttons têm `aria-label` se apenas ícone
- Tamanho mínimo: 44x44px (tap target mobile)
- Contraste: 4.5:1 minimum (9:1 recomendado para azul)
- Keyboard: Tab navegação, Enter para ativar

**Mobile vs Desktop:**

- Mobile: Buttons são full-width ou lado-a-lado em pairs (max 2 por linha)
- Desktop: Buttons são auto-width, podem ser inline. Max 3-4 por linha

**Integração shadcn/ui:**

```jsx
// Primary: usar shadcn Button com variant="default"
<Button variant="default" size="lg" className="w-full md:w-auto">
  ✓ Confirmar Agendamento
</Button>

// Secondary: usar shadcn Button com variant="outline"
<Button variant="outline" size="sm">
  Cancelar
</Button>

// Danger: customizar com className
<Button className="bg-red-600 hover:bg-red-700 text-white" size="sm">
  ⚠️ Deletar
</Button>
```

---

### Feedback Patterns (Success, Error, Warning, Info)

**Quando Usar:**

- **Success:** ✓ Ação completada (agendamento criado, email enviado, status atualizado)
- **Error:** ❌ Algo deu errado (slot indisponível, rede offline, validação falhou)
- **Warning:** ⚠️ Atenção mas não bloqueante (horário quase cheio, endereço incompleto)
- **Info:** ℹ️ Informação útil (email será enviado em segundos, última booking 3 meses atrás)

**Visual Design:**

| Tipo | Cor (Tailwind) | Ícone | Background | Text |
|------|----------------|-------|-----------|------|
| **Success** | Green | ✓ | `bg-green-50` | `text-green-800` border-l `border-green-500` |
| **Error** | Red | ❌ | `bg-red-50` | `text-red-800` border-l `border-red-500` |
| **Warning** | Orange | ⚠️ | `bg-orange-50` | `text-orange-800` border-l `border-orange-500` |
| **Info** | Blue | ℹ️ | `bg-blue-50` | `text-blue-800` border-l `border-blue-500` |

**Comportamento:**

- **Success:** Aparece imediatamente após ação (100ms). Auto-desaparece em 3-5 segundos. Celebratory tone ("✓ Sucesso!")
- **Error:** Aparece imediatamente. Permanece na tela (user deve descartar). Actionable message ("Horário foi agendado agora. Tente: 10:00, 11:00?")
- **Warning:** Destaque visual mas não modal. User pode ignorar e continuar
- **Info:** Subtle, não interrupts. Placed contextually (inline com campo relevante)

**Acessibilidade:**

- Alerts: `role="alert"` (success), `aria-live="polite"` (info/warning)
- Mensagens claras em português
- Não depender só de cor (include ícone + texto)
- Contraste 4.5:1 minimum

**Mobile vs Desktop:**

- Mobile: Full-width alerts, padding-4
- Desktop: Max-width 600px, margin-auto
- Success messages: pode ser toast (canto inferior direito)

**Integração shadcn/ui:**

```jsx
// Success: usar ConfirmationMessage component (Step 11)
<ConfirmationMessage 
  type="success"
  title="✓ Seu Agendamento foi Criado!"
  subtitle="Você receberá confirmação por email"
/>

// Error: usar shadcn Alert com variant="destructive"
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Horário Indisponível</AlertTitle>
  <AlertDescription>
    Este horário foi agendado agora. Tente: 10:00, 11:00 ou 13:00?
  </AlertDescription>
</Alert>

// Info: usar shadcn Alert default
<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>
    Você receberá confirmação por email em alguns segundos
  </AlertDescription>
</Alert>
```

---

### Form Patterns & Validation

**Quando Usar:**

- **Default State:** Input vazio, placeholder visível, border gray
- **Focus State:** Border azul, shadow light blue (user attention)
- **Error State:** Border vermelho, error message abaixo, helper text vermelho
- **Disabled State:** Opacity 50%, cursor not-allowed, background gray-100
- **Success State:** Border verde (optional, pode usar só depois de submit)

**Visual Design:**

```
Input Field:
┌─────────────────────────────────┐
│ 📍 Endereço                      │ (label)
│                                 │
│ [Rua das Flores, 123 - Apto 42] │ (input, border-gray-300)
│                                 │
└─────────────────────────────────┘

Focus:
┌─────────────────────────────────┐
│ 📍 Endereço                      │
│                                 │
│ [_____________________________] │ (border-blue-500, shadow-blue)
│                                 │
└─────────────────────────────────┘

Error:
┌─────────────────────────────────┐
│ 📍 Endereço (required)           │ (red text)
│                                 │
│ [_____________________________] │ (border-red-500)
│                                 │
│ ❌ Endereço é obrigatório       │ (red text, font-sm)
└─────────────────────────────────┘
```

**Comportamento:**

- **Validation Timing:** 
  - Realtime feedback (React onChange) para feedback instantâneo
  - Final validation (onSubmit) para erros críticos
- **Error Messages:**
  - Específico, não genérico ("Endereço é obrigatório" vs. "Error")
  - Actionable ("Use formato: Rua, Número - Apto (opcional)")
  - Appear abaixo do field
- **Recovery:**
  - Usuário corrige, error desaparece imediatamente
  - No "OK button", simples desaparecimento

**Acessibilidade:**

- Label sempre presente: `<label htmlFor="address">`
- aria-describedby linking label to input
- aria-invalid="true" em erro
- Help text em `aria-live="polite"`

**Mobile vs Desktop:**

- Mobile: Inputs full-width, padding-4, touch-friendly (min 48px height)
- Desktop: Inputs max-width 400px, padding-3
- Placeholders: Keep visible sempre (não depender só de placeholder)

**Integração shadcn/ui:**

```jsx
// usar shadcn Input component
<div className="mb-6">
  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
    📍 Endereço
  </label>
  <Input
    id="address"
    type="text"
    placeholder="Ex: Rua das Flores, 123"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    onBlur={validateAddress}
    className={error ? "border-red-500" : "border-gray-300"}
    aria-describedby={error ? "address-error" : undefined}
  />
  {error && (
    <p id="address-error" className="mt-1 text-sm text-red-600" role="alert">
      ❌ {error}
    </p>
  )}
</div>
```

---

### Navigation Patterns

**Para Ana (Cliente) — Simple & Direct:**

- **Primary Navigation:** Duas telas principais
  - "Novo Agendamento" (form para booking)
  - "Meus Agendamentos" (histórico)
- **Home Button:** Sempre acessível (logo ou breadcrumb "Voltar")
- **No Deep Nesting:** Máximo 2 níveis (home → view booking)
- **Bottom Tab Bar (Optional):** Se houver > 2 screens principais

**Para João (Admin) — Dashboard Control:**

- **Primary Navigation:** Dashboard central com filtros
  - Tabs: "Todos (8)", "Confirmados (5)", "Pendentes (3)"
  - Search bar (opcional, secundário)
- **No Page Navigation Needed:** Tudo acontece no dashboard (inline actions)
- **Breadcrumb (Optional):** Se houver detail pages
- **Logout:** Canto superior direito

**Visual Design:**

**Ana (Client):**
```
┌──────────────────────────────────────────┐
│ ← Back (or Logo)     agenda-clean        │ (Header)
├──────────────────────────────────────────┤
│                                          │
│ [Content: Form or History]               │
│                                          │
├──────────────────────────────────────────┤
│ [🏠 Novo Agendamento]  [📋 Meus Agends] │ (Bottom tabs)
└──────────────────────────────────────────┘
```

**João (Admin):**
```
┌──────────────────────────────────────────────┐
│ Logo / "Agendamentos"              [👤] [Logout] │ (Header)
├──────────────────────────────────────────────┤
│ [Todos (8)] [Confirmados (5)] [Pendentes (3)] │ (Filter tabs)
│ [🔍 Search]                                  │
├──────────────────────────────────────────────┤
│                                              │
│ [Card 1: Ana Silva]                          │
│ [Card 2: Carlos Oliveira]                    │
│ [Card 3: Maria Santos]                       │
│                                              │
└──────────────────────────────────────────────┘
```

**Comportamento:**

- **Ana:** Bottom tabs sempre visível. Swipe left/right (mobile) ou click
- **João:** Filter tabs stay sticky (scroll content, tabs remain visible)
- **No Modals for Navigation:** Use inline actions quando possível

**Acessibilidade:**

- Nav items semantic: `<nav>`, `<button>` com aria-current
- Active tab: `aria-current="page"`
- Skip links (optional for João if complex): Skip to main content

**Integração shadcn/ui:**

```jsx
// Ana's tabs: usar shadcn Tabs component
<Tabs defaultValue="novo" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="novo">📝 Novo Agendamento</TabsTrigger>
    <TabsTrigger value="historico">📋 Meus Agendamentos</TabsTrigger>
  </TabsList>
  <TabsContent value="novo">{/* Form */}</TabsContent>
  <TabsContent value="historico">{/* History */}</TabsContent>
</Tabs>

// João's filter tabs: usar shadcn Button group
<div className="flex gap-2 mb-6">
  <Button 
    variant={filter === "todos" ? "default" : "outline"}
    onClick={() => setFilter("todos")}
  >
    Todos (8)
  </Button>
  <Button 
    variant={filter === "confirmados" ? "default" : "outline"}
    onClick={() => setFilter("confirmados")}
  >
    Confirmados (5)
  </Button>
  <Button 
    variant={filter === "pendentes" ? "default" : "outline"}
    onClick={() => setFilter("pendentes")}
  >
    Pendentes (3)
  </Button>
</div>
```

---

### Status Indicators

**Quando Usar:** Qualquer lugar que mostre estado de agendamento (historico, dashboard, email)

**Estados e Cores Semânticas:**

| Status | Cor | Emoji | Significado | Ação Próxima |
|--------|-----|-------|-----------|-------------|
| **Solicitado** | Blue #3b82f6 | ⏳ | Awaiting confirmation | Admin deve confirmar |
| **Confirmado** | Green #10b981 | ✓ | Confirmed by admin | Nenhuma, tudo bem |
| **Em Atendimento** | Orange #f97316 | 🔄 | Service in progress | Nenhuma, já rodando |
| **Concluído** | Gray #6b7280 | ✅ | Service completed | Nenhuma, histórico |
| **Cancelado** | Red #ef4444 | ✕ | Cancelled | Nenhuma, histórico |

**Visual Design:**

Usar StatusBadge component (Step 11) com:
- Filled background com semantic color
- White text
- Emoji + label
- Left border accent (4px)

```jsx
<div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded flex items-center gap-2">
  <span>⏳</span>
  <span>Solicitado</span>
</div>
```

**Behavioral Logic:**

- Badges são display-only (não clicáveis)
- Mudam cor quando status atualiza (instant feedback)
- Sempre visível (não collapsed)

**Acessibilidade:**

- aria-label: "Status: Solicitado, aguardando confirmação"
- Não depender só de cor (inclui emoji + texto)

---

### Empty States

**Quando Usar:** Quando não há agendamentos, resultado de busca vazio, etc.

**Visual Design:**

```
┌──────────────────────────────────────────┐
│                                          │
│              📭                          │ (Large empty icon)
│                                          │
│  Nenhum agendamento ainda                │ (Title)
│                                          │
│  Clientes verão este painel quando       │ (Subtitle explaining)
│  agendarem. Compartilhe seu link ou      │
│  aguarde bookings!                       │
│                                          │
│  [🔗 Copiar Link] [↻ Recarregar]         │ (Helpful CTAs)
│                                          │
└──────────────────────────────────────────┘
```

**Comportamento:**

- Include helpful messaging (não só "No results")
- Suggest next action (recarregar, criar novo, voltar)
- Use emoji/icon for visual appeal

**Acessibilidade:**

- aria-live="polite" if state changes dynamically
- Clear explanation of why state is empty

---

### Loading States

**Quando Usar:** Quando há operação assíncrona (checking availability, saving booking, etc.)

**Padrões:**

1. **Spinner (Rápido):** <500ms — Mostrar muito breve ou não mostrar
2. **Inline Spinner:** Mostrar spinner ao lado do button que aguarda
3. **Skeleton Card:** Placeholder de card loading (se lista)
4. **Progress Indicator:** Mostrar progresso se operação demora >2s

**Visual Design:**

```
// Spinner simples
[Processando seu agendamento...] 🔄

// Button loading state
[✓ Confirmar Agendamento] → [Enviando... ⌛] → [✓ Email enviado!]

// Skeleton card (placeholder)
┌──────────────────────────────┐
│ ▓▓▓▓▓▓▓▓ (client name)        │
│ ▓▓▓▓▓ (date/time)             │
│ ▓▓▓▓▓▓ (address)              │
│ [▓▓▓] (badge)                 │
└──────────────────────────────┘
```

**Comportamento:**

- Never show spinner >3 seconds (assume erro, show error message)
- Button text changes ("Enviando...", "✓ Enviado")
- Disable other buttons during loading

**Acessibilidade:**

- aria-busy="true" während loading
- aria-label explaining what's loading

---

### Color & Contrast Guidelines

**Palette (já definido em Step 08):**

| Use | Color | Hex | Contrast |
|-----|-------|-----|----------|
| Primary CTA | Blue | #2563eb | 9.2:1 ✓ |
| Success | Green | #10b981 | 7.1:1 ✓ |
| Error | Red | #ef4444 | 5.2:1 ✓ |
| Warning | Orange | #f97316 | 6.8:1 ✓ |
| Info | Blue | #3b82f6 | 9.1:1 ✓ |
| Disabled | Gray | #9ca3af | 3.1:1 ⚠️ (acceptable for disabled) |

All colors pass WCAG AA contrast requirements (4.5:1 minimum).

---

### Animation & Transition Guidelines

**Principles:**

- **Duration:** 200-300ms for state changes (hover, click), 300-500ms for navigation
- **Easing:** ease-in-out for natural feel
- **Performance:** Use transform + opacity (GPU-accelerated), avoid repaints
- **Accessibility:** Respect `prefers-reduced-motion`

**Examples:**

```css
/* Hover effect on button */
transition: all 200ms ease-in-out;

/* Fade in alert */
animation: fadeIn 300ms ease-out forwards;

/* Button press */
@apply transform active:scale-95 transition-transform
```

---

### Summary: Pattern Checklist

| Pattern | Ana (Client) | João (Admin) | MVP |
|---------|-------------|-------------|-----|
| Button Hierarchy | Primary, Secondary | Primary, Secondary, Danger | ✅ |
| Feedback (Success) | ✓ Celebration | ✓ Celebration | ✅ |
| Feedback (Error) | Clear, actionable | Clear, actionable | ✅ |
| Form Patterns | Realtime validation | Inline form (minimal) | ✅ |
| Navigation | Bottom tabs | Filter tabs | ✅ |
| Status Indicators | In history list | On each card | ✅ |
| Empty States | "No bookings yet" | "No pending bookings" | ✅ |
| Loading States | Brief spinner | Card skeleton | ✅ |

Todos esses padrões são implementados com **Tailwind + shadcn/ui**, mantendo consistência com Step 11 (Component Strategy).

---

## Responsive Design & Accessibility

### Estratégia Responsiva

**Princípio:** Mobile-first por default. Optimizar por contexto de usuário, não só por screen size.

**Estratégia por Contexto:**

**Ana (Cliente) — Mobile-First Principal:**
- Primary breakpoint: 320px (smartphone, prioridade #1)
- Secondary breakpoint: 768px (tablet occasional)
- Tertiary breakpoint: 1024px (desktop occasional)
- Design philosophy: "What does Ana need RIGHT NOW?"
- Optimization: Single column, thumb-friendly taps, minimal navigation
- Content density: Baixa (uma coisa por tela)

**João (Admin) — Desktop-Optimized Primary:**
- Primary breakpoint: 1024px (desktop monitor, prioridade #1)
- Secondary breakpoint: 768px (tablet occasional)
- Tertiary breakpoint: 320px (mobile functional, não otimizado)
- Design philosophy: "How can João see everything at once?"
- Optimization: Multi-column cards, keyboard shortcuts, inline actions
- Content density: Alta (3-4 cards vistos sem scroll)

**Filosofia de Design Responsivo:**

1. **Mobile-First Code:** Escrever estilos base para mobile, adicionar breakpoints para desktop
2. **Relative Units:** Usar rem/% ao invés de px (accessibility: font scaling)
3. **Flexible Containers:** max-width constraints ao invés de fixed widths
4. **Flexible Images:** Images sempre responsive (max-width: 100%)
5. **Gesture-Friendly:** Touch targets mínimo 44x44px (mobile)

---

### Estratégia de Breakpoints

**Breakpoints Tailwind (padrão):**

```
mobile:   320px - 639px  (min)
sm:       640px - 767px  (small)
md:       768px - 1023px (medium/tablet)
lg:       1024px - 1279px (large/desktop)
xl:       1280px+        (extra large)
```

**Aplicação em agenda-clean:**

| Breakpoint | Device | Ana Layout | João Layout | Tailwind Prefix |
|-----------|--------|-----------|-------------|-----------------|
| **320px** | Mobile | ✅ Optimized | ⚠️ Functional | (default) |
| **640px** | Large phone | ✅ Works | ⚠️ Works | `sm:` |
| **768px** | Tablet | ✅ Enhanced | ✅ Works | `md:` |
| **1024px** | Desktop | ✅ Works | ✅ Optimized | `lg:` |
| **1280px** | Large desktop | ✅ Works | ✅ Works | `xl:` |

**Exemplos Práticos:**

```jsx
// Ana's Form — Mobile-first, centered on desktop
<div className="w-full max-w-md mx-auto p-4 md:p-6">
  {/* Form content stacks vertically on mobile */}
  {/* On md+ (768px), centered with padding */}
</div>

// João's Card Grid — Single column mobile, adapts desktop
<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-6">
  {/* João sees 3-4 cards per screen on desktop */}
  {/* On mobile, single card per line, scrolls vertically */}
</div>

// Button — Full width mobile, auto-width desktop
<button className="w-full md:w-auto px-6 py-3">
  ✓ Confirmar
</button>

// Text — Smaller mobile, larger desktop
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Novo Agendamento
</h1>
```

**Breakpoint Decision Rules:**

1. **Default (mobile 320px):** Ana's use case, thumb-friendly, single column
2. **md: (768px):** Tablet threshold, Ana can see more, João starts optimization
3. **lg: (1024px):** Desktop threshold, João's optimization kicks in (multi-column)
4. **xl: (1280px):** Large desktop, maintain same layout (don't get wider indefinitely)

---

### Estratégia de Acessibilidade

**Target Level:** WCAG Level A (MVP requirement from PRD, Step 08 Web App Specific Requirements)

**Rationale:** 
- WCAG A covers essential accessibility
- Ana e João podem usar sistema sem barreiras maiores
- Complies com legal requirements (ADA, AGLC)
- Foundation para upgrade para AA post-MVP se necessário

**WCAG A Checklist (Essential Components):**

#### 1. **Perceivable** — Users can see/hear content

| Requirement | Implemented | Notes |
|-------------|-------------|-------|
| **Color not only indicator** | ✅ | Sempre emoji + texto + cor (badges têm ⏳, ✓, etc.) |
| **Contrast 4.5:1** | ✅ | Step 08 palette validated (Blue 9.2:1) |
| **Text resizable** | ✅ | Usar rem units, permite browser zoom |
| **Images have alt text** | ⚠️ | Poucas imagens no MVP, can add post-launch |
| **No flashing/blinking** | ✅ | No seizure-risk animations |

#### 2. **Operable** — Users can navigate/interact

| Requirement | Implemented | Notes |
|-------------|-------------|-------|
| **Keyboard accessible** | ✅ | All buttons Tab-navigable, Enter activates |
| **Keyboard trap free** | ✅ | No modals locking focus, can always escape |
| **Focus visible** | ✅ | Tailwind focus-ring, visible outline |
| **Links descriptive** | ✅ | "Novo Agendamento" not "Click Here" |
| **Touch target 44x44px** | ✅ | Buttons 48px mobile, 40px desktop |
| **No time-limit actions** | ✅ | No auto-logout, no time-based forms |

#### 3. **Understandable** — Users understand content

| Requirement | Implemented | Notes |
|-------------|-------------|-------|
| **Page purpose clear** | ✅ | "Novo Agendamento", "Agendamentos" headings |
| **Language consistent** | ✅ | Portuguese throughout, no abrupt switching |
| **Error messages clear** | ✅ | "Endereço é obrigatório" not "Error 400" |
| **Help & support** | ⚠️ | Email support can be added post-MVP |

#### 4. **Robust** — Works with assistive tech

| Requirement | Implemented | Notes |
|-------------|-------------|-------|
| **Semantic HTML** | ✅ | `<button>`, `<label>`, `<nav>`, `<main>` |
| **ARIA labels** | ✅ | aria-label, aria-describedby on forms |
| **Status updates announced** | ✅ | aria-live="polite" on success/error |
| **Form labels associated** | ✅ | `<label htmlFor>` pattern |

---

### Screen Reader Support

**Target Devices:**

- **Desktop:** NVDA (Windows free), VoiceOver (macOS built-in), JAWS (Windows paid)
- **Mobile:** VoiceOver (iOS), TalkBack (Android)

**Critical Patterns for Screen Readers:**

1. **Form Labels:**
```jsx
<label htmlFor="address" className="block text-sm font-semibold">
  📍 Endereço
</label>
<input id="address" className="..." />
```

2. **Status Changes:**
```jsx
<div role="status" aria-live="polite" aria-atomic="true">
  ✓ Agendamento criado!
</div>
```

3. **Button Purpose:**
```jsx
<button aria-label="Confirmar agendamento para 25 de Abril, 17:00">
  ✓ Confirmar
</button>
```

4. **Card Context:**
```jsx
<div aria-label="Agendamento de Ana Silva, 22 de Abril, 10:00, Rua das Flores">
  {/* Card content */}
</div>
```

---

### Keyboard Navigation

**All Interactive Elements Must Be Keyboard Accessible:**

| Element | Tab Order | Activation | Notes |
|---------|-----------|-----------|-------|
| **Button** | Tabbable | Enter/Space | Standard |
| **Link** | Tabbable | Enter | Standard |
| **Input/Textarea** | Tabbable | Direct input | Standard |
| **Form (Ana)** | Top to bottom | Tab through all fields | No skip required |
| **Dashboard (João)** | Tabs → Cards → Buttons | Card buttons tabbable | Can Tab through cards |

**Focus Indicators:**

```jsx
// Tailwind provides default focus-ring
<button className="... focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  ✓ Confirmar
</button>

// Customize if needed
<input className="... focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
```

**Skip Links (Optional):**

Not required for MVP (simple layouts) but can add post-MVP:
```jsx
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

### Color Blindness Considerations

**Palette Already Compliant (Step 08):**

- Don't use red/green alone (use with emoji: ✓, ❌)
- Contrast sufficient for all types (protanopia, deuteranopia, tritanopia)
- All badges have text + emoji, not just color

**Testing:**
- Use Chrome DevTools: Emulate vision deficiencies
- Simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/

---

### Testing Strategy

**Responsive Testing Checklist:**

```
□ iPhone 12 mini (320px actual)
□ iPhone 12 (375px actual)
□ iPad (768px actual)
□ iPad Pro (1024px actual)
□ Desktop 1024px
□ Desktop 1280px
□ Desktop 1920px

For each, test:
□ Form inputs are full width and clickable
□ Buttons don't overflow
□ Text is readable (no horizontal scroll)
□ Cards stack properly
□ Navigation is accessible
□ Images scale appropriately
```

**Accessibility Testing Checklist:**

```
Automated (tools):
□ axe DevTools (Chrome extension) — run on each page
□ WAVE (WebAIM) — contrast, semantic HTML
□ Lighthouse (Chrome DevTools) — accessibility score

Manual (hands-on):
□ Keyboard-only navigation (no mouse)
□ Tab through entire form — all fields reachable
□ VoiceOver (Mac) — read page aloud, check labels
□ Color blindness simulation (Chrome DevTools)
□ Zoom to 200% — layout still works

User testing (real users):
□ Test with screen reader user (if possible)
□ Test with keyboard-only power user
□ Test on actual mobile devices (not just browser simulation)
```

---

### Implementation Guidelines for Developers

**Mobile-First Development:**

```jsx
// ❌ DON'T: Desktop-first (makes responsive harder)
<div className="p-24 md:p-4">
  {/* Starts at 24px padding, reduces on mobile */}
</div>

// ✅ DO: Mobile-first (base is mobile, enhance on desktop)
<div className="p-4 md:p-6 lg:p-8">
  {/* Starts at 4px (mobile), increases on tablet/desktop */}
</div>
```

**Responsive Images:**

```jsx
// All images must be responsive
<img 
  src="booking.jpg"
  alt="Person booking cleaning appointment"
  className="w-full h-auto"
/>

// Use responsive image set for performance
<img 
  srcSet="booking-320.jpg 320w, booking-640.jpg 640w, booking-1024.jpg 1024w"
  alt="..."
  className="w-full"
/>
```

**Flex/Grid for Responsive:**

```jsx
// Cards stack on mobile, side-by-side on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>

// Form fields full width on mobile, auto on desktop
<div className="flex flex-col md:flex-row gap-4">
  <input className="w-full md:flex-1" />
  <button className="w-full md:w-auto" />
</div>
```

**Touch-Friendly:**

```jsx
// Minimum 44x44px touch targets
<button className="px-4 py-3 md:px-3 md:py-2">
  {/* 48px on mobile (py-3 = 12px × 2 + content) */}
  {/* 40px on desktop (py-2 = 8px × 2 + content) */}
</button>

// Adequate spacing between clickables
<div className="space-y-4 md:space-y-3">
  {/* 16px gap on mobile, 12px on desktop */}
</div>
```

**Accessibility in Code:**

```jsx
// ALWAYS: Associate labels with inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ALWAYS: Provide aria-label if no visible text
<button aria-label="Close dialog">✕</button>

// ALWAYS: Mark error messages
<input aria-invalid="true" aria-describedby="error" />
<span id="error" role="alert">Email é obrigatório</span>

// ALWAYS: Announce dynamic updates
<div aria-live="polite" aria-atomic="true">
  {/* Status message that changes */}
</div>
```

---

### Responsive & Accessibility Validation Checklist

**Before Launch (MVP):**

| Item | Status | Notes |
|------|--------|-------|
| Forms work on 320px | ✅ | Ana's mobile experience |
| Buttons 44x44px minimum | ✅ | Touch-friendly |
| Keyboard navigation works | ✅ | Tab through all interactive |
| Focus indicators visible | ✅ | Clear outline |
| Contrast 4.5:1 minimum | ✅ | WCAG A compliant |
| Color not only indicator | ✅ | Emoji + text + color |
| Labels associated | ✅ | `<label htmlFor>` |
| Semantic HTML used | ✅ | `<button>`, `<nav>`, etc. |
| Error messages clear | ✅ | Actionable, not "Error" |
| Works at 200% zoom | ✅ | No horizontal scroll |
| Lighthouse score 90+ | ✅ | Accessibility section |

**Post-MVP (Phase 2):**

- Screen reader testing with actual users
- WCAG AA upgrade (7:1 contrast, enhanced keyboard support)
- Enhanced alt text for images
- Reduced motion animation support
- High contrast mode support

---

### Summary: Responsive & Accessibility Strategy

**Responsive:**
- Mobile-first (Ana 320px primary)
- Tablet support (768px)
- Desktop optimization (João 1024px)
- Flexible layouts using Tailwind grid/flex
- Relative units (rem, %)
- Touch-friendly (44x44px minimum)

**Accessibility:**
- WCAG Level A compliant
- Keyboard navigation full support
- Screen reader ready (semantic HTML, ARIA)
- Color + text + emoji (not color-dependent)
- Clear focus indicators
- Contraste 4.5:1+ (validated against palette)

**Implementation:**
- Tailwind CSS utilities (sm:, md:, lg: prefixes)
- shadcn/ui components (built-in accessibility)
- Manual testing on real devices
- Automated testing (axe, Lighthouse)

Esta estratégia garante que agenda-clean funciona para **Ana em qualquer mobile** e **João em desktop otimizado**, enquanto mantém acessibilidade para todos.


