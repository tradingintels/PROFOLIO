const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(hover: none)').matches;

const gradient = document.querySelector('.gradient');
const heroCard = document.querySelector('.glass-card');
const progress = document.createElement('div');
progress.className = 'progress-bar';
document.body.appendChild(progress);

function updateProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progress.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

if (!prefersReducedMotion && !isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    document.addEventListener('pointermove', event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;

        if (gradient) {
            const x = (event.clientX / window.innerWidth - .5) * 24;
            const y = (event.clientY / window.innerHeight - .5) * 24;
            gradient.style.transform = `translate(${x}px, ${y}px)`;
        }
    }, { passive: true });

    document.querySelectorAll('a, .project-card, .contact-card').forEach(element => {
        element.addEventListener('pointerenter', () => cursor.classList.add('grow'));
        element.addEventListener('pointerleave', () => cursor.classList.remove('grow'));
    });

    if (heroCard) {
        heroCard.addEventListener('pointermove', event => {
            const bounds = heroCard.getBoundingClientRect();
            const rotateY = (event.clientX - bounds.left - bounds.width / 2) / 28;
            const rotateX = -(event.clientY - bounds.top - bounds.height / 2) / 28;
            heroCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        heroCard.addEventListener('pointerleave', () => {
            heroCard.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
        });
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('pointermove', event => {
            const bounds = card.getBoundingClientRect();
            const rotateY = (event.clientX - bounds.left - bounds.width / 2) / 36;
            const rotateX = -(event.clientY - bounds.top - bounds.height / 2) / 36;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
        });
    });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
const homeLink = document.querySelector('nav a[href="#"]');

function setActiveNavLink(link) {
    navLinks.forEach(navLink => navLink.classList.toggle('active', navLink === link));
}

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const href = link.getAttribute('href');

        if (href === '#') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        }

        setActiveNavLink(link);
    });
});

setActiveNavLink(homeLink);

function updateHomeNavState() {
    if (window.scrollY <= 10) {
        if (homeLink) setActiveNavLink(homeLink);
        return;
    }

    let currentSection;
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= 140) currentSection = section;
    });

    if (currentSection) {
        const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${currentSection.id}`);
        if (activeLink) setActiveNavLink(activeLink);
    }
}

window.addEventListener('scroll', updateHomeNavState, { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: .01, rootMargin: '0px 0px -10% 0px' });

sections.forEach(section => {
    if (!prefersReducedMotion) section.classList.add('hidden');
    sectionObserver.observe(section);
});

function revealHashSection() {
    const sectionId = window.location.hash.slice(1);
    if (sectionId) document.getElementById(sectionId)?.classList.add('show');
}

revealHashSection();
window.addEventListener('hashchange', revealHashSection);

window.addEventListener('load', () => document.body.classList.add('loaded'));

const particleContainer = document.querySelector('.particles');
if (particleContainer && !prefersReducedMotion) {
    const particleCount = window.innerWidth < 600 ? 28 : 52;
    const particleFragment = document.createDocumentFragment();

    for (let index = 0; index < particleCount; index += 1) {
        const particle = document.createElement('span');
        const size = Math.random() * 4 + 2;
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${Math.random() * 12 + 10}s`;
        particle.style.animationDelay = `${Math.random() * -12}s`;
        particleFragment.appendChild(particle);
    }

    particleContainer.appendChild(particleFragment);
}