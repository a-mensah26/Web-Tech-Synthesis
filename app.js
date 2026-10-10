(function(){'use strict';
const PHOTOS=window.PHOTOS;
/* ---------- illustrations: inline SVG, tinted per item with --h ---------- */
const rep=(n,f)=>{let s='';for(let i=0;i<n;i++)s+=f(i);return s};
const put=(s,cx,cy,k,r)=>'<g transform="translate('+cx+' '+cy+') rotate('+(r||0)+') scale('+k+') translate(-100 -75)">'+s+'</g>';
const ART={};

/* --- tools --- */
const hookG=(shaft,handle)=>'<g transform="rotate(-32 100 75)"><path class="ln lm" style="stroke-width:8;'+shaft+'" d="M34 75c-12 0-14-10-8-15"/><line class="ln lm" x1="34" y1="75" x2="172" y2="75" style="stroke-width:8;'+shaft+'"/><line class="ln la" x1="116" y1="75" x2="172" y2="75" style="stroke-width:16;'+handle+'"/><ellipse class="m" cx="96" cy="75" rx="6" ry="9"/></g>';
ART.hook=hookG('','');
ART.hookb=hookG('stroke:#C9A66B','stroke:#C9A66B');
ART.hooks=put(hookG('','stroke:#E4572E'),100,34,0.7)+put(hookG('','stroke:#4BA3C3'),100,75,0.7)+put(hookG('','stroke:#76B947'),100,116,0.7);
ART.yarn='<ellipse class="b" cx="100" cy="120" rx="38" ry="6" style="opacity:.5"/><circle class="a" cx="100" cy="72" r="40"/>'
  +'<path class="ln lb" style="stroke-width:3" d="M62 58q38-22 76 0M60 78q40-18 80 4M66 100q34-14 68-2M80 36q-18 36 6 72M110 33q20 34-4 76"/>'
  +'<path class="ln la" style="stroke-width:4" d="M132 104q22 14 40 6q14-4 18 8"/>';
ART.scissors='<line class="ln lm" x1="100" y1="68" x2="140" y2="16" style="stroke-width:8"/><line class="ln lm" x1="100" y1="68" x2="60" y2="16" style="stroke-width:8"/>'
  +'<line class="ln lm" x1="100" y1="68" x2="116" y2="92" style="stroke-width:7"/><line class="ln lm" x1="100" y1="68" x2="84" y2="92" style="stroke-width:7"/>'
  +'<circle class="ln la" cx="76" cy="108" r="17" style="stroke-width:8"/><circle class="ln la" cx="124" cy="108" r="17" style="stroke-width:8"/><circle class="c" cx="100" cy="68" r="5"/>';
ART.needle='<line class="ln lm" x1="30" y1="112" x2="120" y2="30" style="stroke-width:3;opacity:.6"/>'
  +'<path class="ln la" style="stroke-width:4" d="M148 34c22-12 34 18 12 36s-52 26-76 6"/>'
  +'<line class="ln lm" x1="44" y1="124" x2="150" y2="30" style="stroke-width:4"/>'
  +'<ellipse class="ln lm" cx="150" cy="30" rx="3.5" ry="9" transform="rotate(48 150 30)" style="stroke-width:3"/>';
const MK=['#E4572E','#F2B134','#4BA3C3','#76B947','#B05CC4'];
ART.marker=[[58,52],[100,44],[142,54],[78,98],[122,100]].map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="17" style="fill:none;stroke:'+MK[i]+';stroke-width:7"/><rect class="m" x="'+(p[0]-3)+'" y="'+(p[1]-24)+'" width="6" height="8" rx="2"/>').join('');
ART.tape='<rect x="62" y="62" width="110" height="26" rx="2" style="fill:#F3E7B6"/>'+rep(19,i=>'<line x1="'+(74+i*5)+'" y1="62" x2="'+(74+i*5)+'" y2="'+(i%2?70:76)+'" style="stroke:#5B5346;stroke-width:1.2"/>')
  +'<rect class="c" x="166" y="62" width="8" height="26" rx="2"/><circle class="a" cx="66" cy="75" r="38"/><circle class="c" cx="66" cy="75" r="24"/><circle class="bg" cx="66" cy="75" r="9"/>';
ART.counter='<rect class="a" x="70" y="20" width="60" height="104" rx="18"/><rect class="bg" x="80" y="32" width="40" height="22" rx="4"/>'
  +'<text class="k" x="100" y="49" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="15" font-weight="600">042</text>'
  +'<circle class="b" cx="100" cy="88" r="15"/><circle class="ln" cx="100" cy="88" r="15"/><rect class="c" x="92" y="112" width="16" height="6" rx="3"/>';
ART.pin=rep(6,i=>{const x=52+i*19,h=64+(i*23)%34;return '<line class="ln la" x1="'+(x-7)+'" y1="28" x2="'+(x+7)+'" y2="28" style="stroke-width:6"/><line class="ln lm" x1="'+x+'" y1="28" x2="'+x+'" y2="'+(28+h)+'" style="stroke-width:3"/>'});
ART.mat=rep(9,i=>{const r=Math.floor(i/3),c=i%3;return '<rect class="'+((r+c)%2?'b':'a')+'" x="'+(46+c*36)+'" y="'+(19+r*36)+'" width="34" height="34" rx="4"/>'})
  +[[80,44],[122,80],[92,114]].map(p=>'<line class="ln lm" x1="'+(p[0]-5)+'" y1="'+p[1]+'" x2="'+(p[0]+5)+'" y2="'+p[1]+'" style="stroke-width:4"/><line class="ln lm" x1="'+p[0]+'" y1="'+p[1]+'" x2="'+p[0]+'" y2="'+(p[1]+12)+'" style="stroke-width:2.5"/>').join('');
ART.eye='<circle class="k" cx="70" cy="48" r="19"/><circle class="w" cx="63" cy="41" r="5"/><circle class="k" cx="130" cy="48" r="19"/><circle class="w" cx="123" cy="41" r="5"/>'
  +'<circle class="ln lm" cx="70" cy="104" r="15" style="stroke-width:6"/><circle class="ln lm" cx="130" cy="104" r="15" style="stroke-width:6"/>';
ART.fill='<ellipse class="b" cx="100" cy="120" rx="52" ry="8" style="opacity:.6"/>'
  +[[74,82,24],[100,66,30],[128,82,24],[100,94,28]].map(p=>'<circle class="b" cx="'+p[0]+'" cy="'+p[1]+'" r="'+(p[2]+3)+'"/>').join('')
  +[[74,82,24],[100,66,30],[128,82,24],[100,94,28]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+'" style="fill:#F7F4EF"/>').join('');
ART.pbag='<circle class="b" cx="76" cy="40" r="16"/><path class="st" d="M62 38q14-8 28 0"/><path class="a" d="M50 58h100l10 64H40z"/><rect class="c" x="48" y="48" width="104" height="14" rx="7"/>'
  +'<path class="st" style="stroke:var(--bg);stroke-dasharray:2 3" d="M56 55h88"/><circle class="b" cx="146" cy="55" r="5"/><rect class="bg" x="84" y="80" width="32" height="22" rx="3"/>';
ART.kit=put(ART.yarn,64,88,0.6)+put(ART.hook,112,44,0.65)+put(ART.scissors,152,98,0.5)+put(ART.marker,108,114,0.38);

/* --- patterns --- */
ART.tote='<path class="ln lb" style="stroke-width:7" d="M76 62C76 20 124 20 124 62"/><path class="a" d="M50 62h100l-9 66H59z"/>'
  +'<path class="st" d="M58 78h84M57 90h86M56 102h88M55 114h90"/><rect class="b" x="76" y="84" width="48" height="30" rx="4"/>';
ART.donut='<path class="ln lb" style="stroke-width:5" d="M66 40C78 6 122 6 134 40"/><circle class="a" cx="100" cy="82" r="46"/>'
  +'<path class="b" d="M58 76c2-24 22-38 42-38s40 14 42 38c-6-4-9-2-12 4c-4-7-10-7-14 0c-4-7-10-7-14 0c-4-7-10-7-14 0c-4-7-10-7-14 0c-3-6-6-8-12-4z"/>'
  +'<circle class="bg" cx="100" cy="82" r="13"/>'
  +[[78,56,30,'w'],[96,48,-20,'c'],[120,54,60,'w'],[132,68,10,'c'],[70,70,-40,'c'],[112,40,-60,'w']].map(s=>'<rect class="'+s[3]+'" x="'+(s[0]-5)+'" y="'+(s[1]-1.5)+'" width="10" height="3.5" rx="1.75" transform="rotate('+s[2]+' '+s[0]+' '+s[1]+')"/>').join('');
ART.side='<path class="ln la" style="stroke-width:5" d="M62 66C56 10 144 10 138 66"/><rect class="a" x="54" y="62" width="92" height="64" rx="10"/>'
  +'<path class="st" d="M60 108h80M60 118h80"/><path class="c" d="M54 72a10 10 0 0 1 10-10h72a10 10 0 0 1 10 10c-10 22-82 22-92 0z"/><circle class="b" cx="100" cy="88" r="7"/>';
ART.beanie='<path class="a" d="M50 102c0-42 22-66 50-66s50 24 50 66z"/><path class="st" d="M60 86c26-9 54-9 80 0M56 72c30-12 58-12 88 0M66 58c22-9 46-9 68 0"/>'
  +'<rect class="c" x="44" y="98" width="112" height="28" rx="9"/>'+rep(10,i=>'<line class="ln lb" x1="'+(56+i*10)+'" y1="103" x2="'+(56+i*10)+'" y2="121" style="stroke-width:2.5"/>')
  +'<circle class="b" cx="100" cy="34" r="13"/>';
ART.bucket='<ellipse class="c" cx="100" cy="102" rx="66" ry="18"/><path class="a" d="M68 100L76 50h48l8 50c-22 10-44 10-64 0z"/><ellipse class="b" cx="100" cy="50" rx="24" ry="6"/>'
  +'<path class="b" d="M70 84c20 8 40 8 60 0l1 8c-21 8-41 8-62 0z"/><path class="st" d="M76 66c16 5 32 5 48 0M72 76c18 6 38 6 56 0"/>';
ART.beret='<path class="c" d="M66 96c22 14 46 14 68 0v14c-22 14-46 14-68 0z"/><ellipse class="a" cx="100" cy="70" rx="62" ry="32"/>'
  +rep(8,i=>{const t=i*Math.PI/4;return '<path class="st" d="M100 62L'+(100+Math.cos(t)*52).toFixed(1)+' '+(62+Math.sin(t)*24).toFixed(1)+'"/>'})
  +'<rect class="c" x="95" y="34" width="10" height="12" rx="4"/>';
ART.granny=rep(9,i=>{const r=Math.floor(i/3),c=i%3,x=46+c*36,y=19+r*36,e=(r+c)%2===0,o=e?'a':'c',m=e?'b':'a',n=e?'c':'b';
  return '<rect class="'+o+'" x="'+x+'" y="'+y+'" width="34" height="34" rx="3"/><rect class="'+m+'" x="'+(x+5)+'" y="'+(y+5)+'" width="24" height="24" rx="2"/><rect class="'+n+'" x="'+(x+10)+'" y="'+(y+10)+'" width="14" height="14" rx="2"/><rect class="bg" x="'+(x+14)+'" y="'+(y+14)+'" width="6" height="6" rx="1"/>'});
ART.cot='<rect class="b" x="36" y="34" width="128" height="88" rx="8"/><path class="st" style="stroke:var(--a)" d="M42 50h116M42 64h116M42 78h116M42 92h116M42 106h116"/>'
  +'<rect class="ln la" x="36" y="34" width="128" height="88" rx="8" style="stroke-width:5"/>'
  +'<g class="w"><circle cx="88" cy="74" r="11"/><circle cx="102" cy="66" r="14"/><circle cx="116" cy="74" r="10"/><rect x="84" y="74" width="38" height="12" rx="6"/></g>';
ART.throw='<path class="a" d="M34 50h132v68H34z"/><path class="b" d="M34 50h132v22H34z"/><path class="st" style="stroke:var(--bg)" d="M40 58h120M40 66h120"/><path class="st" d="M40 88h120M40 100h120M40 112h120"/>'
  +rep(16,i=>'<line class="ln la" x1="'+(40+i*8)+'" y1="118" x2="'+(40+i*8)+'" y2="132" style="stroke-width:2.5"/>');
ART.bear='<ellipse class="a" cx="100" cy="116" rx="30" ry="28"/><ellipse class="b" cx="100" cy="120" rx="17" ry="18"/>'
  +'<ellipse class="a" cx="70" cy="108" rx="9" ry="16" transform="rotate(25 70 108)"/><ellipse class="a" cx="130" cy="108" rx="9" ry="16" transform="rotate(-25 130 108)"/>'
  +'<circle class="a" cx="76" cy="38" r="12"/><circle class="b" cx="76" cy="38" r="6"/><circle class="a" cx="124" cy="38" r="12"/><circle class="b" cx="124" cy="38" r="6"/>'
  +'<circle class="a" cx="100" cy="62" r="32"/><ellipse class="b" cx="100" cy="72" rx="14" ry="11"/><circle class="k" cx="88" cy="56" r="3.5"/><circle class="k" cx="112" cy="56" r="3.5"/>'
  +'<ellipse class="k" cx="100" cy="68" rx="5" ry="3.5"/><path class="ln" style="stroke:#22202B;stroke-width:2" d="M100 72v4M94 78q6 4 12 0"/>';
ART.bunny='<ellipse class="a" cx="100" cy="112" rx="28" ry="30"/><ellipse class="b" cx="100" cy="116" rx="15" ry="18"/><circle class="b" cx="134" cy="128" r="9"/>'
  +'<ellipse class="a" cx="68" cy="66" rx="10" ry="27" transform="rotate(22 68 66)"/><ellipse class="b" cx="69" cy="68" rx="4.5" ry="19" transform="rotate(22 69 68)"/>'
  +'<ellipse class="a" cx="132" cy="66" rx="10" ry="27" transform="rotate(-22 132 66)"/><ellipse class="b" cx="131" cy="68" rx="4.5" ry="19" transform="rotate(-22 131 68)"/>'
  +'<circle class="a" cx="100" cy="64" r="27"/><circle class="k" cx="90" cy="60" r="3.5"/><circle class="k" cx="110" cy="60" r="3.5"/><ellipse class="b" cx="100" cy="70" rx="5" ry="3.5"/>'
  +'<path class="ln" style="stroke:#22202B;stroke-width:2" d="M100 73v4M94 79q6 4 12 0"/>';
ART.octopus=rep(5,i=>{const x=70+i*15,s=i%2?1:-1;return '<path class="ln la" style="stroke-width:10" d="M'+x+' 78c0 20 '+(s*14)+' 22 '+(s*12)+' 40"/>'})
  +'<ellipse class="a" cx="100" cy="62" rx="36" ry="34"/><circle class="w" cx="86" cy="64" r="9"/><circle class="w" cx="114" cy="64" r="9"/><circle class="k" cx="88" cy="65" r="4.5"/><circle class="k" cx="116" cy="65" r="4.5"/>'
  +'<ellipse class="b" cx="72" cy="78" rx="6" ry="4"/><ellipse class="b" cx="128" cy="78" rx="6" ry="4"/><path class="ln" style="stroke:#22202B;stroke-width:2" d="M93 80q7 6 14 0"/>';
ART.crop='<path class="a" d="M70 50L52 60L60 78L72 72V106H128V72L140 78L148 60L130 50C118 72 82 72 70 50Z"/><path class="ln lb" style="stroke-width:3" d="M70 50C82 72 118 72 130 50"/>'
  +'<path class="st" d="M76 66v34M88 72v28M112 72v28M124 66v34"/>'+rep(8,i=>'<circle class="bg" cx="'+(79+i*6)+'" cy="99" r="1.8"/>');
ART.tank='<path class="a" d="M78 28h12v24c0 8 20 8 20 0V28h12v26c0 12 8 18 12 26v46H66V80c4-8 12-14 12-26z"/>'
  +[0,1,2].map(r=>[0,1,2].map(c=>'<rect class="'+((r+c)%2?'b':'c')+'" x="'+(83+c*12)+'" y="'+(84+r*12)+'" width="10" height="10" rx="1.5"/>').join('')).join('');
ART.cardigan='<path class="a" d="M99 40H74L50 54L42 112H60L64 82V124H99Z"/><path class="a" d="M101 40H126L150 54L158 112H140L136 82V124H101Z"/>'
  +'<path class="st" d="M88 46v72M112 46v72M52 62l-5 44M148 62l5 44"/><rect class="c" x="68" y="98" width="20" height="16" rx="3"/><rect class="c" x="112" y="98" width="20" height="16" rx="3"/>';
ART.scarf='<rect class="c" x="100" y="38" width="36" height="88" rx="4" transform="rotate(8 118 82)"/><rect class="a" x="82" y="18" width="36" height="104" rx="4"/>'
  +[38,64,90].map(y=>'<rect class="b" x="82" y="'+y+'" width="36" height="10"/>').join('')+rep(6,i=>'<line class="ln la" x1="'+(87+i*5.2)+'" y1="122" x2="'+(87+i*5.2)+'" y2="136" style="stroke-width:2.5"/>');
ART.plant='<path class="g" d="M100 74C84 64 76 44 84 26c16 10 22 30 16 48z"/><path class="g2" d="M100 74C116 64 124 44 116 26c-16 10-22 30-16 48z"/><path class="g" d="M100 74C94 58 96 40 100 22c6 18 6 36 0 52z"/>'
  +'<path class="a" d="M62 84h76l-9 44H71z"/><rect class="c" x="58" y="76" width="84" height="14" rx="5"/><path class="st" d="M66 102h68M69 114h62"/>';
ART.coaster='<circle class="b" cx="118" cy="62" r="40"/><circle class="a" cx="90" cy="84" r="42"/><circle class="ln lb" cx="90" cy="84" r="32" style="stroke-width:4"/><circle class="ln" cx="90" cy="84" r="20" style="stroke-width:4"/><circle class="b" cx="90" cy="84" r="8"/>';

/* --- lessons --- */
ART['l-holding']=put(ART.hook,104,56,0.85)+'<circle class="a" cx="52" cy="108" r="22"/><path class="st" d="M36 104q16-8 32 0"/><path class="ln la" style="stroke-width:4" d="M70 100C94 96 110 112 128 82"/>';
ART['l-chain']=rep(5,i=>'<ellipse class="ln la" cx="'+(46+i*27)+'" cy="75" rx="20" ry="12" style="stroke-width:6"/>');
ART['l-sc']=[44,88].map(y=>rep(4,i=>'<path class="ln la" style="stroke-width:9" d="M'+(40+i*34)+' '+y+'l24 24M'+(64+i*34)+' '+y+'l-24 24"/>')).join('');
ART['l-dc']=rep(4,i=>{const x=46+i*36;return '<path class="ln la" style="stroke-width:5" d="M'+(x-9)+' 36h18M'+x+' 36v70M'+(x-8)+' 74l16-11"/>'});
ART['l-ring']='<circle class="ln la" cx="92" cy="75" r="46" style="stroke-width:6"/><circle class="ln lb" cx="92" cy="75" r="31" style="stroke-width:6"/><circle class="ln" cx="92" cy="75" r="16" style="stroke-width:6"/><circle class="bg" cx="92" cy="75" r="5"/><path class="ln la" style="stroke-width:4" d="M136 104q18 8 34 28"/>';
ART['l-reading']='<rect class="w" x="38" y="16" width="124" height="118" rx="6"/><text class="a" x="50" y="38" font-family="IBM Plex Mono,monospace" font-size="11" font-weight="600">Pattern</text>'
  +['Rnd 1: 6 sc','Rnd 2: inc x6','Rnd 3: (sc, inc) x6','Rnd 4: (2 sc, inc) x6'].map((t,i)=>'<text class="k" x="50" y="'+(60+i*20)+'" font-family="IBM Plex Mono,monospace" font-size="9">'+t+'</text>').join('')+'<rect class="b" x="50" y="44" width="100" height="2"/>';
ART['l-join']='<rect class="a" x="34" y="38" width="64" height="64" rx="3"/><rect class="b" x="44" y="48" width="44" height="44" rx="2"/><rect class="c" x="102" y="38" width="64" height="64" rx="3"/><rect class="a" x="112" y="48" width="44" height="44" rx="2"/>'
  +'<path class="ln lb" style="stroke-width:4;stroke-dasharray:5 5" d="M100 36v68"/>';
ART['l-invdec']=rep(3,i=>{const x=52+i*48;return '<path class="ln la" style="stroke-width:6" d="M'+(x-14)+' 36L'+x+' 98M'+(x+14)+' 36L'+x+' 98"/><circle class="b" cx="'+x+'" cy="104" r="6"/>'});
ART['l-colour']='<path class="ln la" style="stroke-width:10" d="M26 48C84 48 100 102 174 102"/><path class="ln lb" style="stroke-width:10" d="M26 102C84 102 100 48 174 48"/><circle class="c" cx="100" cy="75" r="6"/>';
ART['l-block']=rep(6,i=>'<path class="st" d="M'+(20+i*32)+' 10v130"/>')+rep(5,i=>'<path class="st" d="M10 '+(24+i*26)+'h180"/>')
  +'<rect class="a" x="60" y="34" width="80" height="80" rx="3"/>'
  +[[60,34],[140,34],[60,114],[140,114],[100,34],[100,114],[60,74],[140,74]].map(p=>{const dx=p[0]===60?-1:p[0]===140?1:0,dy=p[1]===34?-1:p[1]===114?1:0;return '<line class="ln lm" x1="'+(p[0]+dx*12)+'" y1="'+(p[1]+dy*12)+'" x2="'+(p[0]-dx*2)+'" y2="'+(p[1]-dy*2)+'" style="stroke-width:3"/><circle class="m" cx="'+(p[0]+dx*13)+'" cy="'+(p[1]+dy*13)+'" r="3.5"/>'}).join('');

/* --- lookup --- */
const ICON_ART={bag:'tote',hat:'beanie',blanket:'granny',toy:'bear',top:'tank',scarf:'scarf',home:'coaster',play:'yarn',heart:'yarn',store:'yarn'};
const TYPE_ART={tote:'tote',donut:'donut','side bag':'side',beanie:'beanie','bucket hat':'bucket',beret:'beret','granny square':'granny','baby blanket':'cot',throw:'throw',bear:'bear',bunny:'bunny',octopus:'octopus','crop top':'crop',cardigan:'cardigan',tank:'tank',scarf:'scarf','plant cover':'plant',coaster:'coaster'};
const CAT_ART={bag:'tote',hat:'beanie',blanket:'granny',toy:'bear',top:'tank',scarf:'scarf',home:'coaster'};
const PROD_ART={'hook-bamboo':'hookb','hook-set':'hooks','projbag':'pbag'};
const SEED_ART={p1:'donut',p2:'granny',p3:'octopus',p4:'beanie',p5:'scarf'};
const patArt=p=>TYPE_ART[String(p.t).toLowerCase()]||CAT_ART[p.c]||'yarn';
function artSvg(key){
  const s=ART[key]||ART[ICON_ART[key]]||ART.yarn;
  return '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">'+s+'</svg>';
}

/* ---------- core helpers ---------- */
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const gh=n=>'GH₵ '+Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
const money=n=>n===0?'Free':gh(n);
const ico=(n,c)=>'<svg class="ico'+(c?' '+c:'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>';
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const hashStr=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h};
const pad=n=>String(n).padStart(2,'0');
const isoDate=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const fmtDay=d=>d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
const fmtTime=d=>d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
function timeAgo(ts){const m=Math.round((Date.now()-ts)/60000);if(m<1)return 'just now';if(m<60)return m+' min ago';const h=Math.round(m/60);if(h<24)return h+' h ago';const d=Math.round(h/24);return d+(d===1?' day ago':' days ago')}
function pressGroup(root,key,val){$$('button',root).forEach(b=>{if(b.dataset[key]!==undefined)b.setAttribute('aria-pressed',String(b.dataset[key]===val))})}
function swatch(hue,key,cls){return '<div class="art '+(cls||'')+'" style="--h:'+hue+'" aria-hidden="true">'+artSvg(key)+'</div>'}

/* ---------- state (saved in this browser) ---------- */
const KEY='magic-ring-v1';
function defaults(){return{me:'',projects:[],seeded:false,posts:null,threads:null,userPatterns:[],cart:{},owned:[],purchased:[],orders:[],bookings:[],regs:[]}}
let S;
try{S=Object.assign(defaults(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){S=defaults()}
let warned=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){if(!warned){warned=true;toast('This browser would not save your changes. They last until you close the page.')}}}
const meName=()=>(S.me||'').trim()||'Guest crocheter';

/* ---------- toast, clipboard, dialogs ---------- */
let toastTimer;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('on'),2800)}
function copyText(t){
  const ok=()=>toast('Link copied');
  const fb=()=>{const ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();let done=false;try{done=document.execCommand('copy')}catch(e){}ta.remove();done?ok():toast('Copy this link: '+t)};
  try{navigator.clipboard.writeText(t).then(ok,fb)}catch(e){fb()}
}
function openDlg(d){if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','')}
function closeDlg(d){if(typeof d.close==='function')d.close();else d.removeAttribute('open')}
function closeAll(){$$('dialog[open]').forEach(closeDlg)}
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)closeDlg(d)}));

/* ---------- router ---------- */
const views=$$('.view');
const tabs=$$('.tabs [data-go]');
const hooks={};
function show(name,push){
  if(!views.some(v=>v.dataset.view===name))name='home';
  views.forEach(v=>{v.hidden=v.dataset.view!==name});
  tabs.forEach(t=>{const on=t.dataset.go===name;t.classList.toggle('on',on);if(on){t.setAttribute('aria-current','page');try{t.scrollIntoView({inline:'center',block:'nearest'})}catch(e){}}else t.removeAttribute('aria-current')});
  if(push!==false){try{history.replaceState(null,'','#'+name)}catch(e){}}
  if(hooks[name])hooks[name]();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',()=>show(location.hash.slice(1),false));
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]');
  if(g){
    if(g.dataset.level)document.dispatchEvent(new CustomEvent('preset',{detail:{level:g.dataset.level}}));
    closeAll();show(g.dataset.go);return;
  }
  const c=e.target.closest('[data-close]');
  if(c)closeDlg($('#'+c.dataset.close));
});

/* ---------- home: feature grid and demo counter ---------- */
const FEATS=[
  ['patterns','search','Pattern search','Say “bag” and pick tote or side bag.'],
  ['projects','counter','Row and stitch counters','Tap to count. Progress is saved for next time.'],
  ['learn','play','Lessons and live sessions','Written lessons, video links and sessions to join.'],
  ['kit','kit','Starter kit guide','Which hook, yarn and pins to buy first.'],
  ['shop','store','Tool shop','Hooks, yarn, markers, blocking pins and more.'],
  ['community','heart','Community','Post your makes, like, comment and share.'],
  ['forum','comment','Discussion forum','Ask questions and swap ideas with designers.'],
  ['designers','calendar','Book a designer','Pick a designer, a date and a time.'],
  ['market','users','Marketplace','Buy patterns or list your own for sale.']
];
$('#featGrid').innerHTML=FEATS.map(f=>'<button class="feat" data-go="'+f[0]+'">'+ico(f[1])+'<span><b>'+f[2]+'</b><small>'+f[3]+'</small></span></button>').join('');
let demo=12;
function drawDemo(){$('#demoRow').textContent=demo;$('#demoRow2').textContent=demo;$('#demoBar').style.width=Math.min(100,demo/40*100)+'%'}
$('#demoPlus').addEventListener('click',()=>{demo=Math.min(40,demo+1);drawDemo()});
$('#demoMinus').addEventListener('click',()=>{demo=Math.max(0,demo-1);drawDemo()});

/* ---------- designers and pattern data (sample content) ---------- */
const DESIGNERS=[
  {id:'ama',n:'Ama Serwaa',loc:'Accra',spec:'Bags and structured pieces',rate:60,days:[1,3,6],times:['09:00','10:30','14:00','17:00'],hue:330,bio:'Designs sturdy cotton bags and teaches how to shape handles and bases that hold their form.'},
  {id:'kofi',n:'Kofi Mensah',loc:'Kumasi',spec:'Garments, sizing and fit',rate:80,days:[2,4],times:['10:30','12:00','15:30','18:30'],hue:210,bio:'Writes sized garment patterns and helps crocheters adjust length, ease and shaping.'},
  {id:'efua',n:'Efua Quansah',loc:'Cape Coast',spec:'Amigurumi and toys',rate:50,days:[5,6,0],times:['09:00','12:00','14:00','15:30'],hue:150,bio:'Makes small stuffed animals and can sort out lumpy shaping, floppy limbs and eye placement.'},
  {id:'naledi',n:'Naledi Dube',loc:'Remote',spec:'Granny squares and colour work',rate:55,days:[1,2,3,4,5],times:['17:00','18:30'],hue:40,bio:'Colour planner for blankets and motifs, with a soft spot for tidy joins.'}
];
const dName=id=>(DESIGNERS.find(d=>d.id===id)||{n:'Magic Ring member'}).n;
const patBy=p=>p.by||dName(p.d);

const CATS={
  bag:{one:'bag',label:'bags',words:['bag','bags','purse','handbag'],types:['tote','side bag']},
  hat:{one:'hat',label:'hats',words:['hat','hats','cap'],types:['beanie','bucket hat','beret']},
  blanket:{one:'blanket',label:'blankets',words:['blanket','blankets','afghan'],types:['granny square','baby blanket','throw']},
  toy:{one:'toy',label:'toys',words:['toy','toys','amigurumi','plush','doll'],types:['bear','bunny','octopus']},
  top:{one:'top',label:'tops',words:['top','tops','shirt','sweater','jumper'],types:['crop top','cardigan','tank']},
  scarf:{one:'scarf',label:'scarves',words:['scarf','scarves'],types:[]},
  home:{one:'home item',label:'home and decor',words:['home','decor','homeware'],types:['plant cover','coaster']}
};
const CAT_ICON={bag:'bag',hat:'hat',blanket:'blanket',toy:'toy',top:'top',scarf:'scarf',home:'home'};
const ROWGOAL={bag:30,hat:28,blanket:60,toy:40,top:70,scarf:150,home:12};

const PATTERNS=[
  ['market-tote','Market Tote','bag','tote','ama','Beginner',6,'Worsted cotton',5,0,28,'A sturdy, stretchy shopping tote worked in one piece from the base up.'],
  ['mesh-tote','Mesh Beach Tote','bag','tote','ama','Intermediate',8,'Cotton cord',6,25,190,'Open mesh walls and flat woven handles that carry wet towels without sagging.'],
  ['sunset-bag','Sunset Ombré Handbag','bag','tote','ama','Intermediate',8,'Cotton blend',4.5,32,20,'A rounded shoulder bag in colour-shifting yarn, finished with a crochet flower.'],
  ['granny-cross','Granny Square Crossbody','bag','side bag','naledi','Intermediate',9,'Worsted cotton',4.5,35,45,'Six granny squares joined into a roomy side bag with an adjustable strap.'],
  ['pocket-sling','Pocket Sling','bag','side bag','ama','Beginner',4,'Worsted cotton',5,0,260,'A flat phone-and-keys sling worked in simple rows.'],
  ['ribbed-beanie','Ribbed Beanie','hat','beanie','kofi','Beginner',3,'Worsted acrylic',5.5,0,350,'Stretchy ribbing worked in the back loop, with sizes from child to adult.'],
  ['slouchy-beanie','Slouchy Beanie','hat','beanie','kofi','Beginner',4,'Worsted wool blend',5,20,45,'A relaxed beanie with extra length and a folded brim.'],
  ['bucket-hat','Sunny Bucket Hat','hat','bucket hat','ama','Intermediate',5,'Cotton DK',4,28,50,'A summer hat with a firm crown and a wide shade brim.'],
  ['cloche-beret','Cloche Beret','hat','beret','kofi','Intermediate',5,'DK wool',4.5,25,300,'A flat-topped beret shaped with even increases and a ribbed band.'],
  ['classic-granny','Classic Granny Blanket','blanket','granny square','naledi','Beginner',40,'Worsted acrylic',5,0,10,'Traditional granny squares in a palette of your choice, joined as you go.'],
  ['sunburst-granny','Sunburst Granny Throw','blanket','granny square','naledi','Intermediate',45,'DK cotton',4,30,40,'Bright sunburst centres on every square, framed in a calm neutral.'],
  ['cloud-cot','Cloud Stitch Cot Blanket','blanket','baby blanket','efua','Beginner',20,'Soft baby DK',4.5,22,200,'A squishy cot blanket in an easy two-row repeat.'],
  ['chunky-throw','Chunky Sofa Throw','blanket','throw','kofi','Beginner',14,'Super bulky',10,18,165,'A fast, heavy throw worked with a large hook and chunky yarn.'],
  ['little-bear','Little Bear','toy','bear','efua','Intermediate',6,'Cotton DK',3.5,0,25,'A bear with a jointed look, sewn-on ears and safety eyes.'],
  ['floppy-bunny','Floppy-Ear Bunny','toy','bunny','efua','Intermediate',7,'Cotton DK',3.5,25,340,'A soft bunny with long ears, a round tail and a tiny scarf.'],
  ['pocket-octopus','Pocket Octopus','toy','octopus','efua','Beginner',2,'Cotton DK',3.5,0,185,'A palm-sized octopus that teaches spirals, increases and tentacles.'],
  ['crop-top','Summer Crop Top','top','crop top','kofi','Intermediate',12,'Cotton DK',4,35,12,'A fitted crop top with shoulder straps and a lacy hem.'],
  ['cosy-cardigan','Cosy Cardigan','top','cardigan','kofi','Advanced',35,'DK wool blend',4.5,45,280,'A top-down cardigan with raglan shaping and pockets, in sizes XS to 3XL.'],
  ['granny-tank','Granny Tank','top','tank','naledi','Intermediate',14,'Cotton DK',4,30,50,'A square-motif tank top with simple seaming and a flattering hem.'],
  ['moss-scarf','Moss Stitch Scarf','scarf','scarf','kofi','Beginner',5,'Worsted wool blend',5.5,0,215,'A reversible scarf in a two-stitch repeat that never gets boring.'],
  ['plant-cosy','Plant Pot Cosy','home','plant cover','ama','Beginner',2,'Worsted cotton',5,0,130,'A snug cover for a small plant pot, adjustable to any size.'],
  ['coaster-set','Round Coaster Set','home','coaster','efua','Beginner',2,'Worsted cotton',4,0,355,'A set of four flat coasters, ideal for practising circles.']
].map(a=>({id:a[0],n:a[1],c:a[2],t:a[3],d:a[4],l:a[5],h:a[6],y:a[7],k:a[8],p:a[9],hue:a[10],b:a[11]}));
function patMedia(p,cls){
  if(PHOTOS[p.id])return '<div class="art ph '+(cls||'')+'"><img src="'+PHOTOS[p.id]+'" alt="'+esc(p.n)+'" loading="lazy"></div>';
  return swatch(p.hue,patArt(p),cls);
}
const allPatterns=()=>PATTERNS.concat(S.userPatterns);
const ownsPattern=p=>p.p===0||p.user||S.purchased.includes(p.id);

const STEPS={
  bag:['Work a gauge swatch with the hook size above and check it measures 10 × 10 cm.','Chain the base length you want, then work single crochet along the chain and around the other side to make an oval base.','Increase evenly each round until the base is the width you want. Mark the first stitch of every round.','Stop increasing and work even rounds to build the walls to your chosen height.','Make the handles or strap, attach them securely, and add a lining or closure if the design calls for one.','Weave in the ends with a tapestry needle and block lightly.'],
  hat:['Make a magic ring and work the first round of the crown.','Increase evenly each round until the flat crown is as wide as the size chart says.','Stop increasing and work even rounds until the hat reaches the length for your size.','Finish with a ribbed or folded brim for a snug fit.','Weave in the ends and add a pom-pom if you like.'],
  blanket:['Make a gauge swatch and decide how big the finished blanket should be.','Work the first motif or the foundation chain, following the stitch pattern.','Repeat motifs or rows, joining as you go or sewing together at the end.','Add a border of two or three rounds to keep the edges flat.','Weave in all ends, wash gently and block to size.'],
  toy:['Make a magic ring and work the head or body in continuous spirals, marking the first stitch of each round.','Increase evenly to the widest point, work even rounds, then decrease.','Insert safety eyes before the last decreases, then stuff firmly.','Close the opening with a final round of decreases and fasten off.','Make the limbs and ears, then sew them on with a tapestry needle.'],
  top:['Take your bust and length measurements and compare your gauge swatch with the size chart.','Work the body panels or the yoke for your size.','Join the shoulders and sides, trying the piece on as you go.','Work the hem and any straps or sleeves.','Weave in the ends, wash and block to the measurements.'],
  scarf:['Chain the starting length for the width you want, in a multiple of the stitch repeat.','Work the first row, then repeat the stitch pattern row after row.','Keep going until the scarf is the length you like.','Fasten off, weave in the ends and add fringe if you wish.'],
  home:['Make a magic ring or a short chain to begin.','Work the base in rounds, increasing evenly until it fits your pot or surface.','Work even rounds for the sides if needed, then finish with a neat edging round.','Weave in the ends and block flat.']
};
const NOTIONS={
  bag:['Stitch markers','Tapestry needle','Optional: lining fabric or a zip'],
  hat:['Stitch markers','Tapestry needle','Optional: pom-pom maker'],
  blanket:['Tapestry needle','Scissors','Blocking pins and mat'],
  toy:['Safety eyes','Polyester stuffing','Stitch markers','Tapestry needle'],
  top:['Stitch markers','Measuring tape','Tapestry needle','Blocking pins and mat'],
  scarf:['Tapestry needle','Optional: extra yarn for fringe'],
  home:['Tapestry needle','Optional: blocking pins']
};
const ABBR={ch:'chain',st:'stitch','sl st':'slip stitch',sc:'single crochet',dc:'double crochet',inc:'increase (two stitches in one)',dec:'decrease (two stitches worked together)',rnd:'round',sk:'skip'};
const ABBR_BY={bag:['ch','sl st','sc','inc','st','rnd'],hat:['ch','sl st','sc','inc','dec','rnd'],blanket:['ch','sl st','sc','dc','sk','st'],toy:['sc','inc','dec','st','rnd'],top:['ch','sl st','sc','dc','sk','st'],scarf:['ch','sc','dc','sk','st'],home:['ch','sl st','sc','inc','rnd']};

/* ---------- search with a follow-up question ---------- */
let pq='',pref=null,plv='all',pcost='all';
function interpret(q){
  q=q.trim().toLowerCase();
  if(!q)return{mode:'all'};
  for(const k of Object.keys(CATS))for(const t of CATS[k].types)if(q.includes(t))return{mode:'type',cat:k,type:t};
  for(const k of Object.keys(CATS))if(CATS[k].words.indexOf(q)>-1){return CATS[k].types.length?{mode:'ask',cat:k}:{mode:'cat',cat:k}}
  return{mode:'text',q:q};
}
function matches(p,I){
  const t=String(p.t).toLowerCase();
  if(I.mode==='all')return true;
  if(I.mode==='type')return p.c===I.cat&&t===I.type;
  if(I.mode==='cat')return p.c===I.cat;
  if(I.mode==='ask')return p.c===I.cat&&(pref==='all'||t===pref);
  const hay=(p.n+' '+p.c+' '+p.t+' '+p.b+' '+p.y+' '+patBy(p)).toLowerCase();
  return I.q.split(/\s+/).every(w=>hay.indexOf(w)>-1);
}
function patCard(p){
  const own=ownsPattern(p);
  const priceTag=p.p===0?'<span class="tag free">Free</span>':own?'<span class="tag ok">Owned</span>':'<span class="tag paid">'+gh(p.p)+'</span>';
  return '<article class="card">'+patMedia(p)+'<div class="card-body">'
    +'<div class="row" style="gap:6px"><span class="tag">'+esc(p.l)+'</span>'+priceTag+'</div>'
    +'<h3>'+esc(p.n)+'</h3>'
    +'<p class="meta"><span>by '+esc(patBy(p))+'</span>'+(p.h?'<span>'+p.h+' h</span>':'')+'<span>'+p.k+' mm</span></p>'
    +'<p class="muted small">'+esc(p.b)+'</p>'
    +'<div class="row push"><button class="btn small primary" data-view-pat="'+esc(p.id)+'">View pattern</button><button class="btn small" data-track-pat="'+esc(p.id)+'">Track project</button></div>'
    +'</div></article>';
}
function renderPatterns(){
  const I=interpret(pq),ref=$('#patRefine'),grid=$('#patGrid'),cnt=$('#patCount');
  const all=allPatterns();
  if(I.mode==='ask'&&pref===null){
    const c=CATS[I.cat];
    ref.innerHTML='<div class="refine"><h3>Which kind of '+c.one+'?</h3><div class="chips">'
      +c.types.map(t=>'<button class="chip" data-ref="'+esc(t)+'">'+esc(t.charAt(0).toUpperCase()+t.slice(1))+' ('+all.filter(p=>p.c===I.cat&&String(p.t).toLowerCase()===t).length+')</button>').join('')
      +'<button class="chip" data-ref="all">Show all '+c.label+'</button></div></div>';
    grid.innerHTML='';cnt.textContent='Pick a type to see matching patterns.';return;
  }
  ref.innerHTML=I.mode==='ask'?'<div class="row" style="margin-top:14px;gap:8px"><span class="muted">Showing '+esc(CATS[I.cat].label)+': <b>'+(pref==='all'?'all types':esc(pref))+'</b></span><button class="btn small ghost" data-ref="ask">Change type</button></div>':'';
  const list=all.filter(p=>matches(p,I)).filter(p=>plv==='all'||p.l===plv).filter(p=>pcost==='all'||(pcost==='free'?p.p===0:p.p>0));
  cnt.textContent=list.length+(list.length===1?' pattern':' patterns')+(pq.trim()?' for “'+pq.trim()+'”':'');
  grid.innerHTML=list.length?list.map(patCard).join(''):'<div class="empty" style="grid-column:1/-1">Nothing matches yet. Try “bag”, “beanie” or “blanket”, or clear the filters.<div style="margin-top:12px"><button class="btn small" id="patClear">Clear search and filters</button></div></div>';
}
hooks.patterns=renderPatterns;
function resetPatFilters(){pq='';pref=null;plv='all';pcost='all';$('#patQ').value='';pressGroup($('.filters'),'lv','all');pressGroup($('.filters'),'cost','all')}
$('#patForm').addEventListener('submit',e=>{e.preventDefault();pq=$('#patQ').value;pref=null;renderPatterns()});
$('#patQuick').innerHTML='<span class="lbl" style="align-self:center">Try:</span>'+['bag','hat','blanket','toy','top','scarf'].map(q=>'<button class="chip" data-q="'+q+'">'+q+'</button>').join('');
$('#patQuick').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;pq=b.dataset.q;$('#patQ').value=pq;pref=null;renderPatterns()});
$('[data-view="patterns"]').addEventListener('click',e=>{
  const r=e.target.closest('[data-ref]');
  if(r){pref=r.dataset.ref==='ask'?null:r.dataset.ref;renderPatterns();return}
  const lv=e.target.closest('[data-lv]');
  if(lv){plv=lv.dataset.lv;pressGroup(lv.parentNode,'lv',plv);renderPatterns();return}
  const co=e.target.closest('[data-cost]');
  if(co){pcost=co.dataset.cost;pressGroup(co.parentNode,'cost',pcost);renderPatterns();return}
  if(e.target.id==='patClear'){resetPatFilters();renderPatterns()}
});
document.addEventListener('preset',e=>{resetPatFilters();plv=e.detail.level;pressGroup($('.filters'),'lv',plv)});

/* ---------- pattern details ---------- */
function openPattern(id){
  const p=allPatterns().find(x=>x.id===id);if(!p)return;
  const own=ownsPattern(p),steps=STEPS[p.c]||[];
  const shown=own?steps:steps.slice(0,2);
  const body=$('#patBody');
  body.innerHTML='<div class="dlg-bar"><div class="row" style="gap:6px"><span class="tag">'+esc(p.l)+'</span>'+(p.p===0?'<span class="tag free">Free</span>':own?'<span class="tag ok">Owned</span>':'<span class="tag paid">'+gh(p.p)+'</span>')+'</div><button class="btn small ghost" data-close="patDlg">Close</button></div>'
    +patMedia(p,'short')
    +'<div><h2>'+esc(p.n)+'</h2><p class="muted">by '+esc(patBy(p))+''+(p.h?' · about '+p.h+' hours':'')+' · '+esc(p.y)+' · '+p.k+' mm hook</p></div>'
    +'<p>'+esc(p.b)+'</p>'
    +'<div class="form-grid"><div><h4>Materials</h4><ul style="margin:6px 0 0;padding-left:1.2rem"><li>Yarn: '+esc(p.y)+'</li><li>Hook: '+p.k+' mm</li>'+(NOTIONS[p.c]||[]).map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul></div>'
    +'<div><h4>Gauge</h4><p class="muted" style="margin-top:6px">Make a 10 × 10 cm swatch with the '+p.k+' mm hook. Too small: go up a hook size. Too big: go down one.</p></div></div>'
    +(p.user?'<div><h4>From the designer</h4><p class="muted" style="margin-top:6px">'+esc(p.b)+' The full written pattern is delivered after purchase in a live version.</p></div>'
      :'<div><h4>Overview of the steps</h4><ol class="steps" style="margin-top:8px">'+shown.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol></div>')
    +(!own?'<div class="locked"><b>'+(steps.length-shown.length)+' more steps unlock after purchase.</b><button class="btn primary small" data-add-pat="'+esc(p.id)+'">Add to cart for '+gh(p.p)+'</button></div>':'')
    +'<div><h4>Abbreviations used</h4><dl class="abbr" style="margin-top:8px">'+(ABBR_BY[p.c]||[]).map(a=>'<dt>'+a+'</dt><dd>'+ABBR[a]+'</dd>').join('')+'</dl></div>'
    +'<div class="row"><button class="btn primary" data-track-pat="'+esc(p.id)+'">Start tracking this project</button></div>';
  openDlg($('#patDlg'));
}
document.addEventListener('click',e=>{
  const v=e.target.closest('[data-view-pat]');if(v){openPattern(v.dataset.viewPat);return}
  const t=e.target.closest('[data-track-pat]');
  if(t){const p=allPatterns().find(x=>x.id===t.dataset.trackPat);if(p){addProject(p.n,p.id,ROWGOAL[p.c]||30,40);closeDlg($('#patDlg'));toast('Added to Projects');}return}
  const a=e.target.closest('[data-add-pat]');if(a){addToCart('pat:'+a.dataset.addPat)}
});

/* ---------- projects and counters ---------- */
function seedProjects(){
  if(S.seeded)return;
  S.projects.push({id:'ex-tote',name:'Market Tote (example)',pid:'market-tote',rows:12,rowGoal:30,st:18,stGoal:48,auto:true,notes:'Example project. Delete it any time.',ex:true,ts:Date.now()});
  S.seeded=true;save();
}
function addProject(name,pid,rowGoal,stGoal){
  S.projects.unshift({id:uid(),name:name,pid:pid||'',rows:0,rowGoal:rowGoal||0,st:0,stGoal:stGoal||0,auto:true,notes:'',ts:Date.now()});
  save();renderProjects();
}
function counterBlock(label,unit,key,goalKey,val,goal){
  const pct=goal?Math.min(100,Math.round(val/goal*100)):0;
  return '<div class="ctr-block"><div class="ctr-top"><span class="lbl">'+label+'</span>'
    +'<label class="goal">Goal <input type="number" min="0" max="999" value="'+goal+'" data-goal="'+goalKey+'" aria-label="'+label+' goal"></label></div>'
    +'<div class="ctr"><button class="btn ctr-btn" data-act="'+key+'-" aria-label="Remove one '+unit+'">&minus;</button>'
    +'<output class="ctr-n" aria-live="polite">'+val+'</output>'
    +'<button class="btn primary ctr-btn" data-act="'+key+'+" aria-label="Add one '+unit+'">+</button></div>'
    +'<div class="bar" role="progressbar" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100" aria-label="'+label+' progress"><i style="width:'+pct+'%"></i></div>'
    +'<div class="ctr-top"><span class="small muted pct">'+(goal?val+' of '+goal+' ('+pct+'%)':'Set a goal to see progress')+'</span><button class="btn small ghost" data-act="'+key+'0">Reset</button></div></div>';
}
function projCard(j){
  const pat=j.pid?(allPatterns().find(p=>p.id===j.pid)||{}).n:'';
  const done=j.stGoal&&j.st>=j.stGoal;
  return '<article class="card proj" data-id="'+esc(j.id)+'">'
    +'<div class="proj-head"><div><h3>'+esc(j.name)+'</h3><p class="muted small">'+(pat?'Pattern: '+esc(pat)+' · ':'')+'<span class="upd">Updated '+timeAgo(j.ts)+'</span></p></div>'+(j.ex?'<span class="tag warn">Example</span>':'')+'</div>'
    +counterBlock('Rows','row','rows','rowGoal',j.rows,j.rowGoal)
    +counterBlock('Stitches in this row','stitch','st','stGoal',j.st,j.stGoal)
    +'<div class="done-slot">'+(done?'<p class="done-note">Row complete. Add a row to start the next one.</p>':'')+'</div>'
    +'<label class="toggle"><input type="checkbox" data-auto '+(j.auto?'checked':'')+'> Reset stitches to 0 when I add a row</label>'
    +'<div class="field"><label for="n-'+esc(j.id)+'">Notes</label><textarea id="n-'+esc(j.id)+'" data-notes maxlength="500" placeholder="Hook, yarn, where you stopped">'+esc(j.notes)+'</textarea></div>'
    +'<div><button class="btn small danger" data-act="del">Delete project</button></div>'
    +'</article>';
}
function paintCard(card,j){
  const blocks=$$('.ctr-block',card);
  [['rows','rowGoal'],['st','stGoal']].forEach((kg,i)=>{
    const b=blocks[i],val=j[kg[0]],goal=j[kg[1]],pct=goal?Math.min(100,Math.round(val/goal*100)):0;
    $('.ctr-n',b).textContent=val;
    $('.bar>i',b).style.width=pct+'%';
    $('.bar',b).setAttribute('aria-valuenow',pct);
    $('.pct',b).textContent=goal?val+' of '+goal+' ('+pct+'%)':'Set a goal to see progress';
    const gi=$('[data-goal]',b);if(document.activeElement!==gi)gi.value=goal;
  });
  $('.done-slot',card).innerHTML=(j.stGoal&&j.st>=j.stGoal)?'<p class="done-note">Row complete. Add a row to start the next one.</p>':'';
  $('.upd',card).textContent='Updated '+timeAgo(j.ts);
}
function renderProjects(){
  $('#projList').innerHTML=S.projects.length?S.projects.map(projCard).join(''):'<div class="empty" style="grid-column:1/-1">No projects yet. Start one from a pattern, or press New project.</div>';
}
hooks.projects=renderProjects;
const projOf=el=>{const c=el.closest('[data-id]');return c?{card:c,j:S.projects.find(x=>x.id===c.dataset.id)}:null};
$('#projList').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b)return;
  const o=projOf(b);if(!o||!o.j)return;
  const a=b.dataset.act,j=o.j;
  if(a==='del'){
    if(b.dataset.armed){S.projects=S.projects.filter(x=>x!==j);save();renderProjects();toast('Project deleted');return}
    b.dataset.armed='1';b.textContent='Tap again to delete';
    setTimeout(()=>{if(b.isConnected){delete b.dataset.armed;b.textContent='Delete project'}},4000);return;
  }
  const op=a.slice(-1),key=a.slice(0,-1);
  if(op==='+'){j[key]=Math.min(999,j[key]+1);if(key==='rows'&&j.auto)j.st=0}
  else if(op==='-')j[key]=Math.max(0,j[key]-1);
  else j[key]=0;
  j.ts=Date.now();save();paintCard(o.card,j);
});
$('#projList').addEventListener('change',e=>{
  const o=projOf(e.target);if(!o||!o.j)return;
  if(e.target.dataset.goal){o.j[e.target.dataset.goal]=Math.max(0,Math.min(999,parseInt(e.target.value,10)||0))}
  else if(e.target.hasAttribute('data-auto')){o.j.auto=e.target.checked}
  else return;
  save();paintCard(o.card,o.j);
});
$('#projList').addEventListener('input',e=>{
  if(!e.target.hasAttribute('data-notes'))return;
  const o=projOf(e.target);if(!o||!o.j)return;
  o.j.notes=e.target.value.slice(0,500);save();
});
$('#newProjBtn').addEventListener('click',()=>{const f=$('#projForm');f.hidden=false;$('#pjName').focus()});
$('#pjCancel').addEventListener('click',()=>{$('#projForm').hidden=true});
$('#projForm').addEventListener('submit',e=>{
  e.preventDefault();
  addProject($('#pjName').value.trim(),'',parseInt($('#pjRows').value,10)||0,parseInt($('#pjSts').value,10)||0);
  $('#pjName').value='';$('#projForm').hidden=true;toast('Project created');
});

/* ---------- lessons and live sessions ---------- */
const LESSONS=[
  ['holding','Hold the hook and yarn','Beginner',8,'how to hold crochet hook and yarn for beginners',['Hold the hook like a pencil or like a knife, whichever feels steadier.','Wrap the yarn over your other hand: under the last two fingers and over the index finger.','Use your thumb and middle finger to hold the work close to the hook.','Keep your grip loose. Tight hands make tight stitches.']],
  ['chain','Slip knot and chain stitch','Beginner',10,'how to make a slip knot and chain stitch crochet',['Make a slip knot and place it on the hook.','Wrap the yarn over the hook (a yarn over).','Pull the yarn through the loop on the hook. That is one chain.','Repeat to make a row of even chains and count them as you go.']],
  ['sc','Single crochet','Beginner',12,'how to single crochet for beginners',['Insert the hook into the second chain from the hook.','Yarn over and pull up a loop. You now have two loops on the hook.','Yarn over and pull through both loops.','Repeat in each chain, then chain 1 and turn to start the next row.']],
  ['dc','Double crochet','Beginner',14,'how to double crochet for beginners',['Yarn over, then insert the hook into the fourth chain from the hook.','Yarn over and pull up a loop. You now have three loops on the hook.','Yarn over and pull through two loops, then yarn over and pull through the last two.','Chain 3 at the end of each row to count as the first stitch of the next row.']],
  ['ring','Magic ring','Beginner',9,'how to make a magic ring crochet',['Wrap the yarn twice around two fingers to form a loop.','Insert the hook through the loop and pull up the working yarn.','Chain 1, then work your first round of stitches into the ring.','Pull the tail to close the centre tightly, then weave it in.']],
  ['reading','Read a pattern and its abbreviations','Beginner',15,'how to read a crochet pattern for beginners',['Read the materials list and gauge before you start.','Learn the abbreviations used, such as ch, sc, dc and st.','Brackets and asterisks mean repeat the instructions between them.','The stitch count at the end of a row tells you whether you are on track.']],
  ['join','Join granny squares','Intermediate',16,'how to join granny squares crochet',['Lay out the squares and decide the order.','Choose a join: slip stitch, single crochet or join-as-you-go.','Work along the edges through the loops of both squares.','Keep your tension the same as in the squares so the seam lies flat.']],
  ['invdec','Invisible decrease','Intermediate',8,'invisible decrease amigurumi crochet tutorial',['Insert the hook into the front loop of the next stitch, then the front loop of the one after.','Yarn over and pull through both front loops.','Yarn over and pull through the two loops on the hook.','Repeat for each decrease. The shaping hides inside the fabric.']],
  ['colour','Change colour cleanly','Intermediate',11,'how to change colors in crochet',['Work the last stitch of the old colour until two loops remain on the hook.','Drop the old colour and pull the new colour through.','Carry the unused yarn along the top of the row, or cut it and weave it in later.','Keep both tails on the wrong side.']],
  ['block','Block a finished piece','Intermediate',10,'how to block crochet with pins',['Wash the piece gently and press out the water in a towel without wringing.','Pin it flat on a blocking mat with T-pins, shaping it to the measurements.','Let it dry fully before unpinning.','Blocking evens out stitches and opens up lace.']]
].map((a,i)=>({id:a[0],n:a[1],l:a[2],m:a[3],q:a[4],s:a[5],hue:(i*37+300)%360}));
let llv='all';
function renderLessons(){
  const list=LESSONS.filter(x=>llv==='all'||x.l===llv);
  $('#lessonGrid').innerHTML=list.map(x=>'<article class="card">'+swatch(x.hue,'l-'+x.id)+'<div class="card-body">'
    +'<div class="row" style="gap:6px"><span class="tag">'+x.l+'</span><span class="tag">'+x.m+' min</span></div>'
    +'<h3>'+esc(x.n)+'</h3>'
    +'<details class="lesson"><summary>Read the steps</summary><ol>'+x.s.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol></details>'
    +'<div class="push"><a class="btn small" href="https://www.youtube.com/results?search_query='+encodeURIComponent(x.q)+'" target="_blank" rel="noopener">'+ico('play')+'Find video tutorials</a></div>'
    +'</div></article>').join('');
}
$('#lessonFilters').addEventListener('click',e=>{const b=e.target.closest('[data-llv]');if(!b)return;llv=b.dataset.llv;pressGroup($('#lessonFilters'),'llv',llv);renderLessons()});

function nextDow(dow,h,m){
  const d=new Date();d.setHours(h,m,0,0);let n=0;
  while((d.getDay()!==dow||d<=new Date())&&n<14){d.setDate(d.getDate()+1);n++}
  return d;
}
const SESSIONS=[
  {id:'s-granny',t:'Granny square from scratch',by:'naledi',dow:6,h:15,m:0,dur:90,l:'Beginner',cap:12,taken:8,b:'Make your first square together and fix the common wobbly corners.'},
  {id:'s-ring',t:'Magic ring and amigurumi basics',by:'efua',dow:0,h:16,m:0,dur:60,l:'Beginner',cap:10,taken:6,b:'Start a small toy from a magic ring and learn how to keep rounds even.'},
  {id:'s-tote',t:'Tote bag clinic: handles and lining',by:'ama',dow:3,h:18,m:30,dur:60,l:'Intermediate',cap:15,taken:9,b:'Bring your tote in progress and get help with handles, bases and lining.'},
  {id:'s-fit',t:'Reading garment patterns and sizing',by:'kofi',dow:4,h:19,m:0,dur:75,l:'Intermediate',cap:12,taken:4,b:'Measure yourself, read a size chart and choose what to adjust.'}
];
const regOf=sid=>S.regs.find(r=>r.sid===sid);
function sessionCard(s){
  const when=nextDow(s.dow,s.h,s.m),mine=regOf(s.id);
  const left=s.cap-s.taken-S.regs.filter(r=>r.sid===s.id).length;
  return '<article class="card session"><div class="when"><b>'+when.getDate()+'</b><span>'+when.toLocaleDateString('en-GB',{weekday:'short',month:'short'})+'</span></div>'
    +'<div style="min-width:0"><div class="row" style="gap:6px;margin-bottom:6px"><span class="tag">'+s.l+'</span>'+(left>0?'<span class="tag ok">'+left+' spots left</span>':'<span class="tag warn">Full</span>')+'</div>'
    +'<h3>'+esc(s.t)+'</h3><p class="meta" style="margin-block:4px"><span>with '+esc(dName(s.by))+'</span><span>'+fmtTime(when)+'</span><span>'+s.dur+' min</span></p>'
    +'<p class="muted small">'+esc(s.b)+'</p></div>'
    +'<div class="acts row">'+(mine?'<span class="tag ok">You are registered</span><button class="btn small" disabled>Join link opens 15 min before</button><button class="btn small ghost" data-unreg="'+s.id+'">Cancel</button>'
      :'<button class="btn small primary" data-reg="'+s.id+'"'+(left>0?'':' disabled')+'>Register for this session</button>')+'</div></article>';
}
function renderSessions(){
  $('#sessionList').innerHTML=SESSIONS.map(sessionCard).join('');
  try{$('#tzNote').textContent='Times shown in your time zone ('+Intl.DateTimeFormat().resolvedOptions().timeZone+')'}catch(e){}
  const n=S.regs.length;
  $('#myRegs').innerHTML=n?'<div class="panel"><b>You are registered for '+n+(n===1?' session':' sessions')+'.</b> <span class="muted">Details were saved with your name and email.</span></div>':'';
}
hooks.learn=()=>{renderLessons();renderSessions()};
let regSid=null;
$('#sessionList').addEventListener('click',e=>{
  const r=e.target.closest('[data-reg]');
  if(r){
    regSid=r.dataset.reg;const s=SESSIONS.find(x=>x.id===regSid),when=nextDow(s.dow,s.h,s.m);
    $('#regTitle').textContent=s.t;$('#regWhen').textContent=fmtDay(when)+' at '+fmtTime(when)+' with '+dName(s.by);
    $('#regName').value=S.me||'';$('#regEmail').value=(S.regs[0]&&S.regs[0].email)||(S.bookings[0]&&S.bookings[0].email)||'';
    openDlg($('#regDlg'));return;
  }
  const u=e.target.closest('[data-unreg]');
  if(u){S.regs=S.regs.filter(x=>x.sid!==u.dataset.unreg);save();renderSessions();toast('Registration cancelled')}
});
$('#regForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(!regSid||regOf(regSid))return;
  S.regs.push({id:uid(),sid:regSid,name:$('#regName').value.trim(),email:$('#regEmail').value.trim()});
  if(!S.me)S.me=$('#regName').value.trim();
  save();closeDlg($('#regDlg'));renderSessions();toast('You are registered');
});

/* ---------- tools, starter kit and shop (sample prices in GH₵) ---------- */
const PRODUCTS=[
  ['hook-5','Aluminium hook, 5.0 mm','Hooks','essential',18,'hook',330,'Smooth, light and the size most worsted-yarn beginner patterns ask for.'],
  ['hook-bamboo','Bamboo hook, 5.5 mm','Hooks','nice',22,'hook',35,'Warm and grippy, so slippery yarn slides less.'],
  ['hook-set','Ergonomic hook set, 2.5 to 6.0 mm','Hooks','later',145,'hook',280,'Eight soft-grip hooks in a roll. Worth buying once you know which sizes you use.'],
  ['yarn-acrylic','Acrylic worsted yarn, 100 g','Yarn','essential',28,'yarn',200,'Smooth, in a light colour so stitches are easy to see. Machine washable.'],
  ['yarn-cotton','Cotton worsted yarn, 100 g','Yarn','nice',38,'yarn',150,'Firm and cool. The right choice for bags, coasters and plant covers.'],
  ['yarn-chunky','Chunky blanket yarn, 200 g','Yarn','later',60,'yarn',10,'Soft chunky yarn for fast throws. Pair it with a 10 mm hook.'],
  ['scissors','Small embroidery scissors','Notions','essential',25,'scissors',40,'Sharp pointed blades with a cover. Fits in any project bag.'],
  ['needles','Tapestry needles, 6 sizes','Notions','essential',15,'needle',170,'Blunt tips and large eyes for weaving in ends and joining pieces.'],
  ['markers','Locking stitch markers, 30 pack','Notions','nice',20,'marker',260,'Clip into a stitch to mark the start of a round or a spot to return to.'],
  ['tape','Retractable measuring tape','Notions','nice',10,'tape',60,'Checks gauge swatches and finished sizes.'],
  ['counter','Click row counter','Notions','nice',22,'counter',220,'A small click counter that sits on your hook or finger.'],
  ['pins','Blocking T-pins, 100 pack','Notions','nice',30,'pin',330,'Rust-proof pins that hold a piece to shape while it dries.'],
  ['mat','Interlocking blocking mat, 9 tiles','Notions','nice',85,'mat',200,'Foam tiles you pin into, then fold away flat.'],
  ['eyes','Safety eyes, assorted sizes, 100 pcs','Notions','later',28,'eye',20,'Lock-washer eyes for amigurumi. Fit them before you stuff.'],
  ['fill','Polyester stuffing, 250 g','Notions','later',24,'fill',210,'Soft, washable filling for toys and cushions.'],
  ['projbag','Zip project bag','Storage','later',45,'bag',300,'Keeps yarn, hook and pattern together and the yarn clean.'],
  ['kit-start','Beginner kit: hook, 2 yarns, scissors, needles, markers','Kits','bundle',99,'kit',340,'Everything you need for your first project in one pack.']
].map(a=>({id:a[0],n:a[1],cat:a[2],tier:a[3],price:a[4],icon:a[5],hue:a[6],desc:a[7]}));
function prodMedia(p,cls){
  const u=PHOTOS['tool-'+p.id];
  if(u)return '<div class="art ph prod '+(cls||'')+'"><img src="'+u+'" alt="'+esc(p.n)+'" loading="lazy"></div>';
  return swatch(p.hue,PROD_ART[p.id]||p.icon,cls);
}
const prod=id=>PRODUCTS.find(p=>p.id===id);
const BUNDLE=['hook-5','yarn-acrylic','yarn-acrylic','scissors','needles','markers'];
const bundleSaving=()=>BUNDLE.reduce((s,id)=>s+prod(id).price,0)-prod('kit-start').price;
const TIER={essential:['Start here','pink'],nice:['Nice to have',''],later:['Later',''],bundle:['Bundle','paid']};

const HOOKS=[['2.25','B-1','Lace, fine cotton'],['2.75','C-2','Fingering'],['3.25','D-3','Fingering, sport'],['3.5','E-4','Sport, small toys'],['3.75','F-5','Sport'],['4.0','G-6','Sport, DK'],['4.5','7','DK'],['5.0','H-8','DK, worsted (good first hook)'],['5.5','I-9','Worsted (good first hook)'],['6.0','J-10','Worsted'],['6.5','K-10.5','Worsted, bulky'],['8.0','L-11','Bulky'],['9.0','M/N-13','Bulky, super bulky'],['10.0','N/P-15','Super bulky']];
const YARNS=[
  ['Lace (0)','1.6 to 2.25 mm','Doilies and fine shawls.','Needs a steel hook and good light.'],
  ['Super fine / fingering (1)','2.25 to 3.5 mm','Socks, light shawls, baby wear.','Slow going, so not ideal for a first project.'],
  ['Fine / sport (2)','3.5 to 4.5 mm','Light garments and toys.','Neat results once you have the basics.'],
  ['Light / DK (3)','4.5 to 5.5 mm','Garments, amigurumi, bags.','A friendly second yarn once worsted feels easy.'],
  ['Medium / worsted (4)','5.5 to 6.5 mm','Blankets, hats, bags and most beginner projects.','Many worsted labels suggest 5.0 to 5.5 mm. The smaller end gives a firmer fabric that is easier to read.'],
  ['Bulky (5)','6.5 to 9 mm','Quick scarves, throws and hats.','Big stitches are easy to see and finish fast.'],
  ['Super bulky (6)','9 to 15 mm','Chunky throws and rugs.','Needs a large hook and comfortable wrists.']
];
function renderKitTables(){
  $('#hookTable').innerHTML='<thead><tr><th>Metric</th><th>US size (varies by brand)</th><th>Suits yarn</th></tr></thead><tbody>'+HOOKS.map(h=>'<tr><td class="mono">'+h[0]+' mm</td><td class="mono">'+h[1]+'</td><td>'+h[2]+'</td></tr>').join('')+'</tbody>';
  $('#yarnTable').innerHTML='<thead><tr><th>Yarn weight</th><th>Typical hook</th><th>Good for</th></tr></thead><tbody>'+YARNS.map(y=>'<tr><td>'+y[0]+'</td><td class="mono">'+y[1]+'</td><td>'+y[2]+'</td></tr>').join('')+'</tbody>';
  $('#yarnPick').innerHTML=YARNS.map((y,i)=>'<option value="'+i+'"'+(i===4?' selected':'')+'>'+y[0]+'</option>').join('');
  drawYarn();
}
function drawYarn(){const y=YARNS[+$('#yarnPick').value];$('#yarnOut').innerHTML='<p><b>Typical hook:</b> <span class="mono">'+y[1]+'</span></p><p class="muted" style="margin-top:4px"><b>Good for:</b> '+y[2]+'</p><p class="muted" style="margin-top:4px">'+y[3]+'</p>'}
$('#yarnPick').addEventListener('change',drawYarn);

/* kit checklist */
const kitItems=tier=>PRODUCTS.filter(p=>p.tier===tier);
function drawKitSum(){
  const ess=kitItems('essential'),have=ess.filter(p=>S.owned.includes(p.id)),miss=ess.filter(p=>!S.owned.includes(p.id));
  const cost=miss.reduce((s,p)=>s+p.price,0);
  $('#kitSum').innerHTML='<div><b>'+have.length+' of '+ess.length+' essentials owned</b><div class="muted small">'+(miss.length?'Still to buy: '+gh(cost):'You have everything to start.')+'</div></div>'
    +'<div class="row">'+(miss.length?'<button class="btn small primary" data-kit="missing">Add missing essentials to cart</button>':'')
    +(have.length===0?'<button class="btn small" data-kit="bundle">Beginner kit, save '+gh(bundleSaving())+'</button>':'')+'</div>';
}
function kitGroup(title,note,tier){
  return '<div style="padding:12px 14px 4px"><h4>'+title+'</h4><p class="muted small">'+note+'</p></div>'
    +kitItems(tier).map(p=>'<div class="tool-row'+(S.owned.includes(p.id)?' owned':'')+'" data-pid="'+p.id+'"><input type="checkbox" id="own-'+p.id+'"'+(S.owned.includes(p.id)?' checked':'')+'>'
      +'<span class="art tool-ico'+(PHOTOS['tool-'+p.id]?' ph prod':'')+'" style="--h:'+p.hue+'">'+(PHOTOS['tool-'+p.id]?'<img src="'+PHOTOS['tool-'+p.id]+'" alt="">':artSvg(PROD_ART[p.id]||p.icon))+'</span>'
      +'<label for="own-'+p.id+'" style="display:grid;gap:2px;min-width:0"><b>'+esc(p.n)+'</b><span class="muted small" style="font-weight:400">'+esc(p.desc)+'</span></label>'
      +'<div class="acts price">'+gh(p.price)+'</div></div>').join('');
}
function renderKit(){
  $('#kitList').innerHTML=kitGroup('Start here','The four things you need for your first project.','essential')+kitGroup('Add soon','Useful within your first few projects.','nice')+kitGroup('Later','Only when a project asks for it.','later');
  drawKitSum();
}
$('#kitList').addEventListener('change',e=>{
  const row=e.target.closest('[data-pid]');if(!row)return;
  const id=row.dataset.pid;
  S.owned=e.target.checked?S.owned.concat(id):S.owned.filter(x=>x!==id);
  row.classList.toggle('owned',e.target.checked);save();drawKitSum();
});
$('#kitSum').addEventListener('click',e=>{
  const b=e.target.closest('[data-kit]');if(!b)return;
  if(b.dataset.kit==='bundle'){addToCart('tool:kit-start');return}
  kitItems('essential').filter(p=>!S.owned.includes(p.id)).forEach(p=>{if(!S.cart['tool:'+p.id])S.cart['tool:'+p.id]=1});
  save();updateCartCount();toast('Missing essentials added to cart');
});
hooks.kit=()=>{renderKit();renderKitTables()};

/* shop */
let shopCat='All',shopSort='feat';
$('#shopCats').innerHTML=['All','Hooks','Yarn','Notions','Storage','Kits'].map(c=>'<button class="chip" data-cat="'+c+'" aria-pressed="'+(c==='All')+'">'+c+'</button>').join('');
function renderShop(){
  const q=$('#shopQ').value.trim().toLowerCase();
  let list=PRODUCTS.filter(p=>(shopCat==='All'||p.cat===shopCat)&&(!q||(p.n+' '+p.desc+' '+p.cat).toLowerCase().indexOf(q)>-1));
  if(shopSort==='lo')list=list.slice().sort((a,b)=>a.price-b.price);
  if(shopSort==='hi')list=list.slice().sort((a,b)=>b.price-a.price);
  $('#shopCount').textContent=list.length+(list.length===1?' product':' products');
  $('#shopGrid').innerHTML=list.length?list.map(p=>{
    const t=TIER[p.tier];
    return '<article class="card">'+prodMedia(p)+'<div class="card-body"><div class="row" style="gap:6px"><span class="tag '+t[1]+'">'+t[0]+'</span><span class="tag">'+p.cat+'</span></div>'
      +'<h3>'+esc(p.n)+'</h3><p class="muted small">'+esc(p.desc)+'</p>'
      +(p.tier==='bundle'?'<p class="small"><b>Saves '+gh(bundleSaving())+'</b> compared with buying the parts one by one.</p>':'')
      +'<div class="row between push"><span class="price">'+gh(p.price)+'</span><button class="btn small primary" data-add="tool:'+p.id+'">Add to cart</button></div></div></article>';
  }).join(''):'<div class="empty" style="grid-column:1/-1">No products match that search.</div>';
}
hooks.shop=renderShop;
$('#shopCats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;shopCat=b.dataset.cat;pressGroup($('#shopCats'),'cat',shopCat);renderShop()});
$('#shopQ').addEventListener('input',renderShop);
$('#shopSort').addEventListener('change',e=>{shopSort=e.target.value;renderShop()});
document.addEventListener('click',e=>{const a=e.target.closest('[data-add]');if(a)addToCart(a.dataset.add)});

/* cart */
function lineInfo(key){
  const i=key.indexOf(':'),t=key.slice(0,i),id=key.slice(i+1);
  if(t==='tool'){const p=prod(id);return p?{key:key,name:p.n,price:p.price,pat:false}:null}
  const p=allPatterns().find(x=>x.id===id);return p?{key:key,name:p.n+' (digital pattern)',price:p.p,pat:true,id:id}:null;
}
function cartLines(){return Object.keys(S.cart).map(k=>{const l=lineInfo(k);if(!l)return null;l.qty=S.cart[k];return l}).filter(Boolean)}
const cartTotal=()=>cartLines().reduce((s,l)=>s+l.price*l.qty,0);
function updateCartCount(){$('#cartCount').textContent=cartLines().reduce((s,l)=>s+l.qty,0)}
function addToCart(key){
  if(key.indexOf('pat:')===0){
    const id=key.slice(4);
    if(S.purchased.includes(id)){toast('You already own this pattern');return}
    if(S.cart[key]){toast('This pattern is already in your cart');return}
    S.cart[key]=1;
  }else S.cart[key]=Math.min(20,(S.cart[key]||0)+1);
  save();updateCartCount();toast('Added to cart');
}
function renderCart(){
  const lines=cartLines(),body=$('#cartBody');
  if(!lines.length){body.innerHTML='<div class="empty">Your cart is empty.<div style="margin-top:12px"><button class="btn small" data-go="shop">Browse the tool shop</button></div></div>';return}
  body.innerHTML=lines.map(l=>'<div class="cart-line"><div style="min-width:0"><b>'+esc(l.name)+'</b><div class="muted small">'+gh(l.price)+(l.pat?'':' each')+'</div></div><div class="price">'+gh(l.price*l.qty)+'</div>'
    +(l.pat?'<span class="muted small">1 pattern</span>':'<div class="qty"><button class="btn small ghost" data-qty="-1" data-key="'+esc(l.key)+'" aria-label="One fewer">&minus;</button><span class="mono">'+l.qty+'</span><button class="btn small ghost" data-qty="1" data-key="'+esc(l.key)+'" aria-label="One more">+</button></div>')
    +'<button class="btn small ghost" data-rm="'+esc(l.key)+'">Remove</button></div>').join('')
    +'<div class="row between" style="margin-block:14px"><b>Total</b><span class="price">'+gh(cartTotal())+'</span></div>'
    +'<form id="coForm" class="stack"><div class="field"><label for="coName">Name</label><input id="coName" required maxlength="40" value="'+esc(S.me||'')+'"></div>'
    +'<div class="field"><label for="coContact">Phone or email</label><input id="coContact" required maxlength="80"></div>'
    +'<div class="field"><label for="coNote">Delivery note (tools only)</label><textarea id="coNote" maxlength="300" placeholder="Area, landmark, preferred time"></textarea></div>'
    +'<button class="btn primary" type="submit">Place order (prototype)</button><p class="hint">No payment is taken and nothing is shipped. A live shop connects a payment provider and a delivery process.</p></form>';
}
$('#cartBtn').addEventListener('click',()=>{renderCart();openDlg($('#cartDlg'))});
$('#cartBody').addEventListener('click',e=>{
  const q=e.target.closest('[data-qty]'),r=e.target.closest('[data-rm]');
  if(q){const k=q.dataset.key;S.cart[k]=(S.cart[k]||0)+Number(q.dataset.qty);if(S.cart[k]<=0)delete S.cart[k];if(S.cart[k]>20)S.cart[k]=20}
  else if(r)delete S.cart[r.dataset.rm];
  else return;
  save();updateCartCount();renderCart();
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='coForm')return;
  e.preventDefault();
  const lines=cartLines();if(!lines.length)return;
  const total=cartTotal(),ref=uid().slice(-6).toUpperCase();
  S.orders.unshift({id:ref,ts:Date.now(),total:total,name:$('#coName').value.trim(),contact:$('#coContact').value.trim(),lines:lines.map(l=>({name:l.name,qty:l.qty,price:l.price}))});
  lines.forEach(l=>{if(l.pat&&!S.purchased.includes(l.id))S.purchased.push(l.id)});
  const gotPat=lines.some(l=>l.pat),gotTool=lines.some(l=>!l.pat);
  if(!S.me)S.me=$('#coName').value.trim();
  S.cart={};save();updateCartCount();
  $('#cartBody').innerHTML='<div class="stack"><h3>Order '+ref+' saved</h3><p>Total '+gh(total)+'. This is a prototype, so no payment was taken.</p>'
    +(gotPat?'<p>Your patterns are unlocked. Open them from <b>Your purchases</b> in the Marketplace.</p>':'')
    +(gotTool?'<p class="muted">In a live shop, tools would be delivered using the details you entered.</p>':'')
    +'<div class="row">'+(gotPat?'<button class="btn primary" data-go="market">Open my purchases</button>':'')+'<button class="btn" data-close="cartDlg">Keep browsing</button></div></div>';
});

/* ---------- community feed ---------- */
const SAMPLE_PIC={p1:['sunset-bag','First ombré handbag finished! Cotton blend and a 4.5 mm hook. Sewing on the flower was my favourite part.'],p2:['sunburst-granny','Blanket progress: 38 squares in and the palette is finally clicking.'],p3:['pocket-octopus','An octopus for a baby shower, with a tiny friend on top. Each one takes about two hours now.'],p4:['slouchy-beanie','Slouchy beanie in blush and slate stripes. I took the brim up two rows after trying it on.'],p5:['moss-scarf','My very first project: a scarf with a few wobbly edges and a lot of pride.']};
function seedPosts(){
  if(S.posts){S.posts.forEach(p=>{if(p.ex&&SEED_ART[p.id]&&SAMPLE_PIC[p.id]){p.img=PHOTOS[SAMPLE_PIC[p.id][0]];p.cap=SAMPLE_PIC[p.id][1]}});save();return}
  const h=3600000,now=Date.now();
  S.posts=[
    {id:'p1',by:'Akosua T.',cap:'First donut bag finished! Cotton DK and a 4 mm hook. The zip was the hardest part.',tag:'Finished make',hue:330,icon:'bag',likes:14,liked:false,ts:now-3*h,ex:true,comments:[{by:'Efua Quansah',t:'The shape is great. A smaller hook near the handles will keep them firm.',ts:now-2*h},{by:'Yaw B.',t:'Love the colours!',ts:now-h}]},
    {id:'p2',by:'Naledi D.',cap:'Blanket progress: 38 squares in and the palette is finally clicking.',tag:'Work in progress',hue:40,icon:'blanket',likes:23,liked:false,ts:now-9*h,ex:true,comments:[]},
    {id:'p3',by:'Maame A.',cap:'An octopus army for a baby shower. Each one takes about two hours now.',tag:'Gift',hue:185,icon:'toy',likes:31,liked:false,ts:now-26*h,ex:true,comments:[{by:'Esi P.',t:'Adding these to my list!',ts:now-20*h}]},
    {id:'p4',by:'Kwesi O.',cap:'Slouchy beanie in mustard. I took the brim up two rows after trying it on.',tag:'Finished make',hue:50,icon:'hat',likes:9,liked:false,ts:now-50*h,ex:true,comments:[]},
    {id:'p5',by:'Esi P.',cap:'My very first project: a scarf with a few wobbly edges and a lot of pride.',tag:'First project',hue:215,icon:'scarf',likes:42,liked:false,ts:now-80*h,ex:true,comments:[]}
  ];
  S.posts.forEach(p=>{if(SAMPLE_PIC[p.id]){p.img=PHOTOS[SAMPLE_PIC[p.id][0]];p.cap=SAMPLE_PIC[p.id][1]}});
  save();
}
const openPosts=new Set();
function commentsHtml(p){
  return '<div class="comments">'+p.comments.map(c=>'<p><b>'+esc(c.by)+'</b>'+esc(c.t)+'</p>').join('')
    +'<form class="comment-form" data-cf><label class="sr-only" for="cin-'+esc(p.id)+'">Add a comment</label><input id="cin-'+esc(p.id)+'" maxlength="200" placeholder="Add a comment" required><button class="btn small primary" type="submit">Send</button></form></div>';
}
function postCard(p){
  const media=(p.img&&String(p.img).indexOf('data:image/')===0)?'<img class="photo" src="'+p.img+'" alt="'+esc(p.cap.slice(0,90))+'">':swatch(p.hue||200,p.art||ICON_ART[p.icon]||'yarn');
  const open=openPosts.has(p.id);
  return '<article class="card post" data-id="'+esc(p.id)+'">'+media+'<div class="card-body">'
    +'<div class="row between"><b>'+esc(p.by)+'</b><span class="muted small">'+timeAgo(p.ts)+'</span></div>'
    +'<div class="row" style="gap:6px"><span class="tag">'+esc(p.tag)+'</span>'+(p.ex?'<span class="tag warn">Sample</span>':'')+'</div>'
    +'<p>'+esc(p.cap)+'</p>'
    +'<div class="post-acts"><button class="btn small" data-like aria-pressed="'+!!p.liked+'" aria-label="Like">'+ico('heart')+' '+p.likes+'</button>'
    +'<button class="btn small" data-cm aria-expanded="'+open+'" aria-label="Comments">'+ico('comment')+' '+p.comments.length+'</button>'
    +'<button class="btn small" data-share>'+ico('link')+' Share</button></div>'
    +(open?commentsHtml(p):'')+'</div></article>';
}
function renderFeed(){
  const list=S.posts.slice().sort((a,b)=>b.ts-a.ts);
  $('#feed').innerHTML=list.length?list.map(postCard).join(''):'<div class="empty" style="grid-column:1/-1">No posts yet. Share the first make.</div>';
}
hooks.community=()=>{$('#meName').value=S.me||'';renderFeed()};
const postOf=el=>{const c=el.closest('[data-id]');return c?{card:c,p:S.posts.find(x=>x.id===c.dataset.id)}:null};
function redrawPost(o,focusSel){
  const tmp=document.createElement('div');tmp.innerHTML=postCard(o.p);
  const fresh=tmp.firstElementChild;o.card.replaceWith(fresh);
  if(focusSel){const f=fresh.querySelector(focusSel);if(f)f.focus()}
}
$('#feed').addEventListener('click',e=>{
  const o=postOf(e.target);if(!o||!o.p)return;
  const like=e.target.closest('[data-like]'),cm=e.target.closest('[data-cm]'),sh=e.target.closest('[data-share]');
  if(like){
    o.p.liked=!o.p.liked;o.p.likes+=o.p.liked?1:-1;save();
    like.setAttribute('aria-pressed',String(o.p.liked));like.innerHTML=ico('heart')+' '+o.p.likes;
  }else if(cm){
    if(openPosts.has(o.p.id)){openPosts.delete(o.p.id);redrawPost(o,'[data-cm]')}
    else{openPosts.add(o.p.id);redrawPost(o,'.comment-form input')}
  }else if(sh){
    copyText(location.href.split('#')[0]+'#community');
  }
});
$('#feed').addEventListener('submit',e=>{
  const f=e.target.closest('[data-cf]');if(!f)return;
  e.preventDefault();
  const o=postOf(f);if(!o||!o.p)return;
  const input=f.querySelector('input'),t=input.value.trim();if(!t)return;
  o.p.comments.push({by:meName(),t:t,ts:Date.now()});save();
  redrawPost(o,'.comment-form input');
});
function readImage(file,max){
  max=max||900;
  return new Promise((res,rej)=>{
    const fr=new FileReader();
    fr.onload=()=>{
      const im=new Image();
      im.onload=()=>{
        const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');
        c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));
        c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        res(c.toDataURL('image/jpeg',0.72));
      };
      im.onerror=rej;im.src=fr.result;
    };
    fr.onerror=rej;fr.readAsDataURL(file);
  });
}
$('#postPhoto').addEventListener('change',async()=>{
  const f=$('#postPhoto').files[0],pv=$('#postPrev');
  if(!f){pv.hidden=true;return}
  try{pv.src=await readImage(f,400);pv.hidden=false}catch(e){pv.hidden=true;toast('That file could not be read as an image')}
});
$('#postForm').addEventListener('submit',async e=>{
  e.preventDefault();
  S.me=$('#meName').value.trim();
  const file=$('#postPhoto').files[0],cap=$('#postCap').value.trim(),tag=$('#postTag').value;
  let img=null;
  if(file){try{img=await readImage(file,900)}catch(err){toast('The photo could not be read, so it was posted without it')}}
  S.posts.unshift({id:uid(),by:meName(),cap:cap,tag:tag,img:img,hue:hashStr(cap)%360,art:'yarn',likes:0,liked:false,ts:Date.now(),comments:[]});
  save();
  $('#postCap').value='';$('#postPhoto').value='';$('#postPrev').hidden=true;
  renderFeed();toast('Posted to the community');
});

/* ---------- discussion forum ---------- */
const FCATS=['Technique','Pattern help','Yarn & tools','Collaboration'];
function seedThreads(){
  if(S.threads)return;
  const h=3600000,now=Date.now();
  S.threads=[
    {id:'t1',title:'Why does my circle turn into a bowl?',cat:'Technique',by:'Esi P.',body:'I am making a flat coaster in single crochet. By round 5 it curls up like a dish. What am I doing wrong?',votes:12,voted:false,solved:true,ex:true,ts:now-30*h,replies:[
      {id:'r1',by:'Efua Quansah',d:true,t:'You are probably adding too few increases. A flat circle needs six extra stitches every round. Count your stitches at the end of each round and add an increase if you are short.',ts:now-28*h},
      {id:'r2',by:'Yaw B.',d:false,t:'Check your tension too. A hook that is too small pulls the edge in. Try going up half a millimetre.',ts:now-26*h}]},
    {id:'t2',title:'Cotton or acrylic for a first tote bag?',cat:'Yarn & tools',by:'Maame A.',body:'I want to make the Market Tote. Is acrylic fine or should I buy cotton?',votes:8,voted:false,solved:false,ex:true,ts:now-12*h,replies:[
      {id:'r3',by:'Ama Serwaa',d:true,t:'Cotton. It holds its shape under weight, while acrylic stretches and sags once the bag is full. Go down a hook size for a firmer fabric.',ts:now-10*h}]},
    {id:'t3',title:'My bust falls between two sizes in the Cosy Cardigan',cat:'Pattern help',by:'Kwesi O.',body:'My measurement sits between M and L. Do I size up or down?',votes:5,voted:false,solved:false,ex:true,ts:now-6*h,replies:[
      {id:'r4',by:'Kofi Mensah',d:true,t:'Start from your gauge swatch, then pick the size whose finished bust gives you the ease you like. Check the body length too, because crochet fabric drops when worn.',ts:now-4*h}]},
    {id:'t4',title:'Looking for a partner to design a baby blanket set',cat:'Collaboration',by:'Akosua T.',body:'I write hat patterns and would like to pair a blanket and booties with someone who enjoys colour planning. Anyone interested?',votes:3,voted:false,solved:false,ex:true,ts:now-3*h,replies:[]},
    {id:'t5',title:'Best way to hide the join in a round?',cat:'Technique',by:'Esi P.',body:'Every round of my hat has a visible seam. Is there a neat way to hide it?',votes:7,voted:false,solved:false,ex:true,ts:now-48*h,replies:[
      {id:'r5',by:'Naledi Dube',d:true,t:'Work in spirals and mark the first stitch of every round, or finish with an invisible join using a tapestry needle on the last round.',ts:now-45*h}]}
  ];
  save();
}
let fcat='All',curThread=null;
function renderForumFilters(){
  $('#forumCats').innerHTML=['All'].concat(FCATS).map(c=>'<button class="chip" data-fc="'+esc(c)+'" aria-pressed="'+(c===fcat)+'">'+esc(c)+'</button>').join('');
  $('#askCat').innerHTML=FCATS.map(c=>'<option>'+esc(c)+'</option>').join('');
}
function renderForumList(){
  const q=$('#forumQ').value.trim().toLowerCase();
  const list=S.threads.filter(t=>(fcat==='All'||t.cat===fcat)&&(!q||(t.title+' '+t.body).toLowerCase().indexOf(q)>-1)).sort((a,b)=>b.ts-a.ts);
  $('#forumList').innerHTML=list.length?list.map(t=>'<button class="thread" data-open="'+esc(t.id)+'"><span class="votes"><span aria-hidden="true">▲</span>'+t.votes+'<span class="sr-only"> votes</span></span>'
    +'<span style="display:grid;gap:6px;min-width:0"><b style="font-family:var(--f-display);font-size:1.1rem">'+esc(t.title)+'</b>'
    +'<span class="meta"><span class="tag">'+esc(t.cat)+'</span>'+(t.solved?'<span class="tag ok">Solved</span>':'')+(t.replies.some(r=>r.d)?'<span class="tag pink">Designer replied</span>':'')+(t.ex?'<span class="tag warn">Sample</span>':'')
    +'<span>'+esc(t.by)+'</span><span>'+t.replies.length+(t.replies.length===1?' reply':' replies')+'</span><span>'+timeAgo(t.ts)+'</span></span></span></button>').join('')
    :'<div class="empty">No questions match. Ask the first one.</div>';
}
function renderThread(){
  const t=S.threads.find(x=>x.id===curThread);
  if(!t){showForumList();return}
  $('#forumListWrap').hidden=true;$('#forumThread').hidden=false;
  $('#forumThread').innerHTML='<div class="stack"><div><button class="btn small ghost" data-back>&larr; All questions</button></div>'
    +'<div class="panel stack"><div class="row between"><div class="row" style="gap:6px"><span class="tag">'+esc(t.cat)+'</span>'+(t.solved?'<span class="tag ok">Solved</span>':'')+'</div>'
    +'<button class="btn small" data-vote aria-pressed="'+!!t.voted+'">▲ '+t.votes+' helpful</button></div>'
    +'<h2>'+esc(t.title)+'</h2><p class="muted small">Asked by '+esc(t.by)+' · '+timeAgo(t.ts)+'</p><p>'+esc(t.body)+'</p>'
    +(t.mine&&!t.solved?'<div><button class="btn small" data-solve>Mark as solved</button></div>':'')+'</div>'
    +'<h3>'+t.replies.length+(t.replies.length===1?' reply':' replies')+'</h3>'
    +t.replies.map(r=>'<div class="reply"><div class="row" style="gap:8px"><b>'+esc(r.by)+'</b>'+(r.d?'<span class="tag pink">Designer</span>':'')+'<span class="muted small">'+timeAgo(r.ts)+'</span></div><p>'+esc(r.t)+'</p></div>').join('')
    +'<form id="replyForm" class="panel stack"><div class="field"><label for="replyText">Your reply</label><textarea id="replyText" required maxlength="600" placeholder="Share what worked for you"></textarea></div><div><button class="btn primary" type="submit">Post reply</button></div></form></div>';
}
function showForumList(){
  curThread=null;$('#forumThread').hidden=true;$('#forumListWrap').hidden=false;renderForumFilters();renderForumList();
}
hooks.forum=()=>{if(curThread)renderThread();else showForumList()};
$('[data-view="forum"]').addEventListener('click',e=>{
  const fc=e.target.closest('[data-fc]');if(fc){fcat=fc.dataset.fc;pressGroup($('#forumCats'),'fc',fcat);renderForumList();return}
  const op=e.target.closest('[data-open]');if(op){curThread=op.dataset.open;renderThread();window.scrollTo(0,0);return}
  if(e.target.closest('[data-back]')){showForumList();return}
  const t=S.threads.find(x=>x.id===curThread);if(!t)return;
  if(e.target.closest('[data-vote]')){t.voted=!t.voted;t.votes+=t.voted?1:-1;save();renderThread();return}
  if(e.target.closest('[data-solve]')){t.solved=true;save();renderThread()}
});
$('#forumQ').addEventListener('input',renderForumList);
$('#askBtn').addEventListener('click',()=>{$('#askForm').hidden=false;$('#askTitle').focus()});
$('#askCancel').addEventListener('click',()=>{$('#askForm').hidden=true});
$('#askForm').addEventListener('submit',e=>{
  e.preventDefault();
  const t={id:uid(),title:$('#askTitle').value.trim(),cat:$('#askCat').value,by:meName(),body:$('#askBody').value.trim(),votes:0,voted:false,solved:false,mine:true,ts:Date.now(),replies:[]};
  S.threads.unshift(t);save();
  $('#askTitle').value='';$('#askBody').value='';$('#askForm').hidden=true;
  fcat='All';curThread=t.id;renderThread();toast('Question posted');
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='replyForm')return;
  e.preventDefault();
  const t=S.threads.find(x=>x.id===curThread),txt=$('#replyText').value.trim();
  if(!t||!txt)return;
  t.replies.push({id:uid(),by:meName(),d:false,t:txt,ts:Date.now()});save();renderThread();toast('Reply posted');
});

/* ---------- designer consultations ---------- */
const DAYN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const initials=n=>n.split(' ').map(w=>w.charAt(0)).join('').slice(0,2);
const bk={d:DESIGNERS[0].id,date:'',time:''};
const designer=id=>DESIGNERS.find(d=>d.id===id);
const slotTaken=(did,date,time)=>S.bookings.some(b=>b.d===did&&b.date===date&&b.time===time)||hashStr(did+date+time)%5===0;
function renderDesigners(){
  $('#designerList').innerHTML=DESIGNERS.map(d=>'<article class="card designer"><div class="row" style="flex-wrap:nowrap;gap:12px"><span class="avatar" style="--h:'+d.hue+'" aria-hidden="true">'+initials(d.n)+'</span>'
    +'<div style="min-width:0"><h3>'+esc(d.n)+'</h3><p class="muted small">'+esc(d.loc)+' · '+esc(d.spec)+'</p></div></div>'
    +'<p class="muted small">'+esc(d.bio)+'</p>'
    +'<p class="meta"><span>Usually free on '+d.days.map(x=>DAYN[x]).join(', ')+'</span></p>'
    +'<div class="row between"><span class="price">'+gh(d.rate)+' / 45 min</span><button class="btn small primary" data-book="'+d.id+'">Book '+esc(d.n.split(' ')[0])+'</button></div></article>').join('');
  $('#bkDesigner').innerHTML=DESIGNERS.map(d=>'<option value="'+d.id+'"'+(d.id===bk.d?' selected':'')+'>'+esc(d.n)+' ('+esc(d.spec)+')</option>').join('');
}
function drawDates(){
  const d=designer(bk.d),out=[],now=new Date();
  for(let i=1;i<=35&&out.length<8;i++){const x=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);if(d.days.indexOf(x.getDay())>-1)out.push(x)}
  $('#bkDates').innerHTML=out.map(x=>{const iso=isoDate(x);return '<button type="button" class="chip" data-date="'+iso+'" aria-pressed="'+(iso===bk.date)+'">'+fmtDay(x)+'</button>'}).join('');
}
function drawSlots(){
  const d=designer(bk.d);
  if(!bk.date){$('#bkSlots').innerHTML='<p class="hint" style="grid-column:1/-1">Pick a date first.</p>';return}
  $('#bkSlots').innerHTML=d.times.map(t=>{const taken=slotTaken(d.id,bk.date,t);return '<button type="button" class="chip" data-time="'+t+'" aria-pressed="'+(t===bk.time)+'"'+(taken?' disabled title="Already booked"':'')+'>'+t+(taken?' (booked)':'')+'</button>'}).join('');
}
function drawSummary(){
  const d=designer(bk.d);
  $('#bkSummary').textContent=(bk.date&&bk.time)?fmtDay(new Date(bk.date+'T00:00'))+' at '+bk.time+' with '+d.n+' · '+gh(d.rate)+' (no payment taken in this prototype)':'Choose a date and a time.';
}
function renderBookings(){
  $('#bkList').innerHTML=S.bookings.length?S.bookings.map(b=>'<div class="booking"><div style="min-width:0"><b>'+fmtDay(new Date(b.date+'T00:00'))+' at '+esc(b.time)+'</b><div class="muted small">'+esc(dName(b.d))+' · '+esc(b.topic)+'</div></div>'
    +'<div class="row" style="gap:8px"><span class="tag warn">Requested</span><button class="btn small ghost" data-cancel="'+esc(b.id)+'">Cancel</button></div></div>').join('')
    :'<div class="empty">No bookings yet. Pick a designer, a date and a time.</div>';
}
hooks.designers=()=>{
  renderDesigners();drawDates();drawSlots();drawSummary();renderBookings();
  if(!$('#bkName').value)$('#bkName').value=S.me||'';
  if(!$('#bkEmail').value)$('#bkEmail').value=(S.regs[0]&&S.regs[0].email)||'';
};
$('#bkDesigner').addEventListener('change',e=>{bk.d=e.target.value;bk.date='';bk.time='';drawDates();drawSlots();drawSummary()});
$('#bkDates').addEventListener('click',e=>{const b=e.target.closest('[data-date]');if(!b)return;bk.date=b.dataset.date;bk.time='';pressGroup($('#bkDates'),'date',bk.date);drawSlots();drawSummary()});
$('#bkSlots').addEventListener('click',e=>{const b=e.target.closest('[data-time]');if(!b||b.disabled)return;bk.time=b.dataset.time;pressGroup($('#bkSlots'),'time',bk.time);drawSummary()});
$('#designerList').addEventListener('click',e=>{
  const b=e.target.closest('[data-book]');if(!b)return;
  bk.d=b.dataset.book;bk.date='';bk.time='';$('#bkDesigner').value=bk.d;drawDates();drawSlots();drawSummary();
  try{$('#bookForm').scrollIntoView({behavior:'smooth',block:'start'})}catch(err){}
});
$('#bkList').addEventListener('click',e=>{
  const c=e.target.closest('[data-cancel]');if(!c)return;
  S.bookings=S.bookings.filter(b=>b.id!==c.dataset.cancel);save();renderBookings();drawSlots();toast('Booking cancelled');
});
$('#bookForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(!bk.date||!bk.time){toast('Choose a date and a time first');return}
  if(slotTaken(bk.d,bk.date,bk.time)){toast('That slot is taken. Pick another time.');drawSlots();return}
  S.bookings.unshift({id:uid(),d:bk.d,date:bk.date,time:bk.time,topic:$('#bkTopic').value,name:$('#bkName').value.trim(),email:$('#bkEmail').value.trim(),notes:$('#bkNotes').value.trim(),ts:Date.now()});
  if(!S.me)S.me=$('#bkName').value.trim();
  save();bk.time='';$('#bkNotes').value='';drawSlots();drawSummary();renderBookings();
  toast('Booking requested. The designer confirms by email in a live version.');
});

/* ---------- marketplace ---------- */
let mkSort='feat';
function initMarketSelects(){
  $('#mkCat').innerHTML='<option value="All">All categories</option>'+Object.keys(CATS).map(k=>'<option value="'+k+'">'+esc(CATS[k].label.charAt(0).toUpperCase()+CATS[k].label.slice(1))+'</option>').join('');
  $('#slCat').innerHTML=Object.keys(CATS).map(k=>'<option value="'+k+'">'+esc(CATS[k].label.charAt(0).toUpperCase()+CATS[k].label.slice(1))+'</option>').join('');
}
function mkCard(p,mine){
  const own=ownsPattern(p);
  return '<article class="card">'+patMedia(p)+'<div class="card-body">'
    +'<div class="row" style="gap:6px"><span class="tag">'+esc(p.l)+'</span>'+(own&&!mine?'<span class="tag ok">Owned</span>':'<span class="tag paid">'+gh(p.p)+'</span>')+(mine?'<span class="tag pink">Your listing</span>':'')+'</div>'
    +'<h3>'+esc(p.n)+'</h3><p class="meta"><span>by '+esc(patBy(p))+'</span><span>'+p.k+' mm</span><span>'+esc(p.y)+'</span></p>'
    +'<p class="muted small">'+esc(p.b)+'</p>'
    +'<div class="row between push"><div class="row" style="gap:8px">'
    +(mine?'<button class="btn small" data-view-pat="'+esc(p.id)+'">View</button><button class="btn small danger" data-unlist="'+esc(p.id)+'">Remove listing</button>'
      :own?'<button class="btn small primary" data-view-pat="'+esc(p.id)+'">Open pattern</button>'
      :'<button class="btn small primary" data-add-pat="'+esc(p.id)+'">Add to cart</button><button class="btn small" data-view-pat="'+esc(p.id)+'">Preview</button>')
    +'</div></div></div></article>';
}
function renderMarket(){
  const q=$('#mkQ').value.trim().toLowerCase(),cat=$('#mkCat').value||'All';
  let list=allPatterns().filter(p=>p.p>0&&(cat==='All'||p.c===cat)&&(!q||(p.n+' '+p.t+' '+p.b+' '+patBy(p)).toLowerCase().indexOf(q)>-1));
  if(mkSort==='lo')list=list.slice().sort((a,b)=>a.p-b.p);
  if(mkSort==='hi')list=list.slice().sort((a,b)=>b.p-a.p);
  $('#mkCount').textContent=list.length+(list.length===1?' pattern for sale':' patterns for sale');
  $('#mkGrid').innerHTML=list.length?list.map(p=>mkCard(p,false)).join(''):'<div class="empty" style="grid-column:1/-1">No paid patterns match that search.</div>';
  $('#mkMine').innerHTML=S.userPatterns.length?S.userPatterns.map(p=>mkCard(p,true)).join(''):'<div class="empty" style="grid-column:1/-1">You have not listed a pattern yet. Press Sell a pattern.</div>';
  const bought=allPatterns().filter(p=>p.p>0&&S.purchased.includes(p.id));
  $('#mkBought').innerHTML=bought.length?bought.map(p=>mkCard(p,false)).join(''):'<div class="empty" style="grid-column:1/-1">Patterns you buy appear here, with the full instructions unlocked.</div>';
}
hooks.market=renderMarket;
$('#mkQ').addEventListener('input',renderMarket);
$('#mkCat').addEventListener('change',renderMarket);
$('#mkSort').addEventListener('change',e=>{mkSort=e.target.value;renderMarket()});
$('#sellBtn').addEventListener('click',()=>{$('#sellForm').hidden=false;$('#slTitle').focus()});
$('#sellCancel').addEventListener('click',()=>{$('#sellForm').hidden=true});
$('#sellForm').addEventListener('submit',e=>{
  e.preventDefault();
  const title=$('#slTitle').value.trim();
  S.userPatterns.unshift({id:'u-'+uid(),n:title,c:$('#slCat').value,t:$('#slType').value.trim(),d:'me',by:meName(),l:$('#slLevel').value,h:0,y:$('#slYarn').value.trim(),k:parseFloat($('#slHook').value)||5,p:Math.max(5,Math.round(parseFloat($('#slPrice').value)||5)),hue:hashStr(title)%360,b:$('#slDesc').value.trim(),user:true});
  save();
  ['slTitle','slType','slYarn','slDesc'].forEach(id=>{$('#'+id).value=''});
  $('#sellForm').hidden=true;renderMarket();toast('Listing published');
});
$('[data-view="market"]').addEventListener('click',e=>{
  const u=e.target.closest('[data-unlist]');if(!u)return;
  const id=u.dataset.unlist;
  S.userPatterns=S.userPatterns.filter(p=>p.id!==id);
  delete S.cart['pat:'+id];S.purchased=S.purchased.filter(x=>x!==id);
  save();updateCartCount();renderMarket();toast('Listing removed');
});

/* ---------- start ---------- */
const KIT_PIC={hook:'tool-hook-5',yarn:'tool-yarn-acrylic',scissors:'tool-scissors',needle:'tool-needles'};
$$('[data-art]').forEach(el=>{const u=PHOTOS[KIT_PIC[el.dataset.art]];if(u){el.classList.add('ph','prod');el.innerHTML='<img src="'+u+'" alt="">'}else el.innerHTML=artSvg(el.dataset.art)});
seedProjects();seedPosts();seedThreads();
initMarketSelects();
updateCartCount();
$('#meName').addEventListener('change',()=>{S.me=$('#meName').value.trim();save()});
show(location.hash.slice(1)||'home',false);

})();
