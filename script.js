console.log('[ME] script.js loaded');
alert("SCRIPT IS LOADING");

/* -------------------------
   THEME
-------------------------- */
function initThemes() {
  const themeSelect = document.getElementById('themeSelect');
  if (!themeSelect) return;

  const saved = localStorage.getItem('me-theme') || 'light';
  document.body.dataset.theme = saved;
  themeSelect.value = saved;

  themeSelect.addEventListener('change', e => {
    document.body.dataset.theme = e.target.value;
    localStorage.setItem('me-theme', e.target.value);
    console.log('[THEME]', e.target.value);
  });
}

/* -------------------------
   NAVIGATION
-------------------------- */
function initNavigation() {
  const buttons = document.querySelectorAll('nav button[data-page]');
  const pages = document.querySelectorAll('.page');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.page;

      pages.forEach(p => p.classList.remove('active'));
      const page = document.getElementById(target);
      if (page) page.classList.add('active');

      console.log('[NAV]', target);
    });
  });
}

/* -------------------------
   COUNTERS
-------------------------- */
function incrementCounter(key) {
  const next = (parseInt(localStorage.getItem(key)) || 0) + 1;
  localStorage.setItem(key, next);

  const el = document.querySelector(`[data-counter="${key}"]`);
  if (el) el.textContent = next;
}

/* -------------------------
   UPLOAD (MOCK)
-------------------------- */
function initUpload() {
  const fileInput = document.getElementById('invoiceFile');
  const uploadBtn = document.getElementById('uploadBtn');
  const status = document.getElementById('uploadStatus');

  if (!fileInput || !uploadBtn || !status) return;

  uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
      status.textContent = 'Please select a file';
      return;
    }

    status.textContent = 'Processing ' + file.name + '...';

    setTimeout(() => {
      incrementCounter('totalInvoices');
      incrementCounter('processedInvoices');
      status.textContent = 'Processed ' + file.name;
    }, 800);
  });
}

/* -------------------------
   BOOT
-------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initThemes();
  initNavigation();
  initUpload();

  ['totalInvoices', 'processedInvoices', 'errorInvoices'].forEach(key => {
    const val = localStorage.getItem(key) || 0;
    const el = document.querySelector(`[data-counter="${key}"]`);
    if (el) el.textContent = val;
  });

  console.log('[ME] App initialized');
});
