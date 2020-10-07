const gexagon = document.querySelector(".gexagon");


const cardWrapper = document.querySelector(".about");
const card = gexagon;

cardWrapper.addEventListener("mouseleave", function () {
    card.style.transition = ".5s";
    setTimeout(() => {
        card.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
    }, 100);
});
cardWrapper.addEventListener("mouseenter", function () {
    card.style.transition = ".5s";
});
cardWrapper.addEventListener("mousemove", function (event) {
    const parameters = card.getBoundingClientRect();
    const width = parameters.width;
    const height = parameters.height;

    const x = event.x;
    const y = event.y;

    const cardOffsetTop = parameters.top;
    const cardOffsetLeft = parameters.left;

    const xPos = x - cardOffsetLeft - width / 2;
    const yPos = y - cardOffsetTop - height / 2;

    const xPercent = (xPos / width) * 0.0004;
    const yPercent = (yPos / height) * 0.0004;

    card.style.transition = "none";
    setTimeout(() => {
        card.style.transform = `matrix3d(1, 0, 0, ${xPercent.toFixed(6)}, 0, 1, 0, ${yPercent.toFixed(6)}, 0, 0, 1, 0, 0, 0, 0, 1)`;
    }, 100);
});
