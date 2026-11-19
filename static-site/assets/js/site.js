// Davies & Co Solicitors

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  // Header goes solid once the page scrolls past the top of the hero
  function updateHeader() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

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
})();
