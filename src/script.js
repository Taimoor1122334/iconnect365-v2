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

const revealText = document.querySelectorAll(
    "section h1 > span, section h2, section h3, section p, section li, section .btn, footer h2, footer p, footer a"
);
const revealImages = document.querySelectorAll("section img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

revealText.forEach((el) => el.classList.add("reveal"));
revealImages.forEach((img) => {
    const fullBleed = img.classList.contains("absolute");
    img.classList.add(fullBleed ? "reveal-img" : "reveal");
});

if (!reduceMotion) {
    const groups = new Map();

    document.querySelectorAll(".reveal, .reveal-img").forEach((el) => {
        const siblings = groups.get(el.parentElement) || [];
        siblings.push(el);
        groups.set(el.parentElement, siblings);
    });

    groups.forEach((siblings) => {
        siblings.forEach((el, index) => {
            el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll(".reveal, .reveal-img").forEach((el) => observer.observe(el));
}
