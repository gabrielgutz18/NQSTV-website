const zoomBtn = document.querySelector('.zoom-btn');
const zoomOutBtn = document.querySelector('.zoom-out-btn');
const mapImage = document.querySelector('.map-image');

let zoomLevel = 1;

zoomBtn.addEventListener('click', () => {
    zoomLevel += 0.2;
    mapImage.style.transform = `scale(${zoomLevel})`;
});

zoomOutBtn.addEventListener('click', () => {
    zoomLevel = Math.max(1, zoomLevel - 0.2);
    mapImage.style.transform = `scale(${zoomLevel})`;
});