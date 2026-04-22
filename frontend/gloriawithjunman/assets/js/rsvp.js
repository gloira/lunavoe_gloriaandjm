(function () {
  const PASSWORD = "JMGLORIA2026";
  const API_URL = "https://www.lunavoe.com/gloriawithjunman/rsvp-api";
  const RSVP_STATE_KEY = "lunavoe_rsvp_state";
  const HOME_URL = new URL("../", window.location.href).href;

  const pwdForm = document.getElementById("rsvp-password-form");
  const mainForm = document.getElementById("rsvp-main-form");
  const pwdInput = document.getElementById("rsvp-password");
  const pwdToggle = document.querySelector("[data-password-toggle]");
  const pwdStatus = document.getElementById("rsvp-password-status");
  const rsvpStatus = document.getElementById("rsvp-status");
  const attendingYesBlock = document.querySelector("[data-rsvp-attending-yes]");
  const allergyDetails = document.querySelector("[data-rsvp-allergy-details]");
  const guestDetails = document.querySelector("[data-rsvp-guest-details]");
  const guestAllergyDetails = document.querySelector(
    "[data-rsvp-guest-allergy-details]"
  );
  const existingNote = document.getElementById("rsvp-existing-note");
  const existingTitle = document.getElementById("rsvp-existing-title");
  const existingBody = document.getElementById("rsvp-existing-body");
  const updateTip = document.getElementById("rsvp-update-tip");
  const submitButton = mainForm
    ? mainForm.querySelector('button[type="submit"]')
    : null;

  let validatedPassword = null;

  function currentLang() {
    if (window.LUNAVOE_LANG === "zh" || window.LUNAVOE_LANG === "en") {
      return window.LUNAVOE_LANG;
    }
    if (document.documentElement.lang.toLowerCase().startsWith("zh")) {
      return "zh";
    }
    const stored = window.localStorage.getItem("lunavoe_lang");
    if (stored === "zh") return "zh";
    return "en";
  }

  function currentLangDict() {
    const langKey = currentLang();
    return (window.I18N && window.I18N[langKey]) || window.I18N.en;
  }

  function i18nText(key, fallback) {
    const dict = currentLangDict();
    return dict[key] || fallback;
  }

  function passwordToggleLabel(isVisible) {
    return isVisible
      ? i18nText("rsvp_password_hide", "Hide")
      : i18nText("rsvp_password_show", "Show");
  }

  function updatePasswordToggle() {
    if (!pwdInput || !pwdToggle) return;

    const isVisible = pwdInput.type === "text";
    pwdToggle.textContent = passwordToggleLabel(isVisible);
    pwdToggle.setAttribute("aria-pressed", isVisible ? "true" : "false");
    pwdToggle.setAttribute("aria-label", passwordToggleLabel(isVisible));
  }

  function getStoredState() {
    try {
      return JSON.parse(window.localStorage.getItem(RSVP_STATE_KEY) || "null");
    } catch (err) {
      return null;
    }
  }

  function selectedValue(name) {
    const field = mainForm.querySelector(`input[name="${name}"]:checked`);
    return field ? field.value : "";
  }

  function clearFields(selector) {
    if (!mainForm) return;

    mainForm.querySelectorAll(selector).forEach((field) => {
      if (field.type === "radio" || field.type === "checkbox") {
        field.checked = false;
        return;
      }

      field.value = "";
    });
  }

  function toggleSection(section, shouldShow, clearSelector) {
    if (!section) return;

    section.hidden = !shouldShow;

    if (!shouldShow && clearSelector) {
      clearFields(clearSelector);
    }
  }

  function syncConditionalFields() {
    const attending = selectedValue("attending");
    const hasAllergy = selectedValue("hasAllergy");
    const bringingGuest = selectedValue("bringingGuest");
    const guestHasAllergy = selectedValue("guestHasAllergy");

    toggleSection(
      attendingYesBlock,
      attending === "Yes",
      'input[name="hasAllergy"], textarea[name="allergyRemarks"], input[name="bringingGuest"], input[name="guestName"], input[name="guestHasAllergy"], textarea[name="guestAllergyRemarks"]'
    );

    toggleSection(
      allergyDetails,
      attending === "Yes" && hasAllergy === "Yes",
      'textarea[name="allergyRemarks"]'
    );

    toggleSection(
      guestDetails,
      attending === "Yes" && bringingGuest === "Yes",
      'input[name="guestName"], input[name="guestHasAllergy"], textarea[name="guestAllergyRemarks"]'
    );

    toggleSection(
      guestAllergyDetails,
      attending === "Yes" &&
        bringingGuest === "Yes" &&
        guestHasAllergy === "Yes",
      'textarea[name="guestAllergyRemarks"]'
    );
  }

  function rememberRsvpState(payload) {
    try {
      window.localStorage.setItem(
        RSVP_STATE_KEY,
        JSON.stringify({
          id: payload.id || "",
          name: payload.name || "",
          attending: payload.attending || "",
          hasAllergy: payload.hasAllergy || "",
          allergyRemarks: payload.allergyRemarks || "",
          bringingGuest: payload.bringingGuest || "",
          guestName: payload.guestName || "",
          guestHasAllergy: payload.guestHasAllergy || "",
          guestAllergyRemarks: payload.guestAllergyRemarks || "",
          message: payload.message || "",
          submittedAt: new Date().toISOString(),
        })
      );

      if (typeof window.updateLunavoeRsvpStateButtons === "function") {
        window.updateLunavoeRsvpStateButtons();
      }
      window.dispatchEvent(new CustomEvent("lunavoe:rsvp-state-updated"));
    } catch (err) {
      // convenience only
    }
  }

  function isSuccessResponse(data) {
    const status = (data && data.status ? data.status : "")
      .toString()
      .toLowerCase()
      .replace(/[\s-]+/g, "_");

    return (
      data &&
      (data.success === true ||
        status === "success" ||
        status === "submitted_successfully" ||
        status === "submitted")
    );
  }

  function redirectHome() {
    window.location.assign(HOME_URL);
  }

  function setRadioValue(name, value) {
    if (!value) return;
    const field = mainForm.querySelector(`input[name="${name}"][value="${value}"]`);
    if (field) field.checked = true;
  }

  function prefillFormFromState(state) {
    if (!state || !mainForm) return;

    const nameInput = document.getElementById("rsvp-name");
    const allergyRemarksInput = document.getElementById("rsvp-allergy-remarks");
    const guestNameInput = document.getElementById("rsvp-guest-name");
    const guestAllergyRemarksInput = document.getElementById("rsvp-guest-allergy-remarks");
    const messageInput = document.getElementById("rsvp-message");

    setRadioValue("attending", state.attending || "");
    setRadioValue("hasAllergy", state.hasAllergy || "");
    setRadioValue("bringingGuest", state.bringingGuest || "");
    setRadioValue("guestHasAllergy", state.guestHasAllergy || "");

    if (nameInput) nameInput.value = state.name || "";
    if (allergyRemarksInput) allergyRemarksInput.value = state.allergyRemarks || "";
    if (guestNameInput) guestNameInput.value = state.guestName || "";
    if (guestAllergyRemarksInput) guestAllergyRemarksInput.value = state.guestAllergyRemarks || "";
    if (messageInput) messageInput.value = state.message || "";

    syncConditionalFields();
  }

  function updateSubmitButtonLabel(isEditing) {
    if (!submitButton) return;

    submitButton.textContent = isEditing
      ? i18nText("rsvp_btn_update", "Update RSVP")
      : i18nText("rsvp_btn_submit", "Send RSVP");
  }

  function renderExistingBanner(state) {
    if (!existingNote || !existingTitle || !existingBody || !updateTip) return;

    if (!state || !state.attending) {
      existingNote.hidden = true;
      updateTip.textContent = i18nText(
        "rsvp_existing_empty_tip",
        "You can come back and submit this form again anytime to update your RSVP."
      );
      return;
    }

    existingNote.hidden = false;
    existingTitle.textContent =
      state.attending === "Yes"
        ? i18nText("rsvp_existing_yes_title", "You’re confirmed attending")
        : i18nText("rsvp_existing_no_title", "You’ve replied not attending");
    existingBody.textContent = i18nText(
      "rsvp_existing_body",
      "Unlock the form below and submit again anytime to update your RSVP. Your latest submission will be treated as your current response."
    );
    updateTip.textContent = i18nText(
      "rsvp_existing_update_tip",
      "You can return anytime and resubmit this form to update your RSVP."
    );
  }

  if (pwdForm && mainForm) {
    const initialState = getStoredState();
    renderExistingBanner(initialState);
    updateSubmitButtonLabel(Boolean(initialState));

    mainForm.style.display = "none";

    document.addEventListener("DOMContentLoaded", () => {
      renderExistingBanner(getStoredState());
      updateSubmitButtonLabel(Boolean(getStoredState()));
      updatePasswordToggle();
    });

    const langToggle = document.querySelector("[data-lang-toggle]");
    if (langToggle) {
      langToggle.addEventListener("click", () => {
        window.setTimeout(() => {
          const state = getStoredState();
          renderExistingBanner(state);
          updateSubmitButtonLabel(Boolean(state));
          updatePasswordToggle();
        }, 0);
      });
    }

    window.addEventListener("lunavoe:language-updated", () => {
      const state = getStoredState();
      renderExistingBanner(state);
      updateSubmitButtonLabel(Boolean(state));
      updatePasswordToggle();
    });

    if (pwdInput && pwdToggle) {
      updatePasswordToggle();
      pwdToggle.addEventListener("click", () => {
        pwdInput.type = pwdInput.type === "password" ? "text" : "password";
        updatePasswordToggle();
        pwdInput.focus();
      });
    }

    pwdForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dict = currentLangDict();
      const val = (pwdInput.value || "").trim();

      if (!val) {
        pwdStatus.textContent = dict.rsvp_status_pwd_missing;
        pwdStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (val !== PASSWORD) {
        pwdStatus.textContent = dict.rsvp_status_pwd_wrong;
        pwdStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      validatedPassword = val;
      pwdStatus.textContent = "";
      pwdForm.style.display = "none";
      mainForm.style.display = "block";

      const state = getStoredState();
      if (state) {
        prefillFormFromState(state);
        updateSubmitButtonLabel(true);
      } else {
        syncConditionalFields();
        updateSubmitButtonLabel(false);
      }
    });

    mainForm.addEventListener("change", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== "radio") return;

      syncConditionalFields();
    });

    mainForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dict = currentLangDict();
      const existingState = getStoredState();
      const formData = new FormData(mainForm);

      const name = (formData.get("name") || "").toString().trim();
      const attending = (formData.get("attending") || "").toString().trim();
      const hasAllergy = (formData.get("hasAllergy") || "").toString().trim();
      const allergyRemarks = (formData.get("allergyRemarks") || "")
        .toString()
        .trim();
      const bringingGuest = (formData.get("bringingGuest") || "")
        .toString()
        .trim();
      const guestName = (formData.get("guestName") || "").toString().trim();
      const guestHasAllergy = (formData.get("guestHasAllergy") || "")
        .toString()
        .trim();
      const guestAllergyRemarks = (formData.get("guestAllergyRemarks") || "")
        .toString()
        .trim();
      const message = (formData.get("message") || "").toString().trim();

      if (!name || !attending) {
        rsvpStatus.textContent = dict.rsvp_status_missing;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (attending === "Yes" && !hasAllergy) {
        rsvpStatus.textContent = dict.rsvp_status_missing_details;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (attending === "Yes" && hasAllergy === "Yes" && !allergyRemarks) {
        rsvpStatus.textContent = dict.rsvp_status_missing_details;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (attending === "Yes" && !bringingGuest) {
        rsvpStatus.textContent = dict.rsvp_status_missing_details;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (attending === "Yes" && bringingGuest === "Yes" && !guestName) {
        rsvpStatus.textContent = dict.rsvp_status_missing_details;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (
        attending === "Yes" &&
        bringingGuest === "Yes" &&
        !guestHasAllergy
      ) {
        rsvpStatus.textContent = dict.rsvp_status_missing_details;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      if (
        attending === "Yes" &&
        bringingGuest === "Yes" &&
        guestHasAllergy === "Yes" &&
        !guestAllergyRemarks
      ) {
        rsvpStatus.textContent = dict.rsvp_status_missing_details;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      rsvpStatus.textContent = dict.rsvp_status_sending;
      rsvpStatus.className = "rsvp-status rsvp-status--info";

      const payload = {
        recordId: existingState?.id || "",
        passcode: validatedPassword,
        name,
        attending,
        hasAllergy: attending === "Yes" ? hasAllergy : "",
        allergyRemarks: attending === "Yes" ? allergyRemarks : "",
        bringingGuest: attending === "Yes" ? bringingGuest : "",
        guestName:
          attending === "Yes" && bringingGuest === "Yes" ? guestName : "",
        guestHasAllergy:
          attending === "Yes" && bringingGuest === "Yes"
            ? guestHasAllergy
            : "",
        guestAllergyRemarks:
          attending === "Yes" &&
          bringingGuest === "Yes" &&
          guestHasAllergy === "Yes"
            ? guestAllergyRemarks
            : "",
        message
      };

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        if (data.status === "invalid_password") {
          throw new Error("Invalid password");
        }

        if (!isSuccessResponse(data)) throw new Error("Bad response");

        rememberRsvpState({
          id: data.id,
          ...payload
        });

        rsvpStatus.textContent = dict.rsvp_status_success;
        rsvpStatus.className = "rsvp-status rsvp-status--success";

        setTimeout(redirectHome, 900);
      } catch (err) {
        console.error(err);
        rsvpStatus.textContent = dict.rsvp_status_error;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
      }
    });

    window.addEventListener("storage", () => {
      const state = getStoredState();
      renderExistingBanner(state);
      updateSubmitButtonLabel(Boolean(state));
    });
  }
})();
