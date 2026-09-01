// Interactive Hero Terminal Simulation
(function () {
  const terminalContentEl = document.getElementById('terminal-content');
  const tabButtons = document.querySelectorAll('.term-tab-btn');
  if (!terminalContentEl) return;

  const commandsData = {
    whoami: [
      { text: '$ whoami', isCmd: true },
      { text: 'Ezhil Arasu E', color: 'var(--accent-cyan)' },
      { text: 'Role: Software Developer @ Amrita Technologies' },
      { text: 'Domain: Enterprise Healthcare IT & Web Application Modernization' },
      { text: 'Location: Nagercoil, Tamil Nadu, India' },
      { text: 'Status: 🟢 Delivering high-availability healthcare systems' }
    ],
    skills: [
      { text: '$ cat technical_skills.json', isCmd: true },
      { text: '{\n  "languages": ["JavaScript (ES6+)", "Java", "Python", "HTML5", "CSS3"],\n  "frontend": ["React", "jQuery", "DataTables", "AJAX", "Responsive UI"],\n  "backend": ["JSP", "Servlets", "REST APIs", "Apache Tomcat", "WildFly"],\n  "devops_qa": ["Selenium", "Ansible", "MySQL", "Chrome DevTools", "Git"]\n}', color: '#a5f3fc' }
    ],
    experience: [
      { text: '$ agy experience --current', isCmd: true },
      { text: '• Company: Amrita Technologies (July 2023 – Present)', color: 'var(--accent-teal)' },
      { text: '• Role: Software Developer (Healthcare Systems Modernization)' },
      { text: '• Key Impact: Spearheaded legacy JSP to React migration' },
      { text: '• Testing & CI/CD: Automated Selenium QA & Ansible deployment playbooks' },
      { text: '• Critical Systems: Blood Bank and clinical data integrity stabilization' }
    ],
    modernize: [
      { text: '$ run migrate-ui --source=legacy-jsp --target=react-components', isCmd: true },
      { text: '[1/4] Parsing legacy JSP scriptlets & DOM dependencies... done.' },
      { text: '[2/4] Generating modular React UI with client-side state hooks... done.', color: 'var(--accent-cyan)' },
      { text: '[3/4] Running Selenium automated regression test suite... 100% PASSED.', color: 'var(--accent-teal)' },
      { text: '[4/4] Chrome DevTools Profiler: Page load time reduced by 62%!', color: '#38bdf8' },
      { text: '🚀 Modernization completed with zero regression bugs.' }
    ]
  };

  let typingTimeout = null;

  function renderCommand(tabKey) {
    if (typingTimeout) clearTimeout(typingTimeout);
    const lines = commandsData[tabKey] || commandsData.whoami;
    terminalContentEl.innerHTML = '';

    let lineIndex = 0;

    function typeNextLine() {
      if (lineIndex >= lines.length) {
        // Append blinking cursor at the end
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal-cursor';
        terminalContentEl.appendChild(cursorSpan);
        return;
      }

      const item = lines[lineIndex];
      const div = document.createElement('div');
      div.style.marginBottom = '0.35rem';
      if (item.color) div.style.color = item.color;

      if (item.isCmd) {
        div.innerHTML = `<span class="terminal-prompt">&gt;</span> <span style="color:#ffffff; font-weight:600;">${item.text}</span>`;
      } else {
        div.innerText = item.text;
      }

      terminalContentEl.appendChild(div);
      lineIndex++;
      typingTimeout = setTimeout(typeNextLine, 120);
    }

    typeNextLine();
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      renderCommand(tab);
    });
  });

  // Initial load
  renderCommand('whoami');
})();
