# USAIndiaCFO advisory landing page

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui port of the
original single-file page, which is kept for reference in `reference/original.html`.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Before going live

1. **Environment**: copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_GTM_ID`: the Google Tag Manager container. While it is unset or still `GTM-XXXXXXX`, GTM is not loaded.
   - `NEXT_PUBLIC_LEAD_ENDPOINT` (optional): the HTTPS URL that saves the lead in Zoho CRM and returns `{"ok":true,"lead_id":"..."}`. Defaults to `https://www.usaindiacfo.com/api/lead`.

## Logos

`public/assets/usaindiacfo-logo.png` (header) and `usaindiacfo-mark.png` (footer) were cropped from the
brand pack (`CFO LOGO/Horizontal Logo_R/PNG/1.png` and `CFO LOGO/m_l.png`). `next/image` serves
WebP/AVIF versions automatically.

## Layout

- `src/app/layout.tsx`: metadata, fonts (`next/font`: DM Serif Display and Plus Jakarta Sans), GTM
- `src/app/page.tsx`: the page, composed from the sections
- `src/components/landing/`: one file per section. `lead-form.tsx` is the only client component with real behaviour.
- `src/components/ui/`: shadcn components (Button, Card, Accordion, Input, Textarea, NativeSelect, Checkbox, Label), restyled to the brand
- `src/app/globals.css`: brand tokens, and the base and global rules carried over from the original

The form posts the same JSON payload as the original script, with the same keys,
validation messages, `page_version` (`advisory-lp-v4`) and `generate_lead` dataLayer event.
