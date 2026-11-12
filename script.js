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
  jobbot: {
    title: "Job Bot: AI Job-Application Assistant",
    badge: "Full-Stack Automation & Generative AI",
    tags: ["Python", "FastAPI", "SQLAlchemy", "SQLite/PostgreSQL", "Gemini API", "Gmail API (OAuth)", "JavaScript (ES Modules)", "Chrome Extension (MV3)", "Playwright", "Docker", "Caddy", "Azure VM"],
    problem: "A serious job search means hundreds of repetitive applications, the same screening questions answered again and again, and recruiter follow-ups that are easy to forget. Tracking which application is at which stage, and which resume actually gets replies, usually ends up scattered across spreadsheets and inboxes.",
    solution: "Job Bot automates the search end to end. Every day it finds matching LinkedIn jobs and submits Easy Apply applications through its own Chrome extension, with a FastAPI server deciding each form step and Gemini answering screening questions. It then finds the recruiter's email or phone number, drafts a personal follow-up, and reads Gmail replies to move each job through the pipeline (Applied, Replied, Interview, Offer) without manual updates. It is multi-user, has an admin panel, and runs in Docker on an Azure VM behind Caddy for HTTPS.",
    features: [
      "Manifest V3 Chrome extension fills and submits LinkedIn Easy Apply forms, with each form step decided server-side",
      "Gemini answers screening questions, saved answers are reused across applications, and ambiguous questions are routed to the user",
      "Selects the best of the user's resumes for each job and tracks which resume earns the most replies and interviews",
      "Finds recruiter emails and phone numbers from job posts and LinkedIn posts, keeps the source of each contact, and drafts personal emails and WhatsApp messages naming the role and job ID",
      "Reads only relevant Gmail messages to detect replies, interviews, offers, and rejections, and moves tracker cards automatically",
      "Drag-and-drop pipeline tracker with an applications-per-day chart and reply and interview rates per resume",
      "Multi-user accounts with per-user data, an admin dashboard showing live extension status, and a daily scheduler",
      "Self-repairing database with daily backups, a thread-safe Gmail client, and 160+ automated unit, end-to-end, and extension tests"
    ],
    github: null,
    live: "https://20-219-138-38.sslip.io",
    privateRepo: true
  },
  smartroad: {
    title: "SmartRoad Audit: AI Road Safety Audit Platform",
    badge: "Computer Vision & Full-Stack",
    tags: ["React 19", "Vite", "Tailwind CSS", "FastAPI", "Pydantic v2", "SQLAlchemy 2", "PostgreSQL 16", "YOLO26n-seg", "ONNX Runtime Web", "WebGPU", "Google Maps APIs", "Docker", "Nginx", "Render"],
    problem: "Road safety audits in India are mostly manual. Inspectors survey roads on foot or by car, note hazards on paper, and judge pothole severity by eye. The process is slow and inconsistent, and the findings are hard to track over time.",
    solution: "SmartRoad Audit automates the first screening step so auditors can spend field time on the riskiest stretches. An engineer picks a road on Google Maps; the FastAPI backend splits it into segments, collects elevation, gradient, curvature, land use, and traffic for each, scores every segment from 0 to 100, and generates a safety checklist. A phone-camera pothole scanner runs a custom YOLO segmentation model entirely in the browser, estimates each pothole's depth and width, grades it against IRC codes of practice, geotags it, and exports a PDF report.",
    features: [
      "Rule-based risk score per segment from five weighted factors: gradient (25), curvature (20), operating speed (20), traffic (20), and pedestrian activity (15)",
      "Auto-generated checklist per segment, with each item marked as answered automatically or needing field verification",
      "Custom-trained YOLO26n-seg model running in a Web Worker with ONNX Runtime Web, using WebGPU when available and an INT8-quantized WASM model otherwise; no video leaves the device",
      "False-positive filters that reject detections in the sky, tall vertical objects such as people and poles, and areas with colourful surroundings",
      "Single-image depth estimate from cavity shadow and surface roughness, with width measured from camera height and tilt",
      "IRC:82-2015 size classes and an IRC:SP:88-2019 likelihood × consequence matrix for risk level and repair priority, implemented identically in Python and JavaScript",
      "GPS geotagging with road snapping, merging of repeat sightings, and PDF report export",
      "Moving inference to the browser removed PyTorch from the server, cutting backend memory from ~500 MB to ~90 MB so the stack fits Render's free tier",
      "Layered FastAPI backend (routes, services, repositories, models), Docker Compose for local development, and a Render Blueprint for one-click deployment"
    ],
    github: "https://github.com/Ankur377823/Smart-Road-Audit",
    live: "https://smart-road-audit-1.onrender.com/",
    liveNote: "Hosted on Render's free tier: the first visit can take 30–60 seconds while the server wakes up."
  },
  botpress: {
    title: "Botpress Red-Team Scanner",
    badge: "AI Security & Red-Teaming",
    tags: ["Python", "FastAPI", "Botpress Cloud", "SQLite", "Pytest"],
    problem: "Chatbots and LLM assistants in production are often vulnerable to prompt injection, system-prompt leaks, jailbreaks, and leaks of personal data (PII). Most teams have no automated way to simulate these attacks and check their guardrails before a bot reaches users.",
    solution: "An automated red-teaming tool that connects to a live bot through the Botpress Chat API. It sets up test conversations, verifies the connection in both directions, and runs structured batteries of attacks such as jailbreaks, credential harvesting, and role confusion. Every response, its timing, and the verdict are stored in SQLite for later review.",
    features: [
      "Asynchronous Python client for Botpress Cloud bots with connection handshake checks",
      "Attack batteries covering prompt injection, system-prompt leaks, and PII exfiltration",
      "Audit history of responses, timings, and vulnerability ratings stored in SQLite",
      "26 automated tests against a mock Botpress server, covering onboarding, scan runs, and timeouts"
    ],
    github: "https://github.com/Ankur377823/Botpress-Connector",
    live: "https://botpress-connector-29gl.onrender.com/"
  },
  medication: {
    title: "Medication Reconciliation Service",
    badge: "Healthcare Backend API",
    tags: ["Python", "FastAPI", "MongoDB", "Pytest", "OpenAPI"],
    problem: "When a patient moves between hospitals, clinics, and home care, their medication lists come from separate record systems and pharmacies and often disagree. Duplicate drug classes, contraindications, and dosage mismatches that go unnoticed are a common cause of preventable medication errors.",
    solution: "A FastAPI backend that takes medication records from several sources and normalizes them into one list. A deterministic reconciliation engine reads dosages and drug categories to flag duplicate drug classes, inconsistent doses, and known drug-drug interactions.",
    features: [
      "Rule-based reconciliation that flags drug-drug interactions and duplicate therapies",
      "Immutable, versioned patient snapshots in MongoDB for a full audit trail",
      "69 unit and integration tests in pytest covering edge cases, invalid payloads, and dosage limits",
      "Deployed on Render with a web app for reviewing and resolving medication discrepancies"
    ],
    github: "https://github.com/Ankur377823/medication-reconciliation-service",
    live: "https://medication-reconciliation-service-1-y257.onrender.com/",
    liveNote: "Hosted on Render's free tier: the first visit can take 30–60 seconds while the server wakes up."
  },
  carprice: {
    title: "Car Price Prediction API",
    badge: "Machine Learning API",
    tags: ["Python", "FastAPI", "Scikit-Learn", "Redis", "Docker", "Prometheus", "Grafana"],
    problem: "Used-car marketplaces need instant price estimates across many combinations of mileage, brand, age, and fuel type. Running the model again for every repeated query wastes compute and slows responses.",
    solution: "A Random Forest regression model trained on used-car listings and served through a FastAPI service. A Redis cache keyed on a hash of the input returns repeated predictions in under 15 ms without calling the model.",
    features: [
      "Scikit-Learn Random Forest model predicting resale price from vehicle specifications",
      "Redis cache keyed on hashed inputs, returning repeat predictions in under 15 ms",
      "Endpoints secured with JWT authentication and API-key validation",
      "Multi-container Docker Compose stack deployed on Render, with Prometheus metrics and Grafana dashboards"
    ],
    github: "https://github.com/Ankur377823/fastapi-Project",
    live: "https://fastapi-project-lux4.onrender.com/docs",
    liveLabel: "Open API Docs"
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
          ${data.github ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-email-pill btn-sm"><i class="fa-brands fa-github" aria-hidden="true"></i> View GitHub Code</a>` : ''}
          ${data.privateRepo ? `<span class="private-repo-pill"><i class="fa-solid fa-lock" aria-hidden="true"></i> Source code in a private repository</span>` : ''}
          ${data.live ? `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary-pill btn-sm"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> ${data.liveLabel || 'Open Live Demo'}</a>` : ''}
        </div>
        ${data.liveNote ? `<p class="modal-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> ${data.liveNote}</p>` : ''}
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
