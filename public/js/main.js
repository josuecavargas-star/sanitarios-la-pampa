/* =========================================================
   Sanitarios La Pampa - JavaScript principal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Menú de navegación móvil ---------- */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });

    // Cerrar el menú al hacer clic en un enlace
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
      });
    });
  }

  /* ---------- Formulario de contacto ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const telefono = form.telefono.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !telefono || !mensaje) {
        note.style.color = "#c0392b";
        note.textContent = "Por favor completá todos los campos.";
        return;
      }

      // Aquí puedes conectar un servicio real (Netlify Forms, Formspree, etc.)
      note.style.color = "#189b1b";
      note.textContent = `¡Gracias, ${nombre}! Recibimos tu mensaje.`;
      form.reset();
    });
  }

  /* ---------- Slider / Galería ---------- */
  const track = document.getElementById("sliderTrack");
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");
  const dotsWrap = document.getElementById("sliderDots");

  if (track && slides.length > 0) {
    let current = 0;
    let autoplayTimer = null;

    // Crear los indicadores (puntos) dinámicamente
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slider__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });

    // Autoplay cada 5 segundos
    function start() { autoplayTimer = setInterval(next, 5000); }
    function stop() { clearInterval(autoplayTimer); }
    function restart() { stop(); start(); }

    // Pausar al pasar el mouse
    const sliderEl = document.querySelector(".slider");
    if (sliderEl) {
      sliderEl.addEventListener("mouseenter", stop);
      sliderEl.addEventListener("mouseleave", start);
    }

    // Soporte para swipe en móviles
    let touchStartX = 0;
    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 40) {
        diff < 0 ? next() : prev();
        restart();
      }
    });

    // Teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });

    start();
  }

  /* ---------- Animación de aparición al hacer scroll ---------- */
  const revealElements = document.querySelectorAll(".card, .stat");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }
});