const BIBTEX_TEXT = `@inproceedings{gong2026subspacepathpruner,
  title   = {SubspacePath Pruner: Inference-time Pruning via Probe-based Representation-Parameter Coupling},
  author  = {Gong, Zhiren and Hou, Yikun and Wu, Fan and Wang, Che and Zhang, Fuyao and Wu, Tiantong and Hao, Yurong and Zhang, Jiaming and Duan, Yiyang and Wang, Tiantong and Huang, Fei and Yuen, Chau and Lim, Wei Yang Bryan},
  booktitle = {Forty-third International Conference on Machine Learning},
  year    = {2026}
}`;

async function copyTextWithFeedback(button, text, success = "Copied") {
  if (!button) return;
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = success;
  } catch (_) {
    button.textContent = "Copy failed";
  }
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function initCitationButtons() {
  const heroBtn = document.getElementById("copyCiteHero");
  const bibBtn = document.getElementById("copyBib");
  const bib = document.getElementById("bib");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => copyTextWithFeedback(heroBtn, BIBTEX_TEXT, "Citation copied"));
  }
  if (bibBtn && bib) {
    bibBtn.addEventListener("click", () => copyTextWithFeedback(bibBtn, bib.innerText, "Copied"));
  }
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const imgs = document.querySelectorAll("img[data-full]");
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("data-full");
      if (!src) return;
      lightboxImg.src = src;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });
}

function initNavHighlight() {
  const links = Array.from(document.querySelectorAll(".nav nav a[href^='#']"));
  if (!links.length) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const sec = document.getElementById(id);
    if (sec) map.set(sec, link);
  });

  const sections = Array.from(map.keys());
  if (!sections.length) return;

  function setActive(link) {
    links.forEach((item) => item.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      setActive(map.get(visible[0].target));
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.35, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(map.get(sections[0]));
}

function initMethodLinkage() {
  const cards = Array.from(document.querySelectorAll(".method-link"));
  if (!cards.length) return;

  function setLinked(group, linked) {
    cards.forEach((card) => {
      const sameGroup = card.dataset.group === group;
      card.classList.toggle("is-linked", linked && sameGroup);
    });
  }

  cards.forEach((card) => {
    const group = card.dataset.group;
    if (!group) return;
    card.addEventListener("mouseenter", () => setLinked(group, true));
    card.addEventListener("mouseleave", () => setLinked(group, false));
    card.addEventListener("focusin", () => setLinked(group, true));
    card.addEventListener("focusout", () => setLinked(group, false));
  });
}

function initMethodPanels() {
  const toggles = Array.from(document.querySelectorAll(".method-toggle"));
  if (!toggles.length) return;

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;
      const willShow = !panel.classList.contains("show");
      panel.classList.toggle("show", willShow);
      btn.textContent = willShow
        ? btn.textContent.replace("Show", "Hide")
        : btn.textContent.replace("Hide", "Show");
    });
  });
}

initCitationButtons();
initLightbox();
initNavHighlight();
initMethodLinkage();
initMethodPanels();
