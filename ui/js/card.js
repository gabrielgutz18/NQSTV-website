function closeActiveCard() {
    const activeCard = document.querySelector('.flip-card.active');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (activeCard) {
        activeCard.classList.remove('active');
        activeCard.classList.remove('flipped');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    const modalOverlay = document.querySelector('.modal-overlay');
    const flipBackContents = document.querySelectorAll('.flip-back-content');

    flipBackContents.forEach(content => {
        if (content.querySelector('.flip-back-brand')) {
            return;
        }

        const brand = document.createElement('div');
        brand.className = 'flip-back-brand';
        brand.innerHTML = `
            <img src="../images/logonsqtv.png" alt="NQSTV Logo" loading="lazy">
            <div class="flip-back-brand-copy">
                <div class="flip-back-brand-title">i<span class="brand-accent">NQ</span>ui<span class="brand-accent">S</span>i<span class="brand-accent">T</span>i<span class="brand-accent">V</span>e</div>
                <div class="flip-back-brand-tagline">NQSTV Cost and Contract Training and Consultancy Services</div>
            </div>
        `;

        content.prepend(brand);
    });

    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent closing if already active
            if (this.classList.contains('active')) {
                return;
            }

            e.stopPropagation();

            // Close any other active cards
            closeActiveCard();

            // Add active state
            this.classList.add('active');
            this.classList.add('flipped');
            if (modalOverlay) {
                modalOverlay.classList.add('active');
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeActiveCard();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeActiveCard();
        }
    });

    // Handle touch events for better mobile UX
    let touchStartX = 0;
    let touchEndX = 0;

    flipCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            if (this.classList.contains('active')) {
                touchStartX = e.changedTouches[0].screenX;
            }
        }, false);

        card.addEventListener('touchend', function(e) {
            if (this.classList.contains('active')) {
                touchEndX = e.changedTouches[0].screenX;
                
                // If user swiped more than 50px horizontally or vertically swiped down, close
                if (Math.abs(touchEndX - touchStartX) > 50 || 
                    (e.changedTouches[0].screenY > touchStartX && Math.abs(e.changedTouches[0].screenY - touchStartX) > 100)) {
                    closeActiveCard();
                }
            }
        }, false);
    });
});