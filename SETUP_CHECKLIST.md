# Quick Setup Checklist

Complete these steps to activate email capture and transactional emails:

## Phase 1: Code Changes (✅ DONE)

- [x] Updated SpendForm.jsx with email capture fields
- [x] Added email validation to form
- [x] Created email service (src/lib/email-service.js)
- [x] Updated API route with lead saving and email sending
- [x] Created Supabase migration SQL

## Phase 2: Environment Setup

- [ ] Install Resend: `npm install resend`
- [ ] Visit https://resend.com
- [ ] Create free account
- [ ] Get API key
- [ ] Add to `.env.local`:
  ```
  RESEND_API_KEY=re_xxxxx
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```

## Phase 3: Database Setup

- [ ] Open Supabase dashboard
- [ ] Go to SQL Editor
- [ ] Copy contents of `docs/SUPABASE_MIGRATION.sql`
- [ ] Paste and run
- [ ] Verify `leads` table created

## Phase 4: Testing

- [ ] Run `npm run dev`
- [ ] Open audit form
- [ ] Fill in all required fields including email
- [ ] Submit audit
- [ ] Check email inbox for confirmation
- [ ] Check Supabase `leads` table for new record

## Phase 5: Customization (Optional)

- [ ] Edit email template in `src/lib/email-service.js`
- [ ] Change "Credex" branding to your company
- [ ] Update "from" email address
- [ ] Adjust savings threshold for high-priority messaging
- [ ] Update NEXT_PUBLIC_APP_URL for correct links

## Phase 6: Production

- [ ] Verify Resend domain (add DNS records)
- [ ] Update .env variables for production
- [ ] Add privacy policy for email capture
- [ ] Set up monitoring/alerts for failed emails
- [ ] Test complete flow end-to-end

## Files Modified

- `src/components/SpendForm.jsx` - Added email fields
- `src/app/api/audit/route.js` - Added lead saving and email sending

## Files Created

- `src/lib/email-service.js` - Email service integration
- `docs/SUPABASE_MIGRATION.sql` - Database schema
- `docs/EMAIL_SETUP.md` - Detailed setup guide
- `docs/EMAIL_INTEGRATION.md` - Implementation overview

## Quick Reference

**Form captures:**
- Email (required)
- Company name (optional)
- Role (optional)
- Team size (already captured)

**Stored in Supabase:**
- Email + metadata
- Link to audit results
- Savings figures

**Email triggers when:**
- Audit completes successfully
- Email sent with personalized results
- High-savings cases flagged for follow-up

**Lead table has:**
- Email, company, role, team size
- Audit ID, savings amounts
- Created/updated timestamps
- Indexes for performance

---

**Time to complete**: ~15 minutes
**Next step**: Install Resend and get API key
