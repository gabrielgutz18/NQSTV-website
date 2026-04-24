
const menuButton = document.querySelector('.menu-button');
const dropdownContent = document.querySelector('.dropdown-content');

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
