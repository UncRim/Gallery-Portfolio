(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- data (swap in real briefs and outcomes here) ---------- */
  var DOCS = [
    { id: 'DOC-001', slug: 'tshaped-redesigned', title: 'From a strategy website to a conversion system', ctx: 'Web redesign · 2025', tags: ['Web redesign', 'IA and content'], role: 'Lead UX/UI Designer · HubSpot CMS · Analytics (GA4/Hotjar)', brief: 'Prospects could not answer three questions: what do you do, does it work, and what is my next step? Calls to action were buried and pages loaded slowly.', work: ['Story and information architecture rebuilt around the questions prospects actually ask', 'Outcome-led headlines, plain-language FAQs and social-proof pull-quotes', 'One unmissable next step on every page'], results: [['−19 pts bounce rate', 'Home page bounce rate dropped after the rebuild.'], ['+22% primary CTA clicks', 'Call-to-action engagement increased post-launch.'], ['+34% newsletter open rate', 'Email performance lift in the first 30 days.'], ['0 post-launch 404s', 'Clean migration with redirects and QA complete.']] },
    { id: 'DOC-002', slug: 'katz-master-in-ai-program-page', title: 'Master in AI (Katz School) Page Redesign', ctx: 'Web design · Drupal · 2025', tags: ['Web redesign', 'IA and content'], role: 'Web Designer (UX/UI) · IA · Content Strategy · A11y', brief: 'Prospective students could not quickly understand the program\'s value, outcomes or next steps. The page felt dense and brochure-like.', work: ['Headers rewritten in user language, copy trimmed into scannable chunks', 'Linear flow: hero, outcomes, projects and faculty, admissions and FAQ', 'Analytics events and test ideas for hero copy and CTA labels'], results: [['1-scroll value + proof', 'Outcomes, credibility and actions visible above the fold.'], ['1-tap admissions path', 'Simplified IA and sticky mobile CTAs reduce decision friction.'], ['↑ time on outcomes', 'Visitors spend more time with program results and projects.'], ['0-dev content updates', 'Modular sections marketing can reorder without breaking UX.']] },
    { id: 'DOC-003', slug: 'higher-ed-concept', title: 'The Chapman Alumni Innovation Vault', ctx: 'Concept · WebGL · 2025', tags: ['Concept', 'Spatial UX'], role: 'Product Designer (UX/UI and WebGL prototype)', brief: 'Universities share campus advances with alumni through passive 2D newsletters and flat portals. The concept locks high-value data inside an authenticated spatial vault, so readers become insiders.', work: ['Four iterations, from a sci-fi void to an architectural exhibition', 'A guided tour path so non-gamers never have to pan the camera', 'One in-flow action: become a research mentor'], results: [['0 installs · instant access', 'Browser-based spatial environment with no download required.'], ['100% guided tour path', 'Automatic camera path without manual panning.'], ['1-click virtual tour dive', 'Cinematic camera dive into architectural models.'], ['1 in-flow mentor CTA', 'Conversion action embedded within the immersive experience.']], live: ['https://the-chapman-alumni-vault-concept.netlify.app/', 'Explore the Alumni Innovation Vault'] },
    { id: 'DOC-004', slug: 'ticketmaster-spatial-seat-selection', title: 'Ticketmaster Spatial Seat Selection Concept', ctx: 'Concept · Spatial UX · 2025', tags: ['Concept', 'Spatial UX'], role: 'Spatial UX Designer · 3D interaction design · WebGL prototyping', brief: 'Fans toggle between abstract seating charts, dense price lists and tiny previews. That causes anxiety about buying a bad seat, and cart abandonment.', work: ['Seating chart reframed around the buyer\'s checklist: view, price, action', 'One flow: orbit, click a seat, see view and price, add to cart', 'Documented mesh hit zones and animation logic for handoff'], results: [['100% sightline preview', '3D spatial previews show exact stage angle and distance before buying.'], ['1-window seat + checkout', 'Seat selection, detail viewing and pricing in one unified flow.'], ['−3 disconnected UI tabs', 'A glassmorphic side panel keeps focus on the venue and the ticket.'], ['60fps · instant WebGL load', 'React Three Fiber canvas loads without tanking framerates.']], live: ['https://ticketmaster-concept.netlify.app/', 'Test the spatial seat selector'] },
    { id: 'DOC-005', slug: 'safescroll', title: 'Safescroll for doomscrolling', ctx: 'Concept · Mobile · 2025', tags: ['Concept'], role: 'Product Designer', brief: '53% of Gen Z and 46% of millennials admit to doomscrolling regularly. Current wellness apps focus on blocking or mindfulness, not integrated, psychologically informed solutions.', work: ['An intervention that does not lecture: friction at the right moment', 'Onboarding, session tracker, mood check-in and an exit ramp screen', '8 screens prototyped in Figma with motion'], results: [['+40% weekly active users', 'Active user growth within 3 months of launch.'], ['−35% average task time', 'Faster completion across key intervention workflows.'], ['4.7/5 user satisfaction', 'Post-launch feedback score from early adopters.'], ['0 surveillance · humane guardrails', 'Attention stewardship without shame or blocking.']] }
  ];
  var VOICES = ['Plain', 'Technical', 'Warm'];
  var SCEN = [
    [['Your listing needs one fix', 'Add a support contact, then submit the listing again.'], ['Listing validation failed', 'Required field missing: support contact. Add it under Listing details and resubmit.'], ['Almost there', 'Your listing is missing a support contact. Add one and send it back for review.']],
    [['Backup didn\'t finish', 'Today\'s changes aren\'t saved yet. Check the storage connection, then try again.'], ['Backup job BK-4021 failed', 'Storage target unreachable after a 30 s timeout. Last successful run: 02:10 UTC. Retry the job or open the connection log.'], ['That backup didn\'t finish', 'Nothing is lost, but today\'s changes aren\'t saved yet. Give it another try. If it keeps happening, we\'ll show you where to look.']],
    [['You\'ve been signed out', 'Sign in again to keep working. Your draft is saved.'], ['Session expired', 'Re-authenticate to continue. Unsaved form data is kept for 30 minutes.'], ['Time for a quick sign-in', 'You were away for a bit, so we signed you out to keep your account safe. Your draft is waiting for you.']],
    [['You can\'t open this report', 'Ask an admin for access to the Finance workspace.'], ['403: missing role finance.viewer', 'Request the role from a workspace admin, then reload the report.'], ['This one is behind a door', 'You don\'t have access to the Finance workspace yet. An admin can let you in. Here\'s who to ask.']]
  ];
  var SAMPLE = 'Please note that the onboarding form will be utilized in order to simply submit the product details. The pricing sheet is easily completed by the product owner, and it should obviously be reviewed before the listing is published to the marketplace by the team, which is something that was agreed on last quarter.';

  function toast(m) { var t = $('#toast'); t.textContent = m; t.dataset.show = 'true'; clearTimeout(toast.h); toast.h = setTimeout(function () { t.dataset.show = 'false'; }, 1800); }

  /* ---------- theme ---------- */
  var root = document.documentElement;
  try { var st = localStorage.getItem('dd-theme'); if (st) root.dataset.theme = st; } catch (e) {}
  function toggleTheme() { var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; root.dataset.theme = dark ? 'light' : 'dark'; try { localStorage.setItem('dd-theme', root.dataset.theme); } catch (e) {} window.dispatchEvent(new CustomEvent('rope:theme', { detail: { dark: root.dataset.theme === 'dark' } })); }
  window.addEventListener('rope:pull', toggleTheme);

  /* ---------- local time ---------- */
  function tick() { try { $('#localtime').textContent = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago', timeZoneName: 'short' }).format(new Date()); } catch (e) { $('#localtime').textContent = 'Central time'; } }
  tick(); setInterval(tick, 30000);

  /* ---------- library ---------- */
  var tags = ['All']; DOCS.forEach(function (d) { d.tags.forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); }); });
  var active = 'All', lib = $('#lib'), filters = $('#filters');
  var chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  function renderFilters() { filters.innerHTML = tags.map(function (t) { return '<button type="button" class="chip" aria-pressed="' + (t === active) + '" data-tag="' + t + '">' + t + '</button>'; }).join(''); }
  function renderLib() {
    lib.innerHTML = DOCS.filter(function (d) { return active === 'All' || d.tags.indexOf(active) > -1; }).map(function (d, i) {
      var res = d.results.map(function (r) { return '<li><b>' + r[0] + '</b><span>' + r[1] + '</span></li>'; }).join('');
      var links = '<a class="btn" href="./projects/' + d.slug + '/">Read the full case study →</a>' + (d.live ? '<a class="btn" href="' + d.live[0] + '" rel="noopener">' + d.live[1] + ' ↗</a>' : '');
      return '<div class="row" data-open="false" id="' + d.id.toLowerCase() + '"><button type="button" aria-expanded="false" aria-controls="p' + i + '"><span class="id">' + d.id + '</span><span class="thumb vig" data-vig="' + d.slug + '"></span><span class="title">' + d.title + '</span><span class="ctx">' + d.ctx + '</span>' + chev + '</button>' +
        '<div class="panel" id="p' + i + '"><div><div class="facts"><div><h5>Brief</h5><p>' + d.brief + '</p><h5>Role</h5><p>' + d.role + '</p></div><div><h5>Content work</h5><ul>' + d.work.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul></div><div><h5>Results</h5><ul class="res">' + res + '</ul></div></div><div class="links">' + links + '</div></div></div></div>';
    }).join('');
    if (window.__mountVig) window.__mountVig(lib);
  }
  filters.addEventListener('click', function (e) { var b = e.target.closest('[data-tag]'); if (!b) return; active = b.dataset.tag; renderFilters(); renderLib(); });
  lib.addEventListener('click', function (e) { var b = e.target.closest('.row > button'); if (!b) return; var r = b.parentNode, o = r.dataset.open !== 'true'; r.dataset.open = o; b.setAttribute('aria-expanded', o); });
  function openDoc(id) { active = 'All'; renderFilters(); renderLib(); var r = $('#' + id.toLowerCase()); if (!r) return; r.dataset.open = 'true'; $('button', r).setAttribute('aria-expanded', 'true'); r.scrollIntoView({ block: 'center' }); }
  renderFilters(); renderLib();
  $('#sideLib').innerHTML = '<a href="#now"><span>NOW</span>MCSP onboarding</a>' + DOCS.map(function (d) { return '<a href="#' + d.id.toLowerCase() + '" data-doc="' + d.id + '"><span>' + d.id.slice(4) + '</span>' + d.title + '</a>'; }).join('');
  $('#sideLib').addEventListener('click', function (e) { var a = e.target.closest('[data-doc]'); if (!a) return; e.preventDefault(); openDoc(a.dataset.doc); });

  /* ---------- voice dial ---------- */
  function syll(w) { w = w.toLowerCase().replace(/[^a-z]/g, ''); if (!w) return 0; if (w.length <= 3) return 1; w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, ''); var m = w.match(/[aeiouy]{1,2}/g); return m ? m.length : 1; }
  function stats(text) { var sents = text.split(/[.!?]+\s|[.!?]+$/).filter(function (s) { return s.trim(); }), words = text.match(/[A-Za-z0-9'’.-]+/g) || [], sy = 0; words.forEach(function (w) { sy += syll(w); }); var n = Math.max(words.length, 1), s = Math.max(sents.length, 1); return { words: words.length, avg: n / s, grade: Math.max(0, 0.39 * (n / s) + 11.8 * (sy / n) - 15.59) }; }
  var voice = 0;
  function renderVoice() {
    var sc = +$('#scenario').value, m = SCEN[sc][voice], box = $('#alert'); box.style.opacity = 0;
    setTimeout(function () { $('#aTitle').textContent = m[0]; $('#aBody').textContent = m[1]; box.style.opacity = 1; }, 120);
    var s = stats(m[0] + '. ' + m[1]); $('#sWords').textContent = s.words; $('#sAvg').textContent = s.avg.toFixed(1); $('#sGrade').textContent = s.grade.toFixed(1); $('#sTone').textContent = VOICES[voice];
  }
  $$('.seg button').forEach(function (b) { b.addEventListener('click', function () { voice = +b.dataset.v; $$('.seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); renderVoice(); }); });
  $('#scenario').addEventListener('change', renderVoice);
  document.getElementById('aTitle').textContent = SCEN[0][0][0]; document.getElementById('aBody').textContent = SCEN[0][0][1];
  (function () { var s = stats(SCEN[0][0][0] + '. ' + SCEN[0][0][1]); $('#sWords').textContent = s.words; $('#sAvg').textContent = s.avg.toFixed(1); $('#sGrade').textContent = s.grade.toFixed(1); })();

  /* ---------- linter ---------- */
  var FILLER = /\b(please note that|in order to|simply|just|easily|obviously|utili[sz]e[sd]?|leverage[sd]?|basically|actually)\b/gi;
  var PASSIVE = /\b(is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+ed|\w+en|written|done|made|run|set|built|shown|sent)\b/gi;
  var draft = $('#draft'); draft.value = SAMPLE;
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function lint() {
    var text = draft.value, marks = [];
    var re, m;
    FILLER.lastIndex = 0; while ((m = FILLER.exec(text))) marks.push([m.index, m.index + m[0].length, 'filler']);
    PASSIVE.lastIndex = 0; while ((m = PASSIVE.exec(text))) marks.push([m.index, m.index + m[0].length, 'passive']);
    var pos = 0; text.split(/(?<=[.!?])\s+/).forEach(function (s) { var wc = (s.match(/\S+/g) || []).length; if (wc > 24) marks.push([text.indexOf(s, pos), text.indexOf(s, pos) + s.length, 'long']); pos += s.length; });
    marks.sort(function (a, b) { return a[0] - b[0] || (a[2] === 'long') - (b[2] === 'long'); });
    var out = '', i = 0, counts = { passive: 0, filler: 0, long: 0 }, last = 0;
    marks.forEach(function (k) { counts[k[2]]++; });
    var flat = marks.filter(function (k) { return k[2] !== 'long'; }), longs = marks.filter(function (k) { return k[2] === 'long'; });
    flat.sort(function (a, b) { return a[0] - b[0]; });
    flat.forEach(function (k) { if (k[0] < last) return; out += esc(text.slice(last, k[0])) + '<mark data-r="' + k[2] + '">' + esc(text.slice(k[0], k[1])) + '</mark>'; last = k[1]; });
    out += esc(text.slice(last));
    $('#preview').innerHTML = out || '<span style="color:var(--muted)">Nothing to check yet.</span>';
    if (longs.length) $('#preview').insertAdjacentHTML('beforeend', '<div class="mono" style="margin-top:10px;font-size:12.5px;color:var(--muted)"><mark data-r="long">' + longs.length + '</mark> sentence' + (longs.length > 1 ? 's' : '') + ' run past 24 words. Split them.</div>');
    $('#cPassive').textContent = counts.passive; $('#cFiller').textContent = counts.filler; $('#cLong').textContent = counts.long;
    var score = Math.max(0, 100 - (counts.passive * 5 + counts.filler * 4 + counts.long * 8)); if (!text.trim()) score = 0;
    $('#lintScore').textContent = 'Clarity ' + score; $('#meter').style.width = score + '%';
  }
  draft.addEventListener('input', lint);
  $('#fix').addEventListener('click', function () {
    var t = draft.value.replace(/\bPlease note that\s+/gi, '').replace(/\bin order to\b/gi, 'to').replace(/\b(utili[sz]ed)\b/gi, 'used').replace(/\butili[sz]e\b/gi, 'use').replace(/\b(simply|easily|obviously|just|basically|actually)\s+/gi, '').replace(/\s{2,}/g, ' ');
    draft.value = t.charAt(0).toUpperCase() + t.slice(1); lint(); toast('Quick fixes applied. Passive voice is still yours to rewrite.');
  });
  $('#reset').addEventListener('click', function () { draft.value = SAMPLE; lint(); });
  lint();

  /* ---------- contact ---------- */
  $('#copy').addEventListener('click', function () { try { navigator.clipboard.writeText('denelsen.dandi363@gmail.com').then(function () { toast('Address copied'); }, function () { toast('Copy blocked here. The address is on the page.'); }); } catch (e) { toast('Copy blocked here. The address is on the page.'); } });
  $('#fb').addEventListener('click', function (e) { var b = e.target.closest('[data-fb]'); if (!b) return; $('#fb').innerHTML = '<span>' + (b.dataset.fb === 'yes' ? 'Glad it helped. The best feedback is a message.' : 'Tell me what is missing. Open an issue above.') + '</span>'; });

  /* ---------- scene -> page ---------- */
  var tabs = $$('.ftab'), sheets = $$('.sheet'), fcount = $('#fcount');
  function openFile(id, focus) {
    tabs.forEach(function (t, i) { var on = t.dataset.bld === id; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; if (on) { if (fcount) fcount.textContent = 'File ' + (i + 1) + ' of 4'; if (focus) t.focus(); } });
    sheets.forEach(function (s) { var on = s.dataset.bld === id; s.classList.toggle('on', on); if (on) { s.removeAttribute('inert'); s.removeAttribute('aria-hidden'); } else { s.setAttribute('inert', ''); s.setAttribute('aria-hidden', 'true'); } });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { openFile(t.dataset.bld); });
    t.addEventListener('keydown', function (e) { var k = e.key, n = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? 3 : -1; if (n < 0) return; e.preventDefault(); openFile(tabs[(n + 4) % 4].dataset.bld, true); });
    t.addEventListener('mouseenter', function () { var b = window.__quarter && window.__quarter.blds[t.dataset.bld]; if (b) b.hover = true; });
    t.addEventListener('mouseleave', function () { var b = window.__quarter && window.__quarter.blds[t.dataset.bld]; if (b) b.hover = false; });
  });
  window.addEventListener('quarter:open', function (e) { var s = $('#p-' + e.detail.id); if (!s) return; openFile(e.detail.id); $('#folder').scrollIntoView({ block: 'center' }); s.classList.remove('flash'); void s.offsetWidth; s.classList.add('flash'); });


  /* ---------- scrollspy + progress ---------- */
  var ids = ['practice', 'library', 'lab', 'about', 'contact'];
  function spy() {
    var y = window.scrollY + 140, cur = null; ids.forEach(function (id) { var el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
    $$('[data-spy]').forEach(function (a) { a.setAttribute('aria-current', a.dataset.spy === cur); });
    $$('nav.main a').forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + cur); });
    var h = document.documentElement; $('#bar').style.transform = 'scaleX(' + Math.min(1, window.scrollY / Math.max(1, h.scrollHeight - h.clientHeight)) + ')';
  }
  window.addEventListener('scroll', spy, { passive: true }); spy();
  $('#rt').textContent = Math.max(2, Math.round(document.querySelector('main').innerText.split(/\s+/).length / 200)) + ' min';

  /* ---------- command palette ---------- */
  var pal = $('#pal'), q = $('#palq'), list = $('#pall'), sel = 0, items = [];
  var ALL = [
    { t: 'Practice', s: 'Section', go: function () { location.hash = 'practice'; } }, { t: 'Library', s: 'Section', go: function () { location.hash = 'library'; } }, { t: 'Writing lab', s: 'Section', go: function () { location.hash = 'lab'; } }, { t: 'About', s: 'Section', go: function () { location.hash = 'about'; } }, { t: 'Contact', s: 'Section', go: function () { location.hash = 'contact'; } }
  ].concat(DOCS.map(function (d) { return { t: d.title, s: d.id, go: function () { openDoc(d.id); } }; })).concat([
    { t: 'Pull the cord (light and dark)', s: 'Action', go: function () { window.dispatchEvent(new CustomEvent('rope:tug')); } },
    { t: 'Copy email address', s: 'Action', go: function () { $('#copy').click(); } },
    { t: 'Set the scene to night', s: 'Action', go: function () { window.__quarter && window.__quarter.setTau(0.88); } },
    { t: 'Set the scene to morning', s: 'Action', go: function () { window.__quarter && window.__quarter.setTau(0.3); } }
  ]);
  function draw() { var v = q.value.toLowerCase(); items = ALL.filter(function (a) { return !v || (a.t + ' ' + a.s).toLowerCase().indexOf(v) > -1; }); sel = Math.min(sel, Math.max(0, items.length - 1));
    list.innerHTML = items.length ? items.map(function (a, i) { return '<li><button type="button" role="option" aria-selected="' + (i === sel) + '" data-i="' + i + '">' + a.t + '<span>' + a.s + '</span></button></li>'; }).join('') : '<li class="none">No match. Try a case study name.</li>'; }
  var returnFocus = null;
  function openPal() { returnFocus = document.activeElement; pal.dataset.open = 'true'; q.value = ''; sel = 0; draw(); setTimeout(function () { q.focus(); }, 0); }
  function closePal() { pal.dataset.open = 'false'; if (returnFocus && returnFocus.focus) returnFocus.focus(); }
  function run(i) { var a = items[i]; if (!a) return; closePal(); setTimeout(a.go, 30); }
  $('#openPal').addEventListener('click', openPal);
  pal.addEventListener('click', function (e) { if (e.target === pal) closePal(); var b = e.target.closest('[data-i]'); if (b) run(+b.dataset.i); });
  q.addEventListener('input', function () { sel = 0; draw(); });
  q.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { sel = Math.min(items.length - 1, sel + 1); draw(); e.preventDefault(); } else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); draw(); e.preventDefault(); } else if (e.key === 'Enter') { run(sel); } });
  document.addEventListener('keydown', function (e) {
    var typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.dataset.open === 'true' ? closePal() : openPal(); }
    else if (e.key === '/' && !typing && pal.dataset.open !== 'true') { e.preventDefault(); openPal(); }
    else if (e.key === 'Escape' && pal.dataset.open === 'true') closePal();
  });
})();

/* ---------- changelog: line draws as you scroll, entries rise in ---------- */
(function () {
  var log = document.querySelector('.log'); if (!log) return;
  var arts = Array.prototype.slice.call(log.querySelectorAll('article'));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  log.classList.add('anim');
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  arts.forEach(function (a) { io.observe(a); });
  var queued = false;
  function upd() { queued = false; var r = log.getBoundingClientRect(); var last = arts[arts.length - 1].getBoundingClientRect(); var p = (innerHeight * 0.7 - r.top) / Math.max(1, last.top - r.top + 14); log.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3)); log.style.setProperty('--lh', Math.round(last.top - r.top + 2) + 'px'); }
  addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', upd); upd();
})();

/* ---------- folder-style sections: scroll-linked, so scrolling back up tucks them behind again ---------- */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var secs = Array.prototype.slice.call(document.querySelectorAll('section.doc')).slice(1), queued = false;
  function upd() {
    queued = false; var vh = innerHeight;
    secs.forEach(function (s) {
      var p = Math.max(0, Math.min(1, (vh * 0.97 - s.getBoundingClientRect().top) / (vh * 0.36)));
      if (p >= 1) { if (s.classList.contains('rv')) { s.classList.remove('rv'); s.style.removeProperty('--r'); } }
      else { s.classList.add('rv'); s.style.setProperty('--r', p.toFixed(3)); }
    });
  }
  addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', upd); upd();
})();
