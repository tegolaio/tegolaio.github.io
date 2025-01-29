document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");

    gallery.addEventListener("mouseover", function () {
        gallery.style.animationPlayState = "paused"; // Ferma l'animazione
    });

    gallery.addEventListener("mouseleave", function () {
        gallery.style.animationPlayState = "running"; // Riprende l'animazione
    });
});
