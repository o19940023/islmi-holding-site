
(function(){
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const NAME='İSLİMİ';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasLib=!!(window.gsap&&window.ScrollTrigger);

/* ============ MULTI-LANGUAGE SYSTEM (AZ / EN) ============ */
let curLang = localStorage.getItem('islimi_lang') || 'az';
let isSoundActive = false;
let activePartnerMode = 'net';

const DICT = {
  az: {
    heroSub: 'Daha Güclü Gələcəyi Birlikdə Qururuq',
    heroTag: 'İnsanlara, ideyalara<br>və gələcəyə<br>yatırım edirik.',
    discover: 'KƏŞF EDİN',
    discoverSmall: 'KƏŞF ETMƏK ÜÇÜN SÜRÜŞDÜRÜN',
    metaScr: 'SÜRÜŞDÜRÜN',
    tw1: 'BİR',
    tw2: 'ŞİRKƏTDƏN',
    tw3: 'DAHA ARTIQ',
    ecoLabel: 'Holdinq Ekosistemi',
    ecoTitle: 'Fərqli istiqamətlər.<br>Tək bir vizyon.',
    ecoDesc: 'Tikinti, qida və ticarət, təhsil və beynəlxalq tərəfdaşlıqlar — vahid inkişaf fəlsəfəsi ilə birləşən sahələr.',
    ecoNodeEdu: 'TƏHSİL', ecoSubEdu: 'İDRAK',
    ecoNodeCon: 'TİKİNTİ', ecoSubCon: 'İnkişaf',
    ecoNodeFood: 'QİDA VƏ TİCARƏT', ecoSubFood: 'Ənənəvi brendlər',
    ecoNodeNet: 'TƏRƏFDAŞLIQ', ecoSubNet: 'Şəbəkə',
    conLabel: '01 — Tikinti',
    conH: 'TİKİNTİ',
    conSub: 'Gələcəyin məkanlarını inşa edirik.',
    conBody: 'Konsepsiyadan tam təhvilə qədər — uzunmüddətli dəyər yaradan yaşayış, kommersiya və qarışıq təyinatlı müasir komplekslər inşa edirik.',
    conChips: ['YAŞAYIŞ', 'KOMMERSİYA', 'QARIŞIQ TƏYİNATLI'],
    foodLabel: '02 — Qida və Ticarət',
    foodH: 'QİDA VƏ TİCARƏT',
    foodSub: 'Ənənədən müasir dünyaya.',
    foodList: ['Ədviyyatlar', 'Turşular və Təbii Məhsullar', 'Şərbətlər və Limonadlar', 'Şirniyyatlar'],
    foodBody: 'Yerli irsdən müasir bazarlara daşınan ənənəvi təamlar — Azərbaycan və Türkiyə xəttində təbii məhsullar və seçilmiş brendlər.',
    fCap1Title: 'ƏDVİYYATLAR', fCap1Sub: 'Təbii günəşdə qurudulmuş',
    fCap2Title: 'TƏBİİ TURŞULAR', fCap2Sub: 'Palıd çəlləkdə fermentasiya',
    fCap3Title: 'ŞƏRBƏTLƏR &amp; LİMONAD', fCap3Sub: 'Tarixi reseptlər',
    storyLabel: '03 — Adın Mənşəyi',
    storyCap: 'Təbiəti, dinamikanı və zərifliyi tərənnüm edən ənənəvi naxışdan ilhamlanan «İslimi», klassik bəzək sənətinin qıvrılan sarmaşıq xəttidir. Bu ad təkcə brend deyil; gələcəyə doğru cızdığımız inkişaf yoludur.',
    p1Title: 'TİKİNTİ',
    p1Desc: 'Konsepsiyadan tam təhvilə qədər — gələcək onilliklər üçün inşa edilən premium yaşayış və kommersiya layihələri.',
    p2Title: 'QİDA VƏ TİCARƏT',
    p2Desc: 'Tarixi ləzzətlər, təbii məhsullar və xüsusi brendlər — ənənədən müasir pərakəndə satışa.',
    p3Title: 'TƏHSİL — İDRAK',
    p3Desc: 'Holdinq daxilində açıq bilik ekosistemi — ilk növbədə insana sərmayə qoyan tədris proqramları.',
    netTitle: 'BİRLİKDƏ QURURUQ',
    netInfoDefault: 'Daha ətraflı məlumat üçün tərəfdaşın üzərinə gəlin — şəbəkəmiz böyüməkdə davam edir.',
    pnCenter: 'Ana ekosistem — tikinti, qida və ticarət, təhsil.',
    pnIdrak: 'Holdinqin təhsil və inkişaf ekosistemi.',
    pnTrade: 'Qlobal paylama və regional ticarət ittifaqları.',
    pnInfra: 'Mühəndislik, inşaat və birgə investisiya konsorsiumu.',
    pnGhost1: 'Yeni strateji tərəfdaşlıq — tezliklə elan olunacaq.',
    pnGhost2: 'Azərbaycan, Türkiyə və Avrasiya üzrə genişlənən əməkdaşlıq.',
    pnTradeText: 'Qlobal Ticarət',
    pnInfraText: 'İnfrastruktur',
    pnGhost1Text: '+ Strateji Tərəfdaş',
    pnGhost2Text: '+ Regional Şəbəkə',
    statsLabel: '04 — Miqyas və Təsir',
    statTitle: 'ONİLLİKLƏRLƏ ÖLÇÜLƏN TƏCRÜBƏ.',
    statSub: 'NƏSİLLƏR ÜÇÜN QURULUR.',
    stName0: 'İllik<br>Təcrübə', stDesc0: 'Davamlı inkişaf və möhkəm təcrübə',
    stName1: 'Tamamlanmış<br>Layihə', stDesc1: 'Yaşayış, kommersiya və ticarət aktivləri',
    stName2: 'Strateji<br>Tərəfdaş', stDesc2: 'Regionu birləşdirən beynəlxalq əlaqələr',
    stName3: 'Aktiv<br>Bazar', stDesc3: 'Avrasiya miqyasında genişlənən fəaliyyət',
    statNote: '* Demo göstəricilər — rəsmi hesabatlar dərc edildikdə yenilənəcəkdir.',
    mvLabel: '05 — Haqqımızda',
    mvTitle: 'TƏK BİR VİZYON. ÇOXŞAXƏLİ İSTİQAMƏT.',
    mv1Badge: 'MİSSİYA',
    mv1Text: 'Ənənəvi və təbii məhsulları qlobal bazarlara çıxarmaq — yerli istehsalçılarla beynəlxalq imkanlar arasında etibarlı körpü qurmaq.',
    mv2Badge: 'VİZYON',
    mv2Text: 'Azərbaycan və Türkiyədən başlayaraq uzunmüddətli tərəfdaşlıqları və dayanıqlı biznesləri birləşdirən aparıcı regional holdinq ekosisteminə çevrilmək.',
    mvIdxM: '01 MİSSİYA', mvIdxV: '02 VİZYON',
    futLabel: '06 — Gələcək',
    futTitle: 'YENİ MƏRHƏLƏ.',
    futSub: 'ARTIQ İNŞA EDİLİR.',
    futBody: 'Üfüqdə holdinq ekosistemini növbəti onilliyə daşıyacaq yeni nəsil layihələr formalaşır.',
    cTitle: 'GƏLƏCƏYİ BİRLİKDƏ İNŞA EDƏK.',
    cSubLoc: 'Bakı, Azərbaycan',
    cLabelPhone: 'Əlaqə nömrəsi',
    cLabelMail: 'E-poçt',
    cLabelFollow: 'Bizi izləyin',
    footCopy: '© 2026 İSLİMİ HOLDİNG — Daha güclü gələcəyi qururuq.',
    menuFootCity: 'İSLİMİ HOLDİNG — Bakı, Azərbaycan',
    menuLinks: ['ANA SƏHİFƏ', 'TİKİNTİ', 'QİDA VƏ TİCARƏT', 'İSLİMİ BRENDİ', 'PORTFOLİO', 'TƏRƏFDAŞLAR', 'MİQYAS &amp; TƏSİR', 'ƏLAQƏ'],
    soundOn: 'SƏS AÇIQ',
    soundOff: 'SƏS BAĞLI',
    pmBtnNet: 'TƏRƏFDAŞLIQ ŞƏBƏKƏSİ',
    pmBtnCorr: 'STRATEJİ DƏHLİZ (BAKI — İSTANBUL)',
    cnBakuRole: 'Baş Qərargah & Xəzər Qapısı',
    cnBakuInfo: 'BAKI — Holdinqin Baş Qərargahı, Enerji, Logistika və Xəzər Qapısı. (40.4093° N, 49.8671° E)',
    cnIstRole: 'Ticarət & İnşaat Körpüsü',
    cnIstInfo: 'İSTANBUL — Avropa və Asiya Qovşağı, İnşaat və Kommersiya Körpüsü. (41.0082° N, 28.9784° E)',
    cnAsiaRole: 'Ticarət & Əmtəə Dəhlizi',
    cnAsiaInfo: 'MƏRKƏZİ ASİYA — Aqrar Ticarət, Təbii Məhsullar və Tarixi İpək Yolu Dəhlizi.',
    cnGlobalRole: 'İxrac & Qlobal Bazarlar',
    cnGlobalInfo: 'QƏRBİ AVROPA VƏ QLOBAL BAZARLAR — Beynəlxalq İxrac və İnvestisiya Şəbəkəsi.'
  },
  en: {
    heroSub: 'Building a Stronger Tomorrow',
    heroTag: 'Investing in people,<br>ideas and<br>the future.',
    discover: 'DISCOVER',
    discoverSmall: 'SCROLL TO EXPLORE',
    metaScr: 'SCROLL',
    tw1: 'MORE',
    tw2: 'THAN',
    tw3: 'A COMPANY',
    ecoLabel: 'The Ecosystem',
    ecoTitle: 'Different directions.<br>One vision.',
    ecoDesc: 'Construction, food & trade, education and partnerships — separate fields connected by a single way of building.',
    ecoNodeEdu: 'EDUCATION', ecoSubEdu: 'İDRAK',
    ecoNodeCon: 'CONSTRUCTION', ecoSubCon: 'Development',
    ecoNodeFood: 'FOOD & TRADE', ecoSubFood: 'Heritage brands',
    ecoNodeNet: 'PARTNERSHIPS', ecoSubNet: 'Network',
    conLabel: '01 — Construction',
    conH: 'CONSTRUCTION',
    conSub: 'Building spaces for the future.',
    conBody: 'From concept to completion, we develop residential, commercial and mixed-use spaces designed for long-term value — places where people live, work and grow.',
    conChips: ['RESIDENTIAL', 'COMMERCIAL', 'MIXED-USE'],
    foodLabel: '02 — Food & Trade',
    foodH: 'FOOD & TRADE',
    foodSub: 'From tradition to the modern world.',
    foodList: ['Spices', 'Pickles &amp; Natural', 'Sherbets &amp; Lemonade', 'Confectionery'],
    foodBody: 'Traditional tastes carried from local heritage to modern markets — natural products and selected brands across the Türkiye–Azerbaijan corridor.',
    fCap1Title: 'SPICES', fCap1Sub: 'Sun-dried · stone-ground',
    fCap2Title: 'NATURAL PICKLES', fCap2Sub: 'Barrel-fermented',
    fCap3Title: 'SHERBETS &amp; LEMONADE', fCap3Sub: 'Bottled heritage',
    storyLabel: '03 — The Name',
    storyCap: 'Inspired by a traditional motif representing nature, movement and elegance — “islimi” is the curving vine of Turkic decorative art. The name is not a label; it is the line we build along.',
    p1Title: 'CONSTRUCTION',
    p1Desc: 'Concept-to-completion development — residential, commercial and mixed-use landmarks built for the next decades.',
    p2Title: 'FOOD & TRADE',
    p2Desc: 'Heritage tastes, natural products and selected brands — carried from tradition into modern retail.',
    p3Title: 'EDUCATION — İDRAK',
    p3Desc: 'An open knowledge ecosystem within the holding — learning programs that invest in people first.',
    netTitle: 'BUILT TOGETHER',
    netInfoDefault: 'Hover a partner to learn more — the network keeps growing.',
    pnCenter: 'The parent ecosystem — construction, food & trade, education.',
    pnIdrak: 'Education ecosystem of the holding.',
    pnTrade: 'International trade and regional distribution alliances.',
    pnInfra: 'Engineering and infrastructure consortium.',
    pnGhost1: 'New strategic partnership — announcing soon.',
    pnGhost2: 'Expanding alliances across Azerbaijan, Türkiye and Eurasia.',
    pnTradeText: 'GLOBAL TRADE',
    pnInfraText: 'INFRASTRUCTURE',
    pnGhost1Text: '+ Strategic Partner',
    pnGhost2Text: '+ Regional Network',
    statsLabel: '04 — Scale & Impact',
    statTitle: 'MEASURED IN DECADES.',
    statSub: 'BUILT FOR GENERATIONS.',
    stName0: 'Years of<br>Experience', stDesc0: 'Rooted in sustainable execution & regional presence',
    stName1: 'Completed<br>Projects', stDesc1: 'Landmark residential, commercial & trade assets',
    stName2: 'Strategic<br>Alliances', stDesc2: 'Cross-border network connecting the region',
    stName3: 'Active<br>Markets', stDesc3: 'Expanding operational footprint across Eurasia',
    statNote: '* Demo values — official holding figures will replace these upon formal release.',
    mvLabel: '05 — About',
    mvTitle: 'ONE VISION. MANY DIRECTIONS.',
    mv1Badge: 'MISSION',
    mv1Text: 'Connect traditional and natural products to broader markets — building a trusted bridge between local producers and global opportunity.',
    mv2Badge: 'VISION',
    mv2Text: 'Become a recognized regional holding ecosystem — connecting long-term partnerships and sustainable businesses from Azerbaijan and Türkiye outward.',
    mvIdxM: '01 MISSION', mvIdxV: '02 VISION',
    futLabel: '06 — The Future',
    futTitle: 'THE NEXT CHAPTER.',
    futSub: 'IS ALREADY UNDER CONSTRUCTION.',
    futBody: 'A new generation of projects is taking shape on the horizon — designed to carry the ecosystem into its next decade.',
    cTitle: 'LET\'S BUILD WHAT\'S NEXT.',
    cSubLoc: 'Baku, Azerbaijan',
    cLabelPhone: 'Contact us',
    cLabelMail: 'Email',
    cLabelFollow: 'Follow',
    footCopy: '© 2026 İSLİMİ HOLDİNG — Building a stronger tomorrow.',
    menuFootCity: 'İSLİMİ HOLDİNG — Baku, Azerbaijan',
    menuLinks: ['HOME', 'CONSTRUCTION', 'FOOD & TRADE', 'THE NAME', 'PORTFOLIO', 'PARTNERS', 'SCALE & IMPACT', 'CONTACT'],
    soundOn: 'SOUND ON',
    soundOff: 'SOUND OFF',
    pmBtnNet: 'PARTNERSHIP NETWORK',
    pmBtnCorr: 'STRATEGIC CORRIDOR (BAKU — ISTANBUL)',
    cnBakuRole: 'HQ & Caspian Gateway',
    cnBakuInfo: 'BAKU — Holding Headquarters, Energy, Logistics & Caspian Gateway. (40.4093° N, 49.8671° E)',
    cnIstRole: 'Commercial & Build Bridge',
    cnIstInfo: 'ISTANBUL — Hub of Europe & Asia, Construction & Commerce Bridge. (41.0082° N, 28.9784° E)',
    cnAsiaRole: 'Trade & Commodity Hub',
    cnAsiaInfo: 'CENTRAL ASIA — Agrarian Trade, Natural Commodities & Silk Road Corridor.',
    cnGlobalRole: 'Export & Capital Markets',
    cnGlobalInfo: 'WESTERN EUROPE & GLOBAL MARKETS — International Export & Investment Alliances.'
  }
};

function applyLang(lang){
  curLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('islimi_lang', lang);
  const d = DICT[lang] || DICT.az;

  $$('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.setLang === lang);
  });

  $('#heroSub').textContent = d.heroSub;
  $('#heroTagP').innerHTML = d.heroTag;
  $('#dLab').textContent = d.discover;
  $('#dSmall').textContent = d.discoverSmall;
  $('#metaScr').textContent = d.metaScr;

  $('#tw1').textContent = d.tw1;
  $('#tw2').textContent = d.tw2;
  $('#tw3').textContent = d.tw3;

  $('#ecoLabel').textContent = d.ecoLabel;
  $('#ecoTitle').innerHTML = d.ecoTitle;
  $('#ecoDesc').textContent = d.ecoDesc;
  $('#ecoNodeEdu').textContent = d.ecoNodeEdu; $('#ecoSubEdu').textContent = d.ecoSubEdu;
  $('#ecoNodeCon').textContent = d.ecoNodeCon; $('#ecoSubCon').textContent = d.ecoSubCon;
  $('#ecoNodeFood').textContent = d.ecoNodeFood; $('#ecoSubFood').textContent = d.ecoSubFood;
  $('#ecoNodeNet').textContent = d.ecoNodeNet; $('#ecoSubNet').textContent = d.ecoSubNet;

  $('#conLabel').textContent = d.conLabel;
  $('#conSub').textContent = d.conSub;
  $('#conBody').textContent = d.conBody;
  $('#conChips').innerHTML = d.conChips.map(c=>`<li>${c}</li>`).join('');

  $('#foodLabel').textContent = d.foodLabel;
  $('#foodSub').textContent = d.foodSub;
  $('#foodList').innerHTML = d.foodList.map(item=>`<li>${item}</li>`).join('');
  $('#foodBody').textContent = d.foodBody;
  $('#fCap1Title').textContent = d.fCap1Title; $('#fCap1Sub').textContent = d.fCap1Sub;
  $('#fCap2Title').textContent = d.fCap2Title; $('#fCap2Sub').textContent = d.fCap2Sub;
  $('#fCap3Title').textContent = d.fCap3Title; $('#fCap3Sub').textContent = d.fCap3Sub;

  $('#storyLabel').textContent = d.storyLabel;
  $('#storyCap').textContent = d.storyCap;

  $('#p1Title').textContent = d.p1Title; $('#p1Desc').textContent = d.p1Desc;
  $('#p2Title').textContent = d.p2Title; $('#p2Desc').textContent = d.p2Desc;
  $('#p3Title').textContent = d.p3Title; $('#p3Desc').textContent = d.p3Desc;

  $('#pnCenter').dataset.info = d.pnCenter;
  $('#pnIdrak').dataset.info = d.pnIdrak;
  $('#pnTrade').dataset.info = d.pnTrade;
  $('#pnInfra').dataset.info = d.pnInfra;
  $('#pnGhost1').dataset.info = d.pnGhost1;
  $('#pnGhost2').dataset.info = d.pnGhost2;
  $('#pnTrade').textContent = d.pnTradeText;
  $('#pnInfra').textContent = d.pnInfraText;
  $('#pnGhost1').textContent = d.pnGhost1Text;
  $('#pnGhost2').textContent = d.pnGhost2Text;
  $('#netInfo').textContent = d.netInfoDefault;

  $('#statsLabel').textContent = d.statsLabel;
  $('#statSub').textContent = d.statSub;
  $('#stName0').innerHTML = d.stName0; $('#stDesc0').textContent = d.stDesc0;
  $('#stName1').innerHTML = d.stName1; $('#stDesc1').textContent = d.stDesc1;
  $('#stName2').innerHTML = d.stName2; $('#stDesc2').textContent = d.stDesc2;
  $('#stName3').innerHTML = d.stName3; $('#stDesc3').textContent = d.stDesc3;
  $('#statNote').textContent = d.statNote;

  $('#mvLabel').textContent = d.mvLabel;
  $('#mv1Badge').textContent = d.mv1Badge; $('#mv1Text').textContent = d.mv1Text;
  $('#mv2Badge').textContent = d.mv2Badge; $('#mv2Text').textContent = d.mv2Text;
  $('#mvIdxM').textContent = d.mvIdxM; $('#mvIdxV').textContent = d.mvIdxV;

  $('#futLabel').textContent = d.futLabel;
  $('#futSub').textContent = d.futSub;
  $('#futBody').textContent = d.futBody;

  $('#cSubLoc').textContent = d.cSubLoc;
  $('#cLabelPhone').textContent = d.cLabelPhone;
  $('#cLabelMail').textContent = d.cLabelMail;
  $('#cLabelFollow').textContent = d.cLabelFollow;
  $('#footCopy').textContent = d.footCopy;
  $('#menuFootCity').textContent = d.menuFootCity;

  // Menu items
  d.menuLinks.forEach((txt, idx)=>{
    const el = $(`#mLink${idx}`);
    if(el){ el.innerHTML = txt; el.setAttribute('data-t', txt.replace('&amp;', '&')); }
  });

  // Re-split animated titles
  split('#conH', d.conH);
  split('#foodH', d.foodH);
  split('#netTitle', d.netTitle);
  split('#statTitle', d.statTitle);
  split('#mvTitle', d.mvTitle);
  split('#futTitle', d.futTitle);
  split('#cTitle', d.cTitle);

  // Sound toggle label
  if($('#soundLabel')) {
    $('#soundLabel').textContent = isSoundActive ? d.soundOn : d.soundOff;
  }
  if($('#pmBtnNet')) $('#pmBtnNet').textContent = d.pmBtnNet;
  if($('#pmBtnCorr')) $('#pmBtnCorr').textContent = d.pmBtnCorr;
  if($('#cnBakuRole')) $('#cnBakuRole').textContent = d.cnBakuRole;
  if($('#cnIstRole')) $('#cnIstRole').textContent = d.cnIstRole;
  if($('#cnAsiaRole')) $('#cnAsiaRole').textContent = d.cnAsiaRole;
  if($('#cnGlobalRole')) $('#cnGlobalRole').textContent = d.cnGlobalRole;
  if($('#cnBaku')) $('#cnBaku').dataset.info = d.cnBakuInfo;
  if($('#cnIst')) $('#cnIst').dataset.info = d.cnIstInfo;
  if($('#cnAsia')) $('#cnAsia').dataset.info = d.cnAsiaInfo;
  if($('#cnGlobal')) $('#cnGlobal').dataset.info = d.cnGlobalInfo;
  if($('#netInfo')) {
    $('#netInfo').textContent = activePartnerMode === 'corr' ? d.cnBakuInfo : d.netInfoDefault;
  }
}

/* ---------- brand mark (İ as skyline) ---------- */
function markSVG(uid){return `<svg viewBox="0 0 64 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="mg-${uid}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#eef9fd"/><stop offset=".5" stop-color="#9fd7e8"/><stop offset="1" stop-color="#4e9cbd"/>
</linearGradient></defs>
<path fill="url(#mg-${uid})" d="M30 4h8v10h-8z"/>
<path fill="url(#mg-${uid})" d="M22 18h10v74h-10z"/>
<path fill="url(#mg-${uid})" d="M36 26h8v66h-8z"/>
<path fill="url(#mg-${uid})" d="M6 46h10v46H6z"/>
<path fill="url(#mg-${uid})" d="M48 38h10v46H48z"/>
</svg>`;}

// Preloader logo uses authentic logo4k.png
// $('#plMark').outerHTML=markSVG('pl')... removed to preserve logo4k.png image
$('#brandHome').innerHTML='<img class="brand-logo" src="assets/logo4k.png" alt="İSLİMİ HOLDİNG"/><b>İSLİMİ HOLDİNG</b>';
$('#heroTitle').innerHTML='<img class="mark" src="assets/logo4k.png" alt="İSLİMİ HOLDİNG"/>'
 +'<div class="ht-name" id="htName"></div><div class="ht-hold">HOLDİNG</div>';
$('#ecoCore').insertAdjacentHTML('afterbegin',markSVG('eco'));

/* letters for İSLİMİ */
function letters(container,txt,cls){container.innerHTML=[...txt].map(c=>`<span class="${cls}">${c}</span>`).join('');}
letters($('#plName'),NAME,'pl-i');
letters($('#htName'),NAME,'l');
$('#swName').innerHTML=[...NAME].map(c=>`<span class="sw">${c}</span>`).join('');

/* split big titles into chars */
function split(sel, txt){
  const el = typeof sel === 'string' ? $(sel) : sel;
  if(!el) return;
  const t = txt || el.textContent;
  el.setAttribute('aria-label', t);
  el.textContent = '';
  [...t].forEach(c=>{
    const s = document.createElement('span');
    s.className = 'ch';
    s.innerHTML = c === ' ' ? '&nbsp;' : c;
    el.appendChild(s);
  });
}

/* stars */
(function(){
  const el=$('#stars');
  let sh=[];
  for(let i=0;i<96;i++){
    sh.push(`${(Math.random()*100).toFixed(1)}vw ${(Math.random()*46).toFixed(1)}vh 0 rgba(255,255,255,${(0.15+Math.random()*0.5).toFixed(2)})`);
  }
  el.style.boxShadow=sh.join(',');
})();

/* hero buildings */
function buildCity(){
 const stage=$('#cityStage');
 const defs=[
  {w:132,h:38,x:32,ry:-16,d:40,z:2},
  {w:196,h:56,x:50,ry:-11,d:54,z:3},
  {w:150,h:43,x:67,ry:-18,d:44,z:2}
 ];
 defs.forEach(c=>{
  const b=document.createElement('div');b.className='bld';
  b.style.cssText=`left:${c.x}%;width:${c.w}px;height:${c.h}vh;--ry:${c.ry}deg;--d:${c.d}px;z-index:${c.z}`;
  b.innerHTML=`<div class="b-base"></div><div class="b-core"><div class="b-front"></div><div class="b-side"></div><div class="b-lights"></div><div class="b-crown"></div></div>`;
  stage.appendChild(b);
  const L=b.querySelector('.b-lights');
  const n=Math.round(c.w*(c.h*innerHeight/100)/1400);
  for(let i=0;i<n;i++){
    const w=document.createElement('i');
    const warm=Math.random()>.4;
    w.style.cssText=`left:${3+Math.random()*90}%;top:${2+Math.random()*90}%;--o:${(0.35+Math.random()*0.55).toFixed(2)};--fd:${(2.6+Math.random()*4.4).toFixed(1)}s;--fdl:${(-Math.random()*6).toFixed(1)}s;background:${warm?'#ffd9a1':'#aee6ff'}`;
    L.appendChild(w);
  }
 });
}
buildCity();

/* construction lights */
(function(){
  const L=$('#pLights');
  for(let i=0;i<46;i++){
    const w=document.createElement('i');
    w.style.cssText=`left:${(4+Math.random()*90).toFixed(1)}%;top:${(3+Math.random()*92).toFixed(1)}%;--fd:${(2.4+Math.random()*4).toFixed(1)}s;--fdl:${(-Math.random()*5).toFixed(1)}s;background:${Math.random()>.3?'#ffd9a1':'#aee6ff'}`;
    L.appendChild(w);
  }
})();

/* ---------- global particle canvas ---------- */
const fx=$('#fx'),fctx=fx.getContext('2d');
let W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
let dust=[],spice=[],spiceOn=false;
function sizeFX(){W=innerWidth;H=innerHeight;fx.width=W*DPR;fx.height=H*DPR;fctx.setTransform(DPR,0,0,DPR,0,0);}
sizeFX();addEventListener('resize',sizeFX);
const DUST_MAX=innerWidth<860?36:80;
function loopFX(t){
 fctx.clearRect(0,0,W,H);
 if(dust.length<DUST_MAX&&Math.random()<.4)dust.push({x:Math.random()*W,y:H+12,r:.5+Math.random()*1.5,s:.12+Math.random()*.35,tw:Math.random()*6.28,o:.10+Math.random()*.28});
 fctx.save();
 for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.y-=p.s;p.x+=Math.sin(t*.0006+p.tw)*.15;
  if(p.y<-14){dust.splice(i,1);continue;}
  const a=p.o*(0.55+0.45*Math.sin(t*.0016+p.tw));
  fctx.globalAlpha=Math.max(a,0);fctx.fillStyle='#bfe4f2';fctx.beginPath();fctx.arc(p.x,p.y,p.r,0,6.283);fctx.fill();}
 fctx.restore();
 if(spiceOn&&spice.length<130&&Math.random()<.75){
  spice.push({x:W*(0.16+Math.random()*0.3),y:H*(0.55+Math.random()*0.35),vx:(Math.random()-.5)*.5,vy:-(.35+Math.random()*.9),r:1+Math.random()*2.4,l:1,tw:Math.random()*6.28});}
 for(let i=spice.length-1;i>=0;i--){const p=spice[i];p.x+=p.vx+Math.sin(t*.002+p.tw)*.3;p.y+=p.vy;p.l-=.008;
  if(p.l<=0){spice.splice(i,1);continue;}
  fctx.globalAlpha=Math.max(p.l*.8,0);fctx.fillStyle=p.tw>3.14?'#e8a44c':'#d07f2f';fctx.beginPath();fctx.arc(p.x,p.y,p.r*p.l,0,6.283);fctx.fill();}
 fctx.globalAlpha=1;
 requestAnimationFrame(loopFX);
}
requestAnimationFrame(loopFX);

/* preloader particles */
let plRun=true;
(function(){
 const c=$('#plFx'),x=c.getContext('2d');
 const ps=[];for(let i=0;i<110;i++){const a=Math.random()*6.283;ps.push({a,r:280*(0.7+Math.random()*0.55),tr:26+Math.random()*70,sp:.004+Math.random()*.01,s:0.6+Math.random()*1.6});}
 (function draw(){
  if(!plRun)return;
  x.clearRect(0,0,560,560);x.save();x.translate(280,280);
  for(const p of ps){p.r+=(p.tr-p.r)*.022;p.a+=p.sp*(p.r<120?1.6:1);
   x.globalAlpha=.14+.5*Math.abs(Math.sin(p.a*2.4));
   x.fillStyle='#9fd7e8';x.beginPath();x.arc(Math.cos(p.a)*p.r,Math.sin(p.a)*p.r*.9,p.s,0,6.283);x.fill();}
  x.restore();requestAnimationFrame(draw);
 })();
})();

if(!hasLib){
 document.body.classList.add('no-lib');document.body.classList.remove('locked');
 const pl=$('#preloader');if(pl)pl.remove();plRun=false;
 applyLang(curLang);
 return;
}

/* ---------- libraries present: cinematic engine ---------- */
gsap.registerPlugin(ScrollTrigger);
history.scrollRestoration='manual';scrollTo(0,0);

const lenis=window.Lenis?new Lenis({duration:1.25,smoothWheel:true}):null;
if(lenis){lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);lenis.stop();}
const scrollToY=(target,opts={})=>{if(lenis)lenis.scrollTo(target,Object.assign({duration:1.8},opts));else if(typeof target==='number')scrollTo(0,target);else target.scrollIntoView({behavior:'smooth'});};

/* ================= PRELOADER TIMELINE ================= */
const plTl=gsap.timeline({onComplete:finishPreload});
plTl.fromTo('#plCenter',{opacity:0},{opacity:1,duration:.4},.15)
 .fromTo('#plMark',{opacity:0,scale:.72,filter:'blur(16px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1.4,ease:'power2.out'},.4)
 .to('#plMark',{filter:'drop-shadow(0 0 34px rgba(94,198,230,.75))',duration:1.1,yoyo:true,repeat:1,ease:'sine.inOut'},1.1)
 .fromTo('.pl-i',{opacity:0,y:30,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.08,duration:.9,ease:'power3.out'},1.25)
 .to('#plBar',{scaleX:1,duration:.8,ease:'power2.inOut'},1.95)
 .fromTo('#plHold',{opacity:0,letterSpacing:'.9em'},{opacity:1,letterSpacing:'.42em',duration:.9,ease:'power2.out'},2.1)
 .to({},{duration:reduced?0:.7})
 .to('#plCenter',{scale:.6,opacity:0,filter:'blur(12px)',duration:.75,ease:'power2.in'},'>-.05');

/* Preloader skip on click / keydown */
$('#preloader').addEventListener('click', finishPreload);
addEventListener('keydown', e=>{ if(!plDone) finishPreload(); });

/* ================= CITY INTRO (time-based) ================= */
const cityTl=gsap.timeline({paused:true});
cityTl.fromTo('.sil-far',{opacity:0,y:34},{opacity:.5,y:0,duration:1.5,ease:'power1.out'},.15)
 .fromTo('.sil-mid',{opacity:0,y:26},{opacity:.75,y:0,duration:1.5,ease:'power1.out'},.3)
 .fromTo('.horizon',{opacity:0},{opacity:1,duration:1.7},.25)
 .fromTo('.bld',{opacity:0,y:'7%'},{opacity:1,y:'0%',duration:1.15,ease:'power2.out',stagger:.32},.4)
 .fromTo('.b-lights',{opacity:0},{opacity:1,duration:1.1,stagger:.32},1.05)
 .fromTo('.island',{opacity:0},{opacity:1,duration:1},1.15)
 .fromTo('.sea-shimmer',{opacity:0},{opacity:1,duration:1.2},1.3)
 .fromTo('#nav',{y:-26,opacity:0},{y:0,opacity:1,duration:.9,ease:'power2.out'},1.7)
 .fromTo('#htName .l',{opacity:0,y:34,filter:'blur(12px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.06,duration:1,ease:'power3.out'},1.55)
 .fromTo('#heroTitle .ht-hold',{opacity:0,y:16},{opacity:1,y:0,duration:.8},2.15)
 .fromTo('#heroTitle .mark',{opacity:0,scale:.8,filter:'blur(8px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:.9},2.05)
 .fromTo('#heroSub',{opacity:0,letterSpacing:'.9em'},{opacity:1,letterSpacing:'.5em',duration:1.2,ease:'power2.out'},2.4)
 .fromTo('#heroTag',{opacity:0,x:-30},{opacity:1,x:0,duration:1,ease:'power2.out'},2.6)
 .fromTo('#discover',{opacity:0,y:24},{opacity:1,y:0,duration:1,ease:'power2.out'},2.75)
 .fromTo('#heroMeta',{opacity:0},{opacity:1,duration:.9},2.9);

let plDone=false;
function finishPreload(){
 if(plDone)return;plDone=true;plRun=false;
 const pl=$('#preloader');gsap.to(pl,{opacity:0,duration:.6,ease:'power1.inOut',onComplete:()=>pl.remove()});
 applyCam();
 cityTl.play();
 gsap.delayedCall(reduced?0:1.3,()=>{document.body.classList.remove('locked');if(lenis)lenis.start();ScrollTrigger.refresh();applyCam();});
}

/* ================= MASTER CAMERA (sole owner of #world & #cityStage) ================= */
const worldEl=$('#world'),cityEl=$('#cityStage');
let camKeys=null;
function buildCamKeys(){
 const k=[];const add=(y,w,s,ty,ry,bl)=>k.push({y,w,s,ty,ry,bl});
 const L=(st,f)=>st.start+(st.end-st.start)*f;
 const st1=tl1.scrollTrigger,st2=tl2.scrollTrigger,st3=tl3.scrollTrigger,st4=tl4.scrollTrigger,stStats=tlStats.scrollTrigger,st8=tl8.scrollTrigger;
 add(st1.start,1,1,0,0,0);
 add(L(st1,.26),1,1.42,-5,-7,0);
 add(L(st1,.34),1,1.95,-10,-7,9);
 add(L(st1,.55),1,1.95,-10,-7,9);
 add(L(st1,.63),.3,2.1,-10,-7,9);
 add(L(st1,.80),.3,2.1,-10,-7,9);
 add(L(st1,.92),.95,.72,7,6,0);
 add(st2.start,.95,.72,7,6,0);
 add(L(st2,.22),.55,.64,9,10,0);
 add(st2.end,.45,.64,9,10,0);
 add(L(st3,.15),.1,.58,11,14,0);
 add(L(st4,.12),0,.58,11,14,0);
 add(stStats.start,0,.58,11,14,0);
 add(stStats.end,0,.58,11,14,0);
 add(st8.start,0,.58,11,14,0);
 add(L(st8,.27),.9,.58,11,14,0);
 add(L(st8,.68),1,.3,50,0,0);
 add(st8.end+innerHeight,1,.3,50,0,0);
 return k;
}
function applyCam(){
 if(!camKeys)return;
 const y=Math.max(window.scrollY||0,0),k=camKeys;
 let a=k[0],b=k[k.length-1];
 for(let i=0;i<k.length-1;i++){if(y>=k[i].y&&y<=k[i+1].y){a=k[i];b=k[i+1];break;}}
 const span=b.y-a.y,t=span>0?Math.min(Math.max((y-a.y)/span,0),1):0;
 const e=t*t*(3-2*t);
 const w=a.w+(b.w-a.w)*e,s=a.s+(b.s-a.s)*e,ty=a.ty+(b.ty-a.ty)*e,ry=a.ry+(b.ry-a.ry)*e,bl=a.bl+(b.bl-a.bl)*e;
 worldEl.style.opacity=w.toFixed(3);
 cityEl.style.transform=`scale(${s.toFixed(3)}) translateY(${ty.toFixed(2)}%) rotateY(${ry.toFixed(2)}deg)`;
 cityEl.style.filter=bl>.05?`blur(${bl.toFixed(2)}px)`:'none';
}

/* ================= ACT 1 ================= */
const tl1=gsap.timeline({defaults:{ease:'power1.inOut'},scrollTrigger:{trigger:'#act1',start:'top top',end:'+=520%',pin:true,scrub:1,anticipatePin:1}});
tl1
 .to('#heroUI',{opacity:0,y:-46,filter:'blur(9px)',duration:1.3},.35)
 .set('#aTypo',{visibility:'visible'},3.3)
 .fromTo('.a-typo .tw:nth-child(1)',{opacity:0,filter:'blur(18px)',y:20},{opacity:1,filter:'blur(0px)',y:0,duration:.8},3.35)
 .fromTo('.a-typo .tw:nth-child(2)',{opacity:0,filter:'blur(18px)',y:20},{opacity:1,filter:'blur(0px)',y:0,duration:.8},4.05)
 .fromTo('.a-typo .tw:nth-child(3)',{opacity:0,filter:'blur(18px)',y:20},{opacity:1,filter:'blur(0px)',y:0,duration:.8},4.75)
 .to('#aTypo',{scale:1.02,duration:1.2},4.75)
 .to('.a-typo .tw',{scale:.85,opacity:0,filter:'blur(10px)',y:-16,stagger:.06,duration:.7},5.65)
 .set('#aEco',{visibility:'visible'},6.2)
 .fromTo('#ecoCore',{opacity:0,scale:.4},{opacity:1,scale:1,duration:.9,ease:'back.out(1.6)'},6.25)
 .fromTo('#ecoHead',{opacity:0,x:-30},{opacity:1,x:0,duration:.8},6.5)
 .fromTo('.eco-node',{opacity:0,scale:.6,filter:'blur(8px)'},{opacity:1,scale:1,filter:'blur(0px)',stagger:.28,duration:.75,ease:'back.out(1.4)'},6.9)
 .fromTo('.eco-lines .ln',{strokeDashoffset:1},{strokeDashoffset:0,stagger:.15,duration:1.4,ease:'none'},7.0)
 .fromTo('.pk1',{attr:{cx:500,cy:310},opacity:0},{attr:{cx:500,cy:66},opacity:1,duration:1.2,ease:'none'},8.3)
 .fromTo('.pk2',{attr:{cx:500,cy:310},opacity:0},{attr:{cx:150,cy:182},opacity:1,duration:1.2,ease:'none'},8.55)
 .fromTo('.pk3',{attr:{cx:500,cy:310},opacity:0},{attr:{cx:850,cy:182},opacity:1,duration:1.2,ease:'none'},8.8)
 .to('.pk',{opacity:0,duration:.3},9.6)
 .to('.a-eco',{opacity:0,scale:1.45,y:'8%',filter:'blur(9px)',duration:1.3},9.9);

/* ================= CONSTRUCTION ================= */
const tl2=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{trigger:'#construction',start:'top top',end:'+=210%',pin:true,scrub:1,anticipatePin:1}});
tl2
 .fromTo('.c-label',{opacity:0,x:-24},{opacity:1,x:0,duration:.5},.15)
 .fromTo('.c-h .ch',{opacity:0,y:30,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.045,duration:.6},.2)
 .fromTo('.c-sub',{opacity:0,y:22},{opacity:1,y:0,duration:.55},.75)
 .fromTo('.c-body',{opacity:0,y:22},{opacity:1,y:0,duration:.55},.95)
 .fromTo('.c-chips li',{opacity:0,y:16},{opacity:1,y:0,stagger:.1,duration:.45},1.15)
 .fromTo('.p-base',{y:110,opacity:0},{y:0,opacity:1,duration:.8},.3)
 .fromTo('.p-col',{y:150,opacity:0},{y:0,opacity:1,stagger:.08,duration:.7},.55)
 .fromTo('.p-floor',{y:-110,opacity:0},{y:0,opacity:1,stagger:.07,duration:.6},.85)
 .fromTo('.p-glass',{opacity:0,scaleX:.86},{opacity:1,scaleX:1,duration:.9},1.25)
 .fromTo('#pLights',{opacity:0,clipPath:'inset(100% 0 0 0)'},{opacity:1,clipPath:'inset(0% 0 0 0)',duration:.9},1.55)
 .fromTo('.p-crown',{opacity:0},{opacity:1,duration:.4},2.0)
 .fromTo('.con-bld',{rotateY:-30},{rotateY:24,duration:3.6,ease:'none'},2.3)
 .to('.con-copy',{opacity:.35,y:-20,duration:1.2},4.4);

/* ================= FOOD & TRADE ================= */
const tl3=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{trigger:'#food',start:'top top',end:'+=220%',pin:true,scrub:1,anticipatePin:1,
 onUpdate:self=>{spiceOn=self.isActive&&self.progress>.04&&self.progress<.97;}}});
tl3
 .fromTo('.f-label',{opacity:0,x:-24},{opacity:1,x:0,duration:.5},.1)
 .fromTo('.f-h .ch',{opacity:0,y:30,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.04,duration:.6},.15)
 .fromTo('.f-sub',{opacity:0,y:22},{opacity:1,y:0,duration:.55},.6)
 .fromTo('.f-list li',{opacity:0,x:28},{opacity:1,x:0,stagger:.11,duration:.5},.8)
 .fromTo('.f-body',{opacity:0,y:20},{opacity:1,y:0,duration:.55},1.25)
 .fromTo('#fSpin',{rotateY:-7},{rotateY:9,duration:8.6,ease:'none'},0)
 .fromTo('.s1',{opacity:0,y:56,rotateY:-12,filter:'blur(12px)'},{opacity:1,y:0,rotateY:0,filter:'blur(0px)',duration:.85},.25)
 .to('.s1',{opacity:0,y:-46,filter:'blur(9px)',duration:.6},2.75)
 .fromTo('.s2',{opacity:0,y:56,rotateY:-12,filter:'blur(12px)'},{opacity:1,y:0,rotateY:0,filter:'blur(0px)',duration:.85},2.95)
 .to('.s2',{opacity:0,y:-46,filter:'blur(9px)',duration:.6},5.45)
 .fromTo('.s3',{opacity:0,y:56,rotateY:-12,filter:'blur(12px)'},{opacity:1,y:0,rotateY:0,filter:'blur(0px)',duration:.85},5.65)
 .to('.s3',{scale:1.06,duration:1.4,ease:'none'},6.7);

/* ================= STORY (USER AUTHENTIC MOTIF) ================= */
const tl4=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{trigger:'#story',start:'top top',end:'+=210%',pin:true,scrub:1,anticipatePin:1}});
tl4
 .fromTo('.story-black',{opacity:0},{opacity:1,duration:1},0)
 .fromTo('.story-label',{opacity:0,x:-24},{opacity:1,x:0,duration:.5},.3)
 .fromTo('#motifWrap',{opacity:0,scale:.38,rotate:-14,filter:'blur(16px)'},{opacity:1,scale:1,rotate:0,filter:'blur(0px)',duration:2.0,ease:'power2.out'},.5)
 .fromTo('.sw',{opacity:0,filter:'blur(12px)',y:26},{opacity:1,filter:'blur(0px)',y:0,stagger:.1,duration:.8},3.6)
 .to('#motifWrap',{opacity:.25,scale:1.45,y:'-14vh',rotate:6,duration:2.0,ease:'power1.inOut'},3.8)
 .to('#storyBar',{scaleX:1,duration:.7},4.8)
 .to('#storyHold',{opacity:1,duration:.6},5.0)
 .fromTo('#storyCap',{opacity:0,y:26},{opacity:1,y:0,duration:.9},5.4)
 .to('#motifWrap',{rotate:10,duration:2.6,ease:'none'},6.0);

/* ================= PORTFOLIO ================= */
gsap.set('#ps2,#ps3',{y:'-102%'});
gsap.set('#ps2 .p-inner,#ps3 .p-inner',{scale:.94});
const tl5=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'#portfolio',start:'top top',end:'+=330%',pin:true,scrub:1,anticipatePin:1}});
tl5
 .set('.pslide',{visibility:'visible'},0)
 .fromTo('.pi1',{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:'power2.out'},.05)
 .fromTo('.pi2',{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:'power2.out'},2.3)
 .fromTo('.pi3',{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:'power2.out'},4.6)
 .fromTo('#ps1 .p-inner',{scale:1,y:'0%'},{scale:1.17,y:'4%',duration:2.5},0)
 .to('#ps1',{y:'22%',duration:1.15,ease:'power1.in'},1.25)
 .fromTo('#ps2',{y:'-102%'},{y:'0%',duration:1.15,ease:'power1.inOut'},1.25)
 .fromTo('#ps2 .p-inner',{scale:.94},{scale:1.17,y:'4%',duration:2.5,immediateRender:false},2.4)
 .to('#ps2',{y:'22%',duration:1.15,ease:'power1.in'},3.55)
 .fromTo('#ps3',{y:'-102%'},{y:'0%',duration:1.15,ease:'power1.inOut'},3.55)
 .fromTo('#ps3 .p-inner',{scale:.94},{scale:1.12,y:'2%',duration:2.7,immediateRender:false},4.7)
 .to('.pi3',{y:-14,duration:1},5.6);

/* ================= PARTNERS ================= */
const tl6=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{trigger:'#partners',start:'top top',end:'+=170%',pin:true,scrub:1,anticipatePin:1}});
tl6
 .fromTo('#netTitle .ch',{opacity:0,y:34,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.05,duration:.7},.1)
 .fromTo('.net-svg .nl',{strokeDashoffset:1},{strokeDashoffset:0,stagger:.14,duration:1.6,ease:'none'},.5)
 .fromTo('.net-svg .nd',{opacity:0,scale:0},{opacity:1,scale:1,stagger:.12,duration:.5,transformOrigin:'center'},1.2)
 .fromTo('.pnode',{opacity:0,scale:.7,filter:'blur(8px)'},{opacity:1,scale:1,filter:'blur(0px)',stagger:.16,duration:.8},1.8)
 .fromTo('#netInfo',{opacity:0,y:16},{opacity:1,y:0,duration:.6},3.0)
 .fromTo('.net-svg',{rotate:0},{rotate:1.6,transformOrigin:'50% 50%',duration:2.4,ease:'sine.inOut'},3.4)
 .to('.net-svg',{rotate:-1.2,duration:2.2,ease:'sine.inOut'},5.8);

const netStage=$('#netStage'),netInfo=$('#netInfo');
$$('.pnode').forEach(n=>{
 n.addEventListener('mouseenter',()=>{
   netStage.classList.add('hovering');
   n.classList.add('hot');
   netInfo.textContent=n.dataset.info || '';
   netInfo.style.color='#cfeffb';
 });
 n.addEventListener('mouseleave',()=>{
   netStage.classList.remove('hovering');
   n.classList.remove('hot');
   netInfo.textContent=DICT[curLang]?.netInfoDefault || 'Hover a partner to learn more — the network keeps growing.';
   netInfo.style.color='';
 });
});

/* ================= STATS (SCALE & IMPACT - PINNED SCENE) ================= */
let statsCounted=false;
function runCounters(){
 if(statsCounted) return;
 statsCounted=true;
 $$('.stat-num').forEach(b=>{
   const end=+b.dataset.n,o={v:0};
   gsap.to(o,{v:end,duration:2.0,ease:'power2.out',onUpdate:()=>{
     b.innerHTML=Math.round(o.v)+`<em>${end===4?'':'+'}</em>`;
   }});
 });
}

const tlStats=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{
 trigger:'#stats',start:'top top',end:'+=180%',pin:true,scrub:1,anticipatePin:1,
 onEnter:()=>runCounters(),
 onUpdate:self=>{ if(self.progress>.08) runCounters(); }
}});

tlStats
 .fromTo('#statsHead',{opacity:0,y:40,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',duration:1.0},.1)
 .fromTo('#statTitle .ch',{opacity:0,y:28,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.03,duration:.8},.2)
 .fromTo('#statGrid',{opacity:0,y:50,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',duration:1.2},.5)
 .fromTo('.stat',{opacity:0,scale:.92,y:30},{opacity:1,scale:1,y:0,stagger:.12,duration:.9,onStart:()=>{
   $$('.stat').forEach(st=>st.classList.add('lit'));
 }},.7)
 .fromTo('#statNote',{opacity:0,y:16},{opacity:1,y:0,duration:.7},1.6);

/* ================= MISSION / VISION ================= */
gsap.set('#mv2',{opacity:0});
const tl7=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{trigger:'#mv',start:'top top',end:'+=190%',pin:true,scrub:1,anticipatePin:1,
 onUpdate:self=>{$('#idxM').classList.toggle('on',self.progress<.55);$('#idxV').classList.toggle('on',self.progress>=.55);}}});
tl7
 .fromTo('#mv .sec-label',{opacity:0,x:-24},{opacity:1,x:0,duration:.5},.1)
 .fromTo('#mvTitle .ch',{opacity:0,y:30,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.03,duration:.7},.2)
 .fromTo('#mv1',{opacity:0,scale:.9,filter:'blur(10px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1},1.1)
 .to('#mv1',{opacity:.1,scale:.84,filter:'blur(5px)',y:'-3%',duration:1.1},3.4)
 .fromTo('#mv2',{opacity:0,y:90,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',duration:1.1},3.6)
 .to('#mv2',{scale:1.04,duration:1.4,ease:'none'},5.2)
 .to('#mv .pin-wrap > *:not(.mv-stage)',{opacity:0,duration:.8},6.2)
 .to('#mv2',{opacity:0,y:-50,duration:.8},6.3);

/* ================= FUTURE ================= */
const tl8=gsap.timeline({defaults:{ease:'power2.out'},scrollTrigger:{trigger:'#future',start:'top top',end:'+=220%',pin:true,scrub:1,anticipatePin:1}});
tl8
 .fromTo('.fog',{opacity:.55},{opacity:.95,duration:1.6},.8)
 .fromTo('#newBld',{opacity:0,clipPath:'inset(100% 0 0 0)'},{opacity:1,clipPath:'inset(0% 0 0 0)',duration:1.5,ease:'power2.inOut'},1.8)
 .fromTo('.nb-core',{filter:'brightness(.4)'},{filter:'brightness(1.25)',duration:1.2},2.6)
 .fromTo('.fut-line',{scaleX:0},{scaleX:1,duration:.7},3.1)
 .fromTo('#futTitle .ch',{opacity:0,y:34,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.05,duration:.7},3.2)
 .fromTo('#future .h-sub',{opacity:0,letterSpacing:'.8em'},{opacity:1,letterSpacing:'.34em',duration:.9},4.1)
 .fromTo('#future .body',{opacity:0,y:20},{opacity:1,y:0,duration:.7},4.5)
 .fromTo('#future .sec-label',{opacity:0,x:-20},{opacity:1,x:0,duration:.5},4.3);

/* ================= CONTACT reveals ================= */
gsap.set('.c-wrap .rv',{opacity:0,y:34,filter:'blur(8px)'});
ScrollTrigger.create({trigger:'#contact',start:'top 70%',once:true,onEnter:()=>{
 gsap.to('.c-wrap .rv',{opacity:1,y:0,filter:'blur(0px)',stagger:.14,duration:1,ease:'power2.out'});
}});

/* ================= MENU ================= */
const menu=$('#menu'),menuLinks=$$('.menu-link');
let menuOpen=false;
function openMenu(){menuOpen=true;menu.style.visibility='visible';
 gsap.to(menu,{opacity:1,duration:.45,ease:'power1.out'});
 gsap.fromTo(menuLinks,{opacity:0,y:54,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.06,duration:.7,ease:'power3.out',delay:.1});
 gsap.fromTo('.menu-close, .menu-foot',{opacity:0},{opacity:1,duration:.5,delay:.4});
 if(lenis)lenis.stop();}
function closeMenu(){menuOpen=false;
 gsap.to(menu,{opacity:0,duration:.35,ease:'power1.in',onComplete:()=>{menu.style.visibility='hidden';}});
 if(lenis)lenis.start();}
$('#menuBtn').addEventListener('click',openMenu);
$('#menuClose').addEventListener('click',closeMenu);
addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen)closeMenu();});

/* navigation targets */
const GO={
  top:'#top',
  construction:'#construction',
  food:'#food',
  story:'#story',
  portfolio:'#portfolio',
  partners:'#partners',
  stats:'#stats',
  contact:'#contact'
};

$$('[data-go]').forEach(el=>el.addEventListener('click',e=>{
 e.preventDefault();
 const t=GO[el.dataset.go];
 const wasOpen=menuOpen;
 if(menuOpen)closeMenu();
 gsap.delayedCall(wasOpen?.3:0,()=>{
  if(el.dataset.go==='top')scrollToY(0);
  else {
    const targetEl=$(t);
    if(targetEl){
      const st=ScrollTrigger.getAll().find(s=>s.trigger===targetEl);
      if(st) scrollToY(st.start);
      else scrollToY(targetEl);
    }
  }
 });
}));

$('#discover').addEventListener('click',()=>scrollToY(innerHeight*1.15));
$('#toTop').addEventListener('click',()=>scrollToY(0));

/* Language switch click handlers */
$$('[data-set-lang]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    applyLang(btn.dataset.setLang);
  });
});

addEventListener('resize',()=>ScrollTrigger.refresh());
ScrollTrigger.addEventListener('refresh',()=>{camKeys=buildCamKeys();applyCam();});
addEventListener('scroll',applyCam,{passive:true});

// Initialize active language
applyLang(curLang);


/* =========================================================
   FEATURE 1 & 2: CUSTOM MAGNETIC CURSOR & 2.5D MOUSE TILT
   ========================================================= */
const cursorDot = $('#cursorDot'), cursorRing = $('#cursorRing');
let mouseX = -200, mouseY = -200, ringX = -200, ringY = -200;
let cursorVisible = false;
let targetTiltX = 0, targetTiltY = 0, curTiltX = 0, curTiltY = 0;

const silFar = $('.sil-far'), silMid = $('.sil-mid'), islandEl = $('.island');
const conBld = $('#conBld'), motifWrap = $('#motifWrap');

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!cursorVisible) {
    cursorVisible = true;
    if (cursorDot) cursorDot.classList.add('cursor-visible');
    if (cursorRing) cursorRing.classList.add('cursor-visible');
  }
  if (cursorDot) {
    cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
  }
  // Minimal 2.5D tilt target coordinates (-1 to 1)
  targetTiltX = (e.clientX / innerWidth - 0.5) * 2;
  targetTiltY = (e.clientY / innerHeight - 0.5) * 2;
});

document.addEventListener('mouseleave', () => {
  cursorVisible = false;
  if (cursorDot) cursorDot.classList.remove('cursor-visible');
  if (cursorRing) cursorRing.classList.remove('cursor-visible');
  targetTiltX = 0;
  targetTiltY = 0;
});

// Subtle mobile gyroscope support
window.addEventListener('deviceorientation', e => {
  if (e.gamma != null && e.beta != null) {
    targetTiltX = Math.max(-1, Math.min(1, e.gamma / 25));
    targetTiltY = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
  }
});

// Magnetic hover targets
const interactiveSelector = 'button, a, [data-go], .pnode, .cnode, .stat, .chips li, .lang-btn, .pm-btn, #discover, #toTop';
document.addEventListener('mouseover', e => {
  if (e.target.closest(interactiveSelector)) {
    if (cursorRing) cursorRing.classList.add('active');
    if (cursorDot) cursorDot.classList.add('active');
    playChime(1200, 0.04);
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(interactiveSelector)) {
    if (cursorRing) cursorRing.classList.remove('active');
    if (cursorDot) cursorDot.classList.remove('active');
  }
});

// Cursor lerp & 2.5D Tilt animation loop
function renderCursorAndTilt() {
  // Cursor lerp
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  if (cursorRing && cursorVisible) {
    const rw = cursorRing.offsetWidth || 32;
    const rh = cursorRing.offsetHeight || 32;
    cursorRing.style.transform = `translate3d(${ringX - rw / 2}px, ${ringY - rh / 2}px, 0)`;
  }

  // Minimal 2.5D Tilt lerp
  curTiltX += (targetTiltX - curTiltX) * 0.05;
  curTiltY += (targetTiltY - curTiltY) * 0.05;

  // Hero subtle 2.5D float
  const heroUI = $('#heroUI');
  if (heroUI) heroUI.style.transform = `translate3d(${curTiltX * 8}px, ${curTiltY * 6}px, 0)`;

  // Background layers 2.5D parallax
  if (silFar) silFar.style.transform = `translate3d(${-curTiltX * 10}px, ${-curTiltY * 6}px, 0)`;
  if (silMid) silMid.style.transform = `translate3d(${-curTiltX * 20}px, ${-curTiltY * 11}px, 0)`;
  if (islandEl) islandEl.style.transform = `translate3d(${-curTiltX * 14}px, ${-curTiltY * 8}px, 0)`;

  // 3D Construction Stage tilt
  const conStage = $('.con-stage');
  if (conStage) conStage.style.transform = `perspective(900px) rotateX(${-curTiltY * 4.5}deg) rotateY(${curTiltX * 5}deg)`;

  // Authentic Motif 2.5D orbit tilt
  const motifImg = $('#motifImg');
  if (motifImg) motifImg.style.transform = `perspective(900px) rotateX(${-curTiltY * 5}deg) rotateY(${curTiltX * 5}deg) translate3d(${curTiltX * 12}px, ${curTiltY * 8}px, 0)`;

  requestAnimationFrame(renderCursorAndTilt);
}
requestAnimationFrame(renderCursorAndTilt);

/* =========================================================
   FEATURE 3: STRATEGIC CORRIDOR MAP & MODE TOGGLE
   ========================================================= */
const corridorStage = $('#corridorStage');
const pmBtnNet = $('#pmBtnNet'), pmBtnCorr = $('#pmBtnCorr');
// activePartnerMode declared at top

function setPartnerMode(mode) {
  if (activePartnerMode === mode) return;
  activePartnerMode = mode;
  playChime(1500, 0.06);

  if (mode === 'net') {
    pmBtnNet.classList.add('active');
    pmBtnCorr.classList.remove('active');
    gsap.to(corridorStage, {
      opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => {
        corridorStage.style.display = 'none';
        netStage.style.display = 'block';
        gsap.fromTo(netStage, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
        netInfo.textContent = DICT[curLang]?.netInfoDefault || '';
      }
    });
  } else {
    pmBtnCorr.classList.add('active');
    pmBtnNet.classList.remove('active');
    gsap.to(netStage, {
      opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => {
        netStage.style.display = 'none';
        corridorStage.style.display = 'block';
        gsap.fromTo(corridorStage, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
        netInfo.textContent = DICT[curLang]?.cnBakuInfo || '';
      }
    });
  }
}

if (pmBtnNet) pmBtnNet.addEventListener('click', () => setPartnerMode('net'));
if (pmBtnCorr) pmBtnCorr.addEventListener('click', () => setPartnerMode('corr'));

// Laser pulse travel animation along Baku-Istanbul arc
const pulse1 = $('#laserPulse1'), pulse2 = $('#laserPulse2');
let pulseProg1 = 0, pulseProg2 = 0.5;
function loopLaserPulses() {
  if (activePartnerMode === 'corr') {
    pulseProg1 = (pulseProg1 + 0.005) % 1;
    pulseProg2 = (pulseProg2 + 0.004) % 1;
    const getArcPoint = t => {
      const u = 1 - t;
      const x = u*u*u*360 + 3*u*u*t*440 + 3*u*t*t*600 + t*t*t*680;
      const y = u*u*u*250 + 3*u*u*t*130 + 3*u*t*t*130 + t*t*t*250;
      return { x, y };
    };
    if (pulse1) {
      const p1 = getArcPoint(pulseProg1);
      pulse1.setAttribute('cx', p1.x);
      pulse1.setAttribute('cy', p1.y);
    }
    if (pulse2) {
      const p2 = getArcPoint(pulseProg2);
      pulse2.setAttribute('cx', p2.x);
      pulse2.setAttribute('cy', p2.y);
    }
  }
  requestAnimationFrame(loopLaserPulses);
}
requestAnimationFrame(loopLaserPulses);

// Interactive hover on corridor nodes
$$('.cnode').forEach(node => {
  node.addEventListener('mouseenter', () => {
    corridorStage.classList.add('hovering');
    node.classList.add('hot');
    netInfo.textContent = node.dataset.info || '';
    netInfo.style.color = '#cfeffb';
    playChime(1400, 0.05);
  });
  node.addEventListener('mouseleave', () => {
    corridorStage.classList.remove('hovering');
    node.classList.remove('hot');
    netInfo.textContent = DICT[curLang]?.cnBakuInfo || '';
    netInfo.style.color = '';
  });
});

/* =========================================================
   FEATURE 4: CINEMATIC AMBIENT MUSIC & SOUND ENGINE
   User song with muffled (low-pass) distant background feel
   ========================================================= */
let audioCtx = null;
let masterGain = null;
let musicFilter = null;
let musicGain = null;
let bgMusic = null;
let musicSource = null;
let audioInitialized = false;

function initAudio() {
  if (audioInitialized) return;
  const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtxClass) return;

  try {
    audioCtx = new AudioCtxClass();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Muffled / Distant Low-Pass Filter (850Hz cuts harsh highs for that deep atmospheric background)
    musicFilter = audioCtx.createBiquadFilter();
    musicFilter.type = 'lowpass';
    musicFilter.frequency.setValueAtTime(850, audioCtx.currentTime);
    musicFilter.Q.setValueAtTime(1.2, audioCtx.currentTime);
    musicFilter.connect(masterGain);

    // Background music element
    bgMusic = new Audio('assets/ambient.mp3');
    bgMusic.loop = true;
    bgMusic.preload = 'auto';

    try {
      musicSource = audioCtx.createMediaElementSource(bgMusic);
      musicSource.connect(musicFilter);
    } catch (e) {
      // Fallback if media element source restricted
      bgMusic.volume = 0.18;
    }

    audioInitialized = true;
  } catch (err) {
    console.warn('Audio init note:', err);
  }
}

function startAmbientSound() {
  if (isSoundActive) return;
  initAudio();
  if (!audioCtx) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isSoundActive = true;
  const btn = $('#soundToggle');
  const label = $('#soundLabel');
  const d = DICT[curLang] || DICT.az;
  if (btn) btn.classList.add('playing');
  if (label) label.textContent = d.soundOn;

  if (bgMusic) {
    bgMusic.play().catch(() => {});
  }

  // Smooth fade in to a gentle background level (0.18 = subtle background, not loud)
  const now = audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.linearRampToValueAtTime(0.18, now + 2.5);
}

function stopAmbientSound() {
  if (!isSoundActive) return;
  isSoundActive = false;
  const btn = $('#soundToggle');
  const label = $('#soundLabel');
  const d = DICT[curLang] || DICT.az;
  if (btn) btn.classList.remove('playing');
  if (label) label.textContent = d.soundOff;

  if (audioCtx && masterGain) {
    const now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0, now + 0.8);
    setTimeout(() => {
      if (!isSoundActive && bgMusic) bgMusic.pause();
    }, 850);
  } else if (bgMusic) {
    bgMusic.pause();
  }
}

function toggleSound() {
  if (isSoundActive) {
    stopAmbientSound();
  } else {
    startAmbientSound();
    playChime(1760, 0.08);
  }
}

// Auto-start ambient music on first user interaction (click anywhere, preloader skip, scroll, or keydown)
function tryAutoPlayAmbient() {
  const onUserGesture = () => {
    startAmbientSound();
    window.removeEventListener('click', onUserGesture);
    window.removeEventListener('scroll', onUserGesture);
    window.removeEventListener('keydown', onUserGesture);
    window.removeEventListener('touchstart', onUserGesture);
  };
  window.addEventListener('click', onUserGesture, { once: true });
  window.addEventListener('scroll', onUserGesture, { once: true });
  window.addEventListener('keydown', onUserGesture, { once: true });
  window.addEventListener('touchstart', onUserGesture, { once: true });

  // Also try direct autoplay immediately if browser allows it
  setTimeout(() => {
    initAudio();
    if (bgMusic) {
      bgMusic.play().then(() => {
        startAmbientSound();
      }).catch(() => {
        // Autoplay policy prevented immediate start, user gesture handler above will activate it smoothly
      });
    }
  }, 600);
}
tryAutoPlayAmbient();

function playChime(freq = 1200, vol = 0.05) {
  if (!isSoundActive || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.36);
  } catch (err) {}
}

const soundToggleBtn = $('#soundToggle');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', toggleSound);
}


ScrollTrigger.refresh();
applyCam();
})();
