// NID Guide BD — node unit tests (no dependencies).
// Usage: node tests/logic.test.js
const L = require('../js/logic.js');
const DATA = require('../js/data.js');

let count = 0, failures = 0;
function check(name, cond, extra) {
  count++;
  console.log((cond ? 'ok - ' : 'FAIL - ') + name + (cond ? '' : ' :: ' + (extra || '')));
  if (!cond) failures++;
}

// --- fee engine: hand-verified against the EC schedule ---
check('new registration is free', L.feeFor('new', 0, false).fee === 0);
check('correction printed 1st = 230', L.feeFor('correctionPrinted', 1, false).fee === 230);
check('correction printed 2nd = 345', L.feeFor('correctionPrinted', 2, false).fee === 345);
check('correction printed 3rd+ = 575', L.feeFor('correctionPrinted', 3, false).fee === 575);
check('correction other = 115', L.feeFor('correctionOther', 0, false).fee === 115);
check('correction both = 345 (230+115)', L.feeFor('correctionBoth', 0, false).fee === 345);
check('renewal regular = 100', L.feeFor('renewal', 0, false).fee === 100);
check('renewal urgent = 150', L.feeFor('renewal', 0, true).fee === 150);
check('reissue 1st regular = 200', L.feeFor('reissue', 1, false).fee === 200);
check('reissue 1st urgent = 300', L.feeFor('reissue', 1, true).fee === 300);
check('reissue 2nd regular = 300', L.feeFor('reissue', 2, false).fee === 300);
check('reissue 2nd urgent = 500', L.feeFor('reissue', 2, true).fee === 500);
check('reissue 3rd+ regular = 500', L.feeFor('reissue', 3, false).fee === 500);
check('reissue 3rd+ urgent = 1000', L.feeFor('reissue', 3, true).fee === 1000);
check('bad service rejected', L.feeFor('nope', 1, false).ok === false);
check('correction printed needs times', L.feeFor('correctionPrinted', 0, false).ok === false);
check('reissue needs times', L.feeFor('reissue', 0, false).ok === false);
check('fee table has 14 rows', L.FEE_TABLE.length === 14);
check('fee table rows match feeFor', L.FEE_TABLE.every(function (r) {
  return L.feeFor(r.service, r.times, r.urgent).fee === r.fee;
}));

// --- formatting ---
check('formatTaka EN 230', L.formatTaka(230, 'en') === '৳230');
check('formatTaka EN 1000 with comma', L.formatTaka(1000, 'en') === '৳1,000');
check('formatTaka BN 230', L.formatTaka(230, 'bn') === '৳২৩০');
check('formatTaka BN 1000', L.formatTaka(1000, 'bn') === '৳১,০০০');
check('toBnDigits 2026', L.toBnDigits('2026') === '২০২৬');
check('toBnDigits mixed', L.toBnDigits('Age 18') === 'Age ১৮');

// --- age math ---
const ASOF = new Date(2026, 10, 8); // 2026-11-08
check('age exactly 18 on birthday', L.ageOn('2008-11-08', ASOF) === 18);
check('age 17 day before 18th birthday', L.ageOn('2008-11-09', ASOF) === 17);
check('age 26', L.ageOn('2000-01-01', ASOF) === 26);
check('leap baby 2000-02-29: 25 on 2026-02-28', L.ageOn('2000-02-29', new Date(2026, 1, 28)) === 25);
check('leap baby 2000-02-29: 26 on 2026-03-01', L.ageOn('2000-02-29', new Date(2026, 2, 1)) === 26);
check('bad month rejected', L.ageOn('2008-13-01', ASOF) === null);
check('bad day rejected', L.ageOn('2008-02-30', ASOF) === null);
check('garbage rejected', L.ageOn('not-a-date', ASOF) === null);
check('empty rejected', L.ageOn('', ASOF) === null);
check('18th birthday computed', L.eighteenthBirthday('2008-11-08') === '2026-11-08');
check('18th birthday leap', L.eighteenthBirthday('2008-02-29') === '2026-03-01' || L.eighteenthBirthday('2008-02-29') === '2026-02-28');

// --- eligibility ---
function elig(dob, citizen, bc, ssc) {
  return L.checkEligibility({ dob: dob, citizen: citizen, hasBirthCert: bc, hasSsc: ssc, asof: ASOF });
}
let r = elig('2008-11-08', true, true, true);
check('eligible at exactly 18 with docs', r.verdict === 'eligible' && r.age === 18);
r = elig('2010-01-01', true, true, true);
check('underage at 16, turns 18 in 2028', r.verdict === 'underage' && r.age === 16 && r.turns18 === '2028-01-01');
r = elig('2000-05-05', false, true, true);
check('not a citizen rejected', r.verdict === 'not-citizen');
r = elig('2000-05-05', true, false, true);
check('missing birth cert listed', r.verdict === 'missing-docs' && r.missing.length === 1 && r.missing[0] === 'birthCert');
r = elig('2000-05-05', true, false, false);
check('both docs missing listed', r.verdict === 'missing-docs' && r.missing.length === 2);
r = elig('bad', true, true, true);
check('bad dob verdict', r.verdict === 'bad-dob');

// --- quiz grading ---
const qs = DATA.QUIZ;
check('quiz has 10 questions', qs.length === 10);
check('quiz ids unique', new Set(qs.map(function (q) { return q.id; })).size === 10);
check('every question has 4 options + answer 0-3 + why', qs.every(function (q) {
  return q.options.length === 4 && q.answer >= 0 && q.answer <= 3 &&
    q.why && q.why.en.length > 5 && q.why.bn.length > 5;
}));
check('quiz answers spread across indexes', new Set(qs.map(function (q) { return q.answer; })).size >= 3);
let g = L.gradeQuiz(qs, qs.map(function (q) { return q.answer; }));
check('all correct = 10/10 100% A+', g.score === 10 && g.pct === 100 && g.grade === 'A+');
g = L.gradeQuiz(qs, qs.map(function (q, i) { return i < 5 ? q.answer : (q.answer + 1) % 4; }));
check('5 correct = 5/10 50% D', g.score === 5 && g.pct === 50 && g.grade === 'D');
g = L.gradeQuiz(qs, qs.map(function (q) { return (q.answer + 1) % 4; }));
check('0 correct = 0/10 F', g.score === 0 && g.grade === 'F');
check('quiz Q1 answer is the portal', qs[0].answer === 0 && qs[0].options[0].en === 'services.nidw.gov.bd');
check('quiz Q2 answer is 230', qs[1].answer === 1);
check('quiz Q5 answer is 15 years', qs[4].answer === 2);

// --- guides / checklists data integrity ---
check('3 guides', DATA.GUIDES.length === 3);
check('guide ids unique', new Set(DATA.GUIDES.map(function (x) { return x.id; })).size === 3);
check('guide step counts 6/6/5', DATA.GUIDES[0].steps.length === 6 && DATA.GUIDES[1].steps.length === 6 && DATA.GUIDES[2].steps.length === 5);
check('every step has EN+BN title and detail', DATA.GUIDES.every(function (gd) {
  return gd.steps.every(function (s) {
    return s.title.en.length > 3 && s.title.bn.length > 3 && s.detail.en.length > 20 && s.detail.bn.length > 10;
  });
}));
check('5 checklists', DATA.CHECKLISTS.length === 5);
const totalItems = DATA.CHECKLISTS.reduce(function (a, c) { return a + c.items.length; }, 0);
check('23 checklist items total (6+5+4+4+4)', totalItems === 23, 'got ' + totalItems);
check('checklist item ids unique', (function () {
  const ids = [];
  DATA.CHECKLISTS.forEach(function (c) { c.items.forEach(function (i) { ids.push(i.id); }); });
  return new Set(ids).size === ids.length;
})());
check('4 facts', DATA.FACTS.length === 4);

// --- progress helpers ---
const g0 = DATA.GUIDES[0];
check('guide progress 0/6 = 0%', L.guideProgress(g0, []).pct === 0);
check('guide progress 3/6 = 50%', L.guideProgress(g0, g0.steps.slice(0, 3).map(function (s) { return s.id; })).pct === 50);
check('guide progress ignores unknown ids', L.guideProgress(g0, ['nope']).done === 0);
const c0 = DATA.CHECKLISTS[0];
check('checklist progress 2/6 = 33%', L.checklistProgress(c0, c0.items.slice(0, 2).map(function (i) { return i.id; })).pct === 33);

// --- import validation ---
check('valid import ok', L.validateImport({ app: 'nid-guide-bd', version: 1, guideDone: {}, checks: {}, quizBest: 7 }).ok);
check('wrong app rejected', !L.validateImport({ app: 'dua-bd', version: 1 }).ok);
check('missing version rejected', !L.validateImport({ app: 'nid-guide-bd' }).ok);
check('quizBest 11 rejected', !L.validateImport({ app: 'nid-guide-bd', version: 1, quizBest: 11 }).ok);
check('quizBest 10 ok', L.validateImport({ app: 'nid-guide-bd', version: 1, quizBest: 10 }).ok);
check('bad guideDone rejected', !L.validateImport({ app: 'nid-guide-bd', version: 1, guideDone: [] }).ok);
check('bad checks rejected', !L.validateImport({ app: 'nid-guide-bd', version: 1, checks: 'x' }).ok);
check('null rejected', !L.validateImport(null).ok);
check('array rejected', !L.validateImport([]).ok);

// --- escaping ---
check('esc escapes html', L.esc('<a href="x">&') === '&lt;a href=&quot;x&quot;&gt;&amp;');

console.log('\n' + count + ' checks, ' + failures + ' failed');
process.exit(failures ? 1 : 0);
