console.log("ME V0 — Phase 1 JS Loaded");

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("nav button");
const themeSelect = document.getElementById("themeSelect");

// Page routing
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.page;

    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(target).classList.add("active");

    console.log("Page switched to:", target);
  });
});

// Theme system
const savedTheme = localStorage.getItem("me-theme") || "rose";
document.body.classList.add(savedTheme);
themeSelect.value = savedTheme;

themeSelect.addEventListener("change", () => {
  document.body.className = "";
  document.body.classList.add(themeSelect.value);
  localStorage.setItem("me-theme", themeSelect.value);
  console.log("Theme changed:", themeSelect.value);
});
