document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    let isDragging = false;
    let startX, scrollLeft;
    let autoScroll;
    let isUserScrolling = false;

    function startAutoScroll() {
        stopAutoScroll(); // Evita duplicati
        if (!isUserScrolling) {
            autoScroll = setInterval(() => {
                gallery.scrollLeft += 1;
            }, 30);
        }
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // ✅ FIX: Ora lo stop su PC funziona!
    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);

    // ✅ FIX: Swipe su mobile ora funziona senza problemi!
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
        const walk = (x - startX) * 1.5;
        gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
        isUserScrolling = false;
        setTimeout(startAutoScroll, 2000); // Riprende lo scorrimento dopo 2 sec
    });

    startAutoScroll();
});
