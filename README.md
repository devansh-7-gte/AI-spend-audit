# 🚀 CreditFunk

AI-powered spend optimization platform that helps teams analyze, reduce, and optimize their AI tooling costs.

![CreditFunk Banner](./public/preview.png)

---

## ✨ Features

- 🔍 AI Spend Auditing
- 🤖 Gemini AI Executive Summaries
- 📊 Cost Optimization Insights
- 💸 Monthly & Annual Savings Detection
- 📤 Shareable Audit Reports
- 📧 Automated Email Reports with Resend
- ⚡ Beautiful Modern UI with TailwindCSS
- 🌙 Fully Responsive Dark Theme
- ☁️ Supabase Database Integration

---

## 🖥️ Tech Stack

### Frontend
- Next.js 15
- React
- TailwindCSS
- shadcn/ui
- Lucide Icons

### Backend
- Next.js API Routes
- Supabase
- Gemini API
- Resend Email API

---

## 📸 Screenshots

| Home Page | Audit Dashboard |
|------------|----------------|
| Add screenshot here | Add screenshot here |

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/creditfunk.git
```

Move into the project:

```bash
cd creditfunk
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

GEMINI_API_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧠 How It Works

1. User enters AI tools and monthly spend
2. Audit engine analyzes optimization opportunities
3. Gemini generates AI-powered recommendations
4. Savings insights are calculated
5. Report is stored in Supabase
6. Shareable links and email reports are generated

---

## 📊 Example Insights

- Downgrade unused enterprise subscriptions
- Consolidate overlapping AI tools
- Remove inactive seats
- Detect duplicated AI workflows
- Identify overprovisioned plans

---

## 📁 Project Structure

```bash
src/
 ├── app/
 │   ├── api/
 │   ├── audit/
 │   ├── results/
 │   └── share/
 │
 ├── components/
 │   ├── ui/
 │   ├── header.jsx
 │   ├── hero.jsx
 │   └── ...
 │
 ├── lib/
 │   ├── audit-engine.js
 │   ├── gemini.js
 │   ├── emailService.js
 │   └── supabase.js
 │
 └── data/
```

---

## 📧 Email System

CreditFunk uses Resend for automated audit delivery.

Features:
- Savings summary emails
- Personalized audit notifications
- Executive summary delivery
- Production-ready email templates

---

## 🚀 Deployment

Recommended platforms:

- ▲ Vercel
- Supabase
- Resend

Build for production:

```bash
npm run build
```

---

## 🌟 Future Improvements

- Stripe Billing Integration
- Multi-team Dashboards
- SaaS Usage Analytics
- AI Tool Benchmarking
- Organization Accounts
- CSV/Excel Uploads
- Real-time Spend Tracking

---

## 🤝 Contributing

Pull requests are welcome.

For major changes, open an issue first to discuss what you would like to improve.

---

## 📜 License

MIT License

---

## 💙 Built With Passion

Designed and developed to help companies stop overspending on AI infrastructure and subscriptions.

If you like this project, consider giving it a ⭐ on GitHub.


