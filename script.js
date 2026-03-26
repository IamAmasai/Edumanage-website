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

// Smooth scroll for all anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Sign In feedback
const signInBtn = document.querySelector('.btn-gl');
if(signInBtn) {
  signInBtn.addEventListener('click', () => {
    alert("Sign in is currently restricted to authorized administrators of our Founding Schools cohort. If you're a founding partner, please use your provided credentials.");
  });
}

// Modal logic
const modal = document.getElementById('legalModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

const legalDocs = {
  privacy: `
    <h2 class="modal-h">Privacy Policy</h2>
    <p class="modal-p">At EduManage, student and school data privacy is our absolute priority. We are committed to the Kenya Data Protection Act (2019).</p>
    <div class="modal-li"><p class="modal-p"><strong>Data Ownership:</strong> Your school owns all its data. We never sell or share it with third parties.</p></div>
    <div class="modal-li"><p class="modal-p"><strong>Security:</strong> All records are encrypted with AES-256 and backed up daily across secure geographical locations.</p></div>
    <div class="modal-li"><p class="modal-p"><strong>Purpose:</strong> We only process data to provide the management features you see on the platform.</p></div>
  `,
  terms: `
    <h2 class="modal-h">Terms of Service</h2>
    <p class="modal-p">By joining our founding cohort, you agree to build alongside us.</p>
    <div class="modal-li"><p class="modal-p"><strong>Founding Price:</strong> Your monthly rate is locked for life as long as you remain an active school.</p></div>
    <div class="modal-li"><p class="modal-p"><strong>Service Level:</strong> We commit to a 99.9% uptime and direct engineering support.</p></div>
    <div class="modal-li"><p class="modal-p"><strong>Fair Use:</strong> The system is designed for legitimate educational administration only.</p></div>
  `
};

function openLegal(type) {
  modalContent.innerHTML = legalDocs[type];
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

closeModal.onclick = () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.onclick = (e) => { if(e.target == modal) closeModal.onclick(); };

// Update footer links to trigger modals
document.querySelectorAll('.f-legal a, .fc-links a').forEach(a => {
  if(a.textContent === 'Privacy') a.onclick = (e) => { e.preventDefault(); openLegal('privacy'); };
  if(a.textContent === 'Terms') a.onclick = (e) => { e.preventDefault(); openLegal('terms'); };
});
