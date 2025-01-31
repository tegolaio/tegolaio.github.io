document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    let isDragging = false;
    let startX, scrollLeft;
    let autoScroll;
    let isUserScrolling = false;

    function startAutoScroll() {
        stopAutoScroll();
        if (!isUserScrolling) {
            autoScroll = setInterval(() => {
                gallery.scrollLeft += 1;
                if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
                    gallery.scrollLeft = 0; // Reset per ciclo infinito
                }
            }, 20);
        }
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // 🖱️ STOP SU PC QUANDO IL MOUSE È SOPRA
    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);

    // 📱 GESTIONE SWIPE SU MOBILE
    gallery.addEventListener('touchstart', (e) => {
        isDragging = true;
        isUserScrolling = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        stopAutoScroll();
    });

    gallery.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 1.5; // Sensibilità swipe
        gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
        isUserScrolling = false;
        setTimeout(startAutoScroll, 2000); // Riprende dopo 2 sec
    });

    startAutoScroll();
});
