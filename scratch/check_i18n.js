const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// extract last inline <script> block (the app script, no src)
const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if (!scriptMatches.length) { console.error('NO INLINE SCRIPT FOUND'); process.exit(1); }
const script = scriptMatches[scriptMatches.length - 1][1];

// 1) syntax check
try {
  new Function(script);
  console.log('SYNTAX OK — script length:', script.length);
} catch (e) {
  console.error('SYNTAX ERROR:', e.message);
  process.exit(1);
}

// 2) dict key parity check: evaluate DICT in isolation
const dictMatch = script.match(/const DICT = \{[\s\S]*?\n\};/);
if (!dictMatch) { console.error('DICT NOT FOUND'); process.exit(1); }
let DICT;
try {
  DICT = new Function(`const DICT = ${dictMatch[0].replace(/^const DICT = /, '').replace(/;\s*$/, '')}; return DICT;`)();
} catch (e) {
  console.error('DICT EVAL ERROR:', e.message);
  process.exit(1);
}
const langs = Object.keys(DICT);
console.log('LANGS:', langs.join(', '));
const base = Object.keys(DICT.az).sort();
let ok = true;
for (const l of langs) {
  const keys = Object.keys(DICT[l]).sort();
  const missing = base.filter(k => !keys.includes(k));
  const extra = keys.filter(k => !base.includes(k));
  if (missing.length || extra.length) {
    ok = false;
    console.log(`  [${l}] missing: ${missing.join(',') || '-'} | extra: ${extra.join(',') || '-'}`);
  } else {
    console.log(`  [${l}] ${keys.length} keys — parity OK`);
  }
}
// 3) array length checks
for (const l of langs) {
  if (DICT[l].menuLinks.length !== DICT.az.menuLinks.length) { ok = false; console.log(`  [${l}] menuLinks length mismatch`); }
  if (DICT[l].conChips.length !== 3) { ok = false; console.log(`  [${l}] conChips length != 3`); }
  if (DICT[l].foodList.length !== 4) { ok = false; console.log(`  [${l}] foodList length != 4`); }
}
console.log(ok ? 'ALL CHECKS PASSED' : 'CHECKS FAILED');
process.exit(ok ? 0 : 1);
