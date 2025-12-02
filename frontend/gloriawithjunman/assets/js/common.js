(function () {
  const LANG_KEY = "lunavoe_lang";

  function getCurrentLang() {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(LANG_KEY);
    return stored === "zh" ? "zh" : "en";
  }

  function setCurrentLang(lang) {
    window.localStorage.setItem(LANG_KEY, lang);
  }

  function applyLanguage(lang) {
    const dict = window.I18N && window.I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (val != null) {
        el.innerHTML = val;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = dict[key];
      if (val != null) {
        el.setAttribute("placeholder", val);
      }
    });

    const topBar = document.querySelector("[data-i18n-topbar]");
    if (topBar && dict.top_bar) {
      topBar.textContent = dict.top_bar;
    }

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) {
      langBtn.textContent = lang === "en" ? "中文" : "EN";
    }
  }

  function setupLanguage() {
    const current = getCurrentLang();
    applyLanguage(current);

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const next = getCurrentLang() === "en" ? "zh" : "en";
        setCurrentLang(next);
        applyLanguage(next);
      });
    }
  }

  function setupNav() {
    const hamburger = document.querySelector("[data-hamburger]");
    const mobilePanel = document.querySelector("[data-mobile-panel]");

    if (hamburger && mobilePanel) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("is-open");
        mobilePanel.classList.toggle("show");
      });

      mobilePanel.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          hamburger.classList.remove("is-open");
          mobilePanel.classList.remove("show");
        });
      });
    }

    const currentPath = window.location.pathname;
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (currentPath === href || currentPath === href + "/") {
        link.classList.add("is-active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupLanguage();
    setupNav();
  });
})();
