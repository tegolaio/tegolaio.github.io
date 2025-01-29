document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const images = Array.from(gallery.children);

    gallery.addEventListener("mouseover", function () {
        gallery.style.animationPlayState = "paused"; // Ferma l'animazione
    });

    gallery.addEventListener("mouseleave", function () {
        gallery.style.animationPlayState = "running"; // Riprende l'animazione
    });

    images.forEach(image => {
        let clone = image.cloneNode(true);
        gallery.appendChild(clone);
    });
});
