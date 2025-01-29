const gallery = document.querySelector('.gallery');
let isDragging = false;
let startX, scrollLeft;
let autoScroll;

// Funzione per avviare lo scorrimento automatico
function startAutoScroll() {
    autoScroll = setInterval(() => {
        gallery.scrollLeft += 1;
        if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
            gallery.scrollLeft = 0;
        }
    }, 30);
}

// Funzione per fermare lo scorrimento automatico
function stopAutoScroll() {
    clearInterval(autoScroll);
}


// Stop scorrimento con cursore su PC
gallery.addEventListener("mouseover", function () {
    gallery.style.animationPlayState = "paused"; // Ferma l'animazione
});

gallery.addEventListener("mouseleave", function () {
    gallery.style.animationPlayState = "running"; // Riprende l'animazione
});

// Abilitare il controllo manuale solo su dispositivi mobili
if ('ontouchstart' in window) {
    gallery.addEventListener('touchstart', (e) => {
        stopAutoScroll();
        isDragging = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2; // Velocità dello swipe
        gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(startAutoScroll, 2000); // Riprende dopo 2 secondi
    });
}

// Avvia lo scorrimento iniziale
startAutoScroll();
