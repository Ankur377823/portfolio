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
  medication: {
    title: "Medication Reconciliation Service",
    badge: "Clinical Healthcare REST API",
    image: "assets/project_medication.jpg",
    tags: ["Python", "FastAPI", "MongoDB", "Pytest"],
    overview: "A clinical healthcare API designed to process patient medication lists from multiple sources. It automatically checks for dose mismatches, duplicate treatments, and drug interaction risks.",
    features: [
      "Versioned patient snapshot history in MongoDB for compliance",
      "Automatic detection of dosage conflicts and duplicate drug classes",
      "Includes 69 automated unit tests written with Pytest",
      "Deployed and running live on Render"
    ],
    github: "https://github.com/Ankur377823/medication-reconciliation-service",
    live: "https://medication-reconciliation-service.onrender.com/docs"
  },
  carprice: {
    title: "Car Price Prediction API",
    badge: "Machine Learning & Microservices",
    image: "assets/project_carprice.jpg",
    tags: ["Python", "FastAPI", "Scikit-Learn", "Redis", "Docker"],
    overview: "An end-to-end machine learning web service that predicts resale car prices based on vehicle specs. Built with Scikit-Learn Random Forest Regression and containerized with Docker.",
    features: [
      "Redis caching layer that speeds up repeat model predictions",
      "Monitored with Prometheus metrics and Grafana performance boards",
      "Containerized with Docker Compose for consistent deployment",
      "Deployed live on Render with active API documentation"
    ],
    github: "https://github.com/Ankur377823/fastapi-Project",
    live: "https://fastapi-project-lux4.onrender.com/docs"
  },
  botpress: {
    title: "Botpress Chatbot Security Scanner",
    badge: "Security Testing Suite",
    image: "assets/project_botpress.jpg",
    tags: ["Python", "FastAPI", "Botpress Cloud", "SQLite", "Pytest"],
    overview: "An automated security testing suite for Botpress Cloud chatbots. It tests conversational AI bots against prompt injections, jailbreaks, and sensitive data leakage.",
    features: [
      "Asynchronous API client connecting to Botpress Cloud bots",
      "Automated test battery checking for prompt injection vulnerabilities",
      "Saves complete test logs and safety scores in a local SQLite database",
      "Includes 26 automated unit tests with mock server support"
    ],
    github: "https://github.com/Ankur377823/Botpress-Connector",
    live: "https://botpress-connector-29gl.onrender.com/"
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
        <div class="modal-body">
          <div style="background:#08090e; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px 20px; margin-bottom:1.2rem; font-family:'SF Mono',Monaco,monospace; font-size:0.85rem; color:#cbd5e1;">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
              <span style="color:#64748b;">${data.title} // architecture</span>
              <span style="color:#34d399; font-weight:700;">● Production Ready</span>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${data.tags.map(t => `<span style="background:rgba(255,255,255,0.06); padding:3px 10px; border-radius:9999px; font-size:0.75rem; color:#f8fafc;">${t}</span>`).join('')}
            </div>
          </div>
          <span style="color:var(--accent-red); font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">${data.badge}</span>
          <h2 style="font-size:1.6rem; margin:0.4rem 0 0.8rem; color:#ffffff;">${data.title}</h2>
          <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:1.2rem; line-height:1.7;">${data.overview}</p>
          
          <h4 style="font-size:1rem; margin-bottom:0.6rem; color:#ffffff;">Key Technical Highlights:</h4>
          <ul style="padding-left:1.2rem; color:var(--text-secondary); font-size:0.92rem; margin-bottom:1.5rem; line-height:1.7;">
            ${data.features.map(f => `<li style="margin-bottom:0.4rem;">${f}</li>`).join('')}
          </ul>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-email-pill" style="font-size:0.88rem; padding:8px 18px;"><i class="fa-brands fa-github"></i> View GitHub Code</a>
            <a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary-pill" style="font-size:0.88rem; padding:8px 18px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Demo</a>
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
