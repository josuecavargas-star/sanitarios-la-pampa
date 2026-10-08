/* =========================================================
   Sanitarios La Pampa - JavaScript principal
   ========================================================= */

const initSite = () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
      });
    });
  }

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !mensaje) {
        note.style.color = "#c0392b";
        note.textContent = "Por favor completá todos los campos.";
        return;
      }

      const whatsappText = [
        "Hola, quiero solicitar un servicio.",
        `Nombre: ${nombre}`,
        `Consulta: ${mensaje}`,
      ].join("\n");

      const whatsappUrl = new URL("https://wa.me/50683444802");
      whatsappUrl.searchParams.set("text", whatsappText);

      const whatsappWindow = window.open(whatsappUrl.toString(), "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
      } else {
        window.location.href = whatsappUrl.toString();
      }

      note.style.color = "#189b1b";
      note.textContent = "Revisa el mensaje en WhatsApp y pulsa Enviar para contactarnos.";
    });
  }

  document.querySelectorAll(".slider").forEach((sliderEl) => {
    const track = sliderEl.querySelector(".slider__track");
    const slides = track ? Array.from(track.children) : [];
    const prevBtn = sliderEl.querySelector(".slider__arrow--prev");
    const nextBtn = sliderEl.querySelector(".slider__arrow--next");
    const dotsWrap = sliderEl.querySelector(".slider__dots");

    if (!track || slides.length === 0) return;

    let current = 0;
    let autoplayTimer = null;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      if (dotsWrap) {
        const dots = Array.from(dotsWrap.children);
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
      }
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      const autoplayInterval = Number(sliderEl.dataset.autoplayInterval) || 5000;
      autoplayTimer = setInterval(next, autoplayInterval);
    }

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
      dot.addEventListener("click", () => {
        goTo(i);
        startAutoplay();
      });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        next();
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prev();
        startAutoplay();
      });
    }

    sliderEl.addEventListener("mouseenter", stopAutoplay);
    sliderEl.addEventListener("mouseleave", startAutoplay);

    let touchStartX = 0;
    track.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (event) => {
      const diff = event.changedTouches[0].screenX - touchStartX;

      if (Math.abs(diff) > 40) {
        diff < 0 ? next() : prev();
        startAutoplay();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        next();
        startAutoplay();
      }
      if (event.key === "ArrowLeft") {
        prev();
        startAutoplay();
      }
    });

    goTo(0);
    startAutoplay();
  });

  const revealElements = document.querySelectorAll(".card, .stat");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}