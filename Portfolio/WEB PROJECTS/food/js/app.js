/*=========================================================
MOOBIQ FOOD
Premium JavaScript
Version 2.0
=========================================================*/

/*==============================
LOADER
==============================*/

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.transition = "1s";
        }, 2000);
    }
});

/*==============================
MOBILE MENU TOGGLE
==============================*/

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.querySelector("i").classList.toggle("fa-bars");
        menuToggle.querySelector("i").classList.toggle("fa-times");
    });
}

/*==============================
STICKY HEADER
==============================*/

const header = document.querySelector("header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(0, 40, 90, 0.92)";
            header.style.padding = "15px 8%";
            header.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.15)";
            header.style.padding = "20px 8%";
            header.style.boxShadow = "none";
        }
    });
}

/*==============================
COUNTER
==============================*/

const counters = document.querySelectorAll(".counter");
const speed = 150;

counters.forEach(counter => {
    const update = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(update, 20);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    update();
});

/*==============================
SCROLL REVEAL
==============================*/

const reveals = document.querySelectorAll("section");

function reveal() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let top = reveals[i].getBoundingClientRect().top;
        let visible = 120;

        if (top < windowHeight - visible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal();

/*==============================
BACK TO TOP
==============================*/

const topButton = document.querySelector(".top");

if (topButton) {
    topButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/*==============================
SMOOTH NAVIGATION
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/*==============================
ACTIVE NAV LINK
==============================*/

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
    });
});

/*==============================
FLOATING BUTTONS
==============================*/

const floats = document.querySelectorAll(".float");

floats.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.2) rotate(8deg)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1) rotate(0deg)";
    });
});

/*==============================
PARALLAX HERO
==============================*/

const heroVideo = document.querySelector("#heroVideo");

if (heroVideo) {
    window.addEventListener("scroll", () => {
        let value = window.scrollY;
        heroVideo.style.transform = `translateY(${value * 0.2}px) scale(1.1)`;
    });
}

/*==============================
METRO TILE EFFECT
==============================*/

const tiles = document.querySelectorAll(".metro-tile");

tiles.forEach(tile => {
    const hasImage = tile.querySelector(".metro-tile-image");
    if (!hasImage) return;

    tile.addEventListener("mousemove", (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        tile.style.backgroundPosition = `${x}px ${y}px`;
    });
});

/*==============================
PRODUCT CARD EFFECT
==============================*/

const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    });
});

/*==============================
TYPEWRITER
==============================*/

const title = document.querySelector(".hero h1");

if (title) {
    const text = title.innerText;
    title.innerHTML = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            title.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

/*==============================
BUTTON RIPPLE
==============================*/

const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

buttons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";

        ripple.classList.add("ripple");
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/*==============================
PRELOADING IMAGES
==============================*/

const images = document.images;

for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = images[i].src;
}

/*==============================
CURRENT YEAR
==============================*/

const year = document.querySelector(".year");

if (year) {
    year.innerHTML = new Date().getFullYear();
}

/*==============================
NEWSLETTER FORM
==============================*/

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `<i class="fas fa-check-circle"></i> Thank you for subscribing!`;
        successMessage.style.cssText = "color: #00C853; margin-top: 15px; font-size: 18px;";
        
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        this.reset();
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

/*==============================
CONTACT FORM
==============================*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `<i class="fas fa-check-circle"></i> Thank you ${name}! Your message has been sent. We'll contact you at ${email} soon.`;
        successMessage.style.cssText = "color: #00C853; margin-top: 20px; padding: 15px; background: rgba(0, 200, 83, 0.1); border-radius: 8px;";
        
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        this.reset();
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

/*==============================
DARK MODE TOGGLE
==============================*/

const themeToggle = document.querySelector(".theme-toggle");

const getStoredTheme = () => {
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
};

const setStoredTheme = (theme) => {
    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        // Ignore storage errors in restricted browsing contexts.
    }
};

const syncThemeIcon = () => {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    if (!icon) return;

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
};

const savedTheme = getStoredTheme();
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

syncThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        syncThemeIcon();

        if (document.body.classList.contains("dark-mode")) {
            setStoredTheme("dark");
        } else {
            setStoredTheme("light");
        }
    });
}

/*==============================
FAQ ACCORDION
==============================*/

const faqItems = document.querySelectorAll(".faq-item h3");

faqItems.forEach(item => {
    item.addEventListener("click", () => {
        const parent = item.parentElement;
        parent.classList.toggle("active");
        
        // Close other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.parentElement.classList.remove("active");
            }
        });
    });
});

/*==============================
END
==============================*/