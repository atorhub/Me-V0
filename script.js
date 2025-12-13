(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const output = $('output');
  const btnTest = $('btnTest');
  const btnTheme = $('btnTheme');
  const themeSelect = $('themeSelect');

  function log(msg) {
    console.log('[ME V0]', msg);
    output.textContent = msg;
  }

  btnTest.addEventListener('click', () => {
    log('✅ Button click detected. JS is working.');
  });

  btnTheme.addEventListener('click', () => {
    log('🎨 Current theme: ' + themeSelect.value);
  });

  themeSelect.addEventListener('change', () => {
    document.body.className = 'theme-' + themeSelect.value;
    localStorage.setItem('me_theme', themeSelect.value);
    log('Theme changed to ' + themeSelect.value);
  });

  (function init() {
    const saved = localStorage.getItem('me_theme');
    if (saved) {
      document.body.className = 'theme-' + saved;
      themeSelect.value = saved;
    }
    log('🚀 ME V0 Booted successfully');
  })();

})();
