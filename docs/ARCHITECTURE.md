# Architecture

## Project Overview

AI Spend Audit is a Next.js-based web application for analyzing and auditing spending patterns.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Deployment**: Vercel (recommended)

## Directory Structure

```
src/
├── app/              # Next.js App Router
│   ├── page.js       # Home page
│   ├── audit/page.js # Audit entry page
│   └── results/page.js # Results display page
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   └── SpendForm.jsx # Main spending entry form
├── lib/              # Utility functions
│   ├── audit-engine.js # Core audit logic
│   └── utils.js      # General utilities
```

## Key Components

### SpendForm.jsx
- Handles spending data input
- Form validation
- API submission to `/api/audit`

### Audit Engine (lib/audit-engine.js)
- `analyzeSpending()` - Main analysis function
- `categorizeSpending()` - Category breakdown
- `analyzeTrends()` - Trend analysis
- `generateRecommendations()` - Automated recommendations
- `exportAnalysis()` - CSV/JSON export

## Data Flow

1. User enters spending data in SpendForm
2. Form submitted to `/api/audit` endpoint
3. Backend processes with audit-engine
4. Results returned and displayed on results page

## API Endpoints (To Be Implemented)

- `POST /api/audit` - Process spending audit
- `GET /api/results/[id]` - Retrieve audit results

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Historical audit tracking
- Advanced analytics dashboard
- Export functionality
- Scheduled audits
