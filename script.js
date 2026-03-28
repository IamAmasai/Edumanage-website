// Scroll Reveal Animation
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  // Target elements with .rv class for reveal animation
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
}

// Waitlist Form Handling
document.addEventListener('DOMContentLoaded', () => {
  const waitlistForm = document.querySelector('.waitlist-form');
  if (waitlistForm) {
    const input = waitlistForm.querySelector('input');
    const button = waitlistForm.querySelector('button');

    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Simple success feedback
        button.disabled = true;
        button.textContent = 'Joined!';
        input.value = '';
        input.placeholder = 'Thank you! We\'ll be in touch.';
        input.disabled = true;
      } else {
        alert('Please enter a valid email address.');
      }
    });

    // Handle button click if it's not a submit type
    if (button.type !== 'submit') {
      button.addEventListener('click', () => {
        waitlistForm.dispatchEvent(new Event('submit'));
      });
    }
  }

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
