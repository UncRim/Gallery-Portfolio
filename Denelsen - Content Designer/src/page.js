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

  /* ---------- Out loud: read it aloud before the reader's patience runs out ---------- */
  // [[...]] marks the next step. The reader has "got there" once the last marked word has been read.
  var SCN = [
    { name: 'Listing needs a fix',
      before: "Hello, and thank you so much for submitting your listing! Unfortunately, after a thorough review of all of the information that was provided, we were unable to approve it at this time. In order to move forward, you will need to [[add a support contact and then submit the listing again]]. Thank you for your patience.",
      after: "Your listing needs one fix. [[Add a support contact, then submit it again.]]" },
    { name: 'Backup failed',
      before: "We regret to inform you that today's backup was not able to be completed successfully, due to a problem with the connection to your storage. Please be advised that none of today's changes have been saved. As soon as possible, you should [[check the storage connection and try the backup again]]. We apologize for any inconvenience.",
      after: "Today's backup failed, so nothing new is saved. [[Check your storage connection, then run the backup again.]]" },
    { name: 'Session expired',
      before: "For your security, and as a result of a period of inactivity, you have been signed out of your account. We would like to let you know that your draft has been saved. In order to continue working on it, please make sure that you [[sign in again]]. Thank you for your understanding.",
      after: "You were signed out after a while. Your draft is saved. [[Sign in to keep writing.]]" },
    { name: 'Permission denied',
      before: "We're sorry, but it appears that you do not currently have access to the Finance workspace report that you have attempted to open. Access to this area is restricted to approved members only. To get in, you will need to [[ask a workspace admin for access and then reload the report]].",
      after: "You don't have access to this report yet. [[Ask a workspace admin for access.]]" }
  ];
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var G = { sc: 0, ver: 0, secs: 11, mode: SR ? 'mic' : 'tap', state: 'idle', toks: [], els: [], lastKey: 0, pos: 0, started: 0, raf: 0, rec: null, idle: 0, restarts: [], res: {} };
  var mtText = $('#mtText'), mtBar = $('#mtBar'), mtRes = $('#mtResult'), mtState = $('#mtState'), mtGo = $('#mtGo');
  function norm(w) { return w.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, ''); }
  function lev(a, b) { var m = a.length, n = b.length, d = [], i, j; for (i = 0; i <= m; i++) { d[i] = [i]; } for (j = 1; j <= n; j++) d[0][j] = j; for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  function same(a, b) { if (a === b) return true; if (a.length < 4 || b.length < 4) return false; if (a.length >= 5 && b.length >= 5 && lev(a, b) <= 1) return true; return a.indexOf(b) === 0 || b.indexOf(a) === 0; }
  // Match what was heard to what should come next. A heard word may skip up to 3 target words, so a stumble does not stall the reader.
  function align(start, heard) { var pos = start; heard.forEach(function (h) { for (var k = 0; k < 4 && pos + k < G.toks.length; k++) { if (same(h, G.toks[pos + k].n)) { pos = pos + k + 1; return; } } }); return pos; }
  function mtTokens(src) {
    var out = [];
    src.split(/(\[\[.+?\]\])/).forEach(function (seg) {
      if (!seg) return; var m = seg.match(/^\[\[(.+)\]\]$/), key = !!m;
      (m ? m[1] : seg).split(/\s+/).filter(Boolean).forEach(function (w) { var n = norm(w); if (n) out.push({ w: w, n: n, k: key }); });
    });
    return out;
  }
  function setPat(p) {
    mtBar.style.width = p + '%'; $('#mtPat').textContent = Math.round(p); mtBar.parentNode.parentNode.classList.toggle('low', p < 30);
    var q = p / 100; $('#rdHead').setAttribute('transform', 'rotate(' + ((1 - q) * 26).toFixed(1) + ' 24 28) translate(0 ' + ((1 - q) * 2.5).toFixed(1) + ')'); $('#rdSweat').setAttribute('opacity', q < 0.4 ? 1 : 0);
  }
  function paint() { G.els.forEach(function (el, i) { el.classList.toggle('said', i < G.pos); el.classList.toggle('now', G.state === 'run' && i === G.pos); }); }
  function stopRec() { if (G.rec) { var r = G.rec; G.rec = null; try { r.abort(); } catch (_) {} } }
  function button(label) { mtGo.hidden = !label; if (label) mtGo.textContent = label; }
  function mtLoad(keepResult) {
    clearTimeout(G.idle); cancelAnimationFrame(G.raf); stopRec(); G.state = 'idle'; G.started = 0; G.pos = 0; G.restarts = [];
    var s = SCN[G.sc]; G.toks = mtTokens(G.ver ? s.after : s.before); G.lastKey = 0; G.toks.forEach(function (t, i) { if (t.k) G.lastKey = i; });
    mtText.className = 'mt-text'; mtText.innerHTML = G.toks.map(function (t, i) { return '<span class="w" data-i="' + i + '">' + esc(t.w) + '</span>'; }).join(' '); G.els = $$('.w', mtText);
    $('#mtRoundLbl').textContent = (G.ver ? 'Rewrite' : 'Original') + ' · ' + G.toks.length + ' words';
    if (!keepResult) mtRes.hidden = true; mtState.textContent = 'Ready'; setPat(100); $('#midtask').classList.remove('playing'); button('Start reading');
  }
  function begin() {
    G.started = performance.now(); clearTimeout(G.idle);
    (function tick() { if (G.state !== 'run') return; var el = (performance.now() - G.started) / 1000, p = Math.max(0, 100 * (1 - el / G.secs)); setPat(p); mtState.textContent = 'Reading · ' + Math.max(0, G.secs - el).toFixed(1) + 's left'; if (p <= 0) return finish(false); G.raf = requestAnimationFrame(tick); })();
  }
  function mtStart() {
    G.state = 'run'; G.pos = 0; mtRes.hidden = true; $('#midtask').classList.add('playing'); paint();
    if (G.mode === 'tap') { button('I reached the next step'); begin(); return; }
    button(''); mtState.textContent = 'Listening… start reading'; listen();
    G.idle = setTimeout(function () { if (G.state === 'run' && !G.started) micFail('no-speech'); }, 20000);
  }
  function listen() {
    var rec = new SR(), base = G.pos; G.rec = rec; rec.lang = 'en-US'; rec.continuous = true; rec.interimResults = true;
    rec.onresult = function (e) {
      if (G.state !== 'run' || G.rec !== rec) return; var t = ''; for (var i = 0; i < e.results.length; i++) t += ' ' + e.results[i][0].transcript;
      var heard = t.trim().split(/\s+/).map(norm).filter(Boolean); if (!heard.length) return;
      if (!G.started) begin(); var np = align(base, heard); if (np > G.pos) { G.pos = np; paint(); } if (G.pos > G.lastKey) finish(true);
    };
    rec.onerror = function (e) { if (G.state === 'run' && G.rec === rec && /not-allowed|service-not-allowed|audio-capture|network|language-not-supported/.test(e.error)) micFail(e.error); };
    rec.onend = function () { if (G.state !== 'run' || G.rec !== rec) return; var now = Date.now(); G.restarts = G.restarts.filter(function (x) { return now - x < 3000; }); G.restarts.push(now); if (G.restarts.length > 4) return micFail('network'); try { listen(); } catch (_) { micFail('audio-capture'); } };
    try { rec.start(); } catch (_) { micFail('audio-capture'); }
  }
  function micFail() {
    G.mode = 'tap'; mtLoad(); mtRes.innerHTML = '<strong>I couldn’t hear you.</strong><p>Read the message, then tap the button when you reach the next step.</p>'; mtRes.hidden = false; $('#mtNote').hidden = true;
  }
  function finish(ok) {
    if (G.state !== 'run') return; G.state = 'done'; cancelAnimationFrame(G.raf); clearTimeout(G.idle); stopRec(); $('#midtask').classList.remove('playing');
    var el = G.started ? (performance.now() - G.started) / 1000 : 0, left = Math.max(0, 100 * (1 - el / G.secs)), total = G.lastKey + 1;
    if (G.mode === 'tap' && ok) G.pos = total;
    var r = { ok: ok, t: el, short: total - Math.min(G.pos, total) }; (G.res[G.sc] = G.res[G.sc] || {})[G.ver] = r;
    G.els.forEach(function (e, i) { e.classList.remove('now'); e.classList.toggle('key', G.toks[i].k); e.classList.toggle('said', i < G.pos); });
    setPat(ok ? left : 0); mtState.textContent = ok ? 'Reached the next step' : 'Reader gave up';
    var o = G.res[G.sc][0], head = ok ? 'The reader got there in ' + el.toFixed(1) + ' s.' : 'The reader gave up.', body;
    if (!ok) body = G.mode === 'tap' ? 'Out of patience before the next step.' : r.short + ' words short of the next step.';
    else body = G.ver && o ? (o.ok ? 'The original took ' + o.t.toFixed(1) + ' s.' : 'The original lost them ' + o.short + ' words short.') : '';
    mtRes.innerHTML = '<strong>' + head + '</strong>' + (body ? '<p>' + body + '</p>' : ''); mtRes.hidden = false;
    button(!G.ver ? 'Read the rewrite' : ok ? 'Try another message' : 'Try again');
  }
  mtGo.addEventListener('click', function () {
    if (G.state === 'idle') return mtStart();
    if (G.state === 'run') { if (G.started) finish(true); return; }
    if (!G.ver) G.ver = 1; else if (G.res[G.sc][1].ok) { G.sc = (G.sc + 1) % SCN.length; G.ver = 0; }
    mtLoad();
  });
  if (!SR) $('#mtNote').hidden = true;
  mtLoad();

  /* ---------- linter ---------- */
  // The voice you pick decides which habits get flagged. Each category has a dictionary: phrase -> fix (null means "needs a human").
  var LV = 0, LVN = ['Plain', 'Technical', 'Warm'];
  var CAT = { filler: 'Filler', passive: 'Passive', long: 'Long sentence', heavy: 'Heavy word', vague: 'Vague', hype: 'Marketing', hedge: 'Hedging', cold: 'Cold', shout: 'Exclamation' };
  var WGT = { filler: 4, passive: 5, long: 8, heavy: 4, vague: 4, hype: 5, hedge: 3, cold: 5, shout: 3, meta: 6 };
  var TIPS = {
    filler: 'Cut it. The sentence works without it.',
    passive: 'Say who does what. “Add a contact” beats “a contact should be added”.',
    heavy: 'Use the shorter word a person would say out loud.',
    vague: 'Give a number, a unit or a name instead.',
    hype: 'Say what it does, with a number if you can. Docs earn trust by being specific.',
    hedge: 'State what happens, or say plainly what you do not know.',
    cold: 'This reads like a verdict. Say what happened and what the reader can do.',
    shout: 'Keep it level. One calm sentence is easier to trust.'
  };
  var DICT = {
    filler: { 'please note that': '', 'please be advised that': '', 'it is important to note that': '', 'we would like to let you know that': '', 'we regret to inform you that': '', 'in order to': 'to', 'due to the fact that': 'because', 'at this point in time': 'now', 'as a matter of fact': '', 'simply': '', 'just': '', 'easily': '', 'obviously': '', 'basically': '', 'actually': '', 'very': '', 'really': '' },
    heavy: { 'utilizes': 'uses', 'utilized': 'used', 'utilize': 'use', 'utilizing': 'using', 'utilises': 'uses', 'utilised': 'used', 'utilise': 'use', 'leverage': 'use', 'leverages': 'uses', 'leveraged': 'used', 'commence': 'start', 'terminate': 'end', 'prior to': 'before', 'subsequent to': 'after', 'facilitate': 'help', 'additional': 'more', 'assist': 'help', 'approximately': 'about', 'in the event that': 'if', 'regarding': 'about', 'endeavor': 'try', 'purchase': 'buy', 'obtain': 'get', 'require': 'need', 'requires': 'needs', 'inform': 'tell', 'attempted': 'tried', 'sufficient': 'enough' },
    techHeavy: { 'utilizes': 'uses', 'utilized': 'used', 'utilize': 'use', 'utilizing': 'using', 'utilises': 'uses', 'utilised': 'used', 'utilise': 'use', 'leverage': 'use', 'leverages': 'uses', 'leveraged': 'used' },
    vague: { 'some things': null, 'several': null, 'a few': null, 'soon': null, 'shortly': null, 'stuff': null, 'things': null, 'etc.': null, 'and so on': null, 'a lot of': null, 'as soon as possible': null, 'recently': null, 'quickly': null, 'fast': null, 'various': null, 'numerous': null, 'intuitive': null },
    hype: { 'seamlessly': null, 'seamless': null, 'powerful': null, 'robust': null, 'cutting-edge': null, 'innovative': null, 'best-in-class': null, 'world-class': null, 'revolutionary': null, 'effortlessly': null, 'effortless': null, 'game-changing': null, 'state-of-the-art': null, 'next-generation': null, 'blazing-fast': null },
    hedge: { 'might': null, 'probably': null, 'hopefully': null, 'try to': null, 'seems to': null, 'appears to': null, 'kind of': null, 'sort of': null, 'perhaps': null, 'may be able to': null },
    cold: { 'an error occurred': 'something went wrong', 'error occurred': 'something went wrong', 'unable to': "can't", 'cannot': "can't", 'you must': 'you need to', 'invalid': null, 'denied': null, 'failed': null, 'forbidden': null, 'prohibited': null, 'not allowed': null, 'unauthorized': null, 'violation': null, 'you failed to': null }
  };
  var VOICE_RULES = [
    { cats: ['filler', 'passive', 'heavy'], long: 20 },
    { cats: ['filler', 'passive', 'techHeavy', 'hype', 'vague', 'hedge', 'shout'], long: 28 },
    { cats: ['filler', 'passive', 'heavy', 'cold', 'shout'], long: 18 }
  ];
  var catKey = function (c) { return c === 'techHeavy' ? 'heavy' : c; };
  function dictRe(d) { var ks = Object.keys(d).sort(function (a, b) { return b.length - a.length; }).map(function (k) { return k.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&'); }); return new RegExp('(?<![\\w-])(' + ks.join('|') + ')(?![\\w-])', 'gi'); }
  var RES = {}; Object.keys(DICT).forEach(function (k) { RES[k] = dictRe(DICT[k]); });
  var PASSIVE = /\b(is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+ed|\w+en|written|done|made|run|set|built|shown|sent)\b/gi;
  var ADJ = /^(thrilled|excited|pleased|delighted|happy|sorry|interested|concerned|worried|surprised|tired|supposed|used|based|located|named|stuck|done|open|broken)$/i;
  var SAMPLE_L = "Please note that the onboarding form will be utilized in order to simply submit the product details. Our seamless platform easily handles some things automatically, and an error occurred: the request was denied because invalid credentials were entered. You must resolve this soon, otherwise the listing cannot be published to the marketplace!";
  var draft = $('#draft'), bd = $('#bd'); draft.value = SAMPLE_L;
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function cleanText(t) { return t.replace(/ {2,}/g, ' ').replace(/ +([,.;:!?])/g, '$1').replace(/(^|[.!?]\s+)([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }).replace(/^\s+/, ''); }
  function findMarks(text) {
    var rule = VOICE_RULES[LV], marks = [], m, shouts = 0;
    rule.cats.forEach(function (c) {
      var k = catKey(c);
      if (c === 'passive') { PASSIVE.lastIndex = 0; while ((m = PASSIVE.exec(text))) { if (ADJ.test(m[2])) continue; marks.push({ s: m.index, e: m.index + m[0].length, cat: 'passive', t: m[0], r: null }); } return; }
      if (c === 'shout') { var re = /!/g; while ((m = re.exec(text))) { shouts++; if (LV === 1 || shouts > 1) marks.push({ s: m.index, e: m.index + 1, cat: 'shout', t: '!', r: '.' }); } return; }
      var re2 = RES[c]; re2.lastIndex = 0;
      while ((m = re2.exec(text))) { var r = DICT[c][m[0].toLowerCase()]; marks.push({ s: m.index, e: m.index + m[0].length, cat: k, t: m[0], r: r === undefined ? null : r }); }
    });
    marks.sort(function (a, b) { return a.s - b.s || (b.e - b.s) - (a.e - a.s); });
    var flat = [], last = 0; marks.forEach(function (k) { if (k.s >= last) { flat.push(k); last = k.e; } });
    var longs = [], pos = 0; text.split(/(?<=[.!?])\s+/).forEach(function (s) { var wc = (s.match(/\S+/g) || []).length, at = text.indexOf(s, pos); if (wc > rule.long) longs.push({ s: at, e: at + s.length, cat: 'long', t: s, wc: wc }); pos = at + s.length; });
    flat.forEach(function (k, i) { k.id = i; }); longs.forEach(function (k, i) { k.id = i; });
    return { flat: flat, longs: longs };
  }
  var cur = { flat: [], longs: [] };
  function paintBackdrop(text, flat, longs) {
    var cuts = {}; cuts[0] = 1; cuts[text.length] = 1; flat.concat(longs).forEach(function (k) { cuts[k.s] = 1; cuts[k.e] = 1; });
    var pts = Object.keys(cuts).map(Number).sort(function (a, b) { return a - b; }), out = '';
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], seg = esc(text.slice(a, b)), f = flat.filter(function (k) { return k.s <= a && k.e >= b; })[0], l = longs.filter(function (k) { return k.s <= a && k.e >= b; })[0];
      if (f || l) seg = '<mark data-r="' + (f ? f.cat : 'long') + '"' + (f ? ' data-f="' + f.id + '"' : '') + (l ? ' data-l="' + l.id + '" class="L"' : '') + '>' + seg + '</mark>';
      out += seg;
    }
    bd.innerHTML = out + '\n';
  }
  function lint(quiet) {
    var text = draft.value, res = findMarks(text), flat = res.flat, longs = res.longs, counts = {};
    cur = res; hideTip();
    draft.style.height = 'auto'; draft.style.height = Math.max(160, draft.scrollHeight) + 'px';
    paintBackdrop(text, flat, longs);
    flat.forEach(function (k) { counts[k.cat] = (counts[k.cat] || 0) + 1; });
    if (longs.length) counts.long = longs.length;
    var meta = LV === 2 && text.trim() && !/\b(you|your|we|our|i|let's)\b/i.test(text), total = flat.length + longs.length + (meta ? 1 : 0);
    $('#lintNote').hidden = !meta; $('#lintNote').textContent = meta ? 'No “you” or “we” anywhere. Warm copy says who is speaking and who it is for.' : '';
    $('#issues').innerHTML = flat.concat(longs).sort(function (a, b) { return a.s - b.s; }).map(function (k) { return '<li>' + CAT[k.cat] + ': ' + esc(k.cat === 'long' ? k.wc + ' words' : k.t) + '. ' + (k.cat === 'long' ? 'Split it.' : TIPS[k.cat]) + '</li>'; }).join('');
    var score = 100; Object.keys(counts).forEach(function (c) { score -= counts[c] * WGT[c]; }); if (meta) score -= WGT.meta; score = Math.max(0, score); if (!text.trim()) score = 0;
    $('#lintScore').textContent = 'Voice fit ' + score; $('#meter').style.width = score + '%';
    $('#legend').innerHTML = VOICE_RULES[LV].cats.map(catKey).filter(function (c, i, a) { return a.indexOf(c) === i; }).concat(['long']).map(function (c) { return '<span><i data-r="' + c + '"></i>' + CAT[c] + ' <b>' + (counts[c] || 0) + '</b></span>'; }).join('');
    if (!quiet) $('#lintStatus').textContent = !text.trim() ? 'Paste or type something to check it.' : total ? 'Checked for a ' + LVN[LV] + ' voice: ' + total + ' thing' + (total > 1 ? 's' : '') + ' to look at. Hover or tap a highlight to see why.' : 'Checked for a ' + LVN[LV] + ' voice: nothing to flag.';
  }
  /* tooltip: the highlights sit behind the textarea, so hover is hit-tested against the marks' own rectangles */
  var tip = $('#tip'), ed = $('#editor'), tipTimer = 0;
  function tipHTML(f, l) {
    var h = '';
    if (f) { var fix = f.r !== null && f.r !== undefined; h += '<div class="tip-row" data-r="' + f.cat + '"><b><i></i>' + CAT[f.cat] + ' · ' + esc(f.t) + '</b><span>' + TIPS[f.cat] + '</span>' + (fix ? '<button type="button" class="btn ghost" data-fix="' + f.id + '">' + (f.r ? 'Use “' + esc(f.r) + '”' : 'Cut it') + '</button>' : '') + '</div>'; }
    if (l) h += '<div class="tip-row" data-r="long"><b><i></i>Long sentence · ' + l.wc + ' words</b><span>Over the ' + VOICE_RULES[LV].long + '-word limit for a ' + LVN[LV] + ' voice. Split it after about ' + Math.round(l.wc / 2) + ' words, or cut the setup.</span></div>';
    return h;
  }
  function hideTip() { clearTimeout(tipTimer); tip.hidden = true; tip.dataset.key = ''; }
  function slowHide() { clearTimeout(tipTimer); tipTimer = setTimeout(hideTip, 220); }
  function showTip(m, r) {
    clearTimeout(tipTimer); var f = m.dataset.f !== undefined ? cur.flat[+m.dataset.f] : null, l = m.dataset.l !== undefined ? cur.longs[+m.dataset.l] : null; if (!f && !l) return;
    tip.dataset.key = (m.dataset.f || '') + '/' + (m.dataset.l || ''); tip.innerHTML = tipHTML(f, l); tip.hidden = false;
    var er = ed.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight, x = Math.min(Math.max(0, r.left - er.left), Math.max(0, er.width - tw)), y = r.top - er.top - th - 6;
    if (r.top - th - 6 < 8) y = r.bottom - er.top + 6; tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function markAt(x, y) {
    var best = null; $$('mark', bd).forEach(function (m) { if (best && best.m.dataset.f !== undefined) return; var rs = m.getClientRects(); for (var i = 0; i < rs.length; i++) { var r = rs[i]; if (x >= r.left - 1 && x <= r.right + 1 && y >= r.top - 1 && y <= r.bottom + 1) { if (!best || m.dataset.f !== undefined) best = { m: m, r: r }; return; } } }); return best;
  }
  ed.addEventListener('pointermove', function (e) {
    if (e.target.closest('#tip')) { clearTimeout(tipTimer); return; }
    var h = markAt(e.clientX, e.clientY); if (!h) return slowHide();
    var key = (h.m.dataset.f || '') + '/' + (h.m.dataset.l || ''); if (tip.hidden || tip.dataset.key !== key) showTip(h.m, h.r); else clearTimeout(tipTimer);
  });
  ed.addEventListener('pointerleave', slowHide);
  function caretTip() {
    if (draft.selectionStart !== draft.selectionEnd) return hideTip(); var pos = draft.selectionStart, f = cur.flat.filter(function (k) { return pos >= k.s && pos <= k.e; })[0], l = cur.longs.filter(function (k) { return pos >= k.s && pos <= k.e; })[0], m = f ? bd.querySelector('mark[data-f="' + f.id + '"]') : l ? bd.querySelector('mark[data-l="' + l.id + '"]') : null;
    if (m) showTip(m, m.getClientRects()[0]); else hideTip();
  }
  draft.addEventListener('click', caretTip); draft.addEventListener('keyup', function (e) { if (e.key === 'Escape') hideTip(); else if (/Arrow|Home|End/.test(e.key)) caretTip(); });
  tip.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fix]'); if (!b) return; var k = cur.flat[+b.dataset.fix], t = draft.value, r = k.r || '';
    if (r && /^[A-Z]/.test(k.t)) r = r.charAt(0).toUpperCase() + r.slice(1);
    draft.value = cleanText(t.slice(0, k.s) + r + t.slice(k.e)); lint();
  });
  draft.addEventListener('input', hideTip);
  draft.addEventListener('input', function () { lint(); });
  draft.addEventListener('paste', function () { bd.classList.remove('pulse'); void bd.offsetWidth; bd.classList.add('pulse'); });
  $$('#lintVoice button').forEach(function (b) { b.addEventListener('click', function () { LV = +b.dataset.lv; $$('#lintVoice button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); bd.classList.remove('pulse'); void bd.offsetWidth; bd.classList.add('pulse'); lint(); }); });
  $('#fix').addEventListener('click', function () {
    var t = draft.value, fixes = findMarks(t).flat.filter(function (k) { return k.r !== null && k.r !== undefined; }).sort(function (a, b) { return b.s - a.s; }), n = fixes.length;
    fixes.forEach(function (k) { var r = k.r; if (r && /^[A-Z]/.test(k.t)) r = r.charAt(0).toUpperCase() + r.slice(1); t = t.slice(0, k.s) + r + t.slice(k.e); });
    draft.value = cleanText(t); lint(true); $('#lintStatus').textContent = n ? n + ' quick fix' + (n > 1 ? 'es' : '') + ' applied. The rest needs your judgment.' : 'No quick fixes for this voice. The rest needs your judgment.'; toast(n ? 'Quick fixes applied.' : 'Nothing to fix automatically.');
  });
  $('#reset').addEventListener('click', function () { draft.value = SAMPLE_L; lint(); });
  $('#clear').addEventListener('click', function () { draft.value = ''; lint(); draft.focus(); });
  lint(true);

  /* ---------- lab tabs: one game on screen at a time ---------- */
  var labTabs = $$('.lab-tabs [role="tab"]');
  function showGame(i, focus) {
    labTabs.forEach(function (t, j) {
      var on = i === j, panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; panel.hidden = !on;
      if (on && focus) t.focus();
    });
    hideTip(); if (i !== 0 && G.state !== 'idle') mtLoad();
  }
  labTabs.forEach(function (t, i) {
    t.addEventListener('click', function () { showGame(i); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = k === 'ArrowRight' ? (i + 1) % labTabs.length : k === 'ArrowLeft' ? (i + labTabs.length - 1) % labTabs.length : k === 'Home' ? 0 : k === 'End' ? labTabs.length - 1 : -1;
      if (n > -1) { e.preventDefault(); showGame(n, true); }
    });
  });

  /* ---------- contact ---------- */
  $('#copy').addEventListener('click', function () { try { navigator.clipboard.writeText('denelsen.dandi363@gmail.com').then(function () { toast('Address copied'); }, function () { toast('Copy blocked here. The address is on the page.'); }); } catch (e) { toast('Copy blocked here. The address is on the page.'); } });

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
