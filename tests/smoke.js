// NID Guide BD — headless-Chrome smoke test via raw CDP (no puppeteer dependency).
// Usage: node tests/smoke.js
// Exits non-zero on any failed assertion; fails on page console errors.
// ?asof=2026-11-08 pins "today" for the eligibility checker.
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const PORT = 9347;
const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html') + '?asof=2026-11-08';
let failures = 0;
let count = 0;
const pageErrors = [];
function check(name, cond, extra) {
  count++;
  console.log((cond ? 'ok - ' : 'FAIL - ') + name + (cond ? '' : ' :: ' + (extra || '')));
  if (!cond) failures++;
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const CHROME_BIN = process.env.CHROME_BIN ||
    require('os').homedir() + '/.cache/ms-playwright/chromium_headless_shell-1187/chrome-linux/headless_shell';
  const chrome = spawn(CHROME_BIN, [
    '--headless=new', '--no-sandbox', '--disable-gpu',
    '--remote-debugging-port=' + PORT, '--user-data-dir=/tmp/nid-smoke-' + process.pid,
    'about:blank',
  ], { stdio: 'ignore' });
  let targets = [];
  for (let i = 0; i < 50 && targets.length === 0; i++) {
    await wait(200);
    try {
      targets = JSON.parse(await new Promise((res, rej) => {
        http.get('http://127.0.0.1:' + PORT + '/json/list', (r) => {
          let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(d));
        }).on('error', rej);
      }));
    } catch (e) { /* retry */ }
  }
  if (!targets.length) { console.log('FAIL - chrome did not start'); process.exit(2); }
  const wsUrl = targets[0].webSocketDebuggerUrl;
  const ws = new WebSocket(wsUrl);
  await new Promise((res) => { ws.onopen = res; });
  let seq = 0; const pending = new Map();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Runtime.exceptionThrown') {
      pageErrors.push('exception: ' + JSON.stringify(msg.params.exceptionDetails).slice(0, 300));
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      pageErrors.push('console.error: ' + JSON.stringify(msg.params.args).slice(0, 300));
    }
  };
  function send(method, params) {
    return new Promise((res) => {
      const id = ++seq;
      pending.set(id, res);
      ws.send(JSON.stringify({ id, method, params: params || {} }));
    });
  }
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: FILE });
  await wait(1500);
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result && r.result.exceptionDetails) return { error: JSON.stringify(r.result.exceptionDetails).slice(0, 300) };
    return r.result ? r.result.result.value : undefined;
  };

  check('page title contains NID Guide', (await ev('document.title'))?.includes('NID Guide'));
  check('4 fact chips render', (await ev(`document.querySelectorAll('#facts .fact').length`)) === 4);
  check('fact mentions portal', (await ev(`document.getElementById('facts').textContent`)).includes('services.nidw.gov.bd'));
  check('6 tabs render', (await ev(`document.querySelectorAll('.tab').length`)) === 6);
  check('fees tab visible by default', (await ev(`document.getElementById('tab-fees').hidden`)) === false);
  check('disclaimer renders', (await ev(`document.querySelector('footer p').textContent.length`)) > 40);

  // Fee calculator: default new registration is free.
  check('default fee is Free', (await ev(`document.getElementById('feeResult').textContent`)) === 'Free');
  check('times row hidden for new registration', (await ev(`document.getElementById('timesRow').hidden`)) === true);
  // Correction printed, 2nd time -> 345.
  await ev(`var s=document.getElementById('feeService'); s.value='correctionPrinted'; s.dispatchEvent(new Event('change'));`);
  await ev(`var s=document.getElementById('feeTimes'); s.value='2'; s.dispatchEvent(new Event('change'));`);
  check('correction printed 2nd = ৳345', (await ev(`document.getElementById('feeResult').textContent`)) === '৳345');
  check('times row shown for correction', (await ev(`document.getElementById('timesRow').hidden`)) === false);
  // Reissue 1st urgent -> 300.
  await ev(`var s=document.getElementById('feeService'); s.value='reissue'; s.dispatchEvent(new Event('change'));`);
  await ev(`var s=document.getElementById('feeTimes'); s.value='1'; s.dispatchEvent(new Event('change'));`);
  await ev(`var s=document.getElementById('feeUrgent'); s.value='urgent'; s.dispatchEvent(new Event('change'));`);
  check('reissue 1st urgent = ৳300', (await ev(`document.getElementById('feeResult').textContent`)) === '৳300');
  // Fee chart: 14 rows; clicking one loads the calculator.
  check('fee chart has 14 rows', (await ev(`document.querySelectorAll('#feeChartBody tr').length`)) === 14);
  check('chart shows ৳230 row', (await ev(`document.getElementById('feeChartBody').textContent`)).includes('৳230'));
  await ev(`document.querySelectorAll('#feeChartBody tr')[7].click()`); // renewal urgent = 150
  check('chart row click loads ৳150', (await ev(`document.getElementById('feeResult').textContent`)) === '৳150');
  check('chart row click sets renewal service', (await ev(`document.getElementById('feeService').value`)) === 'renewal');

  // Guides tab: 3 guides, tick a step -> progress 1/6, persists.
  await ev(`document.getElementById('tabbtn-guides').click()`);
  check('3 guide cards render', (await ev(`document.querySelectorAll('.guide-card').length`)) === 3);
  check('guide 1 has 6 steps', (await ev(`document.querySelectorAll('.guide-card')[0].querySelectorAll('.steps li').length`)) === 6);
  check('guide 3 has 5 steps', (await ev(`document.querySelectorAll('.guide-card')[2].querySelectorAll('.steps li').length`)) === 5);
  await ev(`document.querySelectorAll('.guide-card')[0].querySelector('.steps input[type=checkbox]').click()`);
  check('guide progress 1/6 after tick', (await ev(`document.querySelectorAll('.guide-card')[0].textContent`)).includes('1/6'));

  // Checklists tab: 23 items, overall 0/23 -> 1/23 after tick.
  await ev(`document.getElementById('tabbtn-checklists').click()`);
  check('5 checklist cards render', (await ev(`document.querySelectorAll('.check-card').length`)) === 5);
  check('23 checklist items total', (await ev(`document.querySelectorAll('.checks input[type=checkbox]').length`)) === 23);
  check('overall starts 0/23', (await ev(`document.getElementById('checkOverall').textContent`)).includes('0/23'));
  await ev(`document.querySelectorAll('.check-card')[0].querySelector('.checks input[type=checkbox]').click()`);
  check('overall 1/23 after tick', (await ev(`document.getElementById('checkOverall').textContent`)).includes('1/23'));

  // Reload persistence of guides + checklists.
  await send('Page.navigate', { url: FILE });
  await wait(1200);
  await ev(`document.getElementById('tabbtn-guides').click()`);
  check('guide tick persists after reload', (await ev(`document.querySelectorAll('.guide-card')[0].textContent`)).includes('1/6'));
  await ev(`document.getElementById('tabbtn-checklists').click()`);
  check('checklist tick persists after reload', (await ev(`document.getElementById('checkOverall').textContent`)).includes('1/23'));

  // Eligibility: eligible adult, then underage.
  await ev(`document.getElementById('tabbtn-eligibility').click()`);
  await ev(`document.getElementById('eligDob').value='2000-01-01'; document.getElementById('eligCitizen').checked=true; document.getElementById('eligBirthCert').checked=true; document.getElementById('eligSsc').checked=true;`);
  await ev(`document.getElementById('eligBtn').click()`);
  check('eligible verdict shows', (await ev(`document.getElementById('eligResult').hidden`)) === false);
  check('eligible verdict is good', (await ev(`document.getElementById('eligResult').className`)).includes('good'));
  check('eligible age 26 shown', (await ev(`document.getElementById('eligResult').textContent`)).includes('26'));
  await ev(`document.getElementById('eligDob').value='2015-06-01';`);
  await ev(`document.getElementById('eligBtn').click()`);
  check('underage verdict is warn', (await ev(`document.getElementById('eligResult').className`)).includes('warn'));
  check('underage turns 18 on 2033-06-01', (await ev(`document.getElementById('eligResult').textContent`)).includes('2033-06-01'));
  await ev(`document.getElementById('eligDob').value='2000-01-01'; document.getElementById('eligBirthCert').checked=false; document.getElementById('eligSsc').checked=false;`);
  await ev(`document.getElementById('eligBtn').click()`);
  check('missing docs listed', (await ev(`document.getElementById('eligResult').textContent`)).includes('birth certificate'));

  // Quiz: start, answer all 10 correctly, score 10/10, best persists.
  await ev(`document.getElementById('tabbtn-quiz').click()`);
  await ev(`document.getElementById('quizStartBtn').click()`);
  const answers = [0, 1, 1, 2, 2, 2, 1, 1, 1, 3];
  for (let i = 0; i < 10; i++) {
    await ev(`document.querySelectorAll('#quizBox .opt')[${answers[i]}].click()`);
    await wait(80);
    if (i === 0) check('Q1 correct feedback shows', (await ev(`document.getElementById('quizFeed').textContent`)).includes('Correct!'));
    await ev(`document.getElementById('quizNextBtn').click()`);
    await wait(80);
  }
  check('quiz result 10/10', (await ev(`document.getElementById('quizBox').textContent`)).includes('10/10'));
  check('quiz grade A+ shown', (await ev(`document.getElementById('quizBox').textContent`)).includes('A+'));
  await send('Page.navigate', { url: FILE });
  await wait(1200);
  await ev(`document.getElementById('tabbtn-quiz').click()`);
  check('best score 10 persists after reload', (await ev(`document.getElementById('quizBox').textContent`)).includes('10/10'));

  // Export / import round-trip + invalid import via test hooks.
  const payload = await ev(`JSON.stringify(window.__nid.exportPayload())`);
  check('export payload is nid-guide-bd v1', payload.includes('"app":"nid-guide-bd"') && payload.includes('"version":1'), payload);
  check('export payload carries guide progress', payload.includes('"new":["new-1"]') || payload.includes('"new":["new-1"]'));
  await ev(`window.__nid.eraseAll()`);
  check('eraseAll clears guide progress', (await ev(`JSON.stringify(window.__nid.exportPayload())`)).includes('"guideDone":{}'));
  const imp = await ev(`JSON.stringify(window.__nid.importPayload(${JSON.stringify(payload)}))`);
  check('import valid payload ok', imp.includes('"ok":true'), imp);
  check('import restores guide progress', (await ev(`JSON.stringify(window.__nid.exportPayload())`)).includes('new-1'));
  const badImp = await ev(`JSON.stringify(window.__nid.importPayload('{"app":"dua-bd","version":1}'))`);
  check('import wrong app rejected', badImp.includes('"ok":false'));
  check('invalid import leaves data intact', (await ev(`JSON.stringify(window.__nid.exportPayload())`)).includes('new-1'));
  await ev(`window.__nid.eraseAll()`);

  // Language toggle: Bengali title + digits, persists after reload.
  await ev(`document.getElementById('langBtn').click()`);
  check('BN toggle: title in Bengali', (await ev(`document.getElementById('title').textContent`)) === 'এনআইডি গাইড বিডি');
  check('BN toggle: fee result uses Bengali digits', (await ev(`document.getElementById('feeResult').textContent`)).match(/[০-৯]/) !== null ||
    (await ev(`document.getElementById('feeResult').textContent`)).includes('বিনামূল্যে'));
  await send('Page.navigate', { url: FILE });
  await wait(1200);
  check('BN toggle persists after reload', (await ev(`window.__nid.state.lang`)) === 'bn');
  await ev(`document.getElementById('langBtn').click()`);
  check('back to EN', (await ev(`window.__nid.state.lang`)) === 'en');

  // Mobile 390px: no horizontal overflow on fees + guides tabs.
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: FILE });
  await wait(1200);
  const overflow = await ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
  check('390px no horizontal overflow (fees)', overflow <= 0, 'overflow=' + overflow);
  await ev(`document.getElementById('tabbtn-guides').click()`);
  const overflow2 = await ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
  check('390px no horizontal overflow (guides)', overflow2 <= 0, 'overflow=' + overflow2);
  await ev(`document.getElementById('tabbtn-checklists').click()`);
  const overflow3 = await ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
  check('390px no horizontal overflow (checklists)', overflow3 <= 0, 'overflow=' + overflow3);

  // Zero network requests: app is fully offline (only file:// loads).
  const reqs = await ev(`performance.getEntriesByType('resource').map(r => r.name).filter(n => !n.startsWith('file://')).length`);
  check('zero non-file network requests', reqs === 0, 'non-file=' + reqs);

  check('no console/page errors', pageErrors.length === 0, pageErrors.slice(0, 3).join(' | '));

  chrome.kill();
  console.log('\n' + count + ' checks, ' + failures + ' failed');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.log('FAIL - harness error: ' + e.message); try { chrome.kill(); } catch (_) {} process.exit(2); });
