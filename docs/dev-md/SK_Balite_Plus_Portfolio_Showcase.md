# SK Balite Plus

> **A modern digital platform for barangay youth engagement, event operations, attendance, evaluations, certificates, rewards, and community administration.**

**Project Type:** Full-Stack Web Application / PWA  
**Status:** Active Development  
**Live Site:** https://skbaliteplus.site

---

## Overview

**SK Balite Plus** is a full-stack digital platform designed to help streamline Sangguniang Kabataan and barangay youth operations.

The system brings together event management, resident and guest participation, live attendance, evaluations, digital certificates, youth profiling, sports-festival management, raffles, rewards, reporting, and administrative workflows in one platform.

The project was built with a strong focus on usability, mobile-friendly participation, secure role-based access, real-time operational workflows, scalable database access, responsive navigation, and maintainable domain-based architecture.

---

## Problem the Project Solves

Community and youth programs often rely on separate spreadsheets, forms, paper attendance sheets, messaging apps, and manual certificate preparation.

SK Balite Plus centralizes these workflows into a unified system where administrators can manage activities while residents and guests can participate through dedicated digital experiences.

Instead of using disconnected tools for event registration, attendance, participant records, evaluation forms, certificate issuance, sports scoring, raffles, youth profiling, and reports, the platform provides a single operational environment.

---

# Core Features

## 1. Admin Dashboard

A centralized administrative dashboard provides quick access to system activity and operational data.

Key capabilities include:

- user statistics
- event statistics
- attendance summaries
- activity trends
- recent event information
- recent attendance activity
- operational shortcuts

The dashboard backend was optimized from multiple database round-trips into a consolidated PostgreSQL RPC response.

---

## 2. User & Role Management

Administrators can manage platform accounts and access levels through a dedicated user-management interface.

Features include:

- user account management
- role assignment
- account activation/deactivation
- account approval workflows
- administrative user actions
- Super Admin account controls
- direct password-management workflows for authorized administrators
- role-based access control

Authorization remains enforced server-side rather than relying only on hidden UI elements.

---

## 3. Event Management

Administrators can create and manage barangay and SK events from one system.

Event tools include:

- event creation and editing
- categories
- locations
- classifications
- schedules
- event statuses
- registration
- sessions
- attendance
- evaluations
- certificates
- event-specific administrative tools

Events act as a central domain that connects many other parts of the platform.

---

## 4. Live Attendance Management

SK Balite Plus includes a live event-attendance workflow designed for actual event operations.

Capabilities include:

- resident attendance
- public/guest attendance
- time-in and time-out tracking
- attendance status
- event-specific attendance records
- participant and attendee classification
- live attendance updates
- attendee actions
- attendance summaries
- filtering and searching
- server-side pagination
- Excel/export workflows

The live attendance interface uses Supabase Realtime so event operators can see attendance changes while an event is active.

Large attendance datasets are database-paginated instead of loading every record into the browser.

---

## 5. Guest Attendance & Guest Portal

Guests can participate in supported events without requiring a permanent resident account.

The guest workflow includes:

- public event attendance
- remembered guest sessions
- secure tokenized guest access
- guest access QR/link workflows
- email-based access recovery
- guest participation management
- evaluation access
- certificate access

The guest-access architecture uses secure server-side session and token flows instead of exposing sensitive authorization state directly in public URLs.

---

## 6. Resident Experience

Registered residents have their own authenticated platform experience.

Depending on the available event and account state, residents can access features such as:

- event participation
- personal attendance information
- QR-based attendance workflows
- rewards and points
- notifications
- certificates
- profile/account tools

---

## 7. Event Evaluations

Administrators can create and manage evaluation forms connected to events.

Features include:

- evaluation form management
- published evaluation workflows
- resident responses
- guest responses
- response monitoring
- respondent search and filtering
- response details
- database-level pagination for large response datasets

Summary list queries are intentionally lightweight, while full answers are retrieved only when a specific response needs to be viewed.

---

## 8. Digital Certificates

The platform includes certificate-management capabilities connected to events and participant records.

Features include:

- certificate templates
- event certification
- certificate design selection
- recipient selection
- attendee / participant / winner issuance workflows
- resident and guest certificate support
- digital certificate records
- Creative Studio workflow for preparing certificate layouts

---

## 9. Sports Festival / Olympics Module

SK Balite Plus includes event tools for sports festivals and Olympics-style activities.

Capabilities include:

- sports-event configuration
- games
- teams/groupings
- scoring
- placements
- result finalization
- public leaderboards
- real-time or near-real-time result updates

Public leaderboard data is optimized using short-lived shared caching and event-specific invalidation.

---

## 10. Raffles

Event organizers can manage raffle activities inside the platform.

Features include:

- raffle configuration
- participants
- rounds
- winners
- live draw-related workflows

The raffle query layer was optimized to eliminate an earlier N+1 query pattern.

---

## 11. Rewards & Gamification

The project includes a rewards system designed to encourage participation.

Capabilities include:

- participation points
- configurable reward settings
- reward claims
- transaction history
- resident reward views
- administrative reward management

Stable reward configuration data is shared-cached to reduce unnecessary database reads.

---

## 12. Katipunan ng Kabataan Profiles

SK Balite Plus includes youth profiling and KK management features.

Capabilities include:

- KK profiles
- demographic information
- sitio-based information
- search and filtering
- profile detail views
- KK members
- groupings
- matching/review workflows
- links to sports and event participation

Large KK profile lists use database-level search and pagination rather than loading the entire dataset into memory.

---

## 13. Reports & Analytics

Administrative reports provide visibility into youth participation and event activity.

Reporting features include:

- attendance analytics
- participation summaries
- demographic information
- event-related metrics
- visual charts
- export-oriented workflows

The reporting domain is designed to evolve toward database-side aggregation as data volume grows.

---

## 14. Notifications

The application includes notification workflows for keeping users informed about relevant platform activity.

Notification data is user-scoped and intentionally treated differently from shared public cache data.

---

## 15. Progressive Web App Experience

SK Balite Plus is designed as a web application with PWA-oriented behavior.

This supports a more app-like experience across desktop and mobile browsers while retaining the deployment simplicity of the web platform.

---

# Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 15 |
| **UI Runtime** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui / Radix UI |
| **Backend Platform** | Supabase |
| **Database** | PostgreSQL |
| **Authentication** | Supabase Auth |
| **Authorization** | Server-side RBAC + PostgreSQL RLS |
| **Realtime** | Supabase Realtime |
| **File Storage** | Supabase Storage |
| **Server Rendering** | Next.js App Router / React Server Components |
| **Server Mutations** | Next.js Server Actions |
| **Caching** | Next.js Runtime Cache / `unstable_cache` / tag invalidation |
| **Email** | Resend |
| **Hosting** | Vercel |
| **DNS / Edge Layer** | Cloudflare |
| **Application Type** | Responsive Web App / PWA |

---

# External Integrations

## Supabase

Supabase provides most of the project's backend infrastructure:

- PostgreSQL database
- authentication
- Row Level Security
- realtime subscriptions
- storage
- PostgREST
- PostgreSQL RPC functions

---

## Resend

Resend is integrated for transactional email workflows such as guest-access and recovery-related messaging.

Sensitive provider credentials remain server-side and are not exposed through public client environment variables.

---

## Vercel

Vercel hosts the Next.js application and provides the production execution environment for React Server Components, Server Actions, dynamic routes, runtime caching, static assets, and deployments.

---

## Cloudflare

Cloudflare sits in front of the production domain as the DNS and edge layer.

The project is intentionally conservative with edge caching because SK Balite Plus contains both public and authenticated/private areas.

---

# Application Architecture

```text
Browser / PWA
      │
      ▼
Cloudflare
      │
      ▼
Vercel / Next.js
      │
      ├── React Server Components
      ├── Server Actions
      ├── Runtime Cache
      ├── Route Loading Boundaries
      └── Authorization Guards
      │
      ▼
Supabase
      │
      ├── Auth
      ├── PostgreSQL
      ├── RLS
      ├── RPC Functions
      ├── Realtime
      └── Storage
```

The application follows a domain-oriented structure so features such as events, attendance, evaluations, rewards, certificates, and youth profiles can evolve independently while sharing common authentication, caching, and UI infrastructure.

---

# Security & Access Control

Security is treated as a backend concern rather than only a frontend visibility concern.

Key practices include:

- server-side authorization guards
- role-based access control
- Supabase Row Level Security
- protected administrator operations
- service-role usage restricted to server-side code
- private guest-session handling
- tokenized guest access
- HttpOnly/session-based guest flows
- sensitive environment variables kept server-side
- live authorization checks for security-sensitive workflows
- no reliance on hidden buttons as authorization

The project distinguishes between data that is safe to shared-cache and data that must always be verified against live authoritative state.

---

# Realtime Features

Realtime is used selectively where immediate updates provide actual operational value.

Examples include:

- live event attendance
- resident attendance acknowledgement
- sports/Olympics leaderboard workflows
- other live event interactions

Realtime is intentionally not used simply to make normal page navigation feel faster.

---

# Performance Engineering

Performance optimization has been handled as an architectural concern rather than only a UI concern.

## Query Optimization

Several expensive data-access patterns were identified and reduced, including full-table filtering, N+1 raffle queries, global response/registration scans, and dashboard aggregation.

---

## Admin Dashboard RPC Optimization

The Admin Dashboard originally required **18 separate PostgREST requests per cache miss**.

It was redesigned around:

```text
18 PostgREST round-trips
        ↓
1 PostgreSQL RPC
        ↓
structured dashboard response
```

Attendance trends that previously transferred large raw datasets are now aggregated inside PostgreSQL before being sent to the application.

---

## Shared Server Caching

Stable and public/shared data use carefully scoped server caching.

Examples include:

- Event Categories
- Event Locations
- Event Classifications
- Reward Settings
- Landing Statistics
- Public Olympics Leaderboard

Cache entries use domain-specific tags and appropriate TTL values rather than one global cache policy.

---

## Database-Level Pagination

Large datasets have been migrated away from client-side full-table loading.

Implemented server-side pagination includes:

- Admin Users
- KK Profiles
- Event Attendance
- Evaluation Responses

Typical list pages return only the rows needed for the current page, with server-side page-size limits.

---

## Payload Reduction

Heavy fields are excluded from summary/list requests whenever they are not needed.

Examples:

- attendance list responses avoid loading base64 signature images
- evaluation respondent lists avoid loading full JSON response content
- lightweight aggregate queries select only required primitive columns

---

## Navigation UX

The Admin interface includes immediate optimistic navigation feedback.

```text
User clicks destination
        ↓
Admin shell immediately shows destination-aware loading UI
        ↓
Next.js resolves the route in the background
        ↓
Destination content replaces the loader
```

The Admin sidebar and header remain persistent during the transition.

---

# Data Freshness Strategy

## Shared / Stable

Suitable for longer server caching:

- event categories
- event locations
- event classifications
- reward configuration

## Short-Lived Public Data

Suitable for short caching:

- landing statistics
- public leaderboard information

## Near-Realtime / Live

Kept fresh through direct queries or realtime updates:

- attendance
- active event sessions
- live sports results
- raffle execution

## Security-Sensitive

Never placed in shared cache:

- authenticated user identity
- guest access token validation
- support/impersonation credentials
- fresh approval checks
- private guest portal data

---

# Scalability Improvements

Implemented improvements include:

- PostgreSQL aggregation instead of large JavaScript aggregation
- server-side range pagination
- search pushdown
- database filter pushdown
- bounded page sizes
- selective shared caching
- domain cache tags
- optimized payload projections
- batch queries
- RPC-based dashboard metrics
- selective realtime usage

---

# Quality Assurance

The project includes targeted automated regression tests for performance-sensitive architecture.

The latest performance phase reported:

- **45 / 45 targeted regression tests passing**
- **TypeScript typecheck passing**
- **Next.js production build passing**

---

# Selected Engineering Highlights

### 18 → 1 Dashboard Round-Trip

A large Admin Dashboard data-fetching sequence was consolidated into a single PostgreSQL RPC.

### Live Attendance + Pagination

Realtime attendance was preserved while converting large attendance tables to server-side pagination.

### Lightweight Evaluation Lists

Evaluation-response tables load summary information only; full response content is fetched only when required.

### Optimistic Admin Navigation

The persistent Admin shell gives immediate visual feedback before the destination Server Component finishes resolving.

### Cache-Safety Boundaries

The system intentionally separates cacheable shared data from identity-, authorization-, and guest-session-sensitive information.

### Mobile-Friendly Guest Participation

Guest attendance and Guest Portal workflows are designed so event participants can interact without requiring a permanent platform account.

---

# Development Approach

The project uses a structured engineering workflow with:

- architecture documentation
- feature maps
- project invariants
- performance audits
- regression tests
- engineering handoffs
- monthly changelogs
- phased optimization work

Major changes are scoped to avoid unnecessary refactors and are validated against existing functionality before being considered complete.

---

# Current Project Status

The platform currently includes substantial functionality across authentication, administration, events, attendance, residents, guests, evaluations, certificates, sports/Olympics, rewards, raffles, youth profiling, reports, notifications, and performance optimization.

Performance work has already addressed the largest known query and pagination bottlenecks.

Further optimization work such as precision cache invalidation, additional realtime cleanup, CDN tuning, deeper frontend bundle analysis, and load testing can be performed as usage grows.

---

# Future Improvements

Potential future engineering work includes:

- precision cache invalidation cleanup
- additional realtime/polling optimization
- selected Cloudflare/CDN cache rules
- deeper frontend bundle optimization
- larger-scale load testing
- further reporting aggregation
- additional administrative automation
- continued security hardening

---

# Portfolio Summary

**SK Balite Plus demonstrates experience in:**

- full-stack application architecture
- React / Next.js development
- TypeScript
- relational database design
- PostgreSQL
- Supabase
- realtime systems
- authentication and authorization
- Row Level Security
- server-side rendering
- database pagination
- caching strategies
- PostgreSQL RPCs
- performance optimization
- responsive UI/UX
- PWA development
- event-management systems
- administrative dashboards
- transactional email integration
- production deployment

---

## Short Portfolio Description

> **SK Balite Plus** is a full-stack barangay youth and event-management platform built with Next.js, React, TypeScript, and Supabase. It combines event administration, live attendance, resident and guest participation, evaluations, digital certificates, youth profiling, sports scoring, raffles, rewards, notifications, and reporting in one responsive PWA. The project also includes production-focused engineering such as PostgreSQL RPC aggregation, database-level pagination, shared server caching, Supabase Realtime, role-based access control, and optimized route-loading experiences.

---

## Suggested Portfolio Tags

`Next.js` `React` `TypeScript` `Supabase` `PostgreSQL` `Tailwind CSS` `shadcn/ui` `Realtime` `PWA` `RBAC` `RLS` `Vercel` `Cloudflare` `Resend` `Performance Optimization` `Event Management`

---

## Screenshot Suggestions

For a portfolio case-study page, consider including screenshots of:

1. Admin Dashboard
2. Event Management
3. Live Attendance
4. Resident Portal
5. Guest Attendance / Guest Portal
6. KK Profiles
7. Evaluation Management
8. Certificate / Creative Studio
9. Olympics Leaderboard
10. Rewards / Raffles
11. Reports & Analytics
12. Mobile/PWA interface

A strong presentation sequence would be:

```text
Hero / Dashboard
→ Core Event Workflow
→ Live Attendance
→ Resident & Guest Experience
→ Certificates / Evaluations
→ Olympics / Rewards
→ Technical Architecture
→ Performance Engineering
```

---

*Built as an evolving digital platform for modern SK and barangay youth operations.*
