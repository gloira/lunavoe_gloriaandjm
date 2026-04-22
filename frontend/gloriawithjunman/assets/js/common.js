(function () {
  const LANG_KEY = "lunavoe_lang";
  const RSVP_STATE_KEY = "lunavoe_rsvp_state";
  const WEDDING_DAY = new Date("2026-09-12T00:00:00+08:00");

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

    updateRsvpStateButtons();
  }

  function getRsvpState() {
    try {
      const raw = window.localStorage.getItem(RSVP_STATE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function formatCountdown(lang) {
    const now = new Date();
    const diff = WEDDING_DAY.getTime() - now.getTime();
    const dict = (window.I18N && window.I18N[lang]) || window.I18N.en;

    if (diff <= 0) {
      return dict.rsvp_countdown_today || (lang === "zh" ? "\u5c31\u662f\u4eca\u5929" : "Today");
    }

    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    if (lang === "zh") {
      return days > 0 ? `${days}\u5929 ${hours}\u5c0f\u65f6` : `${hours}\u5c0f\u65f6 ${minutes}\u5206\u949f`;
    }

    return days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
  }

  function updateRsvpStateButtons() {
    const state = getRsvpState();
    const lang = getCurrentLang();
    const dict = (window.I18N && window.I18N[lang]) || window.I18N.en;
    const rsvpLinks = Array.from(
      document.querySelectorAll('a[href$="/rsvp/"], a[href$="/rsvp"]')
    );
    const stateButtons = Array.from(
      document.querySelectorAll("[data-rsvp-state-button]")
    );
    const targets = rsvpLinks.concat(stateButtons);

    if (!targets.length) return;

    if (!state) {
      targets.forEach((target) => {
        target.classList.remove("rsvp-state-button");
        target.removeAttribute("data-rsvp-state-active");
      });
      return;
    }

    const label =
      state.attending === "Yes"
        ? dict.rsvp_state_attending || "Attending"
        : dict.rsvp_state_submitted || "RSVP sent";
    const countdown = formatCountdown(lang);

    targets.forEach((target) => {
      target.classList.add("rsvp-state-button");
      target.setAttribute("data-rsvp-state-active", "true");
      target.innerHTML = `<span class="rsvp-state-label">${label}</span><span class="rsvp-state-countdown">${countdown}</span>`;
    });
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
        updateRsvpStateButtons();
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

  function setupVenueLightbox() {
    const lightbox = document.querySelector("[data-venue-lightbox]");
    if (!lightbox) return;

    const image = lightbox.querySelector("[data-lightbox-image]");
    const prev = lightbox.querySelector("[data-lightbox-prev]");
    const next = lightbox.querySelector("[data-lightbox-next]");
    const close = lightbox.querySelector(".venue-lightbox-close");
    const closeButtons = lightbox.querySelectorAll("[data-lightbox-close]");
    const stage = lightbox.querySelector("[data-lightbox-stage]");

    const galleries = Array.from(
      document.querySelectorAll("[data-lightbox-gallery]")
    )
      .map((track) => {
        const items = Array.from(track.querySelectorAll(".venue-gallery-card"));

        return {
          track,
          items,
        };
      })
      .filter((gallery) => gallery.items.length);

    if (!galleries.length || !image) return;

    const state = {
      galleryIndex: 0,
      itemIndex: 0,
      lastTrigger: null,
      touchStartX: 0,
      touchStartY: 0,
    };

    function getCurrentGallery() {
      return galleries[state.galleryIndex];
    }

    function getCurrentItem() {
      return getCurrentGallery().items[state.itemIndex];
    }

    function updateNavState() {
      const gallery = getCurrentGallery();
      const atStart = state.itemIndex === 0;
      const atEnd = state.itemIndex === gallery.items.length - 1;

      if (prev) {
        prev.disabled = atStart;
      }

      if (next) {
        next.disabled = atEnd;
      }
    }

    function preloadNearbyImages() {
      const gallery = getCurrentGallery();
      const nearbyIndexes = [state.itemIndex - 1, state.itemIndex + 1].filter(
        (index) => index >= 0 && index < gallery.items.length
      );

      nearbyIndexes.forEach((index) => {
        const source = gallery.items[index].querySelector("img");
        if (!source) return;

        const preload = new Image();
        preload.src = source.currentSrc || source.src;
      });
    }

    function renderLightbox() {
      const item = getCurrentItem();
      const source = item.querySelector("img");
      if (!source) return;

      image.src = source.currentSrc || source.src;
      image.alt = source.alt || "";

      updateNavState();
      preloadNearbyImages();
    }

    function openLightbox(galleryIndex, itemIndex, trigger) {
      state.galleryIndex = galleryIndex;
      state.itemIndex = itemIndex;
      state.lastTrigger = trigger || null;

      renderLightbox();

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("venue-lightbox-open");
      document.addEventListener("keydown", handleKeydown);

      if (close) {
        window.requestAnimationFrame(() => close.focus());
      }
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("venue-lightbox-open");
      document.removeEventListener("keydown", handleKeydown);

      if (state.lastTrigger && typeof state.lastTrigger.focus === "function") {
        state.lastTrigger.focus();
      }
    }

    function stepLightbox(direction) {
      const gallery = getCurrentGallery();
      const nextIndex = state.itemIndex + direction;

      if (nextIndex < 0 || nextIndex >= gallery.items.length) return;

      state.itemIndex = nextIndex;
      renderLightbox();
    }

    function handleKeydown(event) {
      if (!lightbox.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        stepLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        stepLightbox(1);
      }
    }

    galleries.forEach((gallery, galleryIndex) => {
      gallery.track.addEventListener("click", (event) => {
        const item = event.target.closest(".venue-gallery-card");
        if (!item || !gallery.track.contains(item)) return;

        const itemIndex = gallery.items.indexOf(item);
        if (itemIndex === -1) return;

        openLightbox(galleryIndex, itemIndex, item);
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeLightbox);
    });

    if (prev) {
      prev.addEventListener("click", () => stepLightbox(-1));
    }

    if (next) {
      next.addEventListener("click", () => stepLightbox(1));
    }

    if (stage) {
      stage.addEventListener(
        "touchstart",
        (event) => {
          const touch = event.changedTouches[0];
          state.touchStartX = touch.clientX;
          state.touchStartY = touch.clientY;
        },
        { passive: true }
      );

      stage.addEventListener(
        "touchend",
        (event) => {
          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - state.touchStartX;
          const deltaY = touch.clientY - state.touchStartY;

          if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
          }

          if (deltaX < 0) {
            stepLightbox(1);
            return;
          }

          stepLightbox(-1);
        },
        { passive: true }
      );
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
    setupVenueLightbox();
    setupScrollGalleries();
    updateRsvpStateButtons();
    window.setInterval(updateRsvpStateButtons, 60000);
    window.addEventListener("lunavoe:rsvp-state-updated", updateRsvpStateButtons);
  });
})();
