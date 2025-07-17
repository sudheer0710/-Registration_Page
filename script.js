let shareCount = 0;
const maxShares = 5;

const shareBtn = document.getElementById("shareBtn");
const clickCounter = document.getElementById("clickCounter");
const shareStatus = document.getElementById("shareStatus");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

if (localStorage.getItem("submitted") === "true") {
  disableForm();
}

shareBtn.addEventListener("click", () => {
  if (shareCount < maxShares) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");

    shareCount++;
    clickCounter.textContent = `Click count: ${shareCount}/${maxShares}`;

    if (shareCount >= maxShares) {
      shareStatus.textContent = "✅ Sharing complete. Please continue.";
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < maxShares) {
    alert("Please complete 5 shares on WhatsApp before submitting.");
    return;
  }

  const formData = new FormData(form);
  const file = formData.get("screenshot");

  const reader = new FileReader();
  reader.onloadend = async () => {
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      college: formData.get("college"),
      screenshot: reader.result
    };

    try {
      await fetch("YOUR SCRIPT URL", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
      });

      localStorage.setItem("submitted", "true");
      disableForm();
      successMsg.classList.remove("hidden");
    } catch (err) {
      alert("Submission failed. Please try again.");
      console.error(err);
    }
  };

  reader.readAsDataURL(file);
});

function disableForm() {
  [...form.elements].forEach((input) => (input.disabled = true));
  submitBtn.disabled = true;
  shareBtn.disabled = true;
  successMsg.classList.remove("hidden");
}
