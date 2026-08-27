const items = document.querySelectorAll(".elem1, .elem2, .elem3, .elem4, .elem5");

items.forEach((elem, index) => {
    const img = document.querySelector(`.img${index + 1}`);

    elem.addEventListener("mousemove", function (dets) {
        const rect = elem.getBoundingClientRect();
        const x = dets.clientX - rect.left;
        img.style.left = x + "px";
    });

    elem.addEventListener("mouseenter", function () {
        img.style.opacity = 1;
    });

    elem.addEventListener("mouseleave", function () {
        img.style.opacity = 0;
    });
});