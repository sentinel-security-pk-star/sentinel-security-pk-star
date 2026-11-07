/*
  EMAILJS SETUP:
  Replace the three placeholder values below with your EmailJS
  Public Key, Service ID and Template ID. Never put an EmailJS
  Private Key or account password in this file.
*/
const EMAILJS_PUBLIC_KEY = "F-acngDLlIIr2YmXy";
const EMAILJS_SERVICE_ID = "service_b3g6l69";
const EMAILJS_TEMPLATE_ID = "template_9rwvnhf";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const topBtn = document.getElementById("topBtn");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  const configNote = document.getElementById("formConfigNote");

  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("click", event => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const updateTopButton = () => {
    if (topBtn) topBtn.classList.toggle("visible", window.scrollY > 350);
  };
  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  const navAnchors = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const emailjsReady =
    window.emailjs &&
    !EMAILJS_PUBLIC_KEY.startsWith("YOUR_") &&
    !EMAILJS_SERVICE_ID.startsWith("YOUR_") &&
    !EMAILJS_TEMPLATE_ID.startsWith("YOUR_");

  if (emailjsReady) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    if (configNote) configNote.hidden = true;
  } else if (configNote) {
    configNote.textContent = "EmailJS setup pending: add your Public Key, Service ID and Template ID in script.js.";
  }

  if (form) {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      if (!emailjsReady) {
        status.textContent = "The contact form is not configured yet. Please use WhatsApp for now.";
        status.classList.add("error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        status.textContent = "Your message has been sent successfully. Thank you!";
        status.classList.add("success");
        form.reset();
      } catch (error) {
        console.error("EmailJS error:", error);
        status.textContent = "Message could not be sent. Please try WhatsApp or try again later.";
        status.classList.add("error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <span aria-hidden="true">↗</span>';
      }
    });
  }
});
