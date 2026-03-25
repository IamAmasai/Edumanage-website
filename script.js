// Theme toggle
const html = document.documentElement;
const btn = document.getElementById('themeBtn');
function toggleTheme(){html.setAttribute('data-theme',html.getAttribute('data-theme')==='dark'?'light':'dark');}
btn.addEventListener('click',toggleTheme);
btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleTheme();}});

// Scroll reveal
if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:0.08,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
}

// Counter animation
function animateCtr(el){
  const t=parseInt(el.dataset.t),dur=1400,s=performance.now();
  (function tick(now){
    const p=Math.min((now-s)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(e*t);
    if(p<1)requestAnimationFrame(tick);
  })(s);
}
const cio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCtr(e.target);cio.unobserve(e.target);}});
},{threshold:0.5});
document.querySelectorAll('.ctr').forEach(el=>cio.observe(el));

// Nav scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.borderBottomColor=window.scrollY>8?'var(--bdr2)':'var(--bdr)';
},{passive:true});

// Pricing toggle
const pToggle = document.getElementById('priceToggle');
const lblM = document.getElementById('lbl-monthly');
const lblY = document.getElementById('lbl-yearly');
const prices = document.querySelectorAll('.p-price');
const cycles = document.querySelectorAll('.p-cycle');

if(pToggle) {
  pToggle.addEventListener('click', () => {
    const isYearly = pToggle.classList.toggle('yearly');
    pToggle.setAttribute('aria-checked', isYearly);
    lblM.classList.toggle('active', !isYearly);
    lblY.classList.toggle('active', isYearly);
    
    prices.forEach(p => {
      const val = isYearly ? p.dataset.y : p.dataset.m;
      if(val !== 'Custom') {
        p.innerHTML = `KES ${val}<sub>/mo</sub>`;
      }
    });
    
    cycles.forEach(c => {
      c.textContent = isYearly ? 'billed annually' : 'billed monthly';
    });
  });
}
