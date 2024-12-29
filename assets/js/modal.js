// Get modal elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Add click event to thumbnails
document.querySelectorAll('.thumbnail').forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = image.src;
        enableScrollZoom();
    });
});

// Close modal when 'X' is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    disableScrollZoom();
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        disableScrollZoom();
    }
});

// Interactive zoom variables
let zoomLevel = 1; // Initial zoom level
let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

function enableScrollZoom() {
    // Solo su PC
    if (window.innerWidth < 768) return;

    modalImage.style.cursor = 'grab';
    modalImage.addEventListener('wheel', zoomImage);
    modalImage.addEventListener('mousedown', startDrag);
    modalImage.addEventListener('mousemove', dragImage);
    modalImage.addEventListener('mouseup', stopDrag);
    modalImage.addEventListener('mouseleave', stopDrag);

    // Disabilita il drag nativo
    modalImage.addEventListener('dragstart', (e) => e.preventDefault());
}

function disableScrollZoom() {
    zoomLevel = 1;
    modalImage.style.cursor = 'default';
    modalImage.style.transform = 'none'; // Resetta zoom e posizione
    offsetX = 0;
    offsetY = 0;

    modalImage.removeEventListener('wheel', zoomImage);
    modalImage.removeEventListener('mousedown', startDrag);
    modalImage.removeEventListener('mousemove', dragImage);
    modalImage.removeEventListener('mouseup', stopDrag);
    modalImage.removeEventListener('mouseleave', stopDrag);

    // Rimuove il listener per il drag nativo
    modalImage.removeEventListener('dragstart', (e) => e.preventDefault());
}


function zoomImage(e) {
    e.preventDefault();
    const zoomStep = 0.1; // Amount to zoom in/out
    const minZoom = 1; // Minimum zoom level
    const maxZoom = 3; // Maximum zoom level

    // Update zoom level based on scroll direction
    zoomLevel += e.deltaY < 0 ? zoomStep : -zoomStep;
    zoomLevel = Math.min(Math.max(zoomLevel, minZoom), maxZoom); // Clamp zoom level

    // Apply zoom
    modalImage.style.transform = `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)`;
}

function startDrag(e) {
    if (zoomLevel === 1) return; // No drag if not zoomed
    isDragging = true;
    modalImage.style.cursor = 'grabbing';
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
}

function dragImage(e) {
    if (!isDragging) return;

    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;

    modalImage.style.transform = `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)`;
}

function stopDrag() {
    isDragging = false;
    modalImage.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
}
