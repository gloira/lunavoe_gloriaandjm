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

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      const val = dict[key];
      if (val != null) {
        el.setAttribute("content", val);
      }
    });

    const topBar = document.querySelector("[data-i18n-topbar]");
    if (topBar && dict.top_bar) {
      topBar.textContent = dict.top_bar;
    }

    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) {
      langBtn.textContent = lang === "en" ? "\u4e2d\u6587" : "EN";
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
    const mobileClose = document.querySelector("[data-mobile-close]");

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

      if (mobileClose) {
        mobileClose.addEventListener("click", () => {
          hamburger.classList.remove("is-open");
          mobilePanel.classList.remove("show");
        });
      }
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

  function setupVenueGallery() {
    const track = document.querySelector("[data-venue-track]");
    if (!track) return;

    const prev = document.querySelector("[data-venue-prev]");
    const next = document.querySelector("[data-venue-next]");

    function scrollByCard(direction) {
      const card = track.querySelector(".venue-gallery-card");
      const width = card ? card.getBoundingClientRect().width : track.clientWidth;
      track.scrollBy({ left: width * direction, behavior: "smooth" });
    }

    if (prev) {
      prev.addEventListener("click", () => scrollByCard(-1));
    }

    if (next) {
      next.addEventListener("click", () => scrollByCard(1));
    }
  }

  function setupRenaissanceGallery() {
    const track = document.querySelector("[data-renaissance-track]");
    if (!track) return;

    const prev = document.querySelector("[data-renaissance-prev]");
    const next = document.querySelector("[data-renaissance-next]");

    function scrollByCard(direction) {
      // Scroll by 50% of container width to show next/prev pair of images
      const scrollAmount = track.clientWidth * 0.5 * direction;
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    if (prev) {
      prev.addEventListener("click", () => scrollByCard(-1));
    }

    if (next) {
      next.addEventListener("click", () => scrollByCard(1));
    }
  }

  function setupScrollGalleries() {
    document.querySelectorAll("[data-scroll-prev], [data-scroll-next]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.closest(".dc-group");
        if (!group) return;

        const track = group.querySelector("[data-scroll-gallery]");
        if (!track) return;

        const card = track.querySelector("figure");
        const width = card ? card.getBoundingClientRect().width : track.clientWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap || 0) || 0;
        const direction = btn.hasAttribute("data-scroll-prev") ? -1 : 1;

        track.scrollBy({ left: (width + gap) * direction, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupLanguage();
    setupNav();
    setupVenueGallery();
    setupRenaissanceGallery();
    setupScrollGalleries();
  });
})();
