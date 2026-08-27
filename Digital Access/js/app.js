/*==========================================================
    MOOBIQ DIGITAL ACCESS (MDA)
    MASTER JAVASCRIPT FILE
    Version: 2.0
==========================================================*/

"use strict";

/*==========================================================
    HELPERS
==========================================================*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*==========================================================
    PRELOADER
==========================================================*/

window.addEventListener("load", () => {

    const loader = $("#loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("loader-hidden");

        setTimeout(() => {

            loader.remove();

        }, 800);

    }, 1200);

});

/*==========================================================
    STICKY HEADER
==========================================================*/

const header = $("header");

function stickyHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

}

window.addEventListener("scroll", stickyHeader);

/*==========================================================
    MOBILE MENU
==========================================================*/

const menuBtn = $("#menuBtn");
const navMenu = $("#navMenu");
const closeMenu = $("#closeMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.add("active");

    });

}

if (closeMenu && navMenu) {

    closeMenu.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

}

document.addEventListener("click", (e) => {

    if (!navMenu || !menuBtn) return;

    if (

        !navMenu.contains(e.target) &&

        !menuBtn.contains(e.target)

    ) {

        navMenu.classList.remove("active");

    }

});

/*==========================================================
    DROPDOWN MENUS
==========================================================*/

const dropdowns = $$(".dropdown");

dropdowns.forEach(dropdown => {

    const trigger = dropdown.querySelector(".dropdown-toggle");

    if (!trigger) return;

    trigger.addEventListener("click", (e) => {

        e.preventDefault();

        dropdown.classList.toggle("show");

    });

});

document.addEventListener("click", (e) => {

    dropdowns.forEach(dropdown => {

        if (!dropdown.contains(e.target)) {

            dropdown.classList.remove("show");

        }

    });

});

/*==========================================================
    DARK MODE
==========================================================*/

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    });

}

/*==========================================================
    ACTIVE NAVIGATION
==========================================================*/

const currentPage = location.pathname.split("/").pop();

const navLinks = $$("nav a");

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});
/*==========================================================
    SCROLL PROGRESS BAR
==========================================================*/

const progressBar = $("#progressBar");

function updateProgressBar() {

    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

}

window.addEventListener("scroll", updateProgressBar);

/*==========================================================
    BACK TO TOP BUTTON
==========================================================*/

const topBtn = $("#topBtn");

function toggleTopButton() {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleTopButton);

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*==========================================================
    SCROLL REVEAL ANIMATION
==========================================================*/

const reveals = $$(".reveal");

function revealOnScroll() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        const visible = window.innerHeight - 120;

        if (top < visible) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/*==========================================================
    SMOOTH SCROLL
==========================================================*/

const smoothLinks = $$('a[href^="#"]');

smoothLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/*==========================================================
    FLOATING CONTACT BUTTON
==========================================================*/

const floatingContact = $(".floating-contact");

if (floatingContact) {

    floatingContact.addEventListener("mouseenter", () => {

        floatingContact.classList.add("pulse");

    });

    floatingContact.addEventListener("mouseleave", () => {

        floatingContact.classList.remove("pulse");

    });

}

/*==========================================================
    STATS COUNTER
==========================================================*/

const counters = $$("[data-target]");

function startCounter(counter) {

    const target = Number(counter.dataset.target);

    let value = 0;

    const increment = Math.ceil(target / 150);

    const timer = setInterval(() => {

        value += increment;

        if (value >= target) {

            value = target;

            clearInterval(timer);

        }

        counter.textContent = value.toLocaleString();

    }, 15);

}

if (counters.length > 0) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter => observer.observe(counter));

}
/*==========================================================
    PORTFOLIO FILTER
==========================================================*/

const filterButtons = $$(".filter-btn");
const projectCards = $$(".project-card");

if (filterButtons.length && projectCards.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            projectCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.classList.contains(filter)
                ) {

                    card.style.display = "block";

                    setTimeout(() => {

                        card.classList.add("show");

                    }, 50);

                } else {

                    card.classList.remove("show");

                    card.style.display = "none";

                }

            });

        });

    });

}

/*==========================================================
    FAQ ACCORDION
==========================================================*/

const faqItems = $$(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*==========================================================
    CONTACT FORM
==========================================================*/

const contactForm = $("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const fullName = $("#fullName");
        const email = $("#email");
        const message = $("#message");

        if (!fullName.value.trim()) {

            alert("Please enter your full name.");

            fullName.focus();

            return;

        }

        if (!email.value.trim()) {

            alert("Please enter your email.");

            email.focus();

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            alert("Please enter a valid email address.");

            email.focus();

            return;

        }

        if (!message.value.trim()) {

            alert("Please enter your message.");

            message.focus();

            return;

        }

        alert("Thank you! Your message has been sent.");

        contactForm.reset();

    });

}

/*==========================================================
    SEARCH MODAL
==========================================================*/

const searchButton = $("#searchBtn");
const searchModal = $("#searchModal");
const closeSearch = $("#closeSearch");

if (searchButton && searchModal) {

    searchButton.addEventListener("click", () => {

        searchModal.classList.add("active");

    });

}

if (closeSearch && searchModal) {

    closeSearch.addEventListener("click", () => {

        searchModal.classList.remove("active");

    });

}

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && searchModal) {

        searchModal.classList.remove("active");

    }

});

/*==========================================================
    NEWSLETTER
==========================================================*/

const newsletterForm = $("#newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const input = newsletterForm.querySelector("input");

        if (!input.value.trim()) {

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing!");

        newsletterForm.reset();

    });

}

/*==========================================================
    GLOBAL UTILITIES
==========================================================*/

window.MDA = {

    scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    },

    toggleDarkMode() {

        document.body.classList.toggle("dark");

    }

};

console.log(
    "%cMDA Master JavaScript Loaded Successfully",
    "color:#4169E1;font-size:15px;font-weight:bold;"
);