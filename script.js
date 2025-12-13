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
