# LV DJ — booking site

Marketing + booking site for **LV DJ** (Loukas V), Sydney open-format DJ. Built with Next.js 15 (App Router) + Tailwind + Framer Motion. Booking form posts to a server route that pings the DJ via **ClickSend SMS**.

## Stack

- Next.js 15 (App Router, TypeScript, strict mode)
- Tailwind CSS v3
- Framer Motion (scroll/entry animations)
- ClickSend REST API (SMS delivery)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables

Set these in `.env.local` (dev) and your hosting provider (prod):

| Name | Description |
|---|---|
| `CLICKSEND_USERNAME` | Your ClickSend account/sub-account username |
| `CLICKSEND_API_KEY`  | API key from `dashboard.clicksend.com/account/subaccounts` |
| `DJ_PHONE_NUMBER`    | E.164 number that receives booking SMS, e.g. `+614XXXXXXXX` |
| `SMS_SENDER_ID`      | Optional. Max 11 alphanumeric chars. Defaults to `LVDJ` |

> Without these, the `/api/book` route returns a clean 500 with a friendly fallback ("DM @lv._.dj") — the rest of the site still renders.

## ClickSend setup

1. Create an account at https://www.clicksend.com/
2. Top up SMS credit (sending to Australian mobiles is ~$0.08–$0.10 per SMS as of writing).
3. Grab your username + API key from **Account → API Credentials**.
4. (Optional) Whitelist the alpha sender ID `LVDJ` so SMS appear from "LVDJ" rather than a shared shortcode. Australia allows alpha sender IDs without registration; some other countries require pre-approval.

## How the booking flow works

1. User fills the form (`components/site/BookingForm.tsx`).
2. Client POSTs JSON to `/api/book`.
3. Server route validates + sanitises, then calls `lib/clicksend.ts` → `sendSms()`.
4. ClickSend delivers an SMS to `DJ_PHONE_NUMBER` with the booking details.
5. UI swaps to a success state.

The form has a hidden honeypot (`company` field) — if a bot fills it, the route silently 200s without sending SMS.

## Project structure

```
app/
  layout.tsx           # Fonts (Anton, Bebas, Space Grotesk, JetBrains Mono) + metadata
  page.tsx             # Home: composes all sections
  globals.css          # CSS vars, custom field/scrollbar styling
  api/book/route.ts    # POST /api/book → ClickSend SMS
components/
  site/                # Page sections (Hero, Packages, BookingForm, etc.)
  ui/                  # Reusable bits (LvMark, Equalizer)
data/packages.ts       # Bronze / Silver / Gold definitions (single source of truth)
lib/
  clicksend.ts         # Thin ClickSend client
  utils.ts             # cn() helper
```

## Editing the packages

Change one place: `data/packages.ts`. Pricing, inclusions, and best-for copy all flow through to the Packages section and the booking form pills.

## Deploy

Designed for Vercel. Push the repo, add the four env vars in the Vercel dashboard, and ship. The `/api/book` route runs on the Node.js runtime (declared explicitly so the ClickSend Basic-auth header works).

## Notes / known caveats

- The Instagram handle linked in the footer is `@lv._.dj` (and `@loukas_.v._`). Confirm with Loukas before going live.
- The "1.1K followers" stat in the About section is hard-coded — update `components/site/About.tsx` if you want it to match the live follower count.
- `metadataBase` in `app/layout.tsx` is set to `https://lvdj.com.au`. Change if the production domain differs.
