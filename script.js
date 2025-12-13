console.log('[ME] script.js loaded');

// ============================
// THEME SYSTEM — SINGLE SOURCE
// ============================

function applyTheme(theme) {
  document.body.classList.remove(
    'theme-rose',
    'theme-midnight',
    'theme-zen'
  );

  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('me-theme', theme);

  console.log('[ME] Theme applied:', theme);
}

function initThemes() {
  const themeSelect = document.getElementById('themeSelect');

  if (!themeSelect) {
    console.warn('[ME] themeSelect not found');
    return;
  }

  const savedTheme = localStorage.getItem('me-theme') || 'rose';
  applyTheme(savedTheme);
  themeSelect.value = savedTheme;

  themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });

  console.log('[ME] Theme system initialized');
}

// ============================
// APP BOOT
// ============================

document.addEventListener('DOMContentLoaded', () => {
  initThemes();
});
/* =========================
   PAGE NAVIGATION — PHASE 1
========================= */

function initNavigation() {
  const navButtons = document.querySelectorAll('nav button[data-page]');
  const pages = document.querySelectorAll('.page');

  if (!navButtons.length || !pages.length) {
    console.warn('[ME] Navigation elements not found');
    return;
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-page');

      pages.forEach(p => p.classList.remove('active'));
      navButtons.forEach(b => b.classList.remove('active'));

      const page = document.getElementById(target);
      if (page) {
        page.classList.add('active');
        btn.classList.add('active');
        console.log('[NAV] Page switched to:', target);
      } else {
        console.warn('[NAV] Page not found:', target);
      }
    });
  });

  console.log('[ME] Navigation initialized');
}

document.addEventListener('DOMContentLoaded', initNavigation);
