// Mary Ndinda — Interactive Portfolio Engine v2

document.addEventListener('DOMContentLoaded', () => {

  // ===== CINEMATIC LOADER =====
  const loader = document.getElementById('loader');
  const loaderSpans = loader.querySelectorAll('.loader-text span');
  loaderSpans.forEach((span, i) => {
    span.style.animationDelay = `${i * 0.07 + 0.4}s`;
  });
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => {
      animatePanel('home');
      startTypewriter();
    }, 300);
  }, 1800);

  // ===== PARTICLE CANVAS =====
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animId;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.3 + 0.05;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }

        if (this.x < 0 || this.x > canvas.offsetWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.offsetHeight) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(150, 120, 10, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const numParticles = Math.min(80, Math.floor(canvas.offsetWidth * canvas.offsetHeight / 15000));
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(150, 120, 10, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  // ===== TYPEWRITER =====
  const typewriterEl = document.getElementById('heroTypewriter');
  const phrases = [
    'I build financial systems\nthat protect people\nand grow economies.',
    'I design climate risk\ninfrastructure for\nemerging markets.',
    'I turn complexity\ninto systems\nthat endure.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 50;
  let pauseTime = 2500;

  function startTypewriter() {
    if (!typewriterEl) return;
    typewriterEl.innerHTML = '';
    typeLoop();
  }

  function typeLoop() {
    const current = phrases[phraseIndex];
    const displayed = current.substring(0, charIndex);

    // Replace \n with <br> and wrap accent text
    let html = displayed
      .replace(/\n/g, '<br>')
      .replace(/(that protect people|infrastructure for|into systems)/g, '<span class="text-accent">$1</span>');

    typewriterEl.innerHTML = html;

    if (!isDeleting) {
      charIndex++;
      typeSpeed = 35 + Math.random() * 30;
      if (charIndex > current.length) {
        isDeleting = true;
        typeSpeed = pauseTime;
      }
    } else {
      if (charIndex === current.length + 1) {
        // Just finished showing full phrase, wait before deleting
        charIndex = current.length;
        typeSpeed = 20;
        setTimeout(typeLoop, pauseTime);
        return;
      }
      charIndex--;
      typeSpeed = 15;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }
    }

    setTimeout(typeLoop, typeSpeed);
  }

  // ===== CURSOR GLOW =====
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('visible');
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('visible');
    });
  }

  // ===== MAGNETIC BUTTONS =====
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ===== CAROUSEL CARD GLOW =====
  document.querySelectorAll('.carousel-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ===== TAB SYSTEM =====
  const tabs = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');
  const navTabs = document.querySelectorAll('.nav-tab');
  const indicator = document.getElementById('tabIndicator');
  const mobileMenu = document.getElementById('mobileMenu');
  const navToggle = document.getElementById('navToggle');

  let currentTab = 'home';

  function switchTab(tabId) {
    if (tabId === currentTab) return;

    const currentPanel = document.querySelector(`.tab-panel[data-panel="${currentTab}"]`);
    if (currentPanel) {
      currentPanel.classList.remove('visible');
      setTimeout(() => currentPanel.classList.remove('active'), 300);
    }

    setTimeout(() => {
      const newPanel = document.querySelector(`.tab-panel[data-panel="${tabId}"]`);
      if (newPanel) {
        newPanel.querySelectorAll('.anim-in').forEach(el => el.classList.remove('visible'));
        newPanel.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newPanel.classList.add('visible');
            animatePanel(tabId);
          });
        });
      }
    }, 320);

    navTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    updateIndicator(tabId);

    mobileMenu?.classList.remove('open');
    navToggle?.classList.remove('open');

    currentTab = tabId;
    history.replaceState(null, '', `#${tabId}`);
  }

  function updateIndicator(tabId) {
    const activeTab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    if (activeTab && indicator) {
      const rect = activeTab.getBoundingClientRect();
      const parentRect = activeTab.parentElement.getBoundingClientRect();
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.width = `${rect.width}px`;
    }
  }

  tabs.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(trigger.dataset.tab);
    });
  });

  navToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  setTimeout(() => updateIndicator('home'), 100);
  window.addEventListener('resize', () => updateIndicator(currentTab));

  const hash = window.location.hash.replace('#', '');
  if (hash && document.querySelector(`.tab-panel[data-panel="${hash}"]`)) {
    setTimeout(() => switchTab(hash), 2000);
  }

  // ===== NAV SCROLL EFFECT =====
  const siteNav = document.getElementById('siteNav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 100) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
    lastScroll = scrollTop;
  });

  // ===== PANEL ANIMATIONS =====
  function animatePanel(tabId) {
    const panel = document.querySelector(`.tab-panel[data-panel="${tabId}"]`);
    if (!panel) return;

    const elements = panel.querySelectorAll('.anim-in');
    elements.forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || 0) * 120 + i * 80;
      setTimeout(() => el.classList.add('visible'), delay);
    });

    observeScrollAnimations(panel);

    // Trigger counters if home
    if (tabId === 'home') {
      observeCounters();
      observeImpactBars();
    }
  }

  function observeScrollAnimations(container) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    container.querySelectorAll('.anim-in:not(.visible)').forEach(el => observer.observe(el));
  }

  // ===== ANIMATED COUNTERS =====
  let countersTriggered = false;

  function observeCounters() {
    const counterSection = document.querySelector('.section-dark');
    if (!counterSection || countersTriggered) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterSection);
  }

  function animateCounters() {
    document.querySelectorAll('.impact-number').forEach(numEl => {
      const target = parseInt(numEl.dataset.target);
      const prefix = numEl.dataset.prefix || '';
      const suffix = numEl.dataset.suffix || '';
      const counter = numEl.querySelector('.counter');
      const duration = 2000;
      const start = performance.now();

      function updateCounter(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        let formatted;
        if (target >= 1000000) {
          formatted = prefix + '$' + (current / 1000000).toFixed(1) + 'M';
          if (progress === 1) formatted = prefix + '$1M';
        } else if (target >= 10000) {
          formatted = prefix + current.toLocaleString() + suffix;
        } else {
          formatted = prefix + current.toLocaleString() + suffix;
        }

        counter.textContent = formatted;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ===== IMPACT BARS =====
  function observeImpactBars() {
    const bars = document.querySelectorAll('.impact-bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width;
          setTimeout(() => {
            entry.target.style.width = width + '%';
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
  }

  // ===== CAROUSEL =====
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track) {
    const cards = track.querySelectorAll('.carousel-card');
    let currentSlide = 0;
    let slidesPerView = 3;

    function updateSlidesPerView() {
      if (window.innerWidth <= 900) slidesPerView = 1;
      else if (window.innerWidth <= 1024) slidesPerView = 2;
      else slidesPerView = 3;
    }

    updateSlidesPerView();
    window.addEventListener('resize', () => {
      updateSlidesPerView();
      goToSlide(Math.min(currentSlide, cards.length - slidesPerView));
      buildDots();
    });

    const totalSlides = () => Math.max(1, cards.length - slidesPerView + 1);

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides(); i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentSlide = Math.max(0, Math.min(index, totalSlides() - 1));
      const cardWidth = cards[0].offsetWidth + 24; // gap
      track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

      // Update dots
      dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

    buildDots();

    // Touch / drag support
    let dragStart = 0;
    let dragEnd = 0;
    track.addEventListener('touchstart', (e) => { dragStart = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      dragEnd = e.changedTouches[0].clientX;
      if (dragStart - dragEnd > 50) goToSlide(currentSlide + 1);
      else if (dragEnd - dragStart > 50) goToSlide(currentSlide - 1);
    });
  }

  // ===== STORY CHAPTERS =====
  const storyNavItems = document.querySelectorAll('.story-nav-item');
  const storyChapters = document.querySelectorAll('.story-chapter');

  storyNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetChapter = item.dataset.story;
      storyNavItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      storyChapters.forEach(ch => {
        if (ch.dataset.chapter === targetChapter) {
          storyChapters.forEach(c => {
            c.classList.remove('visible');
            setTimeout(() => c.classList.remove('active'), 300);
          });
          setTimeout(() => {
            ch.classList.add('active');
            requestAnimationFrame(() => {
              requestAnimationFrame(() => ch.classList.add('visible'));
            });
          }, 320);
        }
      });
    });
  });

  const firstChapter = document.querySelector('.story-chapter.active');
  if (firstChapter) requestAnimationFrame(() => firstChapter.classList.add('visible'));

  // ===== FRAMEWORK TABS =====
  const fwTabs = document.querySelectorAll('.fw-tab');
  const fwPanels = document.querySelectorAll('.fw-panel');

  fwTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.fw;
      fwTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      fwPanels.forEach(p => {
        if (p.dataset.fwpanel === target) {
          fwPanels.forEach(fp => {
            fp.classList.remove('visible');
            setTimeout(() => fp.classList.remove('active'), 250);
          });
          setTimeout(() => {
            p.classList.add('active');
            requestAnimationFrame(() => {
              requestAnimationFrame(() => p.classList.add('visible'));
            });
          }, 270);
        }
      });
    });
  });

  const firstFw = document.querySelector('.fw-panel.active');
  if (firstFw) requestAnimationFrame(() => firstFw.classList.add('visible'));

  // ===== ACCORDION =====
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(ai => ai.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== SCROLL PROGRESS =====
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.style.background = '#2e7d32';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener('keydown', (e) => {
    const tabOrder = ['home', 'story', 'thinking', 'building', 'foresight', 'connect'];
    const currentIndex = tabOrder.indexOf(currentTab);
    if (e.key === 'ArrowRight' && currentIndex < tabOrder.length - 1) switchTab(tabOrder[currentIndex + 1]);
    else if (e.key === 'ArrowLeft' && currentIndex > 0) switchTab(tabOrder[currentIndex - 1]);
  });

});