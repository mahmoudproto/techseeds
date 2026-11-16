# TechSeeds Academy

A free placement test for Tech Seeds Academy. A child answers 10 or 15 questions, the parent leaves a name and WhatsApp number, and the site shows a short result with a button to book the free evaluation interview. Every result is saved to a Google Sheet.

- Three versions, picked by age: **A** (6–9), **B** (10–13), **C** (14–18).
- Three parts: thinking, technology, interests.
- The parent sees the closest track and one strength. The tech level and all scores go to the sheet only.
- Scoring runs on the server, so correct answers never reach the browser.

Design: https://claude.ai/artifact/9xF1ziorZTeNZYbauLudQA

## Put it online (Vercel)

1. Go to vercel.com → **Add New → Project** and import this GitHub repo. Keep the default settings and click **Deploy**.
2. Follow [`docs/google-sheet-setup.md`](docs/google-sheet-setup.md) to connect the Google Sheet.
3. Every push to `main` redeploys the site automatically.

## Change the questions

The questions live in `src/lib/content/`:

- `versionA.ts`, `versionB.ts`, `versionC.ts` — the wording, options, correct answers and track of each option.
- `src/lib/labels.ts` — track names, result lines, WhatsApp number.

After editing, run `npm test`. The tests check that every question still has a valid answer and that no answer leaks to the browser.

## Run it on your computer

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # scoring, validation and content checks
npm run build
```

Copy `.env.example` to `.env.local` and fill in `SHEET_WEBHOOK_URL` to save results while testing locally.
