# Architecture

## Project Overview

CreditFunk is an AI-powered spend optimization platform built with Next.js that helps teams analyze, optimize, and reduce AI tooling costs.

The platform audits AI subscriptions, detects overspending opportunities, generates AI-powered recommendations using Gemini, and provides shareable audit reports with automated email delivery.

---

# Tech Stack

## Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript / JSX
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: CSS + Tailwind transitions
- **State Management**: React Hooks

---

## Backend

- **API Routes**: Next.js Server Routes
- **Database**: Supabase (PostgreSQL)
- **AI Engine**: Gemini API
- **Email Service**: Resend
- **Hosting**: Vercel

---

# System Architecture

```text
                    ┌─────────────────────┐
                    │     Frontend UI     │
                    │   Next.js + React   │
                    └─────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   API Route Layer   │
                    │ /api/audit          │
                    │ /api/share/[id]     │
                    └─────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼

 ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
 │ Audit Engine   │  │ Gemini AI      │  │ Email Service  │
 │ Cost Analysis  │  │ Recommendations│  │ Resend API     │
 └────────────────┘  └────────────────┘  └────────────────┘
          │
          ▼
 ┌─────────────────────┐
 │ Supabase Database   │
 │ Audits + Leads      │
 └─────────────────────┘
```

---

# Directory Structure

```bash
src/
├── app/
│   ├── page.jsx
│   ├── audit/
│   │   └── page.jsx
│   │
│   ├── results/
│   │   └── page.jsx
│   │
│   ├── share/
│   │   └── [id]/
│   │       └── page.jsx
│   │
│   └── api/
│       ├── audit/
│       │   └── route.js
│       │
│       └── share/
│           └── [id]/
│               └── route.js
│
├── components/
│   ├── ui/
│   ├── header.jsx
│   ├── hero.jsx
│   ├── HeaderDropdown.jsx
│   └── ...
│
├── hooks/
│   └── useAudit.js
│
├── lib/
│   ├── audit-engine.js
│   ├── gemini.js
│   ├── emailService.js
│   ├── supabase.js
│   └── utils.js
│
├── data/
│   ├── features.js
│   ├── faqs.js
│   ├── testimonials.js
│   └── howItWorks.js
│
└── styles/
```

---

# Core Modules

## 1. Audit Engine (`lib/audit-engine.js`)

Responsible for:
- AI tool cost analysis
- Savings calculation
- Plan optimization detection
- Duplicate tooling analysis
- Consolidation opportunities

### Main Functions

```js
runAudit()
calculateSavings()
generateRecommendations()
categorizeTools()
```

---

## 2. Gemini AI Integration (`lib/gemini.js`)

Handles:
- AI-generated executive summaries
- Optimization insights
- Natural language recommendations

### Flow

1. Audit data generated
2. Structured prompt sent to Gemini
3. AI summary returned
4. Summary injected into results page

---

## 3. Email Service (`lib/emailService.js`)

Uses Resend to:
- Send audit confirmation emails
- Deliver savings reports
- Notify high-value leads

### Features

- Responsive HTML templates
- Dynamic savings calculations
- Personalized email generation

---

## 4. Supabase Database

### Tables

## audits

Stores:
- Audit inputs
- Tool selections
- AI summaries
- Savings calculations

## leads

Stores:
- Email
- Company information
- Team size
- Associated audit ID
- Savings metrics

---

# Data Flow

## Audit Flow

```text
User Input
    ↓
Audit Form Submission
    ↓
POST /api/audit
    ↓
Audit Engine Analysis
    ↓
Gemini AI Summary Generation
    ↓
Store Results in Supabase
    ↓
Send Email via Resend
    ↓
Return Audit ID
    ↓
Render Results Page
```

---

# API Endpoints

## POST `/api/audit`

Processes audit requests.

### Responsibilities

- Validate input
- Run audit engine
- Generate AI summary
- Store results
- Send email

---

## GET `/api/share/[id]`

Returns public audit data.

### Responsibilities

- Fetch audit from Supabase
- Return formatted audit JSON
- Power public share pages

---

# UI Architecture

## Design System

- Dark-first modern UI
- Glassmorphism-inspired cards
- Gradient accent styling
- Responsive layouts
- Tailwind utility-first styling

---

# Security Considerations

## Current

- Environment variables protected
- API keys server-side only
- Supabase Row Level Security enabled

## Planned

- Authentication layer
- Protected dashboards
- Rate limiting
- Audit ownership verification

---

# Deployment Architecture

## Recommended Stack

| Service | Purpose |
|---|---|
| Vercel | Frontend + API Hosting |
| Supabase | Database |
| Resend | Email Delivery |
| Gemini API | AI Recommendations |

---

# Performance Optimizations

- Dynamic imports
- Server Components where possible
- API route separation
- Lazy-loaded dropdowns
- Optimized Tailwind build
- Minimal client-side state

---

# Future Enhancements

## Planned Features

- Stripe subscription billing
- Multi-user organizations
- Admin dashboards
- CSV upload support
- Historical audit tracking
- AI spend benchmarking
- Real-time analytics
- Team collaboration
- Role-based access control

---

# Scalability Vision

CreditFunk is designed to evolve into a full AI infrastructure optimization platform capable of:

- Monitoring AI SaaS spending
- Detecting operational inefficiencies
- Benchmarking organizations
- Providing enterprise-grade optimization insights
- Acting as an AI FinOps platform

---

# Development Workflow

```bash
npm install
npm run dev
npm run build
npm start
```

---

# Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GEMINI_API_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

---

# Conclusion

CreditFunk combines AI analysis, modern frontend architecture, cloud infrastructure, and automation systems into a scalable AI spend optimization platform focused on helping organizations reduce unnecessary AI operational costs efficiently.