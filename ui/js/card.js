function closeActiveCard() {
    const activeCard = document.querySelector('.flip-card.active');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (activeCard) {
        activeCard.classList.remove('active');
        activeCard.classList.remove('flipped');

        if (activeCard.__placeholder && activeCard.__placeholder.parentNode) {
            activeCard.__placeholder.replaceWith(activeCard);
            activeCard.__placeholder = null;
        }

        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }

        const savedScrollY = Number(document.body.dataset.modalScrollY || 0);
        document.documentElement.classList.remove('card-modal-open');
        document.body.classList.remove('card-modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        delete document.body.dataset.modalScrollY;
        window.scrollTo(0, savedScrollY);
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
            <img class="flip-back-brand-logo" src="../images/logonsqtv.png" alt="NQSTV Logo" loading="lazy">
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

            const placeholder = document.createElement('div');
            placeholder.className = 'flip-card-placeholder';
            placeholder.style.height = this.offsetHeight + 'px';
            this.parentNode.insertBefore(placeholder, this);
            this.__placeholder = placeholder;
            document.body.appendChild(this);

            // Add active state
            this.classList.add('active');
            this.classList.add('flipped');
            if (modalOverlay) {
                modalOverlay.classList.add('active');
            }

            // Prevent body scroll
            const scrollY = window.scrollY || window.pageYOffset || 0;
            document.body.dataset.modalScrollY = String(scrollY);
            document.documentElement.classList.add('card-modal-open');
            document.body.classList.add('card-modal-open');
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
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
    let touchStartY = 0;
    let touchEndY = 0;

    flipCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            if (this.classList.contains('active')) {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }
        }, false);

        card.addEventListener('touchend', function(e) {
            if (this.classList.contains('active')) {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                
                // If user swiped more than 50px horizontally or vertically swiped down, close
                if (Math.abs(touchEndX - touchStartX) > 50 || 
                    (touchEndY > touchStartY && Math.abs(touchEndY - touchStartY) > 100)) {
                    closeActiveCard();
                }
            }
        }, false);
    });
});
