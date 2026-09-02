/* ==========================================================================
   ANKUR KUMAR SINGH - PORTFOLIO INTERACTIVITY & SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initStatsCounters();
  initClipboardCopy();
  initProjectModals();
  initContactForm();
});

/* 1. Mobile Navigation Toggle */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* 2. ScrollSpy Navigation Highlighting */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

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
  });
}

/* 3. Number Counter Animation for Stats */
function initStatsCounters() {
  const counters = document.querySelectorAll('.stat-number');
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
              counter.textContent = target + '+';
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* 4. Clipboard Copy Functionality */
function initClipboardCopy() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
      const copyVal = el.getAttribute('data-copy');
      if (!copyVal) return;

      navigator.clipboard.writeText(copyVal).then(() => {
        showToast(`Copied to clipboard: ${copyVal}`);
      }).catch(() => {
        showToast(`Text to copy: ${copyVal}`);
      });
    });
  });

  const quickCopyEmail = document.getElementById('quick-copy-email-btn');
  if (quickCopyEmail) {
    quickCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('ankurrajput7050@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }
}

/* 5. Project Detail Modals */
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
          <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius:10px; margin-bottom:1rem; height:220px; object-fit:cover;" />
          <span style="color:var(--cyan); font-size:0.8rem; font-weight:700; text-transform:uppercase;">${data.badge}</span>
          <h2 style="font-size:1.5rem; margin:0.3rem 0 0.8rem;">${data.title}</h2>
          <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1rem;">${data.overview}</p>
          
          <h4 style="font-size:1rem; margin-bottom:0.5rem; color:var(--text-main);">Key Highlights:</h4>
          <ul style="padding-left:1.2rem; color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">
            ${data.features.map(f => `<li style="margin-bottom:0.4rem;">${f}</li>`).join('')}
          </ul>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary btn-sm"><i class="fa-brands fa-github"></i> View GitHub Code</a>
            <a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Demo</a>
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

/* 6. Contact Form Submission */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();

      if (submitBtn) {
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        showToast(`Thank you, ${name}! Your message has been sent.`);
        contactForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Message Sent!</span>`;
          setTimeout(() => {
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>`;
            submitBtn.disabled = false;
          }, 3000);
        }
      }, 700);
    });
  }
}

/* 7. Toast Notification Helper */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-cyan"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
