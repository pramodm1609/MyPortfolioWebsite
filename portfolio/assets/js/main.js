(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const year = document.getElementById('year');
  if(year){ year.textContent = new Date().getFullYear(); }

  if(navToggle && siteNav){
    navToggle.addEventListener('click', ()=>{
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  // Smooth scroll for on-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if(targetId && targetId.length > 1){
        const el = document.querySelector(targetId);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();
