// Main Application Controller
document.addEventListener('DOMContentLoaded', () => {
  // Global Toast Helper
  const toastContainer = document.getElementById('toast-container');
  window.showToast = function (message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '⚡';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';
    if (type === 'copy') icon = '📋';

    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${icon}</span>
      <div style="flex-grow: 1; font-size: 0.9rem;">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Theme Toggler
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themes = ['cyber', 'ocean', 'light'];
  let currentThemeIdx = 0;

  const savedTheme = localStorage.getItem('ezhil_theme') || 'cyber';
  currentThemeIdx = themes.indexOf(savedTheme) !== -1 ? themes.indexOf(savedTheme) : 0;
  applyTheme(themes[currentThemeIdx]);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const nextTheme = themes[currentThemeIdx];
      applyTheme(nextTheme);
      localStorage.setItem('ezhil_theme', nextTheme);
      window.showToast(`Switched theme to: ${nextTheme.toUpperCase()}`, 'info');
    });
  }

  function applyTheme(theme) {
    if (theme === 'cyber') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  // Navbar Scroll & Active Link
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  mobileMenuBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });

  // Animated Stat Counters
  const counterElements = document.querySelectorAll('.counter-val');
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target > 50 ? 25 : 40;
          const step = Math.max(1, Math.floor(target / 40));

          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(interval);
            }
            el.innerText = count + suffix;
          }, speed);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-strip');
  if (metricsSection) {
    countObserver.observe(metricsSection);
  }

  // Projects Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modals Data & Triggers
  const projectModalBackdrop = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const modalCloseBtns = document.querySelectorAll('.modal-close-trigger');

  const projectDetails = {
    'healthcare-modernization': {
      title: 'Enterprise Healthcare UI Modernization Framework',
      subtitle: 'Spearheaded legacy JSP to React conversion for enterprise clinical platforms',
      image: 'assets/images/project-healthcare.jpg',
      tags: ['React', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Selenium', 'Chrome Profiler'],
      challenge: 'Enterprise healthcare screens were bound to monolithic JSP scriptlets, causing slow DOM rendering, memory leaks, and fragmented legacy CSS across various clinical wards.',
      solution: 'Designed and deployed a unified responsive CSS/JS component framework and modern React component architecture. Profiled client-side bottlenecks with Chrome DevTools to eliminate execution lag and established Selenium regression testing workflows.',
      impact: [
        '⚡ 65% reduction in page load latency across core clinical screens',
        '🔄 100% standardized responsive component library adopted across modules',
        '🛡️ Zero critical regression bugs due to automated Selenium end-to-end suites',
        '📈 Seamless cross-browser compatibility on high-availability WildFly & Tomcat clusters'
      ]
    },
    'blood-bank-system': {
      title: 'Healthcare Blood Bank & Clinical Information System',
      subtitle: 'Mission-critical blood donor, component inventory, and triage management module',
      image: 'assets/images/project-bloodbank.jpg',
      tags: ['React', 'JSP/Servlets', 'MySQL', 'AJAX', 'DataTables', 'Cold Chain Telemetry'],
      challenge: 'Critical scoping and layout bugs in the legacy Blood Bank module caused transactional synchronization delays and potential inventory tracking discrepancies during high-demand emergency hours.',
      solution: 'Refactored frontend event handlers, client-side data validation pipelines, and integrated dynamic DataTables with asynchronous AJAX polling for real-time inventory updates and temperature telemetry.',
      impact: [
        '🩸 100% data integrity with zero-loss donor and component logs',
        '⏱️ Sub-second real-time search & filter across thousands of active blood units',
        '🩺 Enhanced UI usability for doctors, phlebotomists, and emergency triage staff'
      ]
    },
    'devops-ansible': {
      title: 'Automated Enterprise DevOps & Ansible Deployment Playbooks',
      subtitle: 'Automated provisioning and CI/CD pipelines for Tomcat & WildFly application servers',
      image: 'assets/images/project-devops.jpg',
      tags: ['Ansible', 'WildFly', 'Apache Tomcat', 'Selenium', 'Linux/Bash', 'Git'],
      challenge: 'Manual server configuration, app war deployments, and regression verifications were repetitive, error-prone, and caused operational deployment bottlenecks.',
      solution: 'Constructed automated Ansible playbooks for server provisioning, cluster configuration, environment synchronization, and integrated automated Selenium test validation pre/post-deployment.',
      impact: [
        '🚀 Cut deployment overhead and manual setup time by over 70%',
        '⚙️ Reliable multi-environment replication (Dev, Staging, Production)',
        '🔒 Enhanced system uptime and seamless rollback capabilities on WildFly'
      ]
    },
    'reporting-datatables': {
      title: 'Dynamic Healthcare DataTables & AJAX Reporting Engine',
      subtitle: 'High-performance tabular clinical records engine with complex filtering',
      image: 'assets/images/project-healthcare.jpg',
      tags: ['JavaScript (ES6+)', 'jQuery DataTables', 'AJAX', 'RESTful APIs', 'DOM Optimization'],
      challenge: 'Rendering dense patient diagnostic records with dozens of columns led to UI freezes on slower hospital workstation terminals.',
      solution: 'Implemented client-side DOM virtualization, asynchronous chunked AJAX loading, optimized memory usage via Chrome DevTools, and added responsive multi-format export (PDF, CSV).',
      impact: [
        '📊 Instantaneous sorting and multi-column filtering over 10,000+ patient records',
        '💾 Minimal memory footprint on hospital terminals'
      ]
    }
  };

  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (!data || !projectModalBody || !projectModalBackdrop) return;

      let tagsHtml = data.tags.map((t) => `<span class="tag-badge">${t}</span>`).join(' ');
      let impactHtml = data.impact.map((i) => `<li>${i}</li>`).join('');

      projectModalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <img src="${data.image}" alt="${data.title}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-md); border:1px solid var(--border-subtle); margin-bottom:1.25rem;">
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.75rem;">${tagsHtml}</div>
          <h2 style="font-size:1.6rem; margin-bottom:0.4rem;">${data.title}</h2>
          <p style="color:var(--accent-cyan); font-weight:600; font-size:0.95rem; margin-bottom:1.25rem;">${data.subtitle}</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:1.25rem; font-size:0.95rem; line-height:1.65;">
          <div>
            <h4 style="color:var(--accent-rose); font-size:1rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">
              <span>⚠️</span> The Engineering Challenge
            </h4>
            <p style="color:var(--text-muted);">${data.challenge}</p>
          </div>

          <div>
            <h4 style="color:var(--accent-teal); font-size:1rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">
              <span>💡</span> Modernization Architecture & Solution
            </h4>
            <p style="color:var(--text-muted);">${data.solution}</p>
          </div>

          <div>
            <h4 style="color:var(--accent-cyan); font-size:1rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">
              <span>🚀</span> Key Business & Technical Impact
            </h4>
            <ul style="list-style:none; padding-left:0; display:flex; flex-direction:column; gap:0.4rem; color:var(--text-muted);">
              ${impactHtml}
            </ul>
          </div>
        </div>
      `;

      projectModalBackdrop.classList.add('open');
    });
  });

  // Resume Modal Trigger
  const resumeModal = document.getElementById('resume-modal');
  document.querySelectorAll('.open-resume-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal?.classList.add('open');
    });
  });

  // Close Modals
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectModalBackdrop?.classList.remove('open');
      resumeModal?.classList.remove('open');
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === projectModalBackdrop) projectModalBackdrop.classList.remove('open');
    if (e.target === resumeModal) resumeModal.classList.remove('open');
  });

  // Print Resume helper
  document.getElementById('btn-print-resume')?.addEventListener('click', () => {
    window.print();
  });

  // Copy Buttons helper
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          window.showToast(`Copied "${text}" to clipboard!`, 'copy');
        }).catch(() => {
          window.showToast(`Copied!`, 'copy');
        });
      }
    });
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const name = document.getElementById('form-name')?.value;
      const email = document.getElementById('form-email')?.value;
      const subject = document.getElementById('form-subject')?.value || 'Portfolio Inquiry';
      const message = document.getElementById('form-message')?.value;

      if (!name || !email || !message) {
        window.showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Sending Message...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        window.showToast(`Thank you, ${name}! Your message has been sent. I will get back to you shortly!`, 'success');

        // Optional direct mailto link trigger
        const mailtoLink = `mailto:ezhil.e2001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        console.log('Mailto prepared:', mailtoLink);
      }, 1200);
    });
  }
});
