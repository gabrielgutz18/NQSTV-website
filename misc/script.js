document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    const modalOverlay = document.querySelector('.modal-overlay');

    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent closing if already active
            if (this.classList.contains('active')) {
                return;
            }

            e.stopPropagation();

            // Add active state
            this.classList.add('active');
            this.classList.add('flipped');
            modalOverlay.classList.add('active');

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', function() {
        const activeCard = document.querySelector('.flip-card.active');
        if (activeCard) {
            activeCard.classList.remove('active');
            activeCard.classList.remove('flipped');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeCard = document.querySelector('.flip-card.active');
            if (activeCard) {
                activeCard.classList.remove('active');
                activeCard.classList.remove('flipped');
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});