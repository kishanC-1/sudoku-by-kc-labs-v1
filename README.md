# Sudoku — by KC Labs

Premium full-stack Sudoku starter built for:
- public premium gameplay
- hidden admin analytics
- AdSense-ready architecture with ads disabled by default
- GitHub → Vercel deployment

## Included in this V1 starter
- Next.js App Router + TypeScript + Tailwind
- Light/dark mode
- Play page
- Daily challenge page
- Sudoku Academy content structure
- Hidden admin login and dashboard scaffold
- Analytics API scaffolding
- Ad components behind feature flags
- Supabase schema file

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables
Copy `.env.example` to `.env.local` and set:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_AUTH_SECRET`
- Supabase keys when you connect the database
- `ADS_ENABLED=false` until AdSense approval

## Deploy to Vercel
1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Add all environment variables in Vercel Project Settings.
4. Deploy.

## AdSense approach
This project is intentionally coded to be **monetization-ready but hidden by default**.

- Admin panel stays hidden permanently from public users.
- Ads stay disabled until approval.
- After approval, enable:
  - `ADS_ENABLED=true`
  - optional ad slots / consent mode
- Update `public/ads.txt` with your real publisher ID.

## Important note
This is a strong production-oriented scaffold, not a finished enterprise-scale Sudoku platform. Before going live, you should still:
- connect the analytics routes to Supabase
- replace sample metrics with real queries
- expand the puzzle bank
- add richer content posts for AdSense/SEO
- test auth, cookies, and deployment environment settings
