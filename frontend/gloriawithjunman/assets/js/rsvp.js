(function () {
  const PASSWORD = "JMGLORIA2026";
  const API_URL = "https://www.lunavoe.com/gloriawithjunman/rsvp";

  const pwdForm = document.getElementById("rsvp-password-form");
  const mainForm = document.getElementById("rsvp-main-form");
  const pwdStatus = document.getElementById("rsvp-password-status");
  const rsvpStatus = document.getElementById("rsvp-status");

  function currentLangDict() {
    const langKey =
      window.localStorage.getItem("lunavoe_lang") === "zh" ? "zh" : "en";
    return window.I18N[langKey] || window.I18N.en;
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
      pwdStatus.textContent = "";
      pwdForm.style.display = "none";
      mainForm.style.display = "block";
      document
        .getElementById("rsvp-name")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });

    mainForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dict = currentLangDict();
      const formData = new FormData(mainForm);
      const name = (formData.get("name") || "").toString().trim();
      const attending = (formData.get("attending") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();

      if (!name || !attending) {
        rsvpStatus.textContent = dict.rsvp_status_missing;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
        return;
      }

      rsvpStatus.textContent = dict.rsvp_status_sending;
      rsvpStatus.className = "rsvp-status rsvp-status--info";

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, attending, message }),
        });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (data.status !== "success") throw new Error("Bad response");

        rsvpStatus.textContent = dict.rsvp_status_success;
        rsvpStatus.className = "rsvp-status rsvp-status--success";
        mainForm.reset();
      } catch (err) {
        console.error(err);
        rsvpStatus.textContent = dict.rsvp_status_error;
        rsvpStatus.className = "rsvp-status rsvp-status--error";
      }
    });
  }
})();
