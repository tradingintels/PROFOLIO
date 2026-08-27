/*==================================
        LOADER
==================================*/

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

/*==================================
        FLOATING PARTICLES
==================================*/

const particleContainer = document.querySelector(".particles");

for (let i = 0; i < 80; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.top = Math.random() * 100 + "%";

    particle.style.width = particle.style.height =
        Math.random() * 6 + 2 + "px";

    particle.style.animationDuration =
        Math.random() * 15 + 10 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particleContainer.appendChild(particle);
}

/*==================================
      HERO 3D TILT
==================================*/

const heroCard = document.querySelector(".glass-card");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 35;

    const y = (window.innerHeight / 2 - e.clientY) / 35;

    heroCard.style.transform =
        `rotateY(${-x}deg) rotateX(${y}deg)`;

});

/*==================================
      PROJECT CARD TILT
==================================*/

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 18;

        const rotateX = -(y - rect.height / 2) / 18;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-15px)
             scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

/*==================================
        CUSTOM CURSOR
==================================*/

const cursor = document.createElement("div");

cursor.className = "cursor";

document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});

/*==================================
      CURSOR HOVER EFFECT
==================================*/

document.querySelectorAll("a,.project-card,.contact-card").forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.classList.add("grow");

    });

    item.addEventListener("mouseleave", () => {

        cursor.classList.remove("grow");

    });

});

/*==================================
        REVEAL ON SCROLL
==================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

/*==================================
        SCROLL PROGRESS BAR
==================================*/

const progress = document.createElement("div");

progress.className = "progress-bar";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    progress.style.width =
        (scroll / height) * 100 + "%";

});

/*==================================
      ACTIVE NAVIGATION
==================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        if (scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*==================================
      PARALLAX BACKGROUND
==================================*/

document.addEventListener("mousemove", e => {

    const gradient = document.querySelector(".gradient");

    const x = (e.clientX / window.innerWidth - 0.5) * 40;

    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    gradient.style.transform =
        `translate(${x}px,${y}px)`;

});