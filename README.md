# NID Guide BD

An offline, bilingual (English / বাংলা) guide to the Bangladesh National Identity Card (NID) — fees, step-by-step processes, document checklists, an eligibility checker and a quiz. No sign-up, no uploads, no network calls: everything runs locally in the browser and all personal progress stays in `localStorage`.

Live site: https://fahad3235.github.io/nid-guide-bd/

## Problem

Getting or fixing an NID card in Bangladesh means navigating the Election Commission portal, a fee schedule that depends on the service and how many times you have used it, and different proof documents for each kind of correction — and brokers charge large sums for what the official process does for a few hundred taka. This app puts the whole process in one place, in plain language, in both English and Bangla.

## Features

1. **Fee calculator** — pick a service and the calculator shows the exact reported fee:
   - New voter registration: free
   - Correction of printed info (name, date of birth, parents' names, address, blood group, place of birth): ৳230 first time, ৳345 second time, ৳575 every time after
   - Correction of other (non-printed) info (occupation, passport, mobile, education): ৳115
   - Both together: ৳345 (৳230 + ৳115)
   - Renewal (15-year): ৳100 regular / ৳150 urgent
   - Re-issue (lost / damaged): 1st ৳200 / ৳300 urgent, 2nd ৳300 / ৳500, 3rd+ ৳500 / ৳1,000
2. **Official fee chart** — all 14 fee rows in one table; tapping a row loads it into the calculator.
3. **Step-by-step guides** — new voter registration (6 steps), correcting information (6 steps), re-issuing a lost or damaged card (5 steps). Tick steps as you finish them; progress is saved.
4. **Document checklists** — 5 lists, 23 items (new registration, name correction, date-of-birth correction, address correction, re-issue) with per-list and overall progress.
5. **Eligibility checker** — enter a date of birth and tick citizenship / birth certificate / SSC certificate; the app reports eligible, under 18 (with the exact date you turn 18), not a citizen, or which documents are still missing.
6. **NID quiz** — 10 questions with instant feedback and explanations; best score saved.
7. **My data** — JSON export of guide progress, checklists and best quiz score; strict import validation; typed-`DELETE` erase-all.
8. **Bilingual** — full English / বাংলা toggle, persisted; Bengali digits in Bangla mode; responsive down to 390px mobile.

## Stack

Vanilla HTML / CSS / JavaScript. No build step, no dependencies, no network requests. Pure logic lives in `js/logic.js` (testable with Node); content in `js/data.js`; UI strings in `js/i18n.js`.

## Prerequisites

Any modern browser. For tests: Node.js 18+ and a headless Chromium (the smoke test uses the Playwright `headless_shell` binary if present, or `CHROME_BIN`).

## Install & run

```bash
# Just open it — no server or build needed:
open index.html
# or serve it:
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Testing

```bash
node tests/logic.test.js   # 74 node unit checks (fees, age, eligibility, quiz, import)
node tests/smoke.js        # 51 headless-Chrome checks (UI flows, persistence, i18n, mobile)
```

Both suites pass with 0 failures and 0 console/page errors. See [TEST_RESULTS.md](TEST_RESULTS.md) for the hand-verified values.

## Deployment

Static site — publish the repo root with GitHub Pages (main branch, root).

## Fee sources

- The Daily Star — "NID renewal, correction to cost from September 1" (EC gazette notification): renewal ৳100 / ৳150 urgent; re-issue ৳200/৳300, ৳300/৳500, ৳500/৳1,000.
- UNB — "Bangladesh Smart National ID Card Correction Process": printed-info correction ৳230 / ৳345 / ৳575; other info ৳115; editing unlocks ~30 minutes after payment; corrected smart card takes up to about 2 months; NID since 22 July 2006; smart card launched 2 October 2016.
- allresultbd.com (updated 2026-11-01): same ৳230 / ৳115 / ৳345 figures.

## Limitations

- **Unofficial guide, not a government publication.** Fees and steps are reported figures; the amount shown on `services.nidw.gov.bd` at the time you apply is final — always verify there before paying.
- The app cannot check a real NID status or submit an application — it only explains the process. All applications happen on the official portal.
- Processing times ("often 15–20 days for simple corrections", "up to about 2 months") are reported ranges, not guarantees.
- New voter registration is shown as free (first-time enrolment has no EC fee); any future fee change would appear on the portal first.

## Status

Factory run #274 (2026-11-08, 16:00 slot). Complete and verified — see [TEST_RESULTS.md](TEST_RESULTS.md).
