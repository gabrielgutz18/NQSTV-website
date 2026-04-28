
const menuButton = document.querySelector('.menu-button');
const dropdownContent = document.querySelector('.dropdown-content');
const siteNav = document.querySelector('.site-nav');

// Handle dropdown menu for secondary menu (Mission Vision, Team, etc.)
if (menuButton && dropdownContent) {
    const closeDropdown = () => {
        dropdownContent.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    const openDropdown = () => {
        dropdownContent.classList.add('active');
        menuButton.setAttribute('aria-expanded', 'true');
    };

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();

        if (dropdownContent.classList.contains('active')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    const dropdownLinks = dropdownContent.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = new URL(link.getAttribute('href'), window.location.href);
            closeDropdown();
            window.location.href = targetUrl.href;
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            closeDropdown();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDropdown();
        }
    });
}

// Close dropdown when navigation links are clicked
if (siteNav && dropdownContent && menuButton) {
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdownContent.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

console.log('Total slides found:', totalSlides);

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (index === currentSlide) {
            slide.classList.add('active');
            slide.style.display = 'flex';
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev');
            slide.style.display = 'flex';
        } else if (index === (currentSlide + 1) % totalSlides) {
            slide.classList.add('next');
            slide.style.display = 'flex';
        } else {
            slide.style.display = 'none';
        }
    });
    
    const currentElement = document.querySelector('.current-slide');
    if (currentElement) {
        currentElement.textContent = currentSlide + 1;
    }
    
    console.log('Current slide index:', currentSlide, 'Display:', currentSlide + 1);
}


const nextBtn = document.querySelector('.carousel-next');
const prevBtn = document.querySelector('.carousel-prev');

console.log('Next button found:', !!nextBtn);
console.log('Prev button found:', !!prevBtn);

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        console.log('RIGHT button clicked! Moving to next slide');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        console.log('LEFT button clicked! Moving to previous slide');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
}


updateCarousel();
console.log('Carousel initialized');

const serviceCards = document.querySelectorAll('.services-section .service-card');
const serviceModal = document.getElementById('service-card-modal');
const serviceModalClose = document.querySelector('.service-modal-close');
const serviceModalIcon = document.getElementById('service-modal-icon');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalDescription = document.getElementById('service-modal-description');
const serviceModalInquire = document.getElementById('service-modal-inquire');

if (
    serviceCards.length > 0 &&
    serviceModal &&
    serviceModalClose &&
    serviceModalIcon &&
    serviceModalTitle &&
    serviceModalDescription &&
    serviceModalInquire
) {
    let lastFocusedCard = null;

    const openServiceModal = (card) => {
        const title = card.querySelector('h4')?.textContent?.trim() || 'Service';
        const detail = card.dataset.viewDetail?.trim() || '';
        const iconMarkup = card.querySelector('.service-icon')?.innerHTML || '';

        serviceModalTitle.textContent = title;
        serviceModalDescription.textContent = detail;
        serviceModalDescription.hidden = detail.length === 0;
        serviceModalIcon.innerHTML = iconMarkup;

        serviceModal.classList.add('active');
        serviceModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('service-modal-open');

        lastFocusedCard = card;
        serviceModalClose.focus();
    };

    const closeServiceModal = () => {
        serviceModal.classList.remove('active');
        serviceModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('service-modal-open');

        if (lastFocusedCard) {
            lastFocusedCard.focus();
        }
    };

    serviceCards.forEach((card) => {
        const title = card.querySelector('h4')?.textContent?.trim() || 'service';

        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Open details for ${title}`);

        card.addEventListener('click', () => {
            openServiceModal(card);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openServiceModal(card);
            }
        });
    });

    serviceModalClose.addEventListener('click', closeServiceModal);

    serviceModalInquire.addEventListener('click', () => {
        closeServiceModal();
        window.location.href = '#contact';
    });

    serviceModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.matches('[data-close-service-modal="true"]')) {
            closeServiceModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && serviceModal.classList.contains('active')) {
            closeServiceModal();
        }
    });
}

const featuredPostCards = document.querySelectorAll('.featured-post-card[data-post-url], .featured-post-card[data-preview-image]');
const featuredImageButtons = document.querySelectorAll('.featured-post-image-button[data-full-image]');
const featuredPostToggles = document.querySelectorAll('.featured-post-toggle[aria-controls]');
const featuredImageModal = document.getElementById('featured-image-modal');
const featuredImagePreview = document.getElementById('featured-image-preview');
const featuredImageClose = document.querySelector('.image-viewer-close');

if (
    featuredPostCards.length > 0 &&
    featuredImageButtons.length > 0 &&
    featuredImageModal &&
    featuredImagePreview &&
    featuredImageClose
) {
    const openFeaturedImageModal = (imageSrc, imageAlt) => {
        featuredImagePreview.src = imageSrc;
        featuredImagePreview.alt = imageAlt;
        featuredImageModal.classList.add('active');
        featuredImageModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('service-modal-open');
        featuredImageClose.focus();
    };

    const closeFeaturedImageModal = () => {
        featuredImageModal.classList.remove('active');
        featuredImageModal.setAttribute('aria-hidden', 'true');
        featuredImagePreview.src = '';
        featuredImagePreview.alt = '';
        document.body.classList.remove('service-modal-open');
    };

    featuredPostCards.forEach((card) => {
        const postUrl = card.dataset.postUrl?.trim();
        const previewImage = card.dataset.previewImage?.trim();
        const previewAlt = card.dataset.previewAlt?.trim() || 'Featured post image';

        if (!postUrl && !previewImage) {
            return;
        }

        card.addEventListener('click', (event) => {
            const target = event.target;

            if (
                target instanceof HTMLElement &&
                (target.closest('.featured-post-image-button') || target.closest('.featured-post-link'))
            ) {
                return;
            }

            if (postUrl) {
                window.location.href = postUrl;
                return;
            }

            if (previewImage) {
                openFeaturedImageModal(previewImage, previewAlt);
            }
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();

                if (postUrl) {
                    window.location.href = postUrl;
                    return;
                }

                if (previewImage) {
                    openFeaturedImageModal(previewImage, previewAlt);
                }
            }
        });
    });

    featuredImageButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            openFeaturedImageModal(
                button.dataset.fullImage,
                button.dataset.imageAlt || 'Featured post image'
            );
        });
    });

    featuredImageClose.addEventListener('click', closeFeaturedImageModal);

    featuredImageModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.matches('[data-close-image-modal="true"]')) {
            closeFeaturedImageModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && featuredImageModal.classList.contains('active')) {
            closeFeaturedImageModal();
        }
    });
}

featuredPostToggles.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        const summaryId = button.getAttribute('aria-controls');
        const summary = summaryId ? document.getElementById(summaryId) : null;

        if (!summary) {
            return;
        }

        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));
        button.textContent = isExpanded ? 'View more' : 'View less';
        summary.classList.toggle('is-collapsed', isExpanded);
    });
});

const contactForm = document.querySelector('.contact-form');
const contactMessageModal = document.getElementById('contact-message-modal');
const contactMessageClose = document.querySelector('.contact-message-close');
const contactMessageBadge = document.getElementById('contact-message-badge');
const contactMessageTitle = document.getElementById('contact-message-title');
const contactMessageText = document.getElementById('contact-message-text');
const contactMessageAction = document.getElementById('contact-message-action');

let lastFocusedContactElement = null;

const contactMessageIcons = {
    success: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
        </svg>
    `,
    error: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 8v5"></path>
            <path d="M12 16h.01"></path>
        </svg>
    `
};

const openContactMessageModal = (variant, title, message, triggerElement) => {
    if (
        !contactMessageModal ||
        !contactMessageClose ||
        !contactMessageBadge ||
        !contactMessageTitle ||
        !contactMessageText ||
        !contactMessageAction
    ) {
        return;
    }

    lastFocusedContactElement = triggerElement instanceof HTMLElement ? triggerElement : null;

    contactMessageModal.classList.toggle('is-error', variant === 'error');
    contactMessageBadge.innerHTML = contactMessageIcons[variant] || contactMessageIcons.success;
    contactMessageTitle.textContent = title;
    contactMessageText.textContent = message;
    contactMessageAction.textContent = variant === 'error' ? 'Try Again' : 'Close';

    contactMessageModal.classList.add('active');
    contactMessageModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('contact-modal-open');

    contactMessageAction.focus();
};

const closeContactMessageModal = () => {
    if (!contactMessageModal) {
        return;
    }

    contactMessageModal.classList.remove('active', 'is-error');
    contactMessageModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('contact-modal-open');

    if (lastFocusedContactElement) {
        lastFocusedContactElement.focus();
    }
};

if (contactMessageModal && contactMessageClose && contactMessageAction) {
    contactMessageClose.addEventListener('click', closeContactMessageModal);
    contactMessageAction.addEventListener('click', closeContactMessageModal);

    contactMessageModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.matches('[data-close-contact-message="true"]')) {
            closeContactMessageModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && contactMessageModal.classList.contains('active')) {
            closeContactMessageModal();
        }
    });
}

if (contactForm && window.emailjs) {
    const EMAILJS_CONFIG = {
        publicKey: 'kv8lqdqRMoOoJwetf',
        serviceId: 'service_jt71ut4',
        templateId: 'template_54thxm5'
    };

    const hasConfigValues =
        EMAILJS_CONFIG.publicKey !== 'PASTE_YOUR_PUBLIC_KEY_HERE' &&
        EMAILJS_CONFIG.serviceId !== 'PASTE_YOUR_SERVICE_ID_HERE';

    if (hasConfigValues) {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.textContent : '';

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            const templateParams = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                phone: contactForm.phone.value.trim(),
                service: contactForm.service.value,
                message: contactForm.message.value.trim()
            };

            try {
                await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    templateParams
                );

                contactForm.reset();
                openContactMessageModal(
                    'success',
                    'Message sent successfully',
                    'Thank you for reaching out. We have received your message and will get back to you shortly.',
                    submitButton
                );
            } catch (error) {
                console.error('EmailJS send failed:', error);
                openContactMessageModal(
                    'error',
                    'Unable to send your message',
                    'Something went wrong while sending your email. Please try again in a moment.',
                    submitButton
                );
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            }
        });
    } else {
        console.warn('EmailJS is not active yet. Add your public key and service ID in contex.js.');
    }
}
