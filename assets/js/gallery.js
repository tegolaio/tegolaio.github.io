document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    let isDragging = false;
    let startX, scrollLeft;
    let autoScroll;
    let isUserScrolling = false;

    function startAutoScroll() {
        if (isUserScrolling || autoScroll) return; // Evita di avviare più volte
        autoScroll = setInterval(() => {
            gallery.scrollLeft += 1;
            if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
                gallery.scrollLeft = 0; // Reset per scorrimento infinito
            }
        }, 20);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
    }

    gallery.addEventListener('touchstart', (e) => {
        isDragging = true;
        isUserScrolling = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        stopAutoScroll();
    });

    gallery.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Evita scroll verticale indesiderato
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 1.5;
        gallery.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            isUserScrolling = false;
            startAutoScroll();
        }, 2000); // Riprende lo scorrimento dopo 2 secondi di inattività
    });

    gallery.addEventListener('mouseenter', () => {
        stopAutoScroll(); // STOP allo scorrimento quando il mouse entra
    });

    gallery.addEventListener('mouseleave', () => {
        startAutoScroll(); // RIPRENDE quando il mouse esce
    });

    startAutoScroll();
});
