(function () {
  const PASSWORD = "JMGLORIA2026";
  const API_URL = "https://www.lunavoe.com/gloriawithjunman/rsvp-api";

  const pwdForm = document.getElementById("rsvp-password-form");
  const mainForm = document.getElementById("rsvp-main-form");
  const pwdStatus = document.getElementById("rsvp-password-status");
  const rsvpStatus = document.getElementById("rsvp-status");
  const attendingYesBlock = document.querySelector("[data-rsvp-attending-yes]");
  const allergyDetails = document.querySelector("[data-rsvp-allergy-details]");
  const guestDetails = document.querySelector("[data-rsvp-guest-details]");
  const guestAllergyDetails = document.querySelector(
    "[data-rsvp-guest-allergy-details]"
  );

  // Store the validated password
  let validatedPassword = null;

  function currentLangDict() {
    const langKey =
      window.localStorage.getItem("lunavoe_lang") === "zh" ? "zh" : "en";
    return window.I18N[langKey] || window.I18N.en;
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

  if (pwdForm && mainForm) {
    mainForm.style.display = "none";

    pwdForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dict = currentLangDict();
      const pwdInput = document.getElementById("rsvp-password");
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
      // Store the validated password for API submission
      validatedPassword = val;
      pwdStatus.textContent = "";
      pwdForm.style.display = "none";
      mainForm.style.display = "block";
      syncConditionalFields();
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

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Include the passcode that the backend expects
          body: JSON.stringify({ 
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
          }),
        });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        
        // Check for invalid password response from backend
        if (data.status === "invalid_password") {
          throw new Error("Invalid password");
        }
        
        if (data.status !== "success") throw new Error("Bad response");

        rsvpStatus.textContent = dict.rsvp_status_success;
        rsvpStatus.className = "rsvp-status rsvp-status--success";
        mainForm.reset();
        syncConditionalFields();
      } catch (err) {
        console.error(err);
        rsvpStatus.textContent = dict.rsvp_status_error;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
      }
    });
  }
})();
