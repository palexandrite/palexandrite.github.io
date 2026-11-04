// main script
(function () {
  "use strict";
  console.log("hello, this is my blog. Message me");

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const navToggle = document.querySelector("#nav-toggle");
  const navMenu = document.querySelector("#nav-menu");
  const dropdownMenuToggler = document.querySelectorAll(".nav-dropdown > .nav-link");

  dropdownMenuToggler.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      event.currentTarget.closest(".nav-dropdown")?.classList.toggle("active");
    });
  });

  if (navToggle instanceof HTMLInputElement && navMenu) {
    const closeNavigation = () => {
      navToggle.checked = false;
      document.body.classList.remove("mobile-nav-open");
    };

    navToggle.addEventListener("change", () => {
      document.body.classList.toggle("mobile-nav-open", navToggle.checked);
    });

    navMenu.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.checked) {
        closeNavigation();
        navToggle.focus();
      }
    });

    window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
      if (event.matches) {
        closeNavigation();
      }
    });
  }

  // Home page title typewriter
  // ----------------------------------------
  const heroTitle = document.querySelector(".hero-title-typewriter");
  const heroQuote = document.querySelector(".hero-quote-typewriter");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (heroTitle && heroQuote && !reduceMotion) {
    const titleText = heroTitle.textContent.trim();
    const quoteText = heroQuote.textContent.trim();
    const characters = Array.from(titleText + quoteText);
    let characterIndex = 0;
    const renderTitle = () => {
      const currentText = characters.slice(0, characterIndex).join("");
      heroTitle.textContent = currentText.slice(0, titleText.length);
      heroQuote.textContent = currentText.slice(titleText.length);
      heroTitle.classList.toggle("is-typing", characterIndex <= titleText.length);
      heroQuote.classList.toggle("is-typing", characterIndex > titleText.length);
    };

    const deleteNextCharacter = () => {
      characterIndex -= 1;
      renderTitle();

      if (characterIndex > 0) {
        window.setTimeout(deleteNextCharacter, 45);
      } else {
        window.setTimeout(typeNextCharacter, 300);
      }
    };

    const typeNextCharacter = () => {
      characterIndex += 1;
      renderTitle();

      if (characterIndex < characters.length) {
        window.setTimeout(typeNextCharacter, 70);
      } else {
        window.setTimeout(deleteNextCharacter, 10000);
      }
    };

    characterIndex = 0;
    renderTitle();
    window.setTimeout(typeNextCharacter, 300);
  }

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
})();
