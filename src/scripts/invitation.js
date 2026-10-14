import { event } from "../data/event";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------------------
// Portón de bienvenida
// ---------------------------------------------------------------------------
// Al cambiar de idioma con la invitación ya abierta, la página nueva se abre
// directo en el mismo punto en lugar de mostrar otra vez el portón.
const RESUME_KEY = "xv_resume_scroll";

function takeResumePosition() {
  try {
    const value = sessionStorage.getItem(RESUME_KEY);
    sessionStorage.removeItem(RESUME_KEY);
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
}

function initLanguageLinks() {
  document.querySelectorAll("[data-lang-link]").forEach((link) => {
    link.addEventListener("click", () => {
      if (!document.body.classList.contains("is-open")) return;
      try {
        sessionStorage.setItem(RESUME_KEY, String(window.scrollY));
      } catch {}
    });
  });
}

function initGate() {
  const gate = $("gate");
  const arch = $("gate-arch");
  const bow = $("gate-bow");
  const main = $("invitation-main");
  if (!gate || !arch || !bow || !main) return;

  main.inert = true;
  let opened = false;

  // La invitación siempre empieza en la portada; el navegador no debe
  // restaurar la posición de una visita anterior.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const resumeAt = takeResumePosition();
  if (resumeAt !== null) {
    gate.style.transition = "none";
    main.style.transition = "none";
    open({ instant: true });
    window.scrollTo(0, resumeAt);
    return;
  }

  window.scrollTo(0, 0);

  function open({ instant = false } = {}) {
    if (opened) return;
    opened = true;

    // Se desata el moño, se abren las puertas (dejando ver la invitación
    // detrás) y al final el portón se desvanece como si se entrara por él.
    const steps = instant || prefersReducedMotion ? [0, 0] : [450, 1500];
    gate.classList.add("opening", "untied");
    if (!instant) window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => {
      gate.classList.add("doors-open");
      main.classList.remove("blurred-init");
    }, steps[0]);
    setTimeout(() => {
      gate.classList.add("opened");
      gate.inert = true;
      main.inert = false;
      main.focus({ preventScroll: true });
      document.body.classList.add("is-open");
    }, steps[1]);
  }

  const AUTO_OPEN_KEY = "xv_auto_open";
  const urlParams = new URLSearchParams(window.location.search);
  const shouldAutoOpen = urlParams.get("open") === "1" || sessionStorage.getItem(AUTO_OPEN_KEY) === "1";
  if (shouldAutoOpen) {
    try { sessionStorage.removeItem(AUTO_OPEN_KEY); } catch {}
    if (urlParams.get("open")) {
      window.history.replaceState({}, "", window.location.pathname);
    }
    setTimeout(() => open(), 80);
  }

  // Todo el arco abre, no solo el moño: es más fácil de atinar.
  arch.addEventListener("click", () => open());

  // Botones de abrir en inglés o en español
  document.querySelectorAll("[data-open-lang]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetLang = btn.getAttribute("data-open-lang");
      const currentLang = document.documentElement.lang;

      if (targetLang === currentLang) {
        open();
      } else {
        try { sessionStorage.setItem(AUTO_OPEN_KEY, "1"); } catch {}
        window.location.href = targetLang === "es" ? "/es/" : "/";
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Partículas de fondo
// ---------------------------------------------------------------------------
function initParticles() {
  const canvas = $("ambient-canvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 24 }, (_, i) => {
    const isPetal = i % 2 === 0;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: isPetal ? Math.random() * 6 + 5 : Math.random() * 2 + 1,
      speedY: Math.random() * 0.6 + 0.3,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 1.2,
      isPetal,
      opacity: Math.random() * 0.5 + 0.2,
    };
  });

  let frame = null;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.beginPath();
      if (p.isPetal) {
        ctx.fillStyle = `rgba(138, 104, 171, ${p.opacity * 0.6})`;
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size, -p.size, p.size, p.size, 0, p.size);
        ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size, 0, -p.size);
      } else {
        ctx.fillStyle = `rgba(168, 138, 85, ${p.opacity * 0.7})`;
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();

      p.y += p.speedY;
      p.x += Math.sin(p.angle * 0.02) * 0.5;
      p.angle += p.spin;
      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
    }
    frame = requestAnimationFrame(draw);
  }

  // No gastar batería cuando la pestaña no está visible.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else frame = requestAnimationFrame(draw);
  });

  draw();
}

// ---------------------------------------------------------------------------
// Cuenta regresiva
// ---------------------------------------------------------------------------
function initCountdown() {
  const days = $("cd-days");
  const hours = $("cd-hours");
  const minutes = $("cd-minutes");
  if (!days || !hours || !minutes) return;

  const pad = (n) => String(n).padStart(2, "0");
  const MIN = 60 * 1000;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  function update() {
    const distance = Math.max(0, new Date(event.startsAt).getTime() - Date.now());
    days.textContent = pad(Math.floor(distance / DAY));
    hours.textContent = pad(Math.floor((distance % DAY) / HOUR));
    minutes.textContent = pad(Math.floor((distance % HOUR) / MIN));
  }

  update();
  setInterval(update, 30 * 1000);
}

// ---------------------------------------------------------------------------
// Confirmación de asistencia (RSVP vía WhatsApp)
// ---------------------------------------------------------------------------
function initRsvp() {
  const minusBtn = $("rsvp-minus");
  const plusBtn = $("rsvp-plus");
  const countDisplay = $("rsvp-count");
  const submitBtn = $("rsvp-submit-btn");
  if (!submitBtn) return;

  const phone = submitBtn.dataset.phone || (event.rsvp && event.rsvp.phone) || "17047494020";
  const quinceName = submitBtn.dataset.quince || event.quinceName || "Karen";
  const lang = document.documentElement.lang === "en" ? "en" : "es";

  let count = 2;

  function updateLink() {
    let msg = "";
    if (lang === "en") {
      msg = count === 1
        ? `Hello Rebecca! Confirming my attendance for ${quinceName}'s Sweet 15 🎉\n\n1 guest attending.\n\nThank you!`
        : `Hello Rebecca! Confirming our attendance for ${quinceName}'s Sweet 15 🎉\n\nGuests attending: ${count}\n\nThank you!`;
    } else {
      msg = count === 1
        ? `¡Hola Rebecca! Confirmo mi asistencia a los XV Años de ${quinceName} 🎉\n\nAsistirá: 1 persona.\n\n¡Muchas gracias!`
        : `¡Hola Rebecca! Confirmo nuestra asistencia a los XV Años de ${quinceName} 🎉\n\nPersonas que asistiremos: ${count}\n\n¡Muchas gracias!`;
    }

    submitBtn.href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
    if (countDisplay) countDisplay.textContent = String(count);
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        updateLink();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      if (count < 20) {
        count++;
        updateLink();
      }
    });
  }

  updateLink();
}

// ---------------------------------------------------------------------------
initLanguageLinks();
initParticles();
initGate();
initCountdown();
initRsvp();
