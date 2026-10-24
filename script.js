/* ==========================================================================
   ANKUR KUMAR SINGH - PORTFOLIO INTERACTIVITY & ANIMATION ENGINE
   ========================================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollEffects();
  initScrollReveal();
  initStatsCounters();
  initSkillTabs();
  initClipboardCopy();
  initProjectModals();
  initContactForm();
  initCardSpotlight();
  initFooterYear();
});

/* 1. Mobile Navigation Toggle */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!mobileToggle || !navMenu) return;

  const icon = mobileToggle.querySelector('i');

  const setMenuOpen = (open) => {
    navMenu.classList.toggle('active', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (icon) {
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-xmark', open);
    }
  };

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(!navMenu.classList.contains('active'));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      setMenuOpen(false);
      mobileToggle.focus();
    }
  });
}

/* 2. Scroll-Driven Effects: ScrollSpy, Progress Bar, Navbar State, Scroll-to-Top */
function initScrollEffects() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  const topBtn = document.getElementById('floating-top-btn');
  let ticking = false;

  const update = () => {
    ticking = false;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
    }
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);
    if (topBtn) topBtn.classList.toggle('visible', scrollY > 350);

    // At the very bottom, the last section wins even if it is too short to reach the offset
    let current = '';
    if (maxScroll - scrollY < 4) {
      current = sections[sections.length - 1]?.id || '';
    } else {
      const scrollPos = scrollY + 200;
      sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          current = section.id;
        }
      });
    }

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }
}

/* 3. Framer-Style Scroll Reveal Animation Engine */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
        // After the entrance animation, drop its long timing so hover effects feel instant
        setTimeout(() => entry.target.classList.add('revealed'), 1300);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => {
    if (el.closest('#hero')) {
      setTimeout(() => el.classList.add('active'), 100);
    } else {
      revealObserver.observe(el);
    }
  });
}

/* 4. Number Counter Animation for Stats */
function initStatsCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const aboutSection = document.getElementById('about');
  if (!counters.length || !aboutSection || prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const animate = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    if (!target) return;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    counter.textContent = '0';
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      counters.forEach(animate);
    }
  }, { threshold: 0.25 });

  observer.observe(aboutSection);
}

/* 5. Interactive Skill Filter Tabs */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skills-group');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      const filter = btn.getAttribute('data-filter');

      skillGroups.forEach(group => {
        const categories = group.getAttribute('data-category').split(' ');
        const visible = filter === 'all' || categories.includes(filter);
        group.hidden = !visible;
        if (visible && !prefersReducedMotion) {
          group.classList.remove('skills-group-enter');
          void group.offsetWidth; // restart the animation
          group.classList.add('skills-group-enter');
        }
      });
    });
  });
}

/* 6. Clipboard Copy Functionality */
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Clipboard API can be blocked (permissions, embedded frames); try the legacy path below
    }
  }
  // Fallback for non-secure contexts, blocked permissions, and older browsers
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  textarea.remove();
  if (!ok) throw new Error('Copy command failed');
}

function initClipboardCopy() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    const handleCopy = async (e) => {
      e.stopPropagation();
      const copyVal = el.getAttribute('data-copy');
      if (!copyVal) return;

      try {
        await copyText(copyVal);
        showToast(`Copied to clipboard: ${copyVal}`);
      } catch {
        showToast(`Couldn't copy automatically. Here it is: ${copyVal}`, 'error');
      }
    };

    el.addEventListener('click', handleCopy);

    // Non-button elements (contact cards) need keyboard support too
    if (el.tagName !== 'BUTTON') {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy(e);
        }
      });
    }
  });
}

/* 7. Project Detail Modals */
const projectDetails = {
  botpress: {
    title: "Botpress Chat API Connector — Red-Team Scanning Demo",
    badge: "AI Security & Red-Teaming Suite",
    tags: ["Python", "FastAPI", "Botpress Cloud", "SQLite", "Pytest"],
    problem: "Production chatbots and LLM assistants deployed by enterprises are frequently vulnerable to prompt injection, system prompt leakage, jailbreaks, and sensitive data (PII) exfiltration. Engineering teams often lack automated tooling to continuously simulate attacker behavior and validate defensive guardrails before shipping bots to end users.",
    solution: "Engineered an automated security red-teaming tool that integrates directly with the live Botpress Chat API. It automates test bot provisioning, performs bidirectional connection verification, and fires structured batteries of adversarial prompt attacks (jailbreaks, credential harvesting, role confusion) while recording response timings and defensive evaluations into a persistent SQLite database.",
    features: [
      "Engineered an asynchronous Python client library connecting to Botpress Cloud bots with live connection handshake validation",
      "Automated test battery checking for prompt injection vulnerabilities, system prompt leaks, and PII exfiltration",
      "Persists comprehensive audit logs, response timings, and vulnerability ratings in SQLite for compliance audit reviews",
      "Includes 26 automated unit tests with mock Botpress server support covering onboarding, scan runs, and timeout handling"
    ],
    github: "https://github.com/Ankur377823/Botpress-Connector",
    live: "https://botpress-connector-29gl.onrender.com/"
  },
  medication: {
    title: "Medication Reconciliation Service",
    badge: "Clinical Healthcare REST API",
    tags: ["Python", "FastAPI", "MongoDB", "Pytest", "OpenAPI"],
    problem: "During patient transitions of care across hospitals, specialty clinics, and home health, medication lists from fragmented EMRs and pharmacies frequently conflict. Unidentified duplicate drug classes, contraindications, and dosage discrepancies represent a leading root cause of preventable medical errors and patient harm.",
    solution: "Built a high-reliability clinical healthcare backend using FastAPI that processes and standardizes multi-source patient medication records. It runs a deterministic reconciliation engine that parses clinical dosages and drug categories to automatically flag duplicate drug classes, dose inconsistencies, and adverse pharmacological interactions in real time.",
    features: [
      "Implemented intelligent rule-based reconciliation algorithms flagging dangerous drug-drug interactions and duplicate therapies",
      "Maintains immutable, versioned patient snapshot audit logs in MongoDB to ensure strict clinical compliance and traceability",
      "Includes 69 automated unit and integration tests written in Pytest covering edge cases, invalid payloads, and dosage bounds",
      "Containerized and deployed live on Render with interactive OpenAPI (Swagger) documentation"
    ],
    github: "https://github.com/Ankur377823/medication-reconciliation-service",
    live: "https://medication-reconciliation-service.onrender.com/docs"
  },
  carprice: {
    title: "Car Price Prediction API",
    badge: "Machine Learning & Microservices",
    tags: ["Python", "FastAPI", "Scikit-Learn", "Redis", "Docker", "Prometheus", "Grafana"],
    problem: "Automotive e-commerce platforms require real-time market appraisals across complex combinations of vehicle attributes (mileage, brand prestige, age, fuel type, depreciation trends). Running compute-heavy ML regression models repeatedly for identical or high-frequency queries degrades server throughput and inflates response latency.",
    solution: "Trained a Random Forest regression model on comprehensive used car market datasets and exposed it through a modular FastAPI microservice. Integrated an in-memory Redis caching tier with deterministic input hashing that intercepts repeated vehicle prediction queries, serving them in sub-15ms without invoking the model pipeline.",
    features: [
      "Trained Scikit-Learn Random Forest regression model delivering accurate resale price predictions based on vehicle specifications",
      "Architected Redis caching layer that stores hashed query payloads, achieving sub-15ms response latency for repeated queries",
      "Secured endpoints with JSON Web Tokens (JWT) authentication and granular API key validation mechanisms",
      "Packaged full multi-container stack with Docker Compose and deployed on Render with real-time Prometheus metrics and Grafana monitoring"
    ],
    github: "https://github.com/Ankur377823/fastapi-Project",
    live: "https://fastapi-project-lux4.onrender.com/docs"
  },
  roadside: {
    title: "Roadside Asset Detection & Spatial Hazard Analysis",
    badge: "Computer Vision & Physical-World AI",
    tags: ["Python", "YOLO", "OpenCV", "Roboflow", "Civil Engineering AI"],
    problem: "Transportation departments and electric utilities manage vast roadway corridors, relying on manual, hazardous, and costly vehicle surveys to inspect utility poles, street signage, and roadside vegetation. Physical clearance violations—such as overgrown tree branches interfering with overhead power lines—often go undetected until severe storm outages or wildfires occur.",
    solution: "Bridged civil engineering infrastructure knowledge with computer vision to create an automated roadside audit pipeline. Video feeds from vehicle-mounted cameras are sampled into frames, preprocessed to eliminate severe real-world noise (shadows, lens glare, motion blur), and analyzed with a custom-trained YOLO model to detect assets and calculate spatial clearances between vegetation and power poles.",
    features: [
      "Extracted high-definition video frames from raw vehicle recordings and annotated a custom multi-class dataset in Roboflow for utility poles, trees, and roadside assets",
      "Engineered robust data preparation pipelines handling severe real-world noise: changing sun angles, road shadows, vibrations, and high-speed motion blur",
      "Trained and fine-tuned a YOLO object detection model for high-precision real-time asset classification and inventory counting",
      "Implemented spatial proximity algorithms to compute clearance distances between utility poles and encroaching vegetation, replacing manual field surveys",
      "Direct application of NIT Calicut Civil Engineering background to physical-world computer vision with zero manual surveying required"
    ],
    github: "https://github.com/Ankur377823/street-audit",
    live: null
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const closeBtn = document.getElementById('modal-close-btn');
  if (!modalOverlay || !modalContent) return;

  let lastTrigger = null;

  const getFocusable = () => [...modalOverlay.querySelectorAll('a[href], button:not([disabled])')];

  const openModal = (data, trigger) => {
    lastTrigger = trigger;
    modalContent.innerHTML = `
      <div class="modal-body">
        <span class="modal-badge">${data.badge}</span>
        <h2 class="modal-title" id="modal-title">${data.title}</h2>

        <div class="modal-tags">
          ${data.tags.map(t => `<span>${t}</span>`).join('')}
        </div>

        <div class="modal-section">
          <h3>What Problem It Solves</h3>
          <p>${data.problem}</p>
        </div>

        <div class="modal-section">
          <h3>How It Works & Architecture</h3>
          <p>${data.solution}</p>
        </div>

        <div class="modal-section">
          <h3>Key Technical Highlights</h3>
          <ul>
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-actions">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-email-pill btn-sm"><i class="fa-brands fa-github" aria-hidden="true"></i> View GitHub Code</a>
          ${data.live ? `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary-pill btn-sm"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Open Live Demo</a>` : ''}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    modalOverlay.querySelector('.modal-card').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    // The overlay is still visibility:hidden until the next frame, so focus after it becomes visible
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  };

  const closeModal = () => {
    if (!modalOverlay.classList.contains('active')) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  };

  document.querySelectorAll('.btn-modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = projectDetails[btn.getAttribute('data-modal')];
      if (data) openModal(data, btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      // Keep keyboard focus inside the open dialog
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!modalOverlay.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* 8. Contact Form Submission (Web3Forms API Integration) */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusEl = document.getElementById('form-status');
  if (!contactForm) return;

  const defaultBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  const setStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `form-status ${type || ''}`.trim();
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document.getElementById('form-name').value.trim();

    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> <span>Sending Message...</span>`;
      submitBtn.disabled = true;
    }
    setStatus('', '');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      });
      const json = await response.json().catch(() => ({}));

      if (response.ok && json.success !== false) {
        showToast(`Thank you, ${name}! Your message has been delivered.`);
        setStatus("Message sent. I'll get back to you soon.", 'success');
        contactForm.reset();
      } else {
        throw new Error(json.message || `Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Web3Forms submit error:', error);
      const fallback = 'Your message could not be sent. Please email me directly at ankurrajput7050@gmail.com.';
      showToast(fallback, 'error');
      setStatus(fallback, 'error');
    } finally {
      if (submitBtn) {
        submitBtn.innerHTML = defaultBtnHTML;
        submitBtn.disabled = false;
      }
    }
  });
}

/* 9. Cursor Spotlight Glow on Cards */
function initCardSpotlight() {
  if (prefersReducedMotion || !window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('.project-card, .achievement-card, .edu-card, .exp-card').forEach(card => {
    card.classList.add('spotlight');
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    });
  });
}

/* 10. Footer Year */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* 11. Toast Notification Helper */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const icon = document.createElement('i');
  icon.className = type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check';
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.textContent = message;

  toast.append(icon, text);
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-leave');
    setTimeout(() => toast.remove(), 300);
  }, type === 'error' ? 6000 : 3200);
}
