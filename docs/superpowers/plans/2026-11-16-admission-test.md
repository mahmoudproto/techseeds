# Tech Seeds Admission Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A branded Arabic placement-test site (three age versions) that scores on the server, saves each lead to a Google Sheet, and shows the parent a short result with a WhatsApp booking button.

**Architecture:** One Next.js App Router page. A server component strips answers from the question content and hands the public questions to a client flow (welcome → questions → lead form → result). `POST /api/submit` validates, scores, forwards one row to a Google Apps Script webhook, and returns only the parent-facing summary.

**Tech Stack:** Next.js 16, React 19, TypeScript, plain CSS (no Tailwind), `@fontsource/cairo` + `@fontsource/poppins` (self-hosted fonts), Vitest.

**Spec:** https://claude.ai/artifact/9xF1ziorZTeNZYbauLudQA ("Tech Seeds admission test — design", approved 2026-11-16). Question wording lives in `src/lib/content/`.

## Global Constraints

- Age → version: 6–9 → A, 10–13 → B, 14–18 → C. Anything else is rejected.
- Lengths: A = 10 questions (4 thinking, 3 tech, 3 interests); B and C = 15 (5/5/5).
- Tracks: A offers `programming`, `ai`; B and C offer `programming`, `gamedev`, `ai`, `cyber`.
- Tech level thresholds: A (max 4): 0–1 مبتدئ, 2–3 عنده أساس, 4 متقدم. B/C (max 6): 0–2, 3–4, 5–6.
- Experience question adds at most 2 points; «مش عارف» scores 0.
- Strength tie order: logic, pattern, math. No thinking answer correct → `start`.
- The API response never contains scores, tech level, or correct answers.
- Correct answers and track mappings never reach the browser.
- Colours from the Figma site: green `#2FA84F`, navy `#122E4F`, body `#66788C`, blue `#3EAAE5`, tints `#E6F2FC` `#E5F5EB` `#FEF6E5`, border `#E8EDF2`, footer `#0B2038`.
- Buttons and headings in formal Arabic; questions in Egyptian Arabic. RTL, phone first.
- WhatsApp number: `201129877798`.
- Env: `SHEET_WEBHOOK_URL` (required for saving), `SHEET_WEBHOOK_SECRET` (optional).

## Review Focus

1. Phone typed with Arabic-Indic digits, spaces, or `+20` → normalised to `01xxxxxxxxx` and accepted. (Task 2 test)
2. Google Sheet unreachable or env var missing → parent still gets the result; response carries `saved: false`. (Task 4 test)
3. Tampered or incomplete answers (unknown option id, missing question) → 400, nothing saved. (Task 3 test)
4. Names starting with `=`, `+`, `-`, `@` → prefixed with `'` before going to the sheet. (Task 4 test)
5. Double tap on submit / page refresh mid-test → one submission; answers restored from sessionStorage. (Task 5, manual check)

---

### Task 1: Scaffold and content

**Files:** `package.json`, `tsconfig.json`, `next.config.mjs`, `.gitignore`, `.env.example`, `src/lib/types.ts`, `src/lib/content/{versionA,versionB,versionC,index}.ts`, `tests/content.test.ts`

**Produces:**
- `type VersionId = 'A' | 'B' | 'C'`, `type Track = 'programming' | 'gamedev' | 'ai' | 'cyber'`, `type Tag = 'pattern' | 'math' | 'logic'`
- `type Question` = `ChoiceQuestion` (`kind: 'thinking' | 'tech'`, `correct: string`, `tag?`) | `ExperienceQuestion` (`kind: 'experience'`, options carry `points`, one option `none: true`) | `InterestQuestion` (`kind: 'interest'`, options carry `track`)
- `getTest(v: VersionId): TestDefinition`, `toPublic(t: TestDefinition): PublicTest` (drops `correct`, `points`, `track`, `tag`)

- [ ] Test: each version has the right question counts per kind; every `correct` id exists among the options; interest questions cover exactly the version's tracks; `JSON.stringify(toPublic(...))` contains none of `correct`, `track`, `points`.
- [ ] Implement, run `npm test`, commit.

### Task 2: Validation

**Files:** `src/lib/validate.ts`, `tests/validate.test.ts`

**Produces:** `versionForAge(age: number): VersionId | null`, `normalizePhone(raw: string): string | null`, `cleanName(raw: string): string | null` (trim, 2–60 chars)

- [ ] Test: ages 5, 6, 9, 10, 13, 14, 18, 19 → null, A, A, B, B, C, C, null. Phones `01129877798`, `+20 112 987 7798`, `٠١١٢٩٨٧٧٧٩٨`, `0020-1129877798` → `01129877798`; `0212345678`, `0112987779` → null.
- [ ] Implement, run, commit.

### Task 3: Scoring

**Files:** `src/lib/scoring.ts`, `tests/scoring.test.ts`

**Produces:** `score(test: TestDefinition, answers: Answers): ScoreResult | { error: string }` where `Answers = Record<string, string | string[]>` and `ScoreResult = { thinking: { correct, total }, strength: Tag | 'start', tech: { points, max, level: 'beginner' | 'basic' | 'advanced' }, tracks: Record<Track, number>, top: Track, second: Track | null, tie: boolean }`

- [ ] Test: all-correct B → thinking 5/5, tech 6 advanced; all «مش عارف» + «ولا حاجة» → 0 beginner; experience capped at 2; A interest 2–1 → top `programming`, `second` null; B 2–2–1–0 → tie true with the two leaders; strength tie → logic; none correct → `start`; unknown option id or missing question → error.
- [ ] Implement, run, commit.

### Task 4: Submit API and sheet

**Files:** `src/lib/sheet.ts`, `src/app/api/submit/route.ts`, `tests/sheet.test.ts`, `docs/google-sheet-setup.md`, `docs/apps-script.gs`

**Produces:** `buildRow(input, result): SheetRow`, `sendRow(row): Promise<boolean>` (two attempts, 4 s timeout each), `POST /api/submit` → `{ childName, top, second, tie, strength, saved }`

- [ ] Test: `buildRow` column values and formula-injection guard; `sendRow` returns false when env is unset or fetch rejects.
- [ ] Implement, run, commit.

### Task 5: UI

**Files:** `src/app/{layout.tsx,page.tsx,globals.css}`, `src/components/{TestFlow,Welcome,QuestionCard,Visuals,LeadForm,Result,SiteHeader,SiteFooter}.tsx`, `public/logo-icon.svg`

- [ ] Build the flow per the spec: welcome (name, age) → one question per screen with progress, «السابق»/«التالي» → lead form → result with WhatsApp button. Options shuffled per child. Answers kept in sessionStorage (try/catch). Submit button disabled while sending.
- [ ] `npm run build` passes. Screenshot each screen at 390 px and 1280 px and compare against the Figma look.
- [ ] Commit.

### Task 6: End-to-end check and handover

- [ ] Run the built site, complete versions A, B, C through the browser; confirm the API response has no scores and a mock webhook receives the row.
- [ ] Write `README.md` (Vercel + Google Sheet steps). Push.
