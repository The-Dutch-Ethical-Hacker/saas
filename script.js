emailjs.init("aZ4T3xUnA92LWdsv2");

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".block").forEach(s => observer.observe(s));

// Modal
function openForm() {
  document.getElementById("formModal").style.display = "flex";
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

// Contact form
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  emailjs.sendForm("service_oymlaue", "template_1875ef6", e.target)
    .then(() => {
      document.getElementById("contactSuccess").innerText = "Message sent successfully!";
      e.target.reset();
    })
    .catch(() => {
      document.getElementById("contactSuccess").innerText = "Something went wrong.";
    });
});

// Stripe
const stripe = Stripe("pk_live_REPLACE_WITH_YOUR_KEY");

document.getElementById("monitoringForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);

  stripe.redirectToCheckout({
    lineItems: [{ price: "plink_1SmsAW03EnbOTtZXz7yxTCbs", quantity: 1 }],
    mode: "subscription",
    customerEmail: data.get("email"),
    successUrl: window.location.origin + "/thank-you.html",
    cancelUrl: window.location.href
  });
});

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// Sluit menu bij klik op link
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");

  });
});
