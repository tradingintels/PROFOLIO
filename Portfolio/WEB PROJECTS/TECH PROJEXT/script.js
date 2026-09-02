/**
 * Mobiq Tech Academy - Main JavaScript Module
 * Handles theme management, form navigation, application submission, and UI interactions
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate a unique application ID
 * Format: MTA-YYMMDD-HHMM-XXXX
 * @returns {string} Unique application identifier
 */
function generateApplicationId() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `MTA-${year}${month}${day}-${hours}${minutes}-${random}`;
}

// ============================================
// THEME MANAGEMENT
// ============================================

/**
 * Update the theme (light/dark mode)
 * @param {string} theme - 'light' or 'dark'
 */
function updateTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
    
    document.querySelectorAll('.theme-toggle').forEach((button) => {
        button.textContent = isDark ? '☀️' : '🌙';
        button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = 'togglePulse 0.5s ease';
        }, 10);
    });
}

/**
 * Get the initial theme preference from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// ============================================
// FORM NAVIGATION (Multi-step)
// ============================================

/**
 * Initialize multi-step form navigation
 * Handles step transitions, validation, and review panel updates
 */
function initFormNavigation() {
    const formSteps = document.querySelectorAll('.form-step');
    const steps = document.querySelectorAll('.step');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const summaryList = document.getElementById('summaryList');
    const form = document.getElementById('applicationForm');
    
    // Only run if there are form steps
    if (formSteps.length === 0) return;
    
    let currentStep = 1;
    
    /**
     * Show a specific form step
     * @param {number} step - Step number to display
     */
    function showStep(step) {
        formSteps.forEach((fs) => {
            const stepNum = fs.dataset.step ? parseInt(fs.dataset.step) : Array.from(formSteps).indexOf(fs) + 1;
            fs.classList.toggle('active', stepNum === step);
        });
        currentStep = step;
        
        // Update button visibility
        if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
        if (nextBtn) nextBtn.style.display = step < formSteps.length ? 'inline-flex' : 'none';
        if (submitBtn) submitBtn.style.display = step === formSteps.length ? 'inline-flex' : 'none';
    }
    
    /**
     * Update the review panel with current form values
     */
    function updateReviewPanel() {
        if (!form) return;
        
        // Personal info
        const fullName = form.querySelector('input[name="full_name"]')?.value || '';
        const email = form.querySelector('input[name="email"]')?.value || '';
        const phone = form.querySelector('input[name="phone"]')?.value || '';
        const dob = form.querySelector('input[name="dob"]')?.value || '';
        const address = form.querySelector('input[name="address"]')?.value || '';
        
        // Program selection
        const programme = form.querySelector('select[name="programme"]')?.selectedOptions[0]?.text || '';
        const course = form.querySelector('select[name="course"]')?.selectedOptions[0]?.text || '';
        
        // Update review fields
        const reviewName = document.getElementById('reviewName');
        const reviewEmail = document.getElementById('reviewEmail');
        const reviewPhone = document.getElementById('reviewPhone');
        const reviewDob = document.getElementById('reviewDob');
        const reviewAddress = document.getElementById('reviewAddress');
        const reviewProgramme = document.getElementById('reviewProgramme');
        const reviewCourse = document.getElementById('reviewCourse');
        
        if (reviewName) reviewName.textContent = fullName || 'Not provided';
        if (reviewEmail) reviewEmail.textContent = email || 'Not provided';
        if (reviewPhone) reviewPhone.textContent = phone || 'Not provided';
        if (reviewDob) reviewDob.textContent = dob || 'Not provided';
        if (reviewAddress) reviewAddress.textContent = address || 'Not provided';
        if (reviewProgramme) reviewProgramme.textContent = programme || 'Not selected';
        if (reviewCourse) reviewCourse.textContent = course || 'Not selected';
        
        // Show passport photo preview
        const passportInput = form.querySelector('input[name="passport_photo"]');
        const photoPreview = document.getElementById('photoPreview');
        const photoPdfPreview = document.getElementById('photoPdfPreview');
        const photoPdfName = document.getElementById('photoPdfName');
        
        if (passportInput && passportInput.files && passportInput.files.length > 0) {
            const file = passportInput.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.src = e.target.result;
                    photoPreview.style.display = 'block';
                    if (photoPdfPreview) photoPdfPreview.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                photoPreview.style.display = 'none';
                if (photoPdfName) photoPdfName.textContent = file.name;
                if (photoPdfPreview) photoPdfPreview.style.display = 'flex';
            }
        }
        
        // Show ID document preview
        const idUpload = form.querySelector('input[name="id_upload"]');
        const idPreview = document.getElementById('idPreview');
        const idPdfPreview = document.getElementById('idPdfPreview');
        const idPdfName = document.getElementById('idPdfName');
        
        if (idUpload && idUpload.files && idUpload.files.length > 0) {
            const file = idUpload.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    idPreview.src = e.target.result;
                    idPreview.style.display = 'block';
                    if (idPdfPreview) idPdfPreview.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                idPreview.style.display = 'none';
                if (idPdfName) idPdfName.textContent = file.name;
                if (idPdfPreview) idPdfPreview.style.display = 'flex';
            }
        }
    }
    
    /**
     * Update the review summary (for apply page)
     */
    function updateSummary() {
        if (!summaryList || !form) return;
        const fullName = form.querySelector('input[name="full_name"]')?.value || 'Not provided';
        const email = form.querySelector('input[name="email"]')?.value || 'Not provided';
        const phone = form.querySelector('input[name="phone"]')?.value || 'Not provided';
        const programme = form.querySelector('select[name="programme"]')?.selectedOptions[0]?.text || 'Not selected';
        const course = form.querySelector('select[name="course"]')?.selectedOptions[0]?.text || 'Not selected';
        
        summaryList.innerHTML = `
            <li><strong>Full Name:</strong> ${fullName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Programme:</strong> ${programme}</li>
            <li><strong>Course:</strong> ${course}</li>
        `;
    }
    
    /**
     * Add real-time update listeners to form fields
     */
    function addRealTimeListeners() {
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach((input) => {
            input.addEventListener('input', updateReviewPanel);
            input.addEventListener('change', updateReviewPanel);
        });
        
        // Special handler for file inputs
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach((fileInput) => {
            fileInput.addEventListener('change', updateReviewPanel);
        });
    }
    
    // Navigation event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Validate current step fields
            if (form) {
                const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
                const requiredFields = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
                let valid = true;
                
                requiredFields.forEach((field) => {
                    if (!field.value) {
                        valid = false;
                        field.reportValidity();
                    }
                });
                
                if (!valid) return;
            }
            
            if (currentStep < formSteps.length) {
                showStep(currentStep + 1);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    }
    
    // Initialize
    showStep(1);
    addRealTimeListeners();
}

// ============================================
// APPLICATION FORM SUBMISSION
// ============================================

/**
 * Initialize application form submission handling
 */
function initApplicationForm() {
    const form = document.getElementById('applicationForm');
    if (!form) return;
    
    const statusWrap = document.getElementById('uploadStatus');
    const msg = document.getElementById('uploadMessage');
    const progressWrap = document.getElementById('uploadProgress');
    const progressBar = progressWrap ? progressWrap.querySelector('i') : null;
    
    /**
     * Show status message
     * @param {string} text - Message to display
     * @param {string|null} state - 'success', 'error', or null
     */
    function showStatus(text, state) {
        if (!statusWrap) return;
        statusWrap.classList.remove('hidden', 'success', 'error');
        if (state) statusWrap.classList.add(state);
        if (msg) msg.innerHTML = text;
    }
    
    /**
     * Hide status message
     */
    function hideStatus() {
        if (!statusWrap) return;
        statusWrap.classList.add('hidden');
        if (progressBar) progressBar.style.width = '0%';
        if (progressWrap) progressWrap.classList.add('hidden');
    }
    
    /**
     * Simulate file upload with progress
     * @param {FormData} formData - Form data to upload
     * @returns {Promise<Object>} Upload result
     */
    async function simulateUpload(formData) {
        if (progressWrap) progressWrap.classList.remove('hidden');
        for (let p = 5; p <= 100; p += Math.floor(Math.random() * 15) + 5) {
            if (progressBar) progressBar.style.width = p + '%';
            await new Promise((r) => setTimeout(r, 180));
        }
        return { ok: true, id: Date.now() };
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Use built-in validation first
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Ensure required files are attached
        const passport = form.querySelector('input[name="passport_photo"]');
        const idUpload = form.querySelector('input[name="id_upload"]');
        
        if (!passport || !passport.files || passport.files.length === 0) {
            showStatus('Please attach your passport photograph (required).', 'error');
            return;
        }
        if (!idUpload || !idUpload.files || idUpload.files.length === 0) {
            showStatus('Please attach a valid ID document (required).', 'error');
            return;
        }
        
        showStatus('Preparing application for upload...', null);
        
        const formData = new FormData(form);
        
        try {
            const endpoint = form.getAttribute('action') || '/submit';
            let result;
            
            // If endpoint is a real URL (not '#'), attempt real upload
            if (endpoint && endpoint !== '#' && endpoint !== '/submit') {
                if (progressWrap) progressWrap.classList.remove('hidden');
                await simulateUpload(formData);
                const response = await fetch(endpoint, { method: 'POST', body: formData });
                if (!response.ok) throw new Error('Server rejected the upload');
                result = { ok: true };
            } else {
                result = await simulateUpload(formData);
            }
            
            if (result && result.ok) {
                const applicationId = generateApplicationId();
                
                // Show success with application ID and edit option
                showStatus(`Application submitted successfully! Your Application ID is: <strong>${applicationId}</strong><br>
                <button type="button" id="editApplicationBtn" class="btn btn-secondary" style="margin-top: 1rem;">Edit Application</button>`, 'success');
                
                if (progressBar) progressBar.style.width = '100%';
                
                // Add event listeners for edit and view buttons
                setTimeout(() => {
                    const editBtn = document.getElementById('editApplicationBtn');
                    
                    if (editBtn) {
                        editBtn.addEventListener('click', () => {
                            // Enable form editing
                            form.querySelectorAll('input, select, button').forEach(el => {
                                el.disabled = false;
                            });
                            // Show navigation buttons
                            const nextBtn = document.querySelector('.next-btn');
                            const prevBtn = document.querySelector('.prev-btn');
                            const submitBtn = document.querySelector('.submit-btn');
                            if (nextBtn) nextBtn.style.display = 'inline-flex';
                            if (prevBtn) prevBtn.style.display = 'inline-flex';
                            if (submitBtn) submitBtn.style.display = 'inline-flex';
                            // Hide status
                            hideStatus();
                        });
                    }
                    
                }, 100);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.error('Upload error', err);
            showStatus('Upload failed. Please try again later.', 'error');
        }
    });
}

// ============================================
// UI COMPONENTS
// ============================================

/**
 * Set active state for current menu link
 */
function setActiveMenuLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

/**
 * Initialize slider/carousel functionality
 * @param {string} wrapperSelector - CSS selector for slider wrapper
 * @param {string} slideSelector - CSS selector for slides
 * @param {string} prevSelector - CSS selector for previous button
 * @param {string} nextSelector - CSS selector for next button
 * @returns {Object} Slider control methods
 */
function initSlider(wrapperSelector, slideSelector, prevSelector, nextSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return {};
    
    const slides = Array.from(wrapper.querySelectorAll(slideSelector));
    const prev = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);
    
    let current = slides.findIndex((slide) => slide.classList.contains('active'));
    if (current < 0) current = 0;
    
    function goTo(index) {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
        current = index;
    }
    
    function nextSlide() {
        goTo((current + 1) % slides.length);
    }
    
    function prevSlide() {
        goTo((current - 1 + slides.length) % slides.length);
    }
    
    if (next) next.addEventListener('click', nextSlide);
    if (prev) prev.addEventListener('click', prevSlide);
    
    return { nextSlide, prevSlide };
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.faq-item');
            if (!item) return;
            
            const isOpen = item.classList.toggle('open');
            if (isOpen) {
                const content = item.querySelector('.faq-content');
                if (content) content.style.maxHeight = `${content.scrollHeight}px`;
            } else {
                const content = item.querySelector('.faq-content');
                if (content) content.style.maxHeight = '';
            }
        });
    });
}

/**
 * Initialize gallery lightbox functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close gallery preview">×</button>
            <img src="" alt="Gallery preview">
            <div class="lightbox-meta">
                <h3></h3>
                <p></p>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    const imageEl = overlay.querySelector('img');
    const titleEl = overlay.querySelector('h3');
    const descriptionEl = overlay.querySelector('p');
    const closeBtn = overlay.querySelector('.lightbox-close');
    
    function closeLightbox() {
        overlay.classList.remove('active');
    }
    
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            imageEl.src = item.dataset.image || '';
            imageEl.alt = item.dataset.title || 'Campus preview';
            titleEl.textContent = item.dataset.title || '';
            descriptionEl.textContent = item.dataset.description || '';
            overlay.classList.add('active');
        });
    });
    
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay || event.target === closeBtn) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeLightbox();
    });
}

/**
 * Initialize stats counter animation
 */
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length === 0) return;
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            
            const card = entry.target;
            const target = Number(card.dataset.target || '0');
            const valueEl = card.querySelector('strong');
            if (!valueEl) return;
            
            let start = 0;
            const duration = 1400;
            const stepTime = Math.max(duration / target, 20);
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(progress * target);
                valueEl.textContent = currentValue + (card.textContent.includes('%') ? '%' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    valueEl.textContent = target + (card.textContent.includes('%') ? '%' : '');
                }
            }
            
            requestAnimationFrame(update);
            obs.unobserve(card);
        });
    }, { threshold: 0.4 });
    
    statCards.forEach((card) => observer.observe(card));
}

/**
 * Initialize animated hero text
 */
function initAnimatedText() {
    const animatedText = document.querySelector('.animated-text');
    if (!animatedText) return;
    
    const phrases = JSON.parse(animatedText.dataset.text || '[]');
    let phraseIndex = 0;
    
    function updateAnimatedText() {
        animatedText.textContent = phrases[phraseIndex] || '';
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    if (phrases.length) {
        updateAnimatedText();
        setInterval(updateAnimatedText, 2800);
    }
}

/**
 * Initialize navbar auto-hide on scroll
 */
function initNavbarAutoHide() {
    let lastScrollY = window.scrollY;
    let navbarVisible = true;
    
    function handleNavbarVisibility() {
        const navbar = document.querySelector('nav.navbar');
        if (!navbar) return;
        
        const currentScrollY = window.scrollY;
        
        // Show navbar only when at the very top (scrollY === 0)
        if (currentScrollY === 0) {
            navbar.classList.remove('hidden-header');
            navbarVisible = true;
        } else if (currentScrollY > lastScrollY) {
            navbar.classList.add('hidden-header');
            navbarVisible = false;
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttled scroll handler for better performance
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleNavbarVisibility();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
}

// ============================================
// STYLES
// ============================================

/**
 * Inject dynamic styles for animations
 */
function injectStyles() {
    // Theme toggle animation
    const toggleStyle = document.createElement('style');
    toggleStyle.textContent = `
        @keyframes togglePulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(toggleStyle);
    
    // Menu click animation
    const menuAnimStyle = document.createElement('style');
    menuAnimStyle.textContent = `
        @keyframes menuClickPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(menuAnimStyle);
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach((button) => {
        button.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            updateTheme(nextTheme);
        });
    });
    
    // Menu click feedback animation
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.animation = 'none';
                setTimeout(() => {
                    e.currentTarget.style.animation = 'menuClickPulse 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 10);
            }
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    const initialTheme = getInitialTheme();
    updateTheme(initialTheme);
    
    // Set active menu link
    setActiveMenuLink();
    
    // Initialize components
    initFormNavigation();
    initApplicationForm();
    initEventListeners();
});

// Initialize on page load
window.addEventListener('hashchange', setActiveMenuLink);

// Initialize non-DOM-dependent components
injectStyles();
initSlider('.slider-track', '.slide', '.slider-control.prev', '.slider-control.next');
initSlider('.testimonial-track', '.testimonial', '.testimonial-control.prev', '.testimonial-control.next');
initStatsCounter();
initFAQ();
initGallery();
initAnimatedText();
initNavbarAutoHide();