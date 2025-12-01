const API_URL = "https://lunavoe.com/gloriawithjunman/rsvp";

const form = document.getElementById("rsvp-form");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
      alert("提交失败，请稍后重试");
    }
  } catch (err) {
    console.error(err);
    alert("提交失败，请检查网络");
  }
});
