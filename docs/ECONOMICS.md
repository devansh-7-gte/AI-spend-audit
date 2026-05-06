# Economics

## Business Model

### Revenue Streams

1. **Subscription (Primary - 80%)**
   - Free tier: $0
   - Pro tier: $9.99/month
   - Business tier: $29.99/month
   - Annual discount: 20% off (prepay)

2. **Enterprise (Secondary - 15%)**
   - Custom pricing for teams 10+
   - White-label licensing
   - API access and support

3. **Affiliate/Partnership (Tertiary - 5%)**
   - Revenue from recommended financial tools
   - Referral fees from banking APIs

## Unit Economics

### Customer Acquisition

| Channel | CAC | Conversion | LTV/CAC Ratio |
|---------|-----|-----------|---------------|
| Organic (SEO) | $2 | 1% | 100:1 |
| Content/Social | $5 | 2% | 40:1 |
| Paid Ads | $15 | 0.5% | 13:1 |
| Referral | $3 | 3% | 60:1 |
| **Blended** | **$8** | **1.5%** | **25:1** |

### Lifetime Value (Pro User)

```
Monthly Price: $9.99
Gross Margin: 75% = $7.50
Churn Rate: 5% per month (95% retention)
Avg. Lifetime: 20 months (1/0.05)

LTV = $7.50 × 20 = $150

Adjusted for Business tier upsell:
- 10% convert to Business ($29.99, margin = $22.50)
- Incremental LTV: $150 + (0.10 × $22.50 × 15) = $188

Final LTV: $188
LTV/CAC Ratio: $188/$8 = 23.5:1 ✓ (Healthy)
```

## Cost Structure

### Fixed Costs (Monthly)

| Item | Cost |
|------|------|
| Hosting (Vercel) | $500 |
| Database (Supabase/AWS) | $300 |
| Email service (SendGrid) | $100 |
| Analytics (Mixpanel) | $200 |
| Monitoring & Security | $150 |
| **Total Fixed** | **$1,250** |

### Variable Costs (% of Revenue)

| Item | % of Revenue |
|------|-------------|
| Payment processing (Stripe) | 2.9% + $0.30 |
| API usage (Plaid, etc.) | 5% |
| Customer support | 10% |
| **Total Variable** | **~18%** |

### Gross Margin by Tier

| Tier | Price | Variable Cost | Gross Margin |
|------|-------|--------------|-------------|
| Free | $0 | $1-2 | 0% |
| Pro | $9.99 | $1.80 | 82% |
| Business | $29.99 | $5.40 | 82% |

## Financial Projections

### Year 1 Forecast

| Month | Users | Paid Subs | MRR | ARR Projection |
|-------|-------|----------|-----|--------|
| 1 | 500 | 5 | $50 | $600 |
| 3 | 2,500 | 40 | $400 | $4,800 |
| 6 | 8,000 | 150 | $1,500 | $18,000 |
| 12 | 50,000 | 1,000 | $10,000 | $120,000 |

### Year 1 Profitability

```
Total Revenue (YTD): $45,000 (average of monthly growth)
Total Fixed Costs: $15,000 ($1,250 × 12)
Total Variable Costs: $8,100 (18% of revenue)
Marketing/Growth: $10,000 (strategic investment)

Net Profit: $45,000 - $15,000 - $8,100 - $10,000 = $11,900
Profit Margin: 26%
```

**Breakeven Point**: Month 4-5

### Year 2-3 Projections

| Metric | Year 2 | Year 3 |
|--------|--------|--------|
| Paid Subscribers | 5,000 | 15,000 |
| MRR | $50,000 | $150,000 |
| Annual Revenue | $600,000 | $1,800,000 |
| Net Profit Margin | 35% | 40% |

## Key Assumptions

1. **Conversion Rate**: 1.5% of free → paid (industry avg: 1-3%)
2. **Churn**: 5% monthly (strong for SaaS)
3. **Pricing**: No changes in first year
4. **Market**: Addressable market of 45M personal finance app users
5. **Distribution**: 80% organic/community, 20% paid ads

## Risk Factors

### High Risk
- **Competition**: YNAB, Rocket Money entering this space
- **Churn**: Higher than expected (7%+ would hurt)
- **CAC**: Harder to acquire than projected

### Medium Risk
- **Regulatory**: Data privacy compliance (GDPR, CCPA)
- **Product**: Core features don't resonate
- **Technology**: Infrastructure costs spike

### Mitigation
- Focus on speed/simplicity advantage
- Build strong retention through notifications
- Maintain lean ops, focus on unit economics
- Privacy-first from day 1

## Funding Needs

### Runway (12 months)
- **Required**: $50,000
- **Use**: Team ($30K), Ops/Tools ($20K)
- **Breakdown**: 
  - 1 Founder (salary deferral)
  - Marketing/Growth ($10K)
  - Tools & Infrastructure ($10K)

### Growth Stage (Months 13-24)
- **Required**: $150,000 Seed
- **Use**: Team expansion, marketing, infrastructure
