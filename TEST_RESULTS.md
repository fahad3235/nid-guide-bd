# TEST_RESULTS.md — NID Guide BD (factory run #274, 2026-11-08 16:00 slot)

## Unit tests — `node tests/logic.test.js`
**74/74 checks, 0 failed.**

Hand-verified values (all asserted in the suite):
- Fees: new = ৳0; correction printed 1st/2nd/3rd+ = ৳230 / ৳345 / ৳575; correction other = ৳115; both = ৳345; renewal regular/urgent = ৳100 / ৳150; re-issue 1st/2nd/3rd+ regular = ৳200 / ৳300 / ৳500 and urgent = ৳300 / ৳500 / ৳1,000. Every one of the 14 fee-table rows matches `feeFor()` exactly.
- Age: DOB 2008-11-08 is exactly 18 on 2026-11-08; 2008-11-09 is 17; leap-day DOB 2000-02-29 is 25 on 2026-02-28 and 26 on 2026-03-01; invalid dates (month 13, Feb 30, garbage) rejected.
- Eligibility: 18 + citizen + both documents = eligible; DOB 2010-01-01 = underage, turns 18 on 2028-01-01; non-citizen rejected; missing birth certificate and/or SSC certificate listed individually.
- Quiz: all-correct = 10/10, 100%, A+; 5 correct = 50%, D; 0 correct = F; 10 questions, unique ids, 4 options each, answer index 0–3, every question has an EN+BN explanation.
- Data: 3 guides (6/6/5 steps), 5 checklists, 23 items total (6+5+4+4+4); guide progress 3/6 = 50%; checklist progress 2/6 = 33%; import validation rejects wrong app, missing version, quizBest 11, non-object guideDone/checks, null and arrays.
- Formatting: ৳1,000 EN / ৳১,০০০ BN; toBnDigits('2026') = '২০২৬'.

## Headless-Chrome smoke — `node tests/smoke.js`
**51/51 checks, 0 failed, 0 console/page errors, 0 non-file network requests.**

Flows verified in a real browser (raw CDP, headless_shell-1187, `?asof=2026-11-08`):
- Page loads: title "NID Guide BD", 4 fact chips incl. the portal URL, 6 tabs, disclaimer renders.
- Fee calculator: default new registration = "Free", times row hidden; correction printed 2nd = ৳345; re-issue 1st urgent = ৳300; fee chart has 14 rows; clicking the renewal-urgent row loads ৳150 and sets the service to renewal.
- Guides: 3 cards, 6/6/5 steps; ticking a step shows 1/6 and persists across reload.
- Checklists: 5 cards, 23 items; overall 0/23 → 1/23 after a tick; persists across reload.
- Eligibility: DOB 2000-01-01 + citizen + both documents = eligible, age 26; DOB 2015-06-01 = underage, turns 18 on 2033-06-01; unchecking both documents lists "birth certificate".
- Quiz: Q1 correct feedback shows; answering all 10 correctly gives 10/10, grade A+; best score 10 persists across reload.
- Data: export payload is `nid-guide-bd` v1 and carries guide progress; eraseAll clears it; valid import restores it; wrong-app import rejected with data intact.
- Language: Bangla toggle shows title "এনআইডি গাইড বিডি" and Bengali digits; persists across reload; back to English works.
- Mobile: 390px viewport — no horizontal overflow on fees, guides or checklists tabs.

## Repairs
0 app-logic bugs, 0 test-side fixes. Both suites green on the first run.

## Fee verification (done before building)
- Daily Star (EC gazette): renewal ৳100/৳150 urgent; re-issue ৳200/৳300, ৳300/৳500, ৳500/৳1,000; cards renewed after 15 years.
- UNB: printed-info correction ৳230 first / ৳345 second / ৳575 after; other info ৳115; payment via bKash/Rocket/OK Wallet/T-Cash; editing unlocks ~30 min after payment; corrected smart card up to ~2 months; NID since 22 Jul 2006; smart card launched 2 Oct 2016.
- allresultbd.com (updated 2026-11-01): confirms ৳230 / ৳115 / ৳345 (both together).
- All figures are labelled "reported" in the UI, footer and README, with a verify-on-the-portal instruction.
