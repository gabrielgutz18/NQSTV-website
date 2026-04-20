
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
