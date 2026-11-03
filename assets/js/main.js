// main script
(function () {
  "use strict";
  console.log("hello, this is my blog. Message me");

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("active");
    });
  });

  // Home page title typewriter
  // ----------------------------------------
  const heroTitle = document.querySelector(".hero-title-typewriter");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (heroTitle && !reduceMotion) {
    const characters = Array.from(heroTitle.textContent.trim());
    let characterIndex = 0;
    const renderTitle = () => {
      heroTitle.textContent = characters.slice(0, characterIndex).join("");
    };

    heroTitle.classList.add("is-typing");

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
