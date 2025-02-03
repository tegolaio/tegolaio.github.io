document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    let isDragging = false;
    let startX, scrollLeft;
    let autoScroll;
    let isUserInteracting = false;

    // 📌 DUPLICHIAMO LE IMMAGINI PER SIMULARE UN LOOP INFINITO
    function duplicateImages() {
        const images = [...gallery.children];
        images.forEach((img) => {
            let clone = img.cloneNode(true);
            gallery.appendChild(clone);
        });
    }
    duplicateImages();

    // 🚀 ANIMAZIONE FLUIDA
    function startAutoScroll() {
        stopAutoScroll();
        if (!isUserInteracting) {
            autoScroll = setInterval(() => {
                gallery.scrollLeft += 1;

                // 🌀 RESET TRASPARENTE PER UN LOOP INFINITO FLUIDO
                if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
                    gallery.scrollLeft = 0;
                }
            }, 15);
        }
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // 🖱️ STOP SU PC QUANDO IL MOUSE È SOPRA
    gallery.addEventListener("mouseenter", stopAutoScroll);
    gallery.addEventListener("mouseleave", startAutoScroll);

    // 📱 GESTIONE SWIPE SU MOBILE
    gallery.addEventListener("touchstart", (e) => {
        isDragging = true;
        isUserInteracting = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        stopAutoScroll();
    });

    gallery.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2; // 🔧 Sensibilità swipe aumentata
        gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener("touchend", () => {
        isDragging = false;
        isUserInteracting = false;
        setTimeout(startAutoScroll, 1500); // 🔄 Dopo 1.5 sec riparte
    });

    startAutoScroll();
});
