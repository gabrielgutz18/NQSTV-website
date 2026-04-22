
const menuButton = document.querySelector('.menu-button');
const dropdownContent = document.querySelector('.dropdown-content');

if (menuButton && dropdownContent) {
    const closeDropdown = () => {
        dropdownContent.classList.remove('active');
    };

    menuButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropdownContent.classList.toggle('active');
    });

    dropdownContent.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (event) => {
            closeDropdown();
        });
    });

    document.addEventListener('click', (event) => {
        if (!menuButton.contains(event.target) && !dropdownContent.contains(event.target)) {
            closeDropdown();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDropdown();
        }
    });
}