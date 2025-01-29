document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const images = Array.from(gallery.children);
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
        
    // Duplica le immagini per rendere il loop senza scatti
    images.forEach(image => {
        let clone = image.cloneNode(true);
        gallery.appendChild(clone);
    });

    startAutoScroll();
});