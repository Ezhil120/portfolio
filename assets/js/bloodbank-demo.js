// Live Interactive Blood Bank Inventory Widget Demo
(function () {
  const container = document.getElementById('bloodbank-demo-app');
  if (!container) return;

  const inventoryData = [
    { type: 'A+', current: 48, max: 60, status: 'adequate' },
    { type: 'O-', current: 6, max: 40, status: 'critical' },
    { type: 'B+', current: 52, max: 70, status: 'adequate' },
    { type: 'AB-', current: 11, max: 30, status: 'warning' },
    { type: 'O+', current: 75, max: 90, status: 'adequate' }
  ];

  let currentFilter = 'all';

  function renderWidget() {
    const filtered = inventoryData.filter((item) => {
      if (currentFilter === 'critical') return item.status === 'critical' || item.status === 'warning';
      if (currentFilter === 'adequate') return item.status === 'adequate';
      return true;
    });

    let html = `
      <div class="bloodbank-status-bar">
        <div>
          <span style="color:var(--text-dim);">Telemetry:</span>
          <strong style="color:var(--accent-teal); margin-left:4px;">● Cold Vault: 3.2°C (Calibrated)</strong>
        </div>
        <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim);">
          System: <span style="color:var(--accent-cyan);">ACTIVE_SYNC</span>
        </div>
      </div>

      <div class="blood-inventory-list">
    `;

    filtered.forEach((item) => {
      const percentage = Math.round((item.current / item.max) * 100);
      let statusClass = 'optimal';
      let fillClass = 'green';
      let label = 'ADEQUATE';

      if (percentage <= 20) {
        statusClass = 'critical';
        fillClass = 'red';
        label = 'CRITICAL LOW';
      } else if (percentage <= 45) {
        statusClass = 'warning';
        fillClass = 'amber';
        label = 'LOW STOCK';
      }

      html += `
        <div class="blood-group-item">
          <div class="blood-badge ${statusClass}">${item.type}</div>
          <div style="flex-grow:1; display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
              <span style="color:var(--text-dim); font-weight:600;">STATUS: <strong style="color:var(--text-main);">${label}</strong></span>
              <span style="color:var(--text-dim); font-family:var(--font-mono);">${percentage}%</span>
            </div>
            <div class="blood-progress-bar">
              <div class="blood-progress-fill ${fillClass}" style="width: ${percentage}%;"></div>
            </div>
          </div>
          <div class="blood-units">${item.current} / ${item.max} U</div>
        </div>
      `;
    });

    html += `
      </div>
      <div class="blood-demo-actions">
        <button class="btn btn-sm btn-secondary" id="btn-blood-donate">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Log +5 Units (O-)
        </button>
        <button class="btn btn-sm btn-outline" id="btn-blood-dispatch">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Simulate Urgent Request (A+)
        </button>
        <button class="btn btn-sm btn-outline" id="btn-blood-toggle-filter" style="margin-left:auto;">
          Filter: ${currentFilter.toUpperCase()}
        </button>
      </div>
    `;

    container.innerHTML = html;

    // Attach listeners
    document.getElementById('btn-blood-donate')?.addEventListener('click', () => {
      const oNeg = inventoryData.find((i) => i.type === 'O-');
      if (oNeg) {
        oNeg.current = Math.min(oNeg.max, oNeg.current + 5);
        if (oNeg.current > 18) oNeg.status = 'adequate';
        else if (oNeg.current > 8) oNeg.status = 'warning';
      }
      renderWidget();
      if (window.showToast) {
        window.showToast('💉 Logged 5 units of O- blood into inventory. Real-time DOM updated!', 'success');
      }
    });

    document.getElementById('btn-blood-dispatch')?.addEventListener('click', () => {
      const aPos = inventoryData.find((i) => i.type === 'A+');
      if (aPos && aPos.current > 5) {
        aPos.current -= 6;
      }
      renderWidget();
      if (window.showToast) {
        window.showToast('🚨 Dispatched 6 units of A+ to Trauma Ward. Cold chain telemetry OK.', 'info');
      }
    });

    document.getElementById('btn-blood-toggle-filter')?.addEventListener('click', () => {
      if (currentFilter === 'all') currentFilter = 'critical';
      else if (currentFilter === 'critical') currentFilter = 'adequate';
      else currentFilter = 'all';
      renderWidget();
    });
  }

  renderWidget();
})();
