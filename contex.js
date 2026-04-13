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