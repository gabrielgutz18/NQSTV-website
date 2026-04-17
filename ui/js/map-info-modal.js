document.addEventListener('DOMContentLoaded', function() {
  // Select images in .map-info
  const infoImages = document.querySelectorAll('.map-info img');
  
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
    backdrop-filter: blur(5px);
  `;
  
  const modalImg = document.createElement('img');
  modalImg.className = 'modal-image';
  modalImg.style.cssText = `
    margin: auto;
    display: block;
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  `;
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'modal-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
  `;
  
  modal.appendChild(modalImg);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);
  
  // Open modal
  infoImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
      modalImg.alt = this.alt;
    });
  });
  
  // Close modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  
  // ESC key close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
});
