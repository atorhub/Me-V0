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
  initLanguage();
  initNavigation();
  console.log('[ME] App initialized');
});

/* ===============================
   UI TRANSLATIONS — PHASE 1B
================================ */

const translations = {
  en: {
    dashboard_title: "Dashboard",
    dashboard_desc: "System status and analytics will appear here.",
    nav_dashboard: "Dashboard",
    nav_upload: "Upload",
    nav_ocr: "OCR",
    nav_live_ocr: "Live OCR",
    nav_history: "History",
    nav_translate: "Translate",
    nav_settings: "Settings",
    nav_help: "Help",
    settings_title: "Settings",
    settings_desc: "Language, voice, theme controls.",
    settings_language: "Language"
  },

  hi: {
    dashboard_title: "डैशबोर्ड",
    dashboard_desc: "सिस्टम स्थिति और विश्लेषण यहां दिखाई देंगे।",
    nav_dashboard: "डैशबोर्ड",
    nav_upload: "अपलोड",
    nav_ocr: "ओसीआर",
    nav_live_ocr: "लाइव ओसीआर",
    nav_history: "इतिहास",
    nav_translate: "अनुवाद",
    nav_settings: "सेटिंग्स",
    nav_help: "मदद",
    settings_title: "सेटिंग्स",
    settings_desc: "भाषा, वॉयस, थीम नियंत्रण।",
    settings_language: "भाषा"
  },

  bn: {
    dashboard_title: "ড্যাশবোর্ড",
    dashboard_desc: "সিস্টেমের অবস্থা ও বিশ্লেষণ এখানে দেখা যাবে।",
    nav_dashboard: "ড্যাশবোর্ড",
    nav_upload: "আপলোড",
    nav_ocr: "ওসিআর",
    nav_live_ocr: "লাইভ ওসিআর",
    nav_history: "ইতিহাস",
    nav_translate: "অনুবাদ",
    nav_settings: "সেটিংস",
    nav_help: "সাহায্য",
    settings_title: "সেটিংস",
    settings_desc: "ভাষা, ভয়েস, থিম নিয়ন্ত্রণ।",
    settings_language: "ভাষা"
  }
};
function applyLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem('me-language', lang);
  console.log('[LANG]', lang, 'applied');
}

function initLanguage() {
  const langSelect = document.getElementById('langSelect');
  if (!langSelect) return;

  const savedLang = localStorage.getItem('me-language') || 'en';
  langSelect.value = savedLang;
  applyLanguage(savedLang);

  langSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });
}
/* ============================
   UPLOAD UI — PHASE 2.1
============================ */

const fileInput = document.getElementById("invoiceFile");
const uploadBtn = document.getElementById("uploadBtn");
const uploadStatus = document.getElementById("uploadStatus");

if (uploadBtn) {
  uploadBtn.addEventListener("click", () => {
    if (!fileInput.files.length) {
      uploadStatus.textContent = "No file selected.";
      console.warn("[UPLOAD] No file selected");
      return;
    }

    const file = fileInput.files[0];
    uploadStatus.textContent = `Selected: ${file.name}`;
    console.log("[UPLOAD] File selected:", file.name);
  });
    }


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
/* =========================
   DEBUG LOGGER
========================= */

const debugLogEl = document.getElementById('debugLog');
const debugPanel = document.getElementById('debugPanel');
const debugToggle = document.getElementById('debugToggle');
const debugClear = document.getElementById('debugClear');

function debug(msg, type = 'info') {
  if (!debugLogEl) return;

  const line = document.createElement('div');
  const time = new Date().toLocaleTimeString();

  line.textContent = `[${time}] ${msg}`;
  line.style.color =
    type === 'error' ? '#ff6b6b' :
    type === 'warn'  ? '#feca57' :
    '#0f0';

  debugLogEl.appendChild(line);
  debugLogEl.scrollTop = debugLogEl.scrollHeight;

  console.log('[ME]', msg);
}

debugToggle?.addEventListener('click', () => {
  debugPanel.classList.toggle('debug-hidden');
});

debugClear?.addEventListener('click', () => {
  debugLogEl.innerHTML = '';
});

debug('Debug system initialized');
// ===============================
// SETTINGS SYSTEM — PHASE 1
// ===============================
function initSettings() {
  const langSelect = document.getElementById('langSelect');
  if (!langSelect) {
    console.warn('[SETTINGS] langSelect not found');
    return;
  }

  const savedLang = localStorage.getItem('me-lang') || 'en';
  langSelect.value = savedLang;
  console.log('[SETTINGS] Language loaded:', savedLang);

  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('me-lang', lang);
    logDebug(`[SETTINGS] Language changed → ${lang}`);
  });
}

// Init safely
document.addEventListener('DOMContentLoaded', () => {
  initSettings();
});
function renderInvoiceChart() {
  const canvas = document.getElementById("invoiceChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = 180;

  const data = [5, 9, 6, 12, 8, 14];
  const max = Math.max(...data);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  data.forEach((value, i) => {
    const barHeight = (value / max) * 140;
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(i * 50 + 20, 160 - barHeight, 30, barHeight);
  });
}

document.addEventListener("DOMContentLoaded", renderInvoiceChart);
