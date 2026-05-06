# Metrics

## Key Performance Indicators (KPIs)

### Acquisition Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Monthly Signups | 5,000+ | Google Analytics |
| Cost Per Acquisition (CAC) | <$10 | Stripe + Analytics |
| Traffic to Website | 50K+ visits/mo | Google Analytics |
| Organic Traffic % | 60%+ | Google Analytics |
| Paid Ad ROI | 3:1+ | Ad platform analytics |

### Engagement Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Daily Active Users (DAU) | 500+ | Product analytics |
| Weekly Active Users (WAU) | 2,000+ | Product analytics |
| Monthly Active Users (MAU) | 5,000+ | Product analytics |
| Sessions Per User | 3+ per week | Product analytics |
| Average Session Duration | 5+ minutes | Product analytics |
| Feature Adoption | 80% run audit | Product analytics |

### Retention Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Day 1 Retention | 40%+ | Cohort analysis |
| Day 7 Retention | 25%+ | Cohort analysis |
| Day 30 Retention | 15%+ | Cohort analysis |
| Monthly Churn (Free) | 10%+ | Database |
| Monthly Churn (Paid) | <5% | Database |
| Reactivation Rate | 10%+ | Product analytics |

### Revenue Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Monthly Recurring Revenue (MRR) | $10K+ by Year 1 | Stripe |
| Annual Recurring Revenue (ARR) | $120K+ by Year 1 | Stripe |
| Customer Lifetime Value (LTV) | >$150 | LTV calculation |
| LTV:CAC Ratio | 20:1+ | LTV ÷ CAC |
| Average Revenue Per User (ARPU) | $5+ | MRR ÷ Total Users |
| Free-to-Paid Conversion | 2%+ | Database |

### Customer Health Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Net Promoter Score (NPS) | 40+ | Survey |
| Customer Satisfaction (CSAT) | 4.5+/5 | Survey |
| Customer Effort Score (CES) | <3/5 (lower better) | Survey |
| Support Response Time | <1 hour | Support system |
| Feature Requests Per User | 0.5+ | Feature request tracker |

## Dashboards

### Executive Dashboard (Weekly)

**Top Section:**
- MRR (current, growth %)
- Active Users (current, growth %)
- Paid Subscribers (current, growth %)
- Churn Rate (current, trend)

**Middle Section:**
- Revenue this week vs target
- New signups this week
- Trial to paid conversions
- CAC vs target

**Bottom Section:**
- Top pages (traffic)
- Top features (usage)
- Support tickets (volume, resolution time)

### Product Dashboard (Daily)

**User Metrics:**
- DAU, WAU, MAU (with sparklines)
- Session count
- Feature usage breakdown

**Quality Metrics:**
- Error rates (by feature)
- Page load times
- API latency (if applicable)

**User Behavior:**
- Funnel: Signup → Audit → Results → Upgrade
- Feature adoption rates
- Session duration distribution

### Marketing Dashboard (Weekly)

**Acquisition:**
- Signups by source
- CAC by channel
- Top referrers
- Traffic by campaign

**Conversion:**
- Free-to-paid funnel
- Email open rates
- Email click rates
- Ad performance (CTR, CPC)

**Cohort Analysis:**
- Cohort retention curves
- Lifetime value by cohort
- Revenue by cohort

## Reporting Framework

### Daily Standup (5 mins)
- Yesterday's signups
- Bugs/issues identified
- Today's priorities
- Blockers

### Weekly Review (30 mins)
- MRR vs target
- User growth rate
- Key features launched
- Support issues
- Decision points

### Monthly Review (1 hour)
- Month recap vs targets
- Cohort retention review
- Payback period analysis
- Pricing/LTV implications
- Strategic adjustments needed

### Quarterly Review (2 hours)
- Full quarter performance vs annual plan
- Cohort analysis trends
- Competitive landscape changes
- Product roadmap adjustments
- Budget allocation review

## Benchmarks

### SaaS Industry Benchmarks

| Metric | Benchmark | Our Target | Status |
|--------|-----------|-----------|--------|
| Monthly Churn | 5-7% | 3-5% | Aggressive |
| Free-to-Paid Conversion | 1-3% | 2% | Achievable |
| CAC Payback Period | 6-12 months | 4-6 months | Aggressive |
| LTV:CAC | 3:1 | 20:1 | Ambitious |
| NDR (Net Dollar Retention) | >110% | 120%+ | Stretch goal |

## Alerts & Thresholds

### Red Alerts (Investigate Immediately)
- MRR down 10%+ from previous month
- Churn rate exceeds 8%
- Site downtime >30 mins
- Error rate >5%
- Support queue >24 hour response

### Yellow Alerts (Monitor Closely)
- DAU down 20% week-over-week
- Free-to-paid conversion <1%
- CAC exceeds $15
- Page load time >3 seconds
- Email open rate <15%

### Green Metrics (Celebrate)
- CAC <$5
- MRR growth >30% MoM
- Churn <3%
- NPS >50
- Feature adoption >80%

## Data Collection Tools

| Metric | Tool | Notes |
|--------|------|-------|
| Web Analytics | Google Analytics 4 | Pageviews, sessions, users |
| Product Analytics | Mixpanel or Amplitude | User behavior, funnels |
| Revenue Tracking | Stripe | Subscriptions, charges |
| Surveys | Typeform or SurveySparrow | NPS, CSAT, CES |
| Support | Zendesk or Intercom | Tickets, resolution time |
| Email Marketing | Mailchimp or SendGrid | Opens, clicks, unsubscribes |
| Error Tracking | Sentry | Bugs, crashes, errors |
| Infrastructure | Vercel Analytics | Performance, uptime |

## Goals Timeline

### Month 1-3
- Achieve 1,000 signups
- Validate product-market fit
- Get first 10 paid customers
- Target MRR: $100

### Month 4-6
- Reach 8,000 signups
- 150+ paid customers
- 25%+ Day 7 retention
- Target MRR: $1,500

### Month 7-12
- Reach 50,000 signups
- 1,000+ paid customers
- <5% churn
- Target MRR: $10,000

### Year 2
- 200,000+ signups
- 5,000+ paid customers
- Achieve profitability
- Target MRR: $50,000
