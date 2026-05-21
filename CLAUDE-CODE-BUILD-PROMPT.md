# CLAUDE CODE PROMPT — BENCHLIFE V2

Copy and paste the STARTING PROMPT at the bottom into Claude Code first.
Then follow up task by task in order.

═══════════════════════════════════════════════════════════════════════════════
## CONTEXT — READ EVERYTHING BEFORE WRITING ANY CODE
═══════════════════════════════════════════════════════════════════════════════

You are working on Benchlife — a two-person web app for bonding experiences.
Single HTML file, no build system, vanilla JS only.

### TECH STACK (do not change):
- Vanilla HTML + CSS + JavaScript
- Firebase Realtime Database (firebase-compat v10.8.0)
- Story generation: Cloud Run at `https://generatestory-uvznh5fnza-uc.a.run.app`
- Spotify API (already working, do not touch)
- Google Fonts: Cormorant Garamond, Spectral, Tenor Sans
- One file: `index.html` (~12,928 lines)

### EXISTING FIREBASE STRUCTURE:
```
rooms/{roomCode}/
  theme: string
  benchType: string          (ADD THIS — new in v2)
  members: { Ian: true, Eli: true }
  location: string
  memory: { facts: [] }
  discovery: { Ian: {}, Eli: {} }   (ADD THIS — new in v2)
  game/
    roundsPlayed: number
    currentTurn: string
    depthLevel: number
    history: []
    currentPrompt: { opening, state }
  messages/{id}: { user, text, timestamp }
  presence/{user}: { online, lastSeen }
```

### EXISTING STATE OBJECT (extend, do not replace):
```javascript
const S = {
  room: null, user: null, theme: null, memory: null,
  chatRef: null, dashCb: null, gameRef: null, presRef: null,
  // ADD THESE:
  benchType: 'lovers',
  discoveryAnswers: {}
};
```

### EXISTING SCREENS:
- `#landing` — landing page
- `#dashboard` — room management
- `#setupScreen` — room setup
- `#loginScreen` — name pick
- `#session` — active bench room

### NEW SCREENS TO ADD:
- `#benchTypeScreen` — pick Lovers/Friends/Sillies
- `#discoveryScreen` — 10 questions before first session

### KEY EXISTING FUNCTIONS (do not rename or break):
- `applyPalette(key)` — switches CSS palette
- `applyLocation(key)` — renders location scene
- `db.ref(path)` — Firebase reference
- All `showScreen()` equivalents (find the existing pattern)

### WHAT MUST NEVER BREAK:
- Firebase realtime sync
- Location rendering (animated SVG scenes)
- Chat system
- Spotify integration
- Depth level system
- Memory/facts system
- Dev panel
- Birthday card
- All accessibility features (focus rings, sr-only, skip link)

### NEW CONTENT FILE:
`benchlife-v2-content.js` contains:
- `BENCH_TYPES` — Lovers/Friends/Sillies config with palettes
- `DISCOVERY_QUESTIONS` — 30 questions (10 per type), 5 options each
- `BENCH_PROMPTS` — 140+ prompts by type and category
- `ALL_LOCATIONS` — shared pool

═══════════════════════════════════════════════════════════════════════════════
## TASK 1 — INCLUDE CONTENT FILE
═══════════════════════════════════════════════════════════════════════════════

Add before closing </body>:
```html
<script src="benchlife-v2-content.js"></script>
```

Place BEFORE the main app script block.

Verify in console:
- `BENCH_TYPES` returns object with 3 types
- `DISCOVERY_QUESTIONS.lovers.length` returns 10
- `BENCH_PROMPTS.lovers.laughter.length` returns 12

═══════════════════════════════════════════════════════════════════════════════
## TASK 2 — EXTEND STATE + ADD BENCH TYPE SELECTOR SCREEN
═══════════════════════════════════════════════════════════════════════════════

Step A: Extend S object — add `benchType: 'lovers'` and `discoveryAnswers: {}`

Step B: Add `#benchTypeScreen` HTML after `#setupScreen`, before `#loginScreen`:

```html
<div id="benchTypeScreen" class="screen" role="main" tabindex="-1">
  <div class="btc-wrap">
    <div class="btc-header">
      <p class="btc-eyebrow">a bench for two</p>
      <h1 class="btc-title">Benchlife</h1>
      <p class="btc-sub">What kind of bench?</p>
    </div>
    <div class="btc-cards" id="btcCards"></div>
    <div class="btc-join">
      <p class="btc-join-label">Have a code?</p>
      <div class="btc-join-row">
        <input type="text" id="btcCodeInput" placeholder="ROOM CODE"
          maxlength="8" autocapitalize="characters" aria-label="Room code" />
        <button onclick="btcJoin()" class="btc-join-btn">Join</button>
      </div>
    </div>
  </div>
</div>
```

Step C: Add CSS for `.btc-wrap`, `.btc-header`, `.btc-eyebrow`, `.btc-title`,
`.btc-sub`, `.btc-cards`, `.btc-card`, `.btc-join`, `.btc-join-label`,
`.btc-join-row`, `.btc-join-btn`.

Style should match existing Benchlife aesthetic:
- Cormorant Garamond for headings
- Tenor Sans for labels/buttons
- Spectral for body text
- Use existing CSS variables (--bg, --ink, --muted, --border, --card, --rose)
- Warm, unhurried, elegant

Step D: Add JavaScript:

```javascript
function btcInit() {
  const c = document.getElementById('btcCards');
  if (!c) return;
  c.innerHTML = '';
  Object.values(BENCH_TYPES).forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'btc-card';
    btn.setAttribute('aria-label', t.name + ' bench');
    btn.innerHTML = '<span>' + t.emoji + '</span><span>' + t.name + '</span>'
      + '<span class="btc-card-tag">' + t.tagline + '</span>';
    btn.onclick = () => btcSelect(t.id);
    c.appendChild(btn);
  });
}

function btcSelect(typeId) {
  S.benchType = typeId;
  startDiscovery(typeId);
}

function btcJoin() {
  const code = (document.getElementById('btcCodeInput').value || '').trim().toUpperCase();
  if (!code) { alert('Enter a room code.'); return; }
  db.ref('rooms/' + code).once('value', snap => {
    if (!snap.exists()) { alert('Room not found. Check the code.'); return; }
    S.benchType = snap.val().benchType || 'lovers';
    S.room = code;
    showScreen('loginScreen'); // Use existing show function
  });
}
```

Call `btcInit()` when `#benchTypeScreen` is shown.

Update the landing page "New bench" / "Take a seat" buttons to call
`showScreen('benchTypeScreen')` instead of existing flow.

═══════════════════════════════════════════════════════════════════════════════
## TASK 3 — DISCOVERY QUESTIONS SCREEN
═══════════════════════════════════════════════════════════════════════════════

Add `#discoveryScreen` HTML after `#benchTypeScreen`:

```html
<div id="discoveryScreen" class="screen" role="main" tabindex="-1">
  <div class="dsc-wrap">
    <div class="dsc-progress">
      <span class="dsc-counter" id="dscCounter">1 of 10</span>
      <div class="dsc-bar"><div class="dsc-fill" id="dscFill"></div></div>
    </div>
    <div class="dsc-qwrap">
      <h2 class="dsc-question" id="dscQuestion"></h2>
    </div>
    <div class="dsc-options" id="dscOptions"></div>
    <button class="dsc-skip" onclick="dscSkip()">Skip for now</button>
  </div>
</div>
```

Add matching CSS using existing design tokens. Keep it clean and readable.
Auto-advance to next question 350ms after selecting an answer.
Progress bar fills as questions are answered.

JavaScript:

```javascript
let _dsc = { answers: {}, index: 0, questions: [], type: 'lovers' };

function startDiscovery(type) {
  _dsc = {
    answers: {},
    index: 0,
    questions: DISCOVERY_QUESTIONS[type] || [],
    type: type
  };
  showScreen('discoveryScreen');
  dscRender();
}

function dscRender() {
  const q = _dsc.questions[_dsc.index];
  if (!q) { dscFinish(); return; }
  const pct = ((_dsc.index + 1) / _dsc.questions.length) * 100;
  document.getElementById('dscCounter').textContent =
    (_dsc.index + 1) + ' of ' + _dsc.questions.length;
  document.getElementById('dscFill').style.width = pct + '%';
  document.getElementById('dscQuestion').textContent = q.q;
  const opts = document.getElementById('dscOptions');
  opts.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'dsc-opt';
    btn.textContent = opt;
    btn.onclick = () => dscAnswer(q.id, i, btn);
    opts.appendChild(btn);
  });
}

function dscAnswer(qid, idx, btn) {
  document.querySelectorAll('.dsc-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  _dsc.answers[qid] = idx;
  setTimeout(() => {
    _dsc.index++;
    dscRender();
  }, 350);
}

function dscSkip() {
  _dsc.questions.forEach(q => { _dsc.answers[q.id] = q.opts.length - 1; });
  dscFinish();
}

function dscFinish() {
  S.discoveryAnswers = _dsc.answers;
  S.benchType = _dsc.type;
  showScreen('setupScreen');
}
```

═══════════════════════════════════════════════════════════════════════════════
## TASK 4 — SAVE BENCH TYPE TO FIREBASE
═══════════════════════════════════════════════════════════════════════════════

Find where `db.ref('rooms/' + code).set(roomData)` is called when creating a room.

Add to the roomData object before `.set()`:
```javascript
benchType: S.benchType || 'lovers',
discovery: {}
```

After room created successfully, save creator's discovery:
```javascript
db.ref('rooms/' + code + '/discovery/' + S.user).set(S.discoveryAnswers || {});
```

When joining a room (find existing join logic), after loading room data:
```javascript
S.benchType = roomData.benchType || 'lovers';
// Save joiner's discovery answers too
if (S.discoveryAnswers && Object.keys(S.discoveryAnswers).length > 0) {
  db.ref('rooms/' + S.room + '/discovery/' + S.user).set(S.discoveryAnswers);
}
```

For existing rooms without benchType, default to 'lovers' wherever benchType is read.

═══════════════════════════════════════════════════════════════════════════════
## TASK 5 — PERSONALIZED PROMPT SELECTION
═══════════════════════════════════════════════════════════════════════════════

Add these functions. Do not remove existing prompt arrays — keep backwards compatibility.

```javascript
function getV2Prompt(benchType, discoveryAnswers) {
  const typePrompts = BENCH_PROMPTS[benchType];
  if (!typePrompts) return null;

  const weights = buildV2Weights(benchType, discoveryAnswers);
  let pool = [];

  Object.keys(typePrompts).forEach(cat => {
    const w = weights[cat] || 1;
    for (let i = 0; i < w; i++) {
      pool = pool.concat(typePrompts[cat]);
    }
  });

  // Filter seen prompts this session
  const seen = (S.memory && S.memory.seenV2Prompts) || [];
  const available = pool.filter(p => !seen.includes(p.prompt));
  const final = available.length > 0 ? available : pool;

  return final[Math.floor(Math.random() * final.length)] || null;
}

function buildV2Weights(type, ans) {
  const w = {};
  if (type === 'lovers') {
    w.vulnerability = 1; w.desire = 1; w.presence = 1; w.touch = 1;
    w.novelty = 1; w.affirmation = 1; w.mutual = 1;
    w.laughter = 3; w.banter = 2; w.goofiness = 2;
    w.surprises = 1; w.heartThenLaugh = 1;
    if (ans) {
      if (ans['l01'] === 0) w.touch = (w.touch || 1) + 2;
      if (ans['l01'] === 1) w.affirmation = (w.affirmation || 1) + 2;
      if (ans['l04'] === 3) { w.vulnerability = 0; w.laughter += 2; }
      if (ans['l07'] === 0) w.presence = (w.presence || 1) + 2;
      if (ans['l07'] === 1) w.laughter += 2;
      if (ans['l07'] === 2) w.touch = (w.touch || 1) + 2;
      if (ans['l10'] === 1) w.touch = (w.touch || 1) + 2;
      if (ans['l10'] === 2) { w.laughter += 2; w.goofiness += 1; }
    }
  } else if (type === 'friends') {
    w.connection = 1; w.support = 1; w.laughter = 3;
    w.memories = 2; w.honesty = 1; w.future = 1; w.appreciation = 2;
  } else if (type === 'sillies') {
    w.chaos = 3; w.roasting = 3; w.memes = 2;
    w.absurd = 3; w.hotTakes = 2; w.laughs = 3; w.randomChaos = 2;
  }
  return w;
}

function markV2PromptSeen(prompt) {
  if (!S.memory) S.memory = {};
  if (!S.memory.seenV2Prompts) S.memory.seenV2Prompts = [];
  if (prompt && prompt.prompt) {
    S.memory.seenV2Prompts.push(prompt.prompt);
  }
}
```

Wire `getV2Prompt(S.benchType, S.discoveryAnswers)` into the existing
prompt delivery flow. When a v2 prompt is returned, use it.
If null (no match), fall back to existing DARES/STORIES arrays.

After a v2 prompt is displayed, call `markV2PromptSeen(prompt)`.

═══════════════════════════════════════════════════════════════════════════════
## TASK 6 — SKIP BUTTON ON PROMPTS
═══════════════════════════════════════════════════════════════════════════════

Find the game panel where prompts are displayed (id="gamePanel" or similar).

Add below the prompt text:
```html
<button class="btn-skip" onclick="skipV2Prompt()" aria-label="Skip this prompt">
  skip this one
</button>
```

CSS:
```css
.btn-skip {
  background: none; border: none;
  color: var(--muted); opacity: 0.65;
  font-family: 'Tenor Sans', sans-serif;
  font-size: 11px; letter-spacing: 0.08em;
  text-transform: lowercase; cursor: pointer;
  padding: 6px; margin-top: 6px;
  text-decoration: underline; text-underline-offset: 3px;
  transition: opacity 0.2s;
}
.btn-skip:hover { opacity: 1; }
```

JavaScript:
```javascript
let _v2SkipCount = 0;

function skipV2Prompt() {
  _v2SkipCount++;
  // Load new prompt without any visible tracking
  // Call the existing "give me something else" / "next prompt" function
  // Find the existing function that loads a new prompt and call it here
}
```

IMPORTANT: Do not show `_v2SkipCount` to the other person. Private only.

═══════════════════════════════════════════════════════════════════════════════
## TASK 7 — WAITING STATE TIMEOUT
═══════════════════════════════════════════════════════════════════════════════

After a user submits their answer and is waiting for the other person:

```javascript
let _waitTimer = null;

function startWaitTimer() {
  clearWaitTimer();
  _waitTimer = setTimeout(() => {
    showWaitTimeout();
  }, 5 * 60 * 1000); // 5 minutes
}

function showWaitTimeout() {
  // Find the waiting indicator element and update its content
  const waitEl = document.querySelector('.waiting-for-them') || document.querySelector('[data-wait]');
  if (!waitEl) return;
  waitEl.innerHTML = `
    <p style="font-family:'Spectral',serif;font-style:italic;color:var(--muted);font-size:13px;margin-bottom:12px;">
      They might be away.
    </p>
    <button onclick="clearWaitTimer()" class="btn-keep-waiting">Keep waiting</button>
  `;
}

function clearWaitTimer() {
  if (_waitTimer) { clearTimeout(_waitTimer); _waitTimer = null; }
}
```

Call `startWaitTimer()` when waiting state begins.
Call `clearWaitTimer()` when both answers arrive.

═══════════════════════════════════════════════════════════════════════════════
## TASK 8 — SAFETY NOTE + BENCH TYPE IN HEADER
═══════════════════════════════════════════════════════════════════════════════

Add safety note (subtle, always visible in session):
```html
<p class="bench-safe-note">No pressure. Skip anything that feels uncomfortable.</p>
```

CSS:
```css
.bench-safe-note {
  font-family: 'Spectral', serif;
  font-size: 11px; color: var(--muted);
  font-style: italic; text-align: center;
  opacity: 0.6; padding: 4px 0;
}
```

Add bench type to session header. Find `id="ambRoom"` and update when session loads:
```javascript
function updateAmbRoom() {
  const el = document.getElementById('ambRoom');
  if (!el) return;
  const type = BENCH_TYPES[S.benchType] || BENCH_TYPES.lovers;
  el.textContent = type.emoji + ' ' + S.room;
}
```

Call `updateAmbRoom()` after session loads.

═══════════════════════════════════════════════════════════════════════════════
## TASK 9 — UPDATE LANDING PAGE
═══════════════════════════════════════════════════════════════════════════════

Find `id="landingCta"` on the landing page.

Update the "New bench" / "Take a seat" call-to-action to show bench type options.
Each bench type becomes a button that leads to discovery → setup.

Keep existing landing page design. Just update the CTA section.

Add join-with-code input below the type options.

Show bench types using `BENCH_TYPES` from the content file.
Each card: emoji + name + tagline (italic, right-aligned).

Style using existing CSS variables. Match existing landing aesthetic.

═══════════════════════════════════════════════════════════════════════════════
## TASK 10 — BACKWARDS COMPATIBILITY CHECK
═══════════════════════════════════════════════════════════════════════════════

Check all the following still work after Tasks 1-9:

1. Existing rooms (no benchType in Firebase) load correctly → default to 'lovers'
2. Ian/Eli can join without going through bench type selector (if they have a code)
3. Prompt delivery still works (old DARES/STORIES still available as fallback)
4. Location scenes still animate
5. Chat still syncs in realtime
6. Spotify still connects and plays
7. Dev panel still opens

Fix any regressions found. Log all fixes.

═══════════════════════════════════════════════════════════════════════════════
## TASK 11 — FINAL VERIFICATION
═══════════════════════════════════════════════════════════════════════════════

Open the app and test this complete flow:

NEW BENCH (Creator):
1. Landing → see 3 bench type options + join code input
2. Click "Lovers" → see discovery questions
3. Answer all 10 questions (auto-advances)
4. Reach setup screen → create room
5. Get room code → session loads
6. See bench type emoji in header
7. See safety note
8. See skip button on prompt
9. Select Truth/Dare/Goofy → see appropriate v2 prompt

JOINING (As second person):
1. Landing → enter room code in join field
2. Goes to name selection
3. Loads session with correct bench type palette

EXISTING FEATURES:
- Chat works
- Location renders
- Depth increases over time
- No console errors

═══════════════════════════════════════════════════════════════════════════════
## CONSTRAINTS (REPEAT — VERY IMPORTANT)
═══════════════════════════════════════════════════════════════════════════════

1. NO frameworks — vanilla JS only
2. NO build system — everything inline or in script tags
3. DO NOT break Firebase sync
4. DO NOT break Spotify
5. DO NOT rename existing functions
6. DO NOT change CSS variable names (--rose, --sage, --gold etc.)
7. DO NOT remove accessibility features
8. ADD code, don't replace when possible
9. ONE TASK AT A TIME — test between each task
10. If unsure, ask before doing

═══════════════════════════════════════════════════════════════════════════════
## DESIGN PRINCIPLES (Share if Claude Code asks)
═══════════════════════════════════════════════════════════════════════════════

- Warm, unhurried, elegant (never urgent, never stressful)
- Fun and playful is a REQUIREMENT
- No streaks, no scores, no pressure metrics
- Skip is always available, never penalized
- The bench is the host — it serves you, you don't serve it
- New users should feel welcomed, not overwhelmed
- Existing users (Ian & Eli) should feel like they got an upgrade, not lost their home

═══════════════════════════════════════════════════════════════════════════════
## STARTING PROMPT — PASTE THIS INTO CLAUDE CODE
═══════════════════════════════════════════════════════════════════════════════

---

I'm building Benchlife v2. My project folder contains:

- `index.html` — the full existing app (vanilla JS, Firebase Realtime DB, ~12,900 lines)
- `benchlife-v2-content.js` — new content library with bench types, questions, prompts
- `BENCHLIFE-V2-INTEGRATION-PROMPT.md` — spec with 11 tasks

Please read all three files now. Then tell me:

1. What tech stack is used (be specific about Firebase version, fonts, etc.)
2. What are the existing screen IDs
3. What is the current state object (S)
4. What does the Firebase room structure look like
5. What BENCH_TYPES and DISCOVERY_QUESTIONS contain from the content file
6. What Task 1 will do and any concerns before starting

Do not write any code yet. Just read and confirm you understand the system.

---

AFTER Claude Code confirms correctly, say:
"Good. Now do Task 1 only. Stop after Task 1 and wait for me to test."

Then test. Then say:
"Task 1 is working. Do Task 2 only."

Continue one task at a time through Task 11.

═══════════════════════════════════════════════════════════════════════════════
