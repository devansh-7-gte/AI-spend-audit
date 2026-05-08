# Email Integration Setup Guide

This guide walks you through setting up email capture, Supabase storage, and transactional emails using Resend.

## 1. Install Resend

```bash
npm install resend
```

## 2. Set Up Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Create an API key in the dashboard
4. Add to your `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production, use your actual domain URL.

## 3. Verify Email Domain (Production)

In Resend dashboard:
- Add your domain
- Add DNS records as shown
- Verify domain ownership

For development, use the default `onboarding@resend.dev` email.

## 4. Create Leads Table in Supabase

1. Go to your Supabase project
2. Open SQL Editor
3. Copy the contents of `docs/SUPABASE_MIGRATION.sql`
4. Paste and run the migration

This creates:
- `leads` table to store email captures
- Indexes for performance
- RLS policies for security
- Auto-updated `updated_at` timestamp

## 5. Verify Integration

The form now includes:
- **Required**: Email address
- **Optional**: Company name, role

When users submit the audit:
1. Email is validated
2. Audit is run and saved to DB
3. Lead is saved to `leads` table with savings data
4. Confirmation email is sent with personalized message
5. High-savings cases (>$1000/month) get special messaging about follow-up

## 6. Email Customization

Edit `src/lib/email-service.js` to customize:
- Email subject line
- HTML template
- From address
- Savings threshold for high-priority follow-up

## 7. Test the Flow

1. Fill out the form with all required fields
2. Click "Run Audit"
3. Check the email inbox for confirmation
4. Verify lead appears in Supabase `leads` table

## Troubleshooting

### Email not sending
- Check `RESEND_API_KEY` is set correctly
- Verify email is valid format
- Check Resend dashboard for failed attempts

### Duplicate email error
- Leads table has unique constraint on email
- Update existing lead instead of inserting new one
- Or use different email for testing

### No lead saved
- Check Supabase `leads` table exists
- Verify `audits` table has corresponding audit record
- Check for RLS policy issues

## Production Considerations

1. **Email Domain**: Use your branded email domain (e.g., audit@yourcompany.com)
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Verification**: Implement email verification for compliance
4. **Privacy**: Add privacy policy and GDPR consent
5. **Tracking**: Monitor bounce rates and unsubscribes
6. **Templates**: Use Resend templates for consistency
7. **Monitoring**: Set up alerts for failed emails

## Environment Variables

Required:
- `RESEND_API_KEY` - From Resend dashboard
- `NEXT_PUBLIC_APP_URL` - Your app URL for email links

Optional:
- `NEXT_PUBLIC_SUPABASE_URL` - Already configured
- `SUPABASE_SERVICE_KEY` - Already configured
