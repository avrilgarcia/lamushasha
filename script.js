document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.querySelector(".site-nav");
    const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
    const body = document.body;

    const toggleNavigation = () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        siteNav.classList.toggle("is-open");
        body.classList.toggle("nav-open");
    };

    const closeNavigation = () => {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
        body.classList.remove("nav-open");
    };

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", toggleNavigation);

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeNavigation();
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 960) {
                closeNavigation();
            }
        });
    }

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    return;
                }

                entry.target.classList.remove("is-visible");
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -80px 0px",
        }
    );

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 0.06, 0.6)}s`;
        observer.observe(element);
    });

    const groupedContainers = document.querySelectorAll(
        ".menu-grid, .contact-grid, .section--story"
    );

    groupedContainers.forEach((group) => {
        const children = group.querySelectorAll(".reveal");
        children.forEach((child, idx) => {
            child.style.transitionDelay = `${Math.min(idx * 0.12, 0.7)}s`;
        });
    });
});
