document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  const isMobile = () => window.innerWidth < 1024;
  let open = false;

  function setExpanded(value) {
    menuBtn.setAttribute("aria-expanded", String(value));
  }

  function openMenu() {
    if (!isMobile()) return;

    open = true;
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("open");
    setExpanded(true);
  }

  function closeMenu() {
    open = false;
    mobileMenu.classList.remove("open");

    window.setTimeout(() => {
      if (!open) mobileMenu.classList.add("hidden");
    }, 170);

    setExpanded(false);
  }

  function toggleMenu() {
    if (open) closeMenu();
    else openMenu();
  }

  // button click
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // click outside closes (mobile only)
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!open) return;

    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedButton = menuBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedButton) closeMenu();
  });

  // close on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobile()) closeMenu();
    });
  });

  // ESC closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) closeMenu();
  });

  // if you resize to desktop, ensure menu is closed
  window.addEventListener("resize", () => {
    if (!isMobile() && open) closeMenu();
  });
});
