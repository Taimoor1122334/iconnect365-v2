const navToggle = document.querySelector("#nav-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const header = document.querySelector("#site-header");

navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("hidden") === false;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

const updateHeader = () => {
    header.classList.toggle("is-stuck", window.scrollY > 8);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
