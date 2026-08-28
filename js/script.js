/* =========================================================
   MATT STUDIO — script.js
   Vanilla JS only. No frameworks, no backend.
   ========================================================= */

/* =========================================================
   CONFIG — everything a non-developer needs to edit lives here.
   ========================================================= */
const CONFIG = {
  name: "Matt Studio",
  email: "hello@example.com",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  youtube: "https://youtube.com/",

  // Each portfolio card. `video` should point to a real file once you
  // have one — until then the modal shows an elegant placeholder.
  portfolio: [
    {
      category: "Podcast Edit",
      title: "The Power of Storytelling",
      description: "Dynamic captions, pacing and sound design.",
      video: "assets/videos/project-01.mp4",
      tone: "warm",
    },
    {
      category: "Business Content",
      title: "Behind the Brand",
      description: "Clean cuts and confident pacing for brand storytelling.",
      video: "assets/videos/project-02.mp4",
      tone: "cool",
    },
    {
      category: "Personal Brand",
      title: "Day in the Life",
      description: "Fast-paced editing that keeps viewers watching till the end.",
      video: "assets/videos/project-03.mp4",
      tone: "warm",
    },
    {
      category: "YouTube Short",
      title: "3 Lessons in 30 Seconds",
      description: "Punchy hooks and tight pacing built for retention.",
      video: "assets/videos/project-04.mp4",
      tone: "cool",
    },
    {
      category: "Fitness Content",
      title: "No Excuses",
      description: "High-energy cuts synced to the beat.",
      video: "assets/videos/project-05.mp4",
      tone: "warm",
    },
    {
      category: "Storytelling",
      title: "The Turning Point",
      description: "Cinematic pacing built around narrative tension.",
      video: "assets/videos/project-06.mp4",
      tone: "cool",
    },
  ],

  // Prototype pricing — replace with your real packages.
  pricing: [
    {
      name: "Starter",
      volume: "4 videos / month",
      price: "$100",
      features: ["Short-form editing", "Captions", "Dynamic cuts", "Sound effects", "Vertical formatting"],
      button: "Get Started",
      featured: false,
    },
    {
      name: "Growth",
      volume: "12 videos / month",
      price: "$300",
      features: ["Everything in Starter", "Motion graphics", "B-roll", "Enhanced captions", "Priority revisions"],
      button: "Get Started",
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Pro",
      volume: "20 videos / month",
      price: "$500",
      features: ["Everything in Growth", "Advanced editing", "More frequent delivery", "Priority communication", "Custom style"],
      button: "Let's Talk",
      featured: false,
    },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderPortfolio();
  renderPricing();
  initHeaderScroll();
  initMobileMenu();
  initSmoothAnchors();
  initScrollReveal();
  initVideoModal();
  initCompareSlider();
  initContactForm();
  document.getElementById("footerYear").textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------
   Push CONFIG values into every link/reference in the page
   --------------------------------------------------------- */
function applyConfig() {
  const map = {
    ctaInstagram: CONFIG.instagram,
    footerInstagram: CONFIG.instagram,
    footerTiktok: CONFIG.tiktok,
    footerYoutube: CONFIG.youtube,
  };
  Object.entries(map).forEach(([id, href]) => {
    const el = document.getElementById(id);
    if (el) el.href = href;
  });

  const emailLink = document.getElementById("footerEmail");
  if (emailLink) emailLink.href = `mailto:${CONFIG.email}`;
}

/* ---------------------------------------------------------
   Selected Work — render cards from CONFIG.portfolio
   --------------------------------------------------------- */
function renderPortfolio() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  grid.innerHTML = CONFIG.portfolio
    .map(
      (item, index) => `
    <button class="work-card reveal" type="button" data-index="${index}" aria-label="Play preview: ${escapeHtml(item.title)}">
      <div class="work-thumb">
        <div class="work-thumb-bg tone-${item.tone}"></div>
        <span class="work-category">${escapeHtml(item.category)}</span>
        <span class="work-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
        </span>
      </div>
      <div class="work-info">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </button>
  `
    )
    .join("");

  // thumbnail placeholder tones, generated once as CSS (see below)
  injectThumbTones();
}

function injectThumbTones() {
  if (document.getElementById("thumbTonesStyle")) return;
  const style = document.createElement("style");
  style.id = "thumbTonesStyle";
  style.textContent = `
    .tone-warm { background: radial-gradient(circle at 25% 15%, rgba(123,224,77,0.22), transparent 55%), linear-gradient(160deg, #2a2a1f, #131310 75%); }
    .tone-cool { background: radial-gradient(circle at 75% 15%, rgba(123,224,77,0.16), transparent 55%), linear-gradient(160deg, #1c221a, #101410 75%); }
  `;
  document.head.appendChild(style);
}

/* ---------------------------------------------------------
   Packages — render pricing cards from CONFIG.pricing
   --------------------------------------------------------- */
function renderPricing() {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;

  grid.innerHTML = CONFIG.pricing
    .map(
      (plan) => `
    <div class="pricing-card reveal${plan.featured ? " is-featured" : ""}">
      ${plan.badge ? `<span class="pricing-badge">${escapeHtml(plan.badge)}</span>` : ""}
      <p class="pricing-name">${escapeHtml(plan.name)}</p>
      <p class="pricing-volume">${escapeHtml(plan.volume)}</p>
      <p class="pricing-amount">${escapeHtml(plan.price)}<span>/mo</span></p>
      <ul class="pricing-features">
        ${plan.features
          .map(
            (f) => `
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>${escapeHtml(f)}</span>
          </li>`
          )
          .join("")}
      </ul>
      <a href="#contact" class="btn ${plan.featured ? "btn-primary" : "btn-ghost"} btn-block">${escapeHtml(plan.button)}</a>
    </div>
  `
    )
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------
   Sticky header: blur/translucent background on scroll
   --------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const toggle = () => header.classList.toggle("scrolled", window.scrollY > 12);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ---------------------------------------------------------
   Mobile hamburger menu
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  const open = () => {
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
    document.body.classList.add("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? close() : open();
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

/* ---------------------------------------------------------
   Smooth-scroll anchor links (native scroll-behavior handles
   most of this via CSS; this adds focus management)
   --------------------------------------------------------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

/* ---------------------------------------------------------
   Fade-in / slide-up on scroll via IntersectionObserver
   --------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   Video modal: open on card click, close on X / ESC / backdrop
   --------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("modalClose");
  const video = document.getElementById("modalVideo");
  const placeholder = document.getElementById("modalPlaceholder");
  const placeholderTitle = document.getElementById("modalPlaceholderTitle");
  if (!modal || !video) return;

  let lastFocused = null;

  const openModal = (item) => {
    lastFocused = document.activeElement;

    video.hidden = true;
    placeholder.hidden = true;
    video.pause();
    video.removeAttribute("src");
    video.load();

    // Try the real video first; fall back to the placeholder if it
    // doesn't exist (expected until real clips are added).
    const probe = document.createElement("video");
    probe.src = item.video;
    probe.addEventListener("loadedmetadata", () => {
      video.src = item.video;
      video.hidden = false;
      video.play().catch(() => {});
    });
    probe.addEventListener("error", () => {
      placeholderTitle.textContent = item.title;
      placeholder.hidden = false;
    });

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.classList.add("modal-open");
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    video.pause();
    setTimeout(() => {
      modal.hidden = true;
    }, 300);
    if (lastFocused) lastFocused.focus();
  };

  document.getElementById("workGrid")?.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (!card) return;
    const item = CONFIG.portfolio[Number(card.dataset.index)];
    if (item) openModal(item);
  });

  closeBtn.addEventListener("click", closeModal);
  modal.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

/* ---------------------------------------------------------
   Before / After drag-to-compare slider
   --------------------------------------------------------- */
function initCompareSlider() {
  const wrap = document.getElementById("compare");
  const after = document.getElementById("compareAfter");
  const handle = document.getElementById("compareHandle");
  if (!wrap || !after || !handle) return;

  let dragging = false;

  const setPosition = (percent) => {
    const clamped = Math.min(100, Math.max(0, percent));
    after.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    handle.style.left = `${clamped}%`;
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  };

  const percentFromClientX = (clientX) => {
    const rect = wrap.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  };

  const onMove = (clientX) => setPosition(percentFromClientX(clientX));

  handle.addEventListener("pointerdown", (e) => {
    dragging = true;
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener("pointermove", (e) => {
    if (dragging) onMove(e.clientX);
  });
  handle.addEventListener("pointerup", () => (dragging = false));
  handle.addEventListener("pointercancel", () => (dragging = false));

  wrap.addEventListener("pointerdown", (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    onMove(e.clientX);
  });

  handle.addEventListener("keydown", (e) => {
    const current = Number(handle.getAttribute("aria-valuenow"));
    if (e.key === "ArrowLeft") setPosition(current - 5);
    if (e.key === "ArrowRight") setPosition(current + 5);
  });

  setPosition(50);
}

/* ---------------------------------------------------------
   Contact form — frontend-only validation.
   No backend is connected in this prototype.
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  const fields = [
    { id: "fName", message: "Please enter your name." },
    { id: "fEmail", message: "Please enter a valid email address.", isEmail: true },
    { id: "fNeed", message: "Please select what you need." },
    { id: "fMessage", message: "Please tell me a bit about your project." },
  ];

  const validate = () => {
    let valid = true;
    fields.forEach(({ id, message, isEmail }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(`err-${id}`);
      const field = input.closest(".form-field");
      const value = input.value.trim();

      let fieldValid = value.length > 0;
      if (fieldValid && isEmail) {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      if (!fieldValid) {
        valid = false;
        field.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        field.classList.remove("has-error");
        if (errorEl) errorEl.textContent = "";
      }
    });
    return valid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      status.textContent = "";
      return;
    }

    // ---------------------------------------------------------
    // This is a frontend-only prototype: nothing is actually sent.
    // To go live, connect this form to a real service, e.g.:
    //
    //   fetch("https://formspree.io/f/YOUR_ID", {
    //     method: "POST",
    //     headers: { Accept: "application/json" },
    //     body: new FormData(form),
    //   });
    //
    // Other options: Netlify Forms, Getform, Basin, or a custom
    // backend endpoint. Swap the block below for the real call.
    // ---------------------------------------------------------
    status.textContent = "Thanks! This prototype form is ready to be connected to a form service.";
    form.reset();
  });
}
