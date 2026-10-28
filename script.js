(function(){
var S={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
window.CS={S:S,sha256:async function(s){var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}};
var pages=[['Home','index.html'],['About','about.html'],['Services','services.html'],['Menu','menu.html'],['Quote','quote.html'],['Pricing','pricing.html'],["Blog","blog.html"],["FAQ","faq.html"],['Contact','contact.html']];
var cur=location.pathname.split('/').pop()||'index.html';
var nav=document.getElementById('nav');
if(nav){nav.className='nav';nav.innerHTML='<div class="in"><a href="index.html"><img src="logo-light.png" alt="Catering Service logo (placeholder)"></a><button id="burger" aria-label="Menu" aria-expanded="false">☰</button><ul id="menu">'+pages.map(function(p){return '<li><a href="'+p[1]+'"'+(p[1]===cur?' class="on" aria-current="page"':'')+'>'+p[0]+'</a></li>'}).join('')+'<li><a class="btn login" href="login.html">Login</a></li><li><a class="btn solid" href="login.html#signup">Create account</a></li></ul></div>';
var m=document.getElementById('menu'),b=document.getElementById('burger');b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)}}
var f=document.getElementById('footer');
if(f&&!document.body.hasAttribute('data-nofooter')){var L=function(a){return a.map(function(x){return '<li><a href="'+x[1]+'">'+x[0]+'</a></li>'}).join('')};
var sv=[['Wedding','404.html'],['Corporate','404.html'],['Birthday','404.html'],['Buffet','404.html'],['Live counters','404.html'],['Desserts','404.html'],['Staffing','404.html'],["Decor","404.html"],["Menus","404.html"]];
var co=[['Careers','404.html'],['Press','404.html'],['Partners','404.html'],['Privacy','404.html'],['Terms','404.html'],['Support','404.html'],["Sitemap","404.html"],["Contact us","404.html"],["Blog","404.html"]];
f.innerHTML='<div class="wm" aria-hidden="true">Catering</div><div class="g"><div class="bc"><img src="logo-light.png" alt="Stackly logo" height="36"><p>Placeholder: premium catering for weddings, corporate events and parties.</p><ul class="ct"><li>\ud83d\udcde +91 00000 00000 (placeholder)</li><li>\u2709\ufe0f hello@example.com (placeholder)</li><li>\ud83d\udccd Placeholder Street, City</li></ul><div class="soc">'+['f','in','ig','x'].map(function(s){return '<a href="404.html" aria-label="Social link">'+s+'</a>'}).join('')+'</div></div><div><h4>Navigate</h4><ul>'+L(pages)+'</ul></div><div><h4>Services</h4><ul>'+L(sv)+'</ul></div><div><h4>Company</h4><ul>'+L(co)+'</ul></div></div><div class="cp"><span>\u00a9 2026 Catering Service \u2013 demo content</span><span><a href="404.html">Privacy</a> \u00b7 <a href="404.html">Terms</a></span></div>'}
var pr=document.getElementById('prog');
addEventListener('scroll',function(){var h=document.documentElement;pr&&(pr.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%')},{passive:true});
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(function(el,i){el.style.setProperty('--d',(i%6)*.1+'s');rm?el.classList.add('in'):io.observe(el)});
var co2=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co2.unobserve(e.target);var n=+e.target.dataset.count,t=0;if(rm){e.target.textContent=n.toLocaleString();return}
var id=setInterval(function(){t+=n/50;if(t>=n){t=n;clearInterval(id)}e.target.textContent=Math.round(t).toLocaleString()},25)})});
document.querySelectorAll('[data-count]').forEach(function(el){co2.observe(el)});
// Quote calculator
var c=document.getElementById('calc');
if(c){var P={classic:650,premium:950,royal:1400},D=120,LC=15000,SS=1500;
var q=function(i){return document.getElementById(i)},fmt=function(n){return '₹'+Math.round(n).toLocaleString('en-IN')};
function link(r,n,min,max,lab){var e=q(n+'E');function sync(v){r.value=v;q(n+'N').value=v}
r.oninput=function(){q(n+'N').value=r.value;e.textContent='';q(n+'N').classList.remove('bad');go()};
q(n+'N').oninput=function(){var v=q(n+'N').value,x=Number(v);if(v===''||!Number.isInteger(x)||x<min||x>max){e.textContent=lab+' must be a whole number from '+min+' to '+max+'.';q(n+'N').classList.add('bad');return}e.textContent='';q(n+'N').classList.remove('bad');r.value=x;go()}}
link(q('g'),'g',10,5000,'Guests');link(q('l'),'l',0,10,'Live counters');link(q('s'),'s',0,100,'Service staff');
['pk','ds'].forEach(function(i){q(i).onchange=go});
function go(){if(document.querySelector('#calc .bad')){return}
var g=+q('g').value,k=q('pk').value,d=q('ds').checked,l=+q('l').value,s=+q('s').value;
var a=g*P[k],b=d?g*D:0,cc=l*LC,dd=s*SS,t=a+b+cc+dd;
q('tot').textContent=fmt(t);q('pg').textContent=fmt(t/g)+' per guest';
q('bd').innerHTML=[['Package ('+g+' × '+fmt(P[k])+')',a],['Desserts',b],['Live counters ('+l+')',cc],['Service staff ('+s+')',dd]].map(function(r){return '<tr><td>'+r[0]+'</td><td>'+fmt(r[1])+'</td></tr>'}).join('')}
go()}
})();
(function(){
var CS=window.CS,S=CS.S,$=function(i){return document.getElementById(i)};
function ss(m,k,v){try{if(m=='g')return sessionStorage.getItem(k);if(m=='s')sessionStorage.setItem(k,v);else sessionStorage.removeItem(k)}catch(e){}return null}
function users(){try{return JSON.parse(S.get('cs_users')||'[]')}catch(e){return[]}}
var PW=[['10 or more characters',function(v){return v.length>=10}],['Upper case letter',/[A-Z]/],['Lower case letter',/[a-z]/],['A number',/\d/],['A symbol',/[^A-Za-z0-9\s]/],['No spaces',function(v){return !!v&&!/\s/.test(v)}],['No 3 repeated characters in a row',function(v){return !!v&&!/(.)\1\1/.test(v)}],['No common words',function(v){return !!v&&!/password|welcome|admin|qwerty|letmein|123456|abc123/i.test(v)}],['Does not contain your name or email name',function(v){var l=v.toLowerCase(),n=(($('sn')||{}).value||'').split(/\s+/).concat((($('se')||{}).value||'').split('@')[0]);return !!v&&!n.some(function(p){return p.length>=3&&l.indexOf(p.toLowerCase())>-1})}]];
function pt(r,v){return typeof r=='function'?r(v):r.test(v)}
var today=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
var R={req:function(v){return v.trim()?'':'This field is required.'},
name:function(v){return /^[A-Za-z][A-Za-z .'-]{1,49}$/.test(v.trim())?'':'Use letters only, 2 to 50 characters.'},
email:function(v){return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(v)?'':'Enter a valid email address.'},
mobile:function(v){return /^[6-9]\d{9}$/.test(v)?'':'Enter 10 digits starting with 6 to 9.'},
date:function(v){return !v?'Choose a date.':v<today?'Date cannot be in the past.':''},
guests:function(v){var n=+v;return v&&Number.isInteger(n)&&n>=10&&n<=5000?'':'Enter a whole number from 10 to 5000.'},
code:function(v){return v==='CATER-ADMIN'?'':'Invalid admin access code.'},
pw:function(v){return PW.every(function(r){return pt(r[1],v)})?'':'Password does not meet all the rules.'}};
function chk(el){var r=el.dataset.v;if(!r||el.closest('[hidden]'))return '';var e=R[r](el.value),m=$(el.id+'-e');if(m)m.textContent=e;el.classList.toggle('bad',!!e);el.setAttribute('aria-invalid',!!e);return e}
function vf(f){var er=[],fi;f.querySelectorAll('[data-v]').forEach(function(el){var e=chk(el);if(e){er.push((el.labels[0]?el.labels[0].textContent:el.id)+': '+e);fi=fi||el}});var s=f.querySelector('.esum');s.hidden=!er.length;s.innerHTML=er.length?'<b>Please fix:</b><ul><li>'+er.join('</li><li>')+'</li></ul>':'';fi&&fi.focus();return !er.length}
document.querySelectorAll('[data-v]').forEach(function(el){el.addEventListener('blur',function(){chk(el)});if(el.dataset.v=='mobile')el.addEventListener('input',function(){var d=el.value.replace(/\D/g,'');if(d.length>10&&d.slice(0,2)=='91')d=d.slice(2);el.value=d.slice(0,10)});if(el.type=='date')el.min=today});
document.querySelectorAll('.show').forEach(function(b){b.onclick=function(){var i=$(b.dataset.for);i.type=i.type=='password'?'text':'password';b.textContent=i.type=='password'?'Show':'Hide'}});
document.querySelectorAll('.chip').forEach(function(c){c.onclick=function(){document.querySelectorAll('.chip').forEach(function(x){x.classList.toggle('on',x==c)});document.querySelectorAll('[data-cat]').forEach(function(k){k.hidden=c.dataset.c!='all'&&k.dataset.cat!=c.dataset.c})}});
var cf=$('cf');if(cf)cf.onsubmit=function(e){e.preventDefault();if(vf(cf)){cf.reset();$('cok').hidden=false}};
var sf=$('sf'),lf=$('lf');
if(sf){var L=$('pwl');L.innerHTML=PW.map(function(r){return '<li>\u2718 '+r[0]+'</li>'}).join('');
var upd=function(){var v=$('sp').value,n=0;PW.forEach(function(r,i){var p=pt(r[1],v);n+=p;L.children[i].className=p?'ok':'';L.children[i].textContent=(p?'\u2714 ':'\u2718 ')+r[0]});$('str').textContent='Strength: '+(n==PW.length?(v.length>=14?'Strong':'Good'):n>=6?'Fair':'Weak')};
['sp','sn','se'].forEach(function(i){$(i).addEventListener('input',upd)});upd();
$('sr').onchange=function(){$('codew').hidden=$('sr').value!='admin'};
$('tL').onclick=$('tS').onclick=function(){var s=this.id=='tS';$('tL').classList.toggle('on',!s);$('tS').classList.toggle('on',s);lf.hidden=s;sf.hidden=!s};
if(location.hash=='#signup'||/tab=signup/.test(location.search))$('tS').click();CS.sha256('Gold#Plate2026').then(function(h){var u=users();[['Demo User','user@demo.com','user'],['Demo Admin','admin@demo.com','admin']].forEach(function(d){if(!u.some(function(x){return x.email==d[1]}))u.push({name:d[0],email:d[1],hash:h,role:d[2]})});S.set('cs_users',JSON.stringify(u))});
var q=new URLSearchParams(location.search);if(q.get("tab")=="signup")$("tS").click();if(q.get('ok')){var m=$('lm');m.hidden=false;m.className='msg ok';m.textContent='Account created. Please log in.';$('le').value=q.get('email')||''}
document.querySelectorAll('[data-demo]').forEach(function(b){b.onclick=function(){var a=b.dataset.demo;$('le').value=a+'@demo.com';$('lp').value='Gold#Plate2026';$('lr').value=a}});
sf.onsubmit=async function(e){e.preventDefault();if(!vf(sf))return;var em=$('se').value.trim().toLowerCase(),u=users();
if(u.some(function(x){return x.email==em})){$('se-e').textContent='This email is already registered.';$('se').focus();return}
u.push({name:$('sn').value.trim(),email:em,mobile:$('sm').value,role:$('sr').value,hash:await CS.sha256($('sp').value)});S.set('cs_users',JSON.stringify(u));location.href='login.html?ok=1&email='+encodeURIComponent(em)};
lf.onsubmit=async function(e){e.preventDefault();var m=$('lm');if(!vf(lf))return;m.hidden=false;m.className='msg er';
var em=$('le').value.trim().toLowerCase(),u=users().filter(function(x){return x.email==em})[0];
if(!u){m.textContent='No account found for this email.';return}
if(u.hash!==await CS.sha256($('lp').value)){m.textContent='Wrong password. Please try again.';return}
if(u.role!==$('lr').value){m.textContent='This is a '+u.role+' account. Choose account type "'+u.role+'" to log in.';return}
ss('s','cs_sess',JSON.stringify({name:u.name,email:u.email,role:u.role}));location.href=u.role=='admin'?'admin.html':'dashboard.html'}}
var role=document.body.dataset.role;
if(role){var se=null;try{se=JSON.parse(ss('g','cs_sess'))}catch(e){}
if(!se||se.role!==role){$('dash').hidden=true;$('guard').hidden=false;$('gm').textContent=!se?'You are not logged in. Please log in to view this dashboard.':'This dashboard is for '+role+' accounts. You are logged in as '+se.role+'.';$('gb').href=!se?'login.html':(se.role=='admin'?'admin.html':'dashboard.html');$('gb').textContent=!se?'Go to login':'Go to my dashboard'}
else if(role=='user'){$('pn').textContent=se.name;$('pe').textContent=se.email;var um=[0,10,25,12,70,30],ul=['May','Jun','Jul','Aug','Sep','Oct'];$('ch').innerHTML=um.map(function(v,i){var h=v*2.4;return '<rect x="'+(40+i*90)+'" y="'+(200-h)+'" width="50" height="'+h+'" rx="4" fill="#8a9a5b"/><text x="'+(65+i*90)+'" y="'+(194-h)+'" text-anchor="middle" font-size="12" fill="#2f3a22">'+v+'</text><text x="'+(65+i*90)+'" y="218" text-anchor="middle" font-size="12" fill="#777">'+ul[i]+'</text>'}).join('')}
else{var E=[['E-101','Anita R','Wedding',300,'Pending'],['E-102','Kiran Tech','Corporate',120,'Pending'],['E-103','Meena S','Birthday',60,'Approved'],['E-104','Rahul P','Wedding',500,'Rejected'],['E-105','Zen Labs','Corporate',200,'Pending']];
var draw=function(){var s=$('qs').value.toLowerCase();$('et').innerHTML=E.map(function(r,i){return r.join(' ').toLowerCase().indexOf(s)>-1?'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td><span class="bd '+r[4]+'">'+r[4]+'</span></td><td><button data-i="'+i+'" data-a="Approved">Approve</button><button data-i="'+i+'" data-a="Rejected">Reject</button></td></tr>':''}).join('')};
$('qs').oninput=draw;$('et').onclick=function(e){var b=e.target;if(b.dataset.a){E[b.dataset.i][4]=b.dataset.a;draw()}};draw();
var m=[12,18,15,24,30,27],l=['May','Jun','Jul','Aug','Sep','Oct'];$('ch').innerHTML=m.map(function(v,i){var h=v*6;return '<rect x="'+(40+i*90)+'" y="'+(200-h)+'" width="50" height="'+h+'" rx="4" fill="#8a9a5b"/><text x="'+(65+i*90)+'" y="'+(194-h)+'" text-anchor="middle" font-size="12" fill="#2f3a22">'+v+'</text><text x="'+(65+i*90)+'" y="218" text-anchor="middle" font-size="12" fill="#777">'+l[i]+'</text>'}).join('')}}
$('lo')&&($('lo').onclick=function(){ss('r','cs_sess');location.href='login.html'})
})();
