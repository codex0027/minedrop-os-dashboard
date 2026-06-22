// Shared app helpers: sidebar render, topbar, current page highlight, time

const NAV = [
  { label: 'Overview', items: [
    { href: 'dashboard.html', icon: 'layout-dashboard', name: 'Discord Analytics' },
    { href: 'minecraft.html', icon: 'box',              name: 'Minecraft Analytics' },
  ]},
  { label: 'Operations', items: [
    { href: 'moderation.html',  icon: 'shield',          name: 'Moderation' },
    { href: 'links.html',       icon: 'link-2',          name: 'Link Permissions' },
    { href: 'tickets.html',     icon: 'ticket',          name: 'Tickets' },
    { href: 'logs.html',        icon: 'scroll-text',     name: 'Live Logs' },
  ]},
  { label: 'System', items: [
    { href: 'backups.html',     icon: 'database-backup', name: 'Backups' },
    { href: 'bot-controls.html',icon: 'cpu',             name: 'Bot Controls' },
    { href: 'publisher.html',   icon: 'megaphone',       name: 'Publisher' },
    { href: 'roles.html',       icon: 'key-round',       name: 'Access Control' },
  ]},
  { label: 'Public', items: [
    { href: 'status.html',      icon: 'activity',        name: 'Server Status' },
  ]},
];

function renderShell({ title, crumb }) {
  const path = location.pathname.split('/').pop() || 'dashboard.html';
  const sidebar = document.getElementById('sidebar');
  const topbar  = document.getElementById('topbar');

  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-brand">
        <div class="brand-block"></div>
        <div>
          <div class="font-pixel" style="font-size:11px;color:var(--grass-light);">MINEDROP</div>
          <div class="font-mono" style="font-size:10px;color:var(--text-mute);">OS v1.0</div>
        </div>
      </div>
      <div class="nav-section">
        ${NAV.map(section => `
          <div class="nav-label">${section.label}</div>
          ${section.items.map(it => `
            <a class="nav-item ${path===it.href?'active':''}" href="${it.href}">
              <i data-lucide="${it.icon}"></i>${it.name}
            </a>
          `).join('')}
        `).join('')}
      </div>
      <div class="sidebar-footer">
        <div class="avatar">CX</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;">Codex</div>
          <div style="font-size:11px;color:var(--text-mute);font-family:'JetBrains Mono',monospace;">Owner</div>
        </div>
        <a class="btn btn-ghost btn-icon" href="index.html" title="Log out">
          <i data-lucide="log-out" style="width:14px;height:14px;"></i>
        </a>
      </div>
    `;
  }

  if (topbar) {
    topbar.innerHTML = `
      <div>
        <div class="crumb">MineDrop OS / ${crumb || title}</div>
        <div class="page-title">${title}</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;">
        <span class="badge badge-success"><span class="dot"></span> Bot Online</span>
        <span class="badge badge-info"><i data-lucide="users" style="width:11px;height:11px;"></i> 4,287</span>
        <span class="badge"><i data-lucide="clock" style="width:11px;height:11px;"></i> <span id="clock"></span></span>
        <button class="btn btn-icon" title="Notifications"><i data-lucide="bell" style="width:14px;height:14px;"></i></button>
      </div>
    `;
  }

  if (window.lucide) lucide.createIcons();
  startClock();
}

function startClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent = d.toISOString().slice(11,19) + ' UTC';
  };
  tick();
  setInterval(tick, 1000);
}

// Toast
function toast(msg, kind='info') {
  let host = document.getElementById('toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toast-host';
    host.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:100;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(host);
  }
  const colors = {
    info:    ['rgba(56,189,248,0.15)','#7dd3fc','rgba(56,189,248,0.4)'],
    success: ['rgba(95,184,74,0.15)','#8ed87a','rgba(95,184,74,0.4)'],
    error:   ['rgba(239,68,68,0.15)','#fca5a5','rgba(239,68,68,0.4)'],
    warn:    ['rgba(249,115,22,0.15)','#fdba74','rgba(249,115,22,0.4)'],
  }[kind] || ['rgba(56,189,248,0.15)','#7dd3fc','rgba(56,189,248,0.4)'];
  const t = document.createElement('div');
  t.style.cssText = `background:${colors[0]};color:${colors[1]};border:1px solid ${colors[2]};padding:10px 14px;border-radius:4px;font-size:13px;font-family:'JetBrains Mono',monospace;min-width:240px;animation:slideIn 0.2s ease;`;
  t.textContent = msg;
  host.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3200);
}

// Toggle helper
function bindToggle(el, onChange) {
  el.addEventListener('click', () => {
    el.classList.toggle('on');
    onChange?.(el.classList.contains('on'));
  });
}
