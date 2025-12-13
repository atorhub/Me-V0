// THEME SYSTEM — PHASE 1 FIX
const themeSelect = document.getElementById('themeSelect');

function applyTheme(theme) {
  document.body.classList.remove(
    'theme-rose',
    'theme-midnight',
    'theme-zen'
  );
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('me-theme', theme);

  console.log('[THEME]', theme, 'applied');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('me-theme') || 'rose';
  applyTheme(savedTheme);
  if (themeSelect) themeSelect.value = savedTheme;
});

// Handle dropdown change
if (themeSelect) {
  themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });
}
