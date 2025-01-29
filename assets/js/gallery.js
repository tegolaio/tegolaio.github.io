document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    let isDragging = false;
    let startX, scrollLeft;
    let autoScroll;

    function startAutoScroll() {
        autoScroll = setInterval(() => {
            gallery.scrollLeft += 1;
        }, 30);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    gallery.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        stopAutoScroll();
    });

gallery.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Previene lo scroll verticale interferente
    const x = e.touches[0].pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
}, { passive: false }); // Imposta passive a false per permettere preventDefault()

    // Stop scorrimento con cursore su PC
    gallery.addEventListener("mouseover", function () {
    gallery.style.animationPlayState = "paused"; // Ferma l'animazione
    });

    gallery.addEventListener("mouseleave", function () {
    gallery.style.animationPlayState = "running"; // Riprende l'animazione
    });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(startAutoScroll, 2000); // Riprende lo scorrimento dopo 2 secondi
    });

    startAutoScroll();
});