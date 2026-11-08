// NID Guide BD — pure logic (no DOM). Testable with node.
// Fee rules: EC NID Wing schedule as reported by The Daily Star (gazette,
// Sep 2015-era schedule still in force per 2026 reports) and UNB.
//   - Printed-info correction (name, DOB, parents' names, address, blood
//     group, place of birth): 1st time 230, 2nd time 345, 3rd+ time 575.
//   - Other (non-printed) info (occupation, passport, mobile, education):
//     115 every time.
//   - Both together: 230 + 115 = 345.
//   - Renewal (15-year): regular 100, urgent 150.
//   - Reissue (lost/damaged): 1st 200/300 urgent, 2nd 300/500, 3rd+ 500/1000.
//   - New voter registration: free (0).
// All amounts are integer taka. The amount shown on services.nidw.gov.bd at
// application time is final — the app labels every figure "reported".
(function (root) {
  'use strict';

  var BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  var SERVICES = ['new', 'correctionPrinted', 'correctionOther', 'correctionBoth', 'renewal', 'reissue'];

  var FEE_TABLE = [
    { service: 'new', times: 0, urgent: false, fee: 0, label: 'new' },
    { service: 'correctionPrinted', times: 1, urgent: false, fee: 230, label: 'correctionPrinted1' },
    { service: 'correctionPrinted', times: 2, urgent: false, fee: 345, label: 'correctionPrinted2' },
    { service: 'correctionPrinted', times: 3, urgent: false, fee: 575, label: 'correctionPrinted3' },
    { service: 'correctionOther', times: 0, urgent: false, fee: 115, label: 'correctionOther' },
    { service: 'correctionBoth', times: 0, urgent: false, fee: 345, label: 'correctionBoth' },
    { service: 'renewal', times: 0, urgent: false, fee: 100, label: 'renewalRegular' },
    { service: 'renewal', times: 0, urgent: true, fee: 150, label: 'renewalUrgent' },
    { service: 'reissue', times: 1, urgent: false, fee: 200, label: 'reissue1' },
    { service: 'reissue', times: 1, urgent: true, fee: 300, label: 'reissue1u' },
    { service: 'reissue', times: 2, urgent: false, fee: 300, label: 'reissue2' },
    { service: 'reissue', times: 2, urgent: true, fee: 500, label: 'reissue2u' },
    { service: 'reissue', times: 3, urgent: false, fee: 500, label: 'reissue3' },
    { service: 'reissue', times: 3, urgent: true, fee: 1000, label: 'reissue3u' }
  ];

  function toBnDigits(v) {
    return String(v).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }

  function formatTaka(n, lang) {
    var s = String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return lang === 'bn' ? '৳' + toBnDigits(s) : '৳' + s;
  }

  // feeFor(service, times, urgent) -> {ok, fee} or {ok:false, error}
  // times: 0 = not applicable, 1/2/3 (3 means "3rd time or more").
  function feeFor(service, times, urgent) {
    if (SERVICES.indexOf(service) === -1) return { ok: false, error: 'bad-service' };
    if (service === 'new') return { ok: true, fee: 0 };
    if (service === 'correctionOther') return { ok: true, fee: 115 };
    if (service === 'correctionBoth') return { ok: true, fee: 345 };
    if (service === 'correctionPrinted') {
      if (times === 1) return { ok: true, fee: 230 };
      if (times === 2) return { ok: true, fee: 345 };
      if (times === 3) return { ok: true, fee: 575 };
      return { ok: false, error: 'bad-times' };
    }
    if (service === 'renewal') {
      return { ok: true, fee: urgent ? 150 : 100 };
    }
    if (service === 'reissue') {
      if (times === 1) return { ok: true, fee: urgent ? 300 : 200 };
      if (times === 2) return { ok: true, fee: urgent ? 500 : 300 };
      if (times === 3) return { ok: true, fee: urgent ? 1000 : 500 };
      return { ok: false, error: 'bad-times' };
    }
    return { ok: false, error: 'bad-service' };
  }

  // Age in whole years on `asof` (Date). asof defaults to today.
  function ageOn(dobStr, asof) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobStr || '');
    if (!m) return null;
    var y = +m[1], mo = +m[2], d = +m[3];
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
    var dob = new Date(y, mo - 1, d);
    if (dob.getFullYear() !== y || dob.getMonth() !== mo - 1 || dob.getDate() !== d) return null;
    var ref = asof instanceof Date ? asof : new Date();
    var age = ref.getFullYear() - y;
    if (ref.getMonth() < mo - 1 || (ref.getMonth() === mo - 1 && ref.getDate() < d)) age--;
    return age;
  }

  function eighteenthBirthday(dobStr) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobStr || '');
    if (!m) return null;
    var d = new Date(+m[1] + 18, +m[2] - 1, +m[3]);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  // Eligibility for new voter registration.
  // input: {dob, citizen, hasBirthCert, hasSsc, asof}
  // returns {verdict: 'eligible'|'underage'|'not-citizen'|'missing-docs'|'bad-dob',
  //          age, turns18, missing: []}
  function checkEligibility(input) {
    var age = ageOn(input.dob, input.asof);
    if (age === null) return { verdict: 'bad-dob', age: null, turns18: null, missing: [] };
    if (!input.citizen) return { verdict: 'not-citizen', age: age, turns18: null, missing: [] };
    if (age < 18) {
      return { verdict: 'underage', age: age, turns18: eighteenthBirthday(input.dob), missing: [] };
    }
    var missing = [];
    if (!input.hasBirthCert) missing.push('birthCert');
    if (!input.hasSsc) missing.push('ssc');
    if (missing.length) return { verdict: 'missing-docs', age: age, turns18: null, missing: missing };
    return { verdict: 'eligible', age: age, turns18: null, missing: [] };
  }

  // Quiz scoring: answers = array of chosen option indexes (per question).
  function gradeQuiz(questions, answers) {
    var score = 0;
    var detail = [];
    questions.forEach(function (q, i) {
      var ok = answers[i] === q.answer;
      if (ok) score++;
      detail.push({ id: q.id, correct: ok });
    });
    var total = questions.length;
    var pct = total ? Math.round((score / total) * 100) : 0;
    var grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F';
    return { score: score, total: total, pct: pct, grade: grade, detail: detail };
  }

  function guideProgress(guide, doneSteps) {
    var total = guide.steps.length;
    var done = guide.steps.filter(function (s) { return doneSteps.indexOf(s.id) !== -1; }).length;
    return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function checklistProgress(list, checked) {
    var total = list.items.length;
    var done = list.items.filter(function (it) { return checked.indexOf(it.id) !== -1; }).length;
    return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  // Strict validation for the exported data blob.
  function validateImport(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false, error: 'not-object' };
    if (data.app !== 'nid-guide-bd' || typeof data.version !== 'number') return { ok: false, error: 'bad-app' };
    if (data.guideDone !== undefined) {
      if (typeof data.guideDone !== 'object' || Array.isArray(data.guideDone)) return { ok: false, error: 'bad-guideDone' };
      var gk = Object.keys(data.guideDone);
      for (var i = 0; i < gk.length; i++) {
        if (!Array.isArray(data.guideDone[gk[i]])) return { ok: false, error: 'bad-guideDone' };
        for (var j = 0; j < data.guideDone[gk[i]].length; j++) {
          if (typeof data.guideDone[gk[i]][j] !== 'string') return { ok: false, error: 'bad-guideDone' };
        }
      }
    }
    if (data.checks !== undefined) {
      if (typeof data.checks !== 'object' || Array.isArray(data.checks)) return { ok: false, error: 'bad-checks' };
      var ck = Object.keys(data.checks);
      for (var a = 0; a < ck.length; a++) {
        if (!Array.isArray(data.checks[ck[a]])) return { ok: false, error: 'bad-checks' };
      }
    }
    if (data.quizBest !== undefined) {
      if (typeof data.quizBest !== 'number' || data.quizBest < 0 || data.quizBest > 10) return { ok: false, error: 'bad-quizBest' };
    }
    return { ok: true };
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var api = {
    SERVICES: SERVICES, FEE_TABLE: FEE_TABLE, feeFor: feeFor,
    toBnDigits: toBnDigits, formatTaka: formatTaka,
    ageOn: ageOn, eighteenthBirthday: eighteenthBirthday,
    checkEligibility: checkEligibility, gradeQuiz: gradeQuiz,
    guideProgress: guideProgress, checklistProgress: checklistProgress,
    validateImport: validateImport, esc: esc
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NidLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
