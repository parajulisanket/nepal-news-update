document.addEventListener("DOMContentLoaded", () => {
  const brandRow = document.getElementById("brandRow");
  const miniBrand = document.getElementById("miniBrand");
  const mainNav = document.getElementById("mainNav");

  const searchBtn = document.getElementById("searchBtn");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  //  if you have mobile menu
  const mobileMenu = document.getElementById("mobileMenu");

  // Smooth header behavior

  const SHOW_Y = 200;
  const HIDE_Y = 140;

  let isMiniVisible = null;
  let ticking = false;

  function setHeaderState(showMini) {
    if (showMini === isMiniVisible) return;
    isMiniVisible = showMini;

    if (showMini) {
      brandRow?.classList.add("hidden-on-scroll");
      miniBrand?.classList.add("show");
      mainNav?.classList.add("nav-scrolled");
    } else {
      brandRow?.classList.remove("hidden-on-scroll");
      miniBrand?.classList.remove("show");
      mainNav?.classList.remove("nav-scrolled");
    }
  }

  function computeShouldShow(y) {
    // If state unknown, decide by SHOW_Y
    if (isMiniVisible === null) return y > SHOW_Y;

    // If currently visible, keep visible until we go above HIDE_Y
    if (isMiniVisible) return y > HIDE_Y;

    // If currently hidden, stay hidden until we cross SHOW_Y
    return y > SHOW_Y;
  }

  function handleScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setHeaderState(computeShouldShow(y));
      ticking = false;
    });
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Search behavior
  function openSearch() {
    if (!searchForm) return;

    // Optional: close mobile menu if open (clean UI)
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("open");
      const menuBtn = document.getElementById("menuBtn");
      menuBtn?.setAttribute("aria-expanded", "false");
    }

    searchForm.classList.add("open");
    setTimeout(() => searchInput?.focus(), 0);
  }

  function closeSearch() {
    if (!searchForm) return;
    searchForm.classList.remove("open");
  }

  function toggleSearch() {
    if (!searchForm) return;
    searchForm.classList.contains("open") ? closeSearch() : openSearch();
  }

  searchBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSearch();
  });

  // click outside closes search
  document.addEventListener("click", (e) => {
    if (!searchForm || !searchBtn) return;
    const inside =
      searchForm.contains(e.target) || searchBtn.contains(e.target);
    if (!inside) closeSearch();
  });

  // ESC closes search
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });

  // submit search
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = (searchInput?.value || "").trim();
    if (!q) return;

    // Replace with your real search URL if needed
    // window.location.href = `/search.html?q=${encodeURIComponent(q)}`;
    console.log("Search query:", q);
  });
});

// --- video popup part js ---
(function () {
  const modal = document.getElementById("videoModal");
  const backdrop = document.getElementById("videoBackdrop");
  const closeBtn = document.getElementById("videoClose");
  const frameHost = document.getElementById("videoFrame");

  function openModal(embedUrl) {
    // show modal
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");

    // inject iframe (autoplay)
    const url = embedUrl.includes("?")
      ? `${embedUrl}&autoplay=1&rel=0`
      : `${embedUrl}?autoplay=1&rel=0`;

    frameHost.innerHTML = `
      <iframe
        class="w-full h-full"
        src="${url}"
        title="Video"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;

    // lock scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");
    frameHost.innerHTML = "";

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  // click any video card
  document.querySelectorAll("[data-embed]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const embed = btn.getAttribute("data-embed");
      if (embed) openModal(embed);
    });
  });

  // close actions
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
})();

// -- Get the "Back to Top" button --
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll("#sideNav .side-link").forEach((link) => {
  link.addEventListener("click", () => {
    sideNav.classList.add("opacity-0", "pointer-events-none");
    sideNav.classList.remove("opacity-100");
  });
});
