console.log('[ME] script.js loaded');
alert('SCRIPT IS LOADING');

/* ---------------------------
   NAVIGATION
---------------------------- */
function initNavigation() {
  const buttons = document.querySelectorAll('button[data-page]');
  const pages = document.querySelectorAll('.page');

  function showPage(id) {
    pages.forEach(p => (p.style.display = 'none'));
    const page = document.getElementById(id);
    if (page) page.style.display = 'block';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      console.log('[NAV] Click:', page);
      showPage(page);
    });
  });

  showPage('dashboard');
}

/* ---------------------------
   THEME
---------------------------- */
function initTheme() {
  const select = document.getElementById('themeSelect');
  if (!select) return;

  const saved = localStorage.getItem('me-theme') || 'light';
  document.body.dataset.theme = saved;
  select.value = saved;

  select.addEventListener('change', e => {
    document.body.dataset.theme = e.target.value;
    localStorage.setItem('me-theme', e.target.value);
  });
}

/* ---------------------------
   INIT
---------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[ME] DOM ready');
  initNavigation();
  initTheme();
});
