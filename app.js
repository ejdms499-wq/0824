/* SOY KIM — 메인 페이지 (v27 · Lookbook Glass)
   projects.js(기본 정보) + content.js(전문 정보)를 읽어 화면을 만듭니다.
   - 프로젝트는 4개 카테고리로 묶어서 보여줍니다
   - 프로젝트마다 이미지 좌/우를 번갈아 배치(에디토리얼 리듬)
   - SELECTED CREDITS는 '내가 하는 일 6단계'로 구성 */
(function(){
 const enc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const projects=window.SOY_PROJECTS||[];
 const PRO=window.SOY_PRO||{};
 const ABOUT=window.SOY_ABOUT||{};
 const SIZES=window.SOY_IMAGE_SIZES||{};
 const ar=src=>{const s=SIZES[src];return s?`${s[0]} / ${s[1]}`:'4 / 5';};

 /* 카테고리 순서와 라벨 */
 const CATS=[
  {key:'history',no:'01',ko:'역사 · 세계관 콘텐츠',en:'History & Worldbuilding',lead:'1930년 경성을 손끝으로 펼치고, 고양이 한 마리를 따라 걷는다.'},
  {key:'ip',no:'02',ko:'캐릭터 IP',en:'Character IP',lead:'성격부터 정하고 생김새는 나중에. 그래야 오래 갑니다.'},
  {key:'aiservice',no:'03',ko:'AI 서비스 기획',en:'AI Service Design',lead:'하지 않게 만드는 설계가 제일 어렵습니다.'},
  {key:'data',no:'04',ko:'데이터 스토리텔링',en:'Data Storytelling',lead:'숫자는 차갑지만, 손에 쥐면 이야기가 됩니다.'},
  {key:'fashion',no:'05',ko:'패션 · 스타일링',en:'Fashion & Styling',lead:'옷보다 먼저 배운 건, 한 프레임에서 뭐가 먼저 읽히는가.'}
 ];

 const byCat=k=>projects.filter(p=>p.category===k);

 /* ── Hero 요약 ── */
 (function(){const el=document.getElementById('tocGrid');if(!el)return;el.innerHTML=projects.map((p,i)=>`<li><a href="#project-${enc(p.id)}"><span class="toc-no">${String(i+1).padStart(2,'0')}</span><span class="toc-sketch"><img src="assets/sketch/${enc(p.id)}.png" alt="" loading="lazy" onerror="this.parentElement.classList.add('is-empty')"><i>${String(i+1).padStart(2,'0')}</i></span><span class="toc-title">${enc(p.title)}</span><span class="toc-cat dotlabel">${enc(p.categoryLabel)}</span></a></li>`).join('')})();
const heroStatsEl=document.getElementById('heroStats');heroStatsEl.innerHTML=[[String(projects.length).padStart(2,'0'),'프로젝트'],[String(CATS.length).padStart(2,'0'),'카테고리'],['77','크레딧 아카이브 컷'],['∞','진행 중인 실험']].map(([n,l])=>`<li><strong>${enc(n)}</strong><span>${enc(l)}</span></li>`).join('');

 /* ── About ── */
 document.getElementById('aboutGrid').innerHTML=`
  <div class="about-main">
   <figure class="about-portrait about-portrait--sloth"><div class="about-portrait-frame"><img src="assets/cover/cover_alt_tree.jpg" alt="" ></div><img class="about-doodle" src="assets/sketch/sloth.png" alt="" loading="lazy" onerror="this.remove()"><figcaption><span>Kim Soy</span><span>느리지만 끝까지 갑니다</span></figcaption></figure>
   <p class="about-tagline">${enc(ABOUT.tagline)}</p>
   <p class="about-mission">${enc(ABOUT.mission)}</p>
   <ul class="about-focus">${(ABOUT.focus||[]).map((f,i)=>`<li><span>0${i+1}</span>${enc(f)}</li>`).join('')}</ul>
  </div>
  <div class="about-side">
   <div class="about-block"><h3>Experience</h3><ol class="timeline">${(ABOUT.experience||[]).map(([y,t,d])=>`<li><span class="tl-year">${enc(y)}</span><div><strong>${enc(t)}</strong><p>${enc(d)}</p></div></li>`).join('')}</ol></div>
   <div class="about-block"><h3>Education</h3><ul class="plain">${(ABOUT.education||[]).map(([t,d])=>`<li><strong>${enc(t)}</strong><p>${enc(d)}</p></li>`).join('')}</ul></div>
   <div class="about-block about-block--tools"><h3>Skills &amp; Tools</h3>${(ABOUT.toolGroups||[]).map(([g,ts])=>`<div class="tool-group"><span class="tool-group-name">${enc(g)}</span><ul class="chips">${ts.map(t=>`<li>${enc(t)}</li>`).join('')}</ul></div>`).join('')}</div>
  </div>`;

 /* ── 프로젝트 목차 (카테고리별) ── */
 const row=p=>`<li><a href="#project-${enc(p.id)}"><span class="pi-pic"><img src="${enc(p.image||'assets/projects/styling/editorial/cha_singles_01.webp')}" alt="" loading="lazy"></span><span class="pi-no"><i class="num">${String(parseInt(p.number,10)||p.number)}</i></span><span class="pi-title">${enc(p.title)}</span><span class="pi-tag"><span class="dots"></span>${enc(p.categoryLabel)}</span><span class="pi-arrow" aria-hidden="true">↓</span></a></li>`;
 const indexHtml=CATS.map(c=>{const list=byCat(c.key);if(!list.length)return '';return `<li class="pindex-group"><div class="pindex-group-head"><span class="pindex-group-no">${c.no}</span><strong>${enc(c.ko)}</strong><em>${enc(c.en)}</em><span class="pindex-group-count">${String(list.length).padStart(2,'0')}</span></div><ol class="pindex-rows">${list.map(row).join('')}</ol></li>`;}).join('');
 {const pl=document.getElementById('pindexList');if(pl)pl.innerHTML=indexHtml;}
 document.getElementById('indexPanelList').innerHTML=`<ol class="pindex-list pindex-list--panel">${indexHtml}</ol>`;

 /* ── 공통 조각 ── */
 const thumb=(src,alt,cap,group,i,cls='')=>`<button type="button" class="thumb ${cls}" data-src="${enc(src)}" data-alt="${enc(alt)}" data-caption="${enc(cap)}" data-group="${enc(group)}" data-index="${i}" aria-label="${enc(alt)} 확대"><img src="${enc(src)}" alt="${enc(alt)}" loading="lazy" decoding="async"></button>`;
 const linkBtn=l=>{const ext=/^https?:/.test(l.url);const deck=/Deck|기획서/.test(l.label);const cls=l.kind==='site'||l.kind==='video'?'btn btn--dark':deck?'btn btn--deck':'btn';const label=deck?`<i class="deck-ic" aria-hidden="true"></i>${enc(l.label)}`:enc(l.label);return `<a class="${cls}" href="${enc(l.url)}" ${ext?'target="_blank" rel="noopener noreferrer"':''}>${label} <span aria-hidden="true">↗</span></a>`;};
 const marks='<i class="mark mark--tl"></i><i class="mark mark--tr"></i><i class="mark mark--bl"></i><i class="mark mark--br"></i>';

 /* ── SELECTED CREDITS 전용 블록 ── */
 function creditsBlock(p,pro){
  const links=[...(pro.cta?[{label:pro.cta.label,url:pro.cta.url,kind:'site'}]:[]),...(p.links||[])];
  return `<section class="proj proj--credits" id="project-${enc(p.id)}" aria-labelledby="t-${enc(p.id)}">
   <div class="wrap">
    <header class="proj-head">
     <div class="proj-meta"><span class="proj-no">${enc(p.number)}</span><span class="proj-cat dotlabel">${enc(p.categoryLabel)}</span><span class="proj-year">${enc(pro.context||'')}</span></div>
     <h2 id="t-${enc(p.id)}" class="proj-title">Selected <em>Credits</em></h2>
     <p class="proj-sub">${enc(p.subtitle||p.intro)}</p>
    </header>
    <div class="credits-grid">
     <div class="lookbook">
      ${[
       ['assets/projects/styling/editorial/cha_singles_cover.jpg','Singles','차준환','Cover',['Top / 블루 니트 탱크','Belt / 블랙 레더','Pants / 블랙 데님']],
       ['assets/projects/styling/bold_01.jpg','BoldPage','강유석','Cover story',['Shirt / 블루 스트라이프','Headphone / 블랙','Mood / 소년성']],
       ['assets/projects/styling/oliveyoung/oy_lead.jpg','Olive Young Magazine','브랜드 화보','Editorial',['Knit / 레드 · 블루','Pants / 그레이 · 브라운','Chair / 오렌지']],
       ['assets/projects/styling/editorial/ha_vogue_lead.jpg','VOGUE','하정우','Editorial',['Shirt / 화이트','Jacket / 블랙','Mood / 클래식']],
       ['assets/projects/styling/koo_bb_lead.jpg','Brooks Brothers','구교환','Campaign',['Jacket / 네이비 블레이저','Shirt / 핑크 옥스퍼드','Tie / 레지멘탈']],
       ['assets/projects/styling/editorial/shin_bazaar_lead.jpg',"Harper's BAZAAR",'신승호','Editorial',['Tee / 블랙','Pants / 블랙','Mood / 모노크롬']],
       ['assets/projects/styling/andteam/stage1_lead.jpg','&TEAM · Bewitched','Stage 1','Music show',['Vest / 브라운 스웨이드','Knit / 네이비 베스트','Scarf / 옐로']],
       ['assets/projects/styling/andteam/clip_lead.jpg','&TEAM · Bewitched','Live clip','Live clip',['Knit / 올블랙','Hardware / 실버','Mood / 크롬하츠']],
       ['assets/projects/styling/andteam/stage2_lead.jpg','&TEAM · Bewitched','Stage 2','Music show',['Look / 스테이지 2','Mood / 라이브','Team / 의상 준비 참여']]
      ].map(([src,pub,who,kind,look],i)=>`<a class="lb-item" href="credits.html"><span class="lb-pic"><img src="${src}" alt="" loading="lazy"><b>${String(i+1).padStart(2,'0')}</b></span><span class="lb-meta"><strong>${enc(who)}</strong><em>${enc(pub)} · ${enc(kind)}</em></span><ul class="lb-look">${look.map(l=>{const [k,v]=l.split(' / ');return `<li><span>${enc(k)}</span><i></i><span>${enc(v)}</span></li>`}).join('')}</ul></a>`).join('')}
     </div>
     <div class="credits-copy">
      <p class="credits-statement">${enc(pro.statement||'')}</p>
      <dl class="facts facts--inline">
       <div><dt>Media</dt><dd>${(pro.media||[]).map(enc).join(' · ')}</dd></div>
      </dl>
      <ul class="stats">${(pro.stats||[]).map(([n,l])=>`<li><strong>${enc(n)}</strong><span>${enc(l)}</span></li>`).join('')}</ul>
      <div class="proj-links">${links.map(linkBtn).join('')}</div>
     </div>
    </div>
    <div class="process">
     <div class="process-head"><span class="sec-no">What I do — 06 steps</span><h3>한 컷이 완성되기까지, <em>내가 하는 여섯 가지 일</em></h3></div>
     <ol class="howto">${(pro.process||[]).map((s,i)=>`<li><span class="ht-no">${enc(s.no)}</span><img class="ht-doodle" src="assets/sketch/step_${enc(s.no)}.png" alt="" loading="lazy" onerror="this.remove()"><span class="ht-en dotlabel">${enc(s.en)}</span><strong class="ht-ko">${enc(s.title)}</strong><p>${enc(s.desc)}</p></li>`).join('')}</ol>

    </div>
    ${pro.insight?`<blockquote class="insight"><span>INSIGHT</span><p>${enc(pro.insight)}</p></blockquote>`:''}
    ${p.note?`<p class="proj-note">${enc(p.note)}</p>`:''}
   </div>
  </section>`;
 }

 /* ── 일반 프로젝트 블록 (좌/우 번갈아) ── */
 function projectBlock(p,pro,flip){
  const links=[...(pro.cta?[{label:pro.cta.label,url:pro.cta.url,kind:'site'}]:[]),...(p.links||[])];
  const gallery=(p.gallery||[]).filter(g=>g!==p.image);
  return `<section class="proj ${flip?'proj--flip':''}" id="project-${enc(p.id)}" aria-labelledby="t-${enc(p.id)}">
   <div class="wrap">
    <header class="proj-head">
     <div class="proj-meta"><span class="proj-no">${enc(p.number)}</span><span class="proj-cat dotlabel">${enc(p.categoryLabel)}</span><span class="proj-year">${enc(pro.context||'')}</span></div>
     <h2 id="t-${enc(p.id)}" class="proj-title">${enc(p.title)}</h2>
     <p class="proj-sub">${enc(p.subtitle||p.intro)}</p>
    </header>
    <div class="proj-grid">
     <figure class="proj-hero">${marks}<div class="proj-hero-frame">${thumb(p.image,p.imageAlt||p.title,`${p.title} · 대표 이미지`,'hero-'+p.id,0)}</div><figcaption><span>${enc(p.imageCredit||'')}</span><span>${enc(p.year||'')}</span></figcaption></figure>
     <aside class="proj-side">
      <p class="proj-desc">${enc(p.description)}</p>
      <dl class="facts">
       <div><dt>Role</dt><dd>${enc(p.role)}</dd></div>
       ${pro.context?`<div><dt>Context</dt><dd>${enc(pro.context)}</dd></div>`:''}
       ${pro.tools?`<div><dt>Tools</dt><dd><ul class="chips chips--small">${pro.tools.map(t=>`<li>${enc(t)}</li>`).join('')}</ul></dd></div>`:''}
      </dl>
      ${links.length?`<div class="proj-links">${links.map(linkBtn).join('')}</div>`:''}
          ${pro.deck?`<div class="deck deck--mini"><div class="deck-head"><span class="gallery-label">기획서 · ${String(pro.deck.count).padStart(2,'0')} slides</span><button type="button" class="deck-all" data-more="deck-${enc(p.id)}">전체 보기 ↗</button></div><div class="deck-mini-row">${Array.from({length:pro.deck.count},(_,i)=>`<button type="button" class="thumb dmini" data-src="${enc(pro.deck.dir)}/s_${String(i+1).padStart(2,'0')}.jpg" data-alt="${enc(p.title)} 기획서 ${i+1}" data-caption="${enc(p.title)} 기획서 · ${i+1} / ${pro.deck.count}" data-group="deck-${enc(p.id)}" data-index="${i}" aria-label="${enc(p.title)} 기획서 ${i+1}"><img src="${enc(pro.deck.dir)}/s_${String(i+1).padStart(2,'0')}.jpg" alt="" loading="lazy" decoding="async"></button>`).join('')}</div></div>`:''}
    </aside>
    </div>
    <div class="proj-main">
     ${pro.stats?`<ul class="stats">${pro.stats.map(([n,l])=>`<li><strong>${enc(n)}</strong><span>${enc(l)}</span></li>`).join('')}</ul>`:''}
     ${(p.steps||[]).length?`<ol class="steps">${p.steps.map(([t,d],i)=>`<li><span>0${i+1}</span><div><strong>${enc(t)}</strong><p>${enc(d)}</p></div></li>`).join('')}</ol>`:''}
     ${pro.insight?`<blockquote class="insight"><span>INSIGHT</span><p>${enc(pro.insight)}</p></blockquote>`:''}
     
     ${gallery.length?`<div class="proj-gallery collage ${p.id==='research'||p.id==='simmyo'?'collage--sheet':''} ${p.id==='simmyo'?'collage--sticker':''}"><span class="gallery-label">${enc(pro.galleryLabel||'Gallery')} · ${String(gallery.length).padStart(2,'0')}</span><div class="collage-grid">${gallery.map((src,i)=>`<button type="button" class="thumb clip clip--${['a','b','c','d','e','f','g','h'][i%8]}" data-src="${enc(src)}" data-alt="${enc(p.title)} 이미지 ${i+1}" data-caption="${enc(p.title)} · ${i+1} / ${gallery.length}" data-group="gal-${enc(p.id)}" data-index="${i}" style="--i:${i}"><img src="${enc(src)}" alt="${enc(p.title)} 이미지 ${i+1}" loading="lazy" decoding="async"><b>${String(i+1).padStart(2,'0')}</b></button>`).join('')}</div></div>`:''}
     ${p.note?`<p class="proj-note">${enc(p.note)}</p>`:''}
    </div>
   </div>
  </section>`;
 }

 /* ── 카테고리별 렌더 ── */
 let flip=false;
 document.getElementById('projectBlocks').innerHTML=CATS.map(c=>{
  const list=byCat(c.key);if(!list.length)return '';
  const blocks=list.map(p=>{const pro=PRO[p.id]||{};if(p.id==='fashion')return creditsBlock(p,pro);const html=projectBlock(p,pro,flip);flip=!flip;return html;}).join('');
  return `<div class="cat" id="cat-${c.key}"><header class="cat-band"><div class="wrap cat-band-in"><span class="cat-no">${c.no}</span><div class="cat-band-txt"><h2><span class="kr">${enc(c.ko)}</span></h2><em>${enc(c.en)}</em><p>${enc(c.lead)}</p></div><span class="cat-sketch"><img src="assets/sketch/ch${c.no}.png" alt="" loading="lazy" onerror="this.parentElement.remove()"></span><span class="cat-count"><b>Chapter ${c.no}</b> · ${String(list.length).padStart(2,'0')} ${list.length>1?'projects':'project'}</span></div></header>${blocks}</div>`;
 }).join('');


 /* ── Contact ── */
 document.getElementById('contactRow').innerHTML=(ABOUT.contact||[]).map(c=>`<a class="contact-link" href="${enc(c.url)}" ${/^https?:/.test(c.url)?'target="_blank" rel="noopener noreferrer"':''}><span>${enc(c.label)}</span><i aria-hidden="true">↗</i></a>`).join('');

 /* ── 슬라이더 ── */
 document.addEventListener('click',e=>{const b=e.target.closest('.slider-btn');if(!b)return;const t=b.closest('.slider').querySelector('.slider-track');const f=t.firstElementChild;const w=f?f.getBoundingClientRect().width+12:300;t.scrollBy({left:w*2*(+b.dataset.step),behavior:'smooth'});});
 document.addEventListener('click',e=>{const m=e.target.closest('.deck-more,.deck-all');if(!m)return;const all=[...document.querySelectorAll(`.thumb[data-group="${CSS.escape(m.dataset.more)}"]`)].sort((x,y)=>+x.dataset.index-+y.dataset.index);open(all.map(x=>({src:x.dataset.src,alt:x.dataset.alt,caption:x.dataset.caption})),0);});
 /* ── 라이트박스 ── */
 const lb=document.getElementById('imageLightbox'),lbImg=document.getElementById('lightboxImage'),lbCap=document.getElementById('lightboxCaption'),lbPrev=document.getElementById('lightboxPrev'),lbNext=document.getElementById('lightboxNext'),lbClose=document.getElementById('lightboxClose');
 let items=[],index=0,lastFocus=null;
 const show=()=>{const it=items[index];lbImg.src=it.src;lbImg.alt=it.alt;lbCap.textContent=it.caption;lbPrev.hidden=lbNext.hidden=items.length<2;};
 const open=(list,i)=>{items=list;index=i;lastFocus=document.activeElement;show();lb.hidden=false;document.body.classList.add('is-dialog-open');lbClose.focus();};
 const close=()=>{lb.hidden=true;document.body.classList.remove('is-dialog-open');lbImg.src='';lastFocus?.focus?.();};
 document.addEventListener('click',e=>{const t=e.target.closest('.thumb');if(!t)return;const all=[...document.querySelectorAll(`.thumb[data-group="${CSS.escape(t.dataset.group)}"]`)].sort((a,b)=>+a.dataset.index-+b.dataset.index);open(all.map(b=>({src:b.dataset.src,alt:b.dataset.alt,caption:b.dataset.caption})),all.indexOf(t));});
 lbClose.addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close();});
 lbPrev.addEventListener('click',()=>{index=(index-1+items.length)%items.length;show();});
 lbNext.addEventListener('click',()=>{index=(index+1)%items.length;show();});
 document.addEventListener('keydown',e=>{if(!lb.hidden){if(e.key==='Escape')close();if(e.key==='ArrowLeft')lbPrev.click();if(e.key==='ArrowRight')lbNext.click();return;}if(e.key==='Escape'&&!indexPanel.hidden)setIndex(false);});

 /* ── 상단 바 ── */
 const bar=document.getElementById('bar'),prog=document.getElementById('barProgress');
 const indexPanel=document.getElementById('indexPanel'),indexToggle=document.getElementById('indexToggle');
 function setIndex(o){indexPanel.hidden=!o;indexToggle.setAttribute('aria-expanded',String(o));document.body.classList.toggle('is-index-open',o);}
 indexToggle.addEventListener('click',()=>setIndex(indexPanel.hidden));
 indexPanel.addEventListener('click',e=>{if(e.target.closest('a'))setIndex(false);});
 const navLinks=[...document.querySelectorAll('.bar-nav a[data-nav]')];
 const navTargets={about:document.getElementById('about'),projects:document.getElementById('projects'),contact:document.getElementById('contact')};
 function onScroll(){
  const h=document.documentElement;prog.style.transform=`scaleX(${h.scrollTop/((h.scrollHeight-h.clientHeight)||1)})`;
  bar.classList.toggle('is-scrolled',h.scrollTop>30);
  let cur=null;const y=h.scrollTop+140;
  if(navTargets.about&&y>=navTargets.about.offsetTop)cur='about';
  if(navTargets.projects&&y>=navTargets.projects.offsetTop)cur='projects';
  if(navTargets.contact&&y>=navTargets.contact.offsetTop-200)cur='contact';
  navLinks.forEach(a=>a.classList.toggle('is-current',a.dataset.nav===cur));
 }
 document.addEventListener('scroll',onScroll,{passive:true});onScroll();

 /* ── 등장 ── */
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}}),{rootMargin:'0px 0px -6% 0px',threshold:.06});
  document.querySelectorAll('.proj-head,.proj-grid,.credits-grid,.process,.proj-main,.about-grid,.pindex-list,.sec-head,.cat-head').forEach(el=>{el.classList.add('will-in');io.observe(el);});
 }
})();


/* ── 풍선 광택: 큰 제목을 인라인 SVG 텍스트로 (필터가 확실히 먹음) ── */
(async function(){
  try{await document.fonts.load('400 100px "Bagel Fat One"');await document.fonts.ready;}catch(e){}
  const FILT=`<defs><filter id="bl" x="-10%" y="-25%" width="120%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="7" result="b"/><feSpecularLighting in="b" surfaceScale="12" specularConstant="1.2" specularExponent="26" lighting-color="#fff" result="s"><fePointLight x="-600" y="-1400" z="700"/></feSpecularLighting><feComposite in="s" in2="SourceAlpha" operator="in" result="si"/><feGaussianBlur in="si" stdDeviation="1.5" result="ss"/><feComposite in="ss" in2="SourceGraphic" operator="over"/></filter></defs>`;
  const cv=document.createElement('canvas').getContext('2d');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  function build(el){
    const cs=getComputedStyle(el);const fs=parseFloat(cs.fontSize);const fam='"Bagel Fat One","Fredoka",sans-serif';
    cv.font=`400 ${fs}px ${fam}`;
    const lines=[];let cur=[];const push=()=>{if(cur.length){lines.push(cur);cur=[]}};
    [...el.childNodes].forEach(n=>{
      if(n.nodeName==='BR'){push();return}
      const txt=(n.textContent||'').replace(/\s+/g,' ').trim();if(!txt)return;
      if(n.nodeType===3){cur.push({t:txt,c:cs.color});return}
      const ncs=getComputedStyle(n);if(ncs.display==='none')return;const blk=ncs.display==='block';
      if(blk)push();
      // nested (e.g. span > i.reg)
      if(n.children.length){[...n.childNodes].forEach(m=>{const t=(m.textContent||'').trim();if(!t)return;if(m.nodeType===1&&getComputedStyle(m).display==='none')return;cur.push({t,c:m.nodeType===1?getComputedStyle(m).color:ncs.color,tight:m.nodeType===1})})}
      else cur.push({t:txt,c:ncs.color});
      if(blk)push();
    });
    push();if(!lines.length)return;
    const lh=fs*.92;let W=0;
    const mw=t=>cv.measureText(t).width;
    lines.forEach(l=>{let w=0;l.forEach((s,i)=>{w+=mw(s.t)+(i<l.length-1&&!l[i+1].tight&&l[i+1].t.length>1?fs*.22:0)});W=Math.max(W,w)});
    const H=lh*(lines.length-1)+fs*1.05;
    const shadow=cs.getPropertyValue('--shadow').trim()||'#b81f58';
    let y=fs*.84,out='';
    lines.forEach(l=>{let x=0;l.forEach((s,i)=>{const w=mw(s.t);out+=`<text x="${x.toFixed(1)}" y="${(y+fs*.055).toFixed(1)}" fill="${shadow}" font-family='${fam}' font-size="${fs}">${esc(s.t)}</text>`;x+=w+(i<l.length-1&&!l[i+1].tight&&l[i+1].t.length>1?fs*.22:0)});
      x=0;l.forEach((s,i)=>{const w=mw(s.t);out+=`<text x="${(x+fs*.02).toFixed(1)}" y="${y.toFixed(1)}" fill="${s.c}" font-family='${fam}' font-size="${fs}" filter="url(#bl)">${esc(s.t)}</text>`;x+=w+(i<l.length-1&&!l[i+1].tight&&l[i+1].t.length>1?fs*.22:0)});y+=lh});
    const label=el.getAttribute('aria-label')||el.textContent.trim();
    el.innerHTML=`<svg class="gloss-svg" viewBox="0 0 ${Math.ceil(W+fs*.1)} ${Math.ceil(H)}" width="${Math.ceil(W+fs*.1)}" height="${Math.ceil(H)}" role="img" aria-label="${esc(label)}">${FILT}${out}</svg>`;
    el.classList.add('is-gloss');
  }
  document.querySelectorAll('h1.bubble, h2.contact-title.bubble, h1.cr-title.bubble').forEach(build);
})();

/* ── v60 슬라이드 페이저 ── */
(function(){
  if(!document.documentElement.classList.contains('slides'))return;
  const slides=[...document.querySelectorAll('.hero, .toc-spread, .about, .proj, .contact')];
  slides.forEach(s=>s.classList.add('pg'));
  const pg=document.createElement('div');pg.className='pager';
  pg.innerHTML=`<button type="button" data-d="-1" aria-label="이전">←</button><span><b>01</b> / ${String(slides.length).padStart(2,'0')}</span><i></i><button type="button" data-d="1" aria-label="다음">→</button>`;
  document.body.appendChild(pg);
  const label=s=>s.classList.contains('hero')?'표지':s.classList.contains('toc-spread')?'목차':s.classList.contains('about')?'소개':s.classList.contains('contact')?'연락':(s.querySelector('.proj-title')?.textContent.trim()||'');
  let cur=0;
  const upd=()=>{const y=window.scrollY+window.innerHeight/2;let i=0;slides.forEach((s,k)=>{if(s.offsetTop<=y)i=k});cur=i;pg.querySelector('b').textContent=String(i+1).padStart(2,'0');pg.querySelector('i').textContent=label(slides[i])};
  const go=d=>{const n=Math.max(0,Math.min(slides.length-1,cur+d));slides[n].scrollIntoView({behavior:'smooth',block:'start'})};
  pg.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.d)});
  window.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(-1)}});
  window.addEventListener('scroll',upd,{passive:true});upd();
})();
