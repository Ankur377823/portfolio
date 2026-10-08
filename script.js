/* ==========================================================================
   ANKUR KUMAR SINGH - PORTFOLIO INTERACTIVITY & ANIMATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initStatsCounters();
  initSkillTabs();
  initFloatingScrollTop();
  initClipboardCopy();
  initProjectModals();
  initContactForm();
});

/* 1. Mobile Navigation Toggle */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileActionBtns = document.querySelectorAll('.mobile-nav-actions a');

  if (mobileToggle && navMenu) {
    const icon = mobileToggle.querySelector('i');

    const toggleMenu = () => {
      const isActive = navMenu.classList.toggle('active');
      if (icon) {
        if (isActive) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    };

    const closeMenu = () => {
      navMenu.classList.remove('active');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    mobileActionBtns.forEach(btn => {
      btn.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }
}

/* 2. ScrollSpy Navigation Highlighting */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* 3. Framer-Style Scroll Reveal Animation Engine */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
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
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          if (!target) return;
          const duration = 1200;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

/* 5. Interactive Skill Filter Tabs */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skills-group');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillGroups.forEach(group => {
        const category = group.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'tools' && (category === 'tools' || category === 'databases'))) {
          group.style.display = 'block';
          group.style.opacity = '0';
          group.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            group.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
          });
        } else {
          group.style.display = 'none';
        }
      });
    });
  });
}

/* 6. Floating Scroll to Top Button */
function initFloatingScrollTop() {
  const topBtn = document.getElementById('floating-top-btn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 7. Clipboard Copy Functionality */
function initClipboardCopy() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const copyVal = el.getAttribute('data-copy');
      if (!copyVal) return;

      navigator.clipboard.writeText(copyVal).then(() => {
        showToast(`Copied to clipboard: ${copyVal}`);
      }).catch(() => {
        showToast(`Copied: ${copyVal}`);
      });
    });
  });
}

/* 8. Project Detail Modals */
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

  document.querySelectorAll('.btn-modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-modal');
      const data = projectDetails[key];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-body" style="padding-top: 6px;">
          <span style="display:inline-block; font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent-red); margin-bottom:0.4rem;">${data.badge}</span>
          <h2 style="font-size:1.65rem; font-weight:800; color:#ffffff; line-height:1.25; margin-bottom:0.75rem;">${data.title}</h2>
          
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:1.5rem;">
            ${data.tags.map(t => `<span style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); color:#fca5a5; font-size:0.76rem; font-weight:600; padding:4px 12px; border-radius:9999px;">${t}</span>`).join('')}
          </div>

          <div style="margin-bottom:1.3rem;">
            <h3 style="font-size:1.02rem; font-weight:700; color:#ffffff; margin-bottom:0.45rem;">
              What Problem It Solves
            </h3>
            <p style="color:var(--text-secondary); font-size:0.93rem; line-height:1.75; margin:0;">${data.problem}</p>
          </div>

          <div style="margin-bottom:1.3rem;">
            <h3 style="font-size:1.02rem; font-weight:700; color:#ffffff; margin-bottom:0.45rem;">
              How It Works & Architecture
            </h3>
            <p style="color:var(--text-secondary); font-size:0.93rem; line-height:1.75; margin:0;">${data.solution}</p>
          </div>

          <div style="margin-bottom:1.6rem;">
            <h3 style="font-size:1.02rem; font-weight:700; color:#ffffff; margin-bottom:0.6rem;">
              Key Technical Highlights
            </h3>
            <ul style="padding-left:1.2rem; color:var(--text-secondary); font-size:0.92rem; line-height:1.75; margin:0;">
              ${data.features.map(f => `<li style="margin-bottom:0.45rem;">${f}</li>`).join('')}
            </ul>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; padding-top:1.1rem; border-top:1px solid rgba(255,255,255,0.08);">
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-email-pill" style="font-size:0.88rem; padding:8px 18px;"><i class="fa-brands fa-github"></i> View GitHub Code</a>
            ${data.live ? `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary-pill" style="font-size:0.88rem; padding:8px 18px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Demo</a>` : ''}
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* 9. Contact Form Submission (Web3Forms API Integration) */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();

      if (submitBtn) {
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>`;
        submitBtn.disabled = true;
      }

      const formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          showToast(`Thank you, ${name}! Your message has been delivered.`);
          contactForm.reset();
        } else {
          showToast(json.message || 'Thank you! Your message has been sent.');
          contactForm.reset();
        }
      })
      .catch((error) => {
        console.error('Web3Forms submit error:', error);
        showToast(`Thank you, ${name}! Your message has been sent.`);
        contactForm.reset();
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>`;
          submitBtn.disabled = false;
        }
      });
    });
  }
}

/* 10. Toast Notification Helper */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}
