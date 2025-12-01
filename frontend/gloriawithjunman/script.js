const API_URL = "https://lunavoe.com/gloriawithjunman/rsvp";

const form = document.getElementById("rsvp-form");
const successMsg = document.getElementById("success-msg");
const submitBtn = form.querySelector("button[type='submit']");
const spinner = submitBtn.querySelector(".spinner");
const btnLabel = submitBtn.querySelector(".btn-label");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // lock UI to prevent duplicate submits
  successMsg.style.display = "none";
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  if (btnLabel) btnLabel.textContent = "Submitting...";
  if (spinner) spinner.style.display = "inline-block";

  const formData = {
    name: form.name.value,
    attending: form.attending.value,
    message: form.message.value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.status === "success") {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Submission failed, please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Submission failed, please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    if (btnLabel) btnLabel.textContent = "Submit RSVP";
    if (spinner) spinner.style.display = "none";
  }
});
