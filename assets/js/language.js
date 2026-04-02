// Language switching functionality
(function () {
  const STORAGE_KEY = "language";
  const DEFAULT_LANG = "en";

  function getStoredLanguage() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setStoredLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyLanguage(lang) {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("lang", lang === "nl" ? "nl-BE" : "en-US");

    // Show/hide language-specific content
    document.querySelectorAll(".lang-en").forEach((el) => {
      el.style.display = lang === "en" ? "" : "none";
    });
    document.querySelectorAll(".lang-nl").forEach((el) => {
      el.style.display = lang === "nl" ? "" : "none";
    });

    // Update toggle button text
    const toggleText = document.getElementById("language-icon");
    if (toggleText) {
      toggleText.textContent = lang === "en" ? "EN" : "NL";
      toggleText.title =
        lang === "en" ? "Switch to Dutch" : "Wissel naar Engels";
    }
  }

  function toggleLanguage() {
    const currentLang = getStoredLanguage();
    const newLang = currentLang === "en" ? "nl" : "en";
    setStoredLanguage(newLang);
    applyLanguage(newLang);
  }

  // Initialize on page load
  function init() {
    const lang = getStoredLanguage();
    applyLanguage(lang);
  }

  // Run immediately to prevent flash of wrong language
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose toggle function globally
  window.toggleLanguage = toggleLanguage;
})();
