document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    let isDragging = false;
    let startX, scrollLeft;
    let autoScroll;
    let isUserScrolling = false;

    // Clona le immagini per creare un effetto di loop infinito
    function duplicateImages() {
        const images = [...gallery.children];
        images.forEach(img => {
            let clone = img.cloneNode(true);
            gallery.appendChild(clone);
        });
    }

    function startAutoScroll() {
        if (isUserScrolling || autoScroll) return; // Evita più intervalli
        autoScroll = setInterval(() => {
            gallery.scrollLeft += 1;
            if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
                gallery.scrollLeft = 0; // Reset per loop infinito senza scatti
            }
        }, 20);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
    }

    // Avvia la duplicazione delle immagini per scorrimento infinito fluido
    duplicateImages();
    startAutoScroll();

    // Touch e drag per mobile
    gallery.addEventListener('touchstart', (e) => {
        isDragging = true;
        isUserScrolling = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        stopAutoScroll();
    });

    gallery.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 1.5;
        gallery.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            isUserScrolling = false;
            startAutoScroll();
        }, 2000);
    });

    // Stop scorrimento quando il mouse entra nella gallery
    gallery.addEventListener('mouseenter', () => {
    stopAutoScroll();
    });

    // Riprendi scorrimento quando il mouse esce dalla gallery
    gallery.addEventListener('mouseleave', () => {
    if (!isUserScrolling) startAutoScroll();
    });

});
