// Mary Ndinda — Interactive Portfolio Engine

document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  const loaderSpans = loader.querySelectorAll('.loader-text span');
  loaderSpans.forEach((span, i) => {
    span.style.animationDelay = `${i * 0.06}s`;
  });
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger home animations after loader
    setTimeout(() => animatePanel('home'), 200);
  }, 1200);

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

    // Hide current panel
    const currentPanel = document.querySelector(`.tab-panel[data-panel="${currentTab}"]`);
    if (currentPanel) {
      currentPanel.classList.remove('visible');
      setTimeout(() => {
        currentPanel.classList.remove('active');
      }, 300);
    }

    // Show new panel
    setTimeout(() => {
      const newPanel = document.querySelector(`.tab-panel[data-panel="${tabId}"]`);
      if (newPanel) {
        // Reset all anim-in elements
        newPanel.querySelectorAll('.anim-in').forEach(el => {
          el.classList.remove('visible');
        });

        newPanel.classList.add('active');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newPanel.classList.add('visible');
            animatePanel(tabId);
          });
        });
      }
    }, 320);

    // Update nav tabs
    navTabs.forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabId);
    });

    // Update indicator
    updateIndicator(tabId);

    // Close mobile menu
    mobileMenu?.classList.remove('open');
    navToggle?.classList.remove('open');

    currentTab = tabId;

    // Update URL hash
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

  // Bind all tab triggers
  tabs.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(trigger.dataset.tab);
    });
  });

  // Mobile toggle
  navToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Init indicator
  setTimeout(() => updateIndicator('home'), 100);
  window.addEventListener('resize', () => updateIndicator(currentTab));

  // Hash navigation
  const hash = window.location.hash.replace('#', '');
  if (hash && document.querySelector(`.tab-panel[data-panel="${hash}"]`)) {
    setTimeout(() => switchTab(hash), 1400);
  }

  // ===== PANEL ANIMATIONS =====
  function animatePanel(tabId) {
    const panel = document.querySelector(`.tab-panel[data-panel="${tabId}"]`);
    if (!panel) return;

    const elements = panel.querySelectorAll('.anim-in');
    elements.forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || 0) * 120 + i * 60;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    });

    // Also observe for scroll-triggered animations
    observeScrollAnimations(panel);
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

    container.querySelectorAll('.anim-in:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== STORY CHAPTERS =====
  const storyNavItems = document.querySelectorAll('.story-nav-item');
  const storyChapters = document.querySelectorAll('.story-chapter');

  storyNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetChapter = item.dataset.story;

      // Update nav
      storyNavItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Switch chapter
      storyChapters.forEach(ch => {
        if (ch.dataset.chapter === targetChapter) {
          // Hide all first
          storyChapters.forEach(c => {
            c.classList.remove('visible');
            setTimeout(() => c.classList.remove('active'), 300);
          });

          setTimeout(() => {
            ch.classList.add('active');
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                ch.classList.add('visible');
              });
            });
          }, 320);
        }
      });
    });
  });

  // Init first chapter
  const firstChapter = document.querySelector('.story-chapter.active');
  if (firstChapter) {
    requestAnimationFrame(() => firstChapter.classList.add('visible'));
  }

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
              requestAnimationFrame(() => {
                p.classList.add('visible');
              });
            });
          }, 270);
        }
      });
    });
  });

  // Init first fw panel
  const firstFw = document.querySelector('.fw-panel.active');
  if (firstFw) {
    requestAnimationFrame(() => firstFw.classList.add('visible'));
  }

  // ===== ACCORDION =====
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
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

    if (e.key === 'ArrowRight' && currentIndex < tabOrder.length - 1) {
      switchTab(tabOrder[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      switchTab(tabOrder[currentIndex - 1]);
    }
  });

});
