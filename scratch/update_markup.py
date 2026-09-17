# Script to update index.html with the 4 requested features:
# 1. Custom Magnetic Cursor
# 2. Minimal 2.5D Mouse Tilt Parallax
# 3. Interactive Strategic Corridor Map (Baku - Istanbul - Global)
# 4. Cinematic Ambient Soundscape (Web Audio API Synthesizer)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. ADD CSS FOR CURSOR, SOUND TOGGLE, CORRIDOR MAP
css_additions = '''
/* ============ SOUND TOGGLE ============ */
.sound-toggle{display:inline-flex;align-items:center;gap:7px;background:rgba(7,24,38,.65);border:1px solid rgba(140,210,235,.22);border-radius:24px;padding:5px 12px;backdrop-filter:blur(8px);transition:.3s;color:var(--mut);font-size:10px;letter-spacing:.16em}
.sound-toggle:hover{border-color:rgba(165,225,242,.45);color:var(--tx);box-shadow:0 0 16px rgba(94,198,230,.18)}
.sound-toggle.playing{border-color:rgba(94,198,230,.65);color:#fff;box-shadow:0 0 18px rgba(94,198,230,.35)}
.sound-wave{display:inline-flex;align-items:flex-end;gap:2px;height:10px}
.sound-wave i{width:2px;height:3px;background:currentColor;border-radius:1px;transition:height .25s}
.sound-toggle.playing .sound-wave i:nth-child(1){animation:soundBar 1s ease-in-out infinite}
.sound-toggle.playing .sound-wave i:nth-child(2){animation:soundBar 1.25s ease-in-out infinite .25s}
.sound-toggle.playing .sound-wave i:nth-child(3){animation:soundBar .85s ease-in-out infinite .45s}
@keyframes soundBar{0%,100%{height:3px}50%{height:10px}}

/* ============ CUSTOM MAGNETIC CURSOR ============ */
@media (hover: hover) and (pointer: fine) {
  body, button, a, [data-go], .pnode, .stat, .chips li, .lang-btn, .pm-btn, #discover, #toTop { cursor: none !important; }
  .cursor-dot{position:fixed;width:6px;height:6px;background:#cfeffb;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 10px rgba(94,198,230,.9);transition:opacity .3s,transform .15s ease-out}
  .cursor-ring{position:fixed;width:34px;height:34px;border:1px solid rgba(165,225,242,.45);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:width .25s ease-out,height .25s ease-out,border-color .25s,background .25s,box-shadow .25s;backdrop-filter:blur(.5px)}
  .cursor-ring.active{width:54px;height:54px;border-color:rgba(94,198,230,.85);background:rgba(94,198,230,.12);box-shadow:0 0 24px rgba(94,198,230,.4)}
  .cursor-dot.active{transform:translate(-50%,-50%) scale(1.6);background:#fff}
}

/* ============ PARTNER MODES & CORRIDOR MAP ============ */
.partner-modes{display:inline-flex;align-items:center;gap:10px;background:rgba(4,16,26,.75);border:1px solid rgba(140,210,235,.2);padding:4px 10px;border-radius:24px;backdrop-filter:blur(10px);margin-top:-10px}
.pm-btn{font-size:10px;letter-spacing:.22em;color:var(--mut);padding:5px 12px;border-radius:18px;text-transform:uppercase;transition:.3s}
.pm-btn:hover{color:var(--tx)}
.pm-btn.active{color:#fff;background:rgba(94,198,230,.22);box-shadow:0 0 14px rgba(94,198,230,.35);font-weight:600}
.pm-sep{color:rgba(140,210,235,.3);font-size:11px}

.corridor-stage{position:relative;width:min(1060px,92vw);height:min(520px,54vh);display:none;opacity:0}
.corr-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.main-arc{stroke-dasharray:12 6;animation:beamFlow 30s linear infinite}
@keyframes beamFlow{to{stroke-dashoffset:-360}}
.laser-beam{stroke:#a5e1f2;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 10px rgba(165,225,242,.9))}

.cnode{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%);padding:14px 18px;text-align:center;
  background:rgba(4,16,26,.88);border:1px solid rgba(140,220,245,.28);backdrop-filter:blur(8px);
  color:#eafafd;white-space:nowrap;transition:transform .35s,box-shadow .35s,border-color .35s;cursor:default}
.cnode b{display:block;font-size:11px;letter-spacing:.28em;color:#fff}
.cnode i{display:block;font-style:normal;font-size:8.5px;letter-spacing:.22em;color:var(--acc2);margin-top:4px}
.cnode small{display:block;font-size:7.5px;letter-spacing:.18em;color:var(--mut);margin-top:3px;font-family:monospace}
.cnode-beacon{position:absolute;left:50%;top:-10px;width:10px;height:10px;transform:translateX(-50%);border-radius:50%;background:#5ec6e6;box-shadow:0 0 16px rgba(94,198,230,.9);animation:beaconPulse 2s ease-in-out infinite}
@keyframes beaconPulse{0%,100%{transform:translateX(-50%) scale(1);opacity:.8}50%{transform:translateX(-50%) scale(1.4);opacity:1}}
.cnode.hub-baku{border-color:rgba(94,198,230,.6);box-shadow:0 0 35px rgba(94,198,230,.25)}
.cnode.hub-ist{border-color:rgba(217,154,85,.55);box-shadow:0 0 35px rgba(217,154,85,.2)}
.cnode.hub-ist b{color:#fae8d2}
.cnode.hub-ist i{color:var(--warm)}
.cnode:hover{transform:translate(-50%,-50%) scale(1.1);box-shadow:0 0 45px rgba(94,198,230,.5);z-index:10}
.corridor-stage.hovering .cnode{opacity:.22;filter:blur(1px)}
.corridor-stage.hovering .cnode.hot{opacity:1;filter:none;transform:translate(-50%,-50%) scale(1.12);box-shadow:0 0 44px rgba(94,198,230,.5);z-index:10}
'''

# Inject CSS before </style>
html = html.replace('</style>', css_additions + '\n</style>')

# 2. INJECT SOUND TOGGLE IN HEADER
nav_actions_old = '''  <div class="nav-actions">
    <div class="lang-toggle" aria-label="Language switch">'''

nav_actions_new = '''  <div class="nav-actions">
    <button class="sound-toggle" id="soundToggle" aria-label="Toggle ambient sound">
      <span class="sound-wave"><i></i><i></i><i></i></span>
      <span id="soundLabel">SOUND OFF</span>
    </button>
    <div class="lang-toggle" aria-label="Language switch">'''

html = html.replace(nav_actions_old, nav_actions_new)

# 3. INJECT PARTNER MODES AND CORRIDOR STAGE IN #partners
partners_old = '''    <div class="pin-wrap">
      <h2 class="h-big net-title rv" id="netTitle">BUILT TOGETHER</h2>
      <div class="net-stage" id="netStage">'''

partners_new = '''    <div class="pin-wrap">
      <h2 class="h-big net-title rv" id="netTitle">BUILT TOGETHER</h2>
      <div class="partner-modes rv" id="partnerModes">
        <button class="pm-btn active" id="pmBtnNet" data-pmode="net">TƏRƏFDAŞLIQ ŞƏBƏKƏSİ</button>
        <span class="pm-sep">/</span>
        <button class="pm-btn" id="pmBtnCorr" data-pmode="corr">STRATEJİ DƏHLİZ (BAKI — İSTANBUL)</button>
      </div>
      <div class="net-stage" id="netStage">'''

html = html.replace(partners_old, partners_new)

# Add corridorStage right after #netStage
net_stage_end = '''      </div>
      <div class="net-info rv" id="netInfo">Hover a partner to learn more — the network keeps growing.</div>'''

corridor_stage_html = '''      </div>
      <!-- ================= STRATEGIC CORRIDOR STAGE ================= -->
      <div class="corridor-stage" id="corridorStage">
        <svg class="corr-svg" viewBox="0 0 1000 520" preserveAspectRatio="none">
          <defs>
            <linearGradient id="corrBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#5ec6e6" stop-opacity="0.3"/>
              <stop offset="50%" stop-color="#cfeffb" stop-opacity="1"/>
              <stop offset="100%" stop-color="#d99a55" stop-opacity="0.4"/>
            </linearGradient>
            <filter id="corrGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <line x1="80" y1="260" x2="920" y2="260" stroke="rgba(140,210,235,0.08)" stroke-width="1" stroke-dasharray="4 6"/>
          <line x1="500" y1="60" x2="500" y2="460" stroke="rgba(140,210,235,0.08)" stroke-width="1" stroke-dasharray="4 6"/>
          <!-- Great Geodesic Arcs -->
          <path class="main-arc" d="M360 250 C440 140, 600 140, 680 250" stroke="url(#corrBeam)" stroke-width="2.6" fill="none" filter="url(#corrGlow)"/>
          <path class="sub-arc" d="M680 250 C760 190, 830 190, 870 210" stroke="rgba(140,210,235,0.4)" stroke-width="1.2" stroke-dasharray="3 4" fill="none"/>
          <path class="sub-arc" d="M360 250 C280 190, 210 190, 150 210" stroke="rgba(140,210,235,0.4)" stroke-width="1.2" stroke-dasharray="3 4" fill="none"/>
          <!-- Animated traveling pulses -->
          <circle id="laserPulse1" r="4" fill="#cfeffb" filter="url(#corrGlow)"/>
          <circle id="laserPulse2" r="3.5" fill="#ffd9a1" filter="url(#corrGlow)"/>
        </svg>

        <!-- HUB 1: BAKU -->
        <div class="cnode hub-baku" style="--x:68%;--y:48%" data-info="BAKI — Holdinqin Baş Qərargahı, Enerji, Logistika və Xəzər Qapısı. (40.4093° N, 49.8671° E)">
          <div class="cnode-beacon"></div>
          <b>BAKI · BAKU</b>
          <i>HQ &amp; Caspian Gateway</i>
          <small>40.4093° N · 49.8671° E</small>
        </div>

        <!-- HUB 2: ISTANBUL -->
        <div class="cnode hub-ist" style="--x:36%;--y:48%" data-info="İSTANBUL — Avropa və Asiya Qovşağı, İnşaat və Kommersiya Körpüsü. (41.0082° N, 28.9784° E)">
          <div class="cnode-beacon" style="background:#d99a55;box-shadow:0 0 16px rgba(217,154,85,.9)"></div>
          <b>İSTANBUL · ISTANBUL</b>
          <i>Commercial &amp; Build Bridge</i>
          <small>41.0082° N · 28.9784° E</small>
        </div>

        <!-- HUB 3: EURASIA -->
        <div class="cnode hub-asia" style="--x:87%;--y:40%" data-info="MƏRKƏZİ ASİYA — Aqrar Ticarət, Təbii Məhsullar və İpək Yolu Dəhlizi.">
          <b>EURASIA</b>
          <i>Trade &amp; Commodity Hub</i>
        </div>

        <!-- HUB 4: GLOBAL REACH -->
        <div class="cnode hub-eu" style="--x:15%;--y:40%" data-info="QƏRBİ AVROPA VƏ QLOBAL BAZARLAR — Beynəlxalq İxrac və İnvestisiya Şəbəkəsi.">
          <b>GLOBAL REACH</b>
          <i>Export &amp; Capital Markets</i>
        </div>
      </div>
      <div class="net-info rv" id="netInfo">Hover a partner to learn more — the network keeps growing.</div>'''

html = html.replace(net_stage_end, corridor_stage_html)

# 4. INJECT CURSOR ELEMENTS BEFORE </body>
cursor_html = '''<!-- Custom Magnetic Cursor -->
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>
'''
html = html.replace('</body>', cursor_html + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated markup successfully!')
