// Davies & Co Solicitors

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  var scrollTop = document.querySelector(".scroll-top");

  // Header goes solid once the page scrolls; back-to-top appears further down
  function onScroll() {
    header.classList.toggle("is-solid", window.scrollY > 34);
    scrollTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  function setMenu(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  // Team bios
  document.querySelectorAll("[data-bio]").forEach(function (button) {
    var dialog = document.getElementById(button.dataset.bio);
    button.addEventListener("click", function () {
      dialog.showModal();
    });
  });

  document.querySelectorAll("dialog.bio").forEach(function (dialog) {
    dialog.querySelector(".bio-close").addEventListener("click", function () {
      dialog.close();
    });
    // A click on the dialog element itself (not its content) is a backdrop click
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  });

  // Testimonials: show one at a time, pausing while hovered or focused
  var slider = document.querySelector(".slider");
  var slides = slider.querySelectorAll(".slide");
  var current = 0;
  var paused = false;

  slides[0].classList.add("is-active");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // No rotation: list every testimonial instead
    slider.classList.add("show-all");
  } else {
    setInterval(function () {
      if (paused) return;
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 6000);
  }

  ["mouseenter", "focusin"].forEach(function (type) {
    slider.addEventListener(type, function () { paused = true; });
  });
  ["mouseleave", "focusout"].forEach(function (type) {
    slider.addEventListener(type, function () { paused = false; });
  });
})();
