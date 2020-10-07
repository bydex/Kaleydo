// import "./import/modules";
// import "./import/components";

// // import "element-closest-polyfill";
// // import "nodelist-foreach-polyfill";
// // import "svgxuse";
// import Glide from "@glidejs/glide";


// const imgSlider = new Glide(".gallery__img-wrapper", {
//     animationDuration: 0,
//     rewindDuration: 0,
// });
// const infoSlider = new Glide(".gallery__info-wrapper", {
//     animationDuration: 0,
//     rewindDuration: 0,
//     touchAngle: 0
// });

// imgSlider.on(["run.after", "mount.before"], function () {
//     let sliderWrapper = document.querySelector(imgSlider.selector);

//     removeIndexClass(sliderWrapper);
//     sliderWrapper.classList.add(`gallery-active-${getIndex(imgSlider)}`);

//     infoSlider.go(`=${getIndex(imgSlider)}`);
// });

// infoSlider.mount();
// imgSlider.mount();


// function getIndex(slider) {
//     return slider._i;
// }
// function removeIndexClass(sliderWrapper) {
//     for (let i = 0; i <= 3; i++) {
//         sliderWrapper.classList.remove(`gallery-active-${i}`);
//     }
// }








// const moreInfoToggle = document.querySelectorAll(".more-info__top");

// moreInfoToggle.forEach((el) => {
//     el.addEventListener("click", function () {
//         const moreInfo = this.closest(".more-info");
//         const moreInfoDropdown = moreInfo.querySelector(".more-info__dropdown");

//         toggleContainer(moreInfoDropdown);
//         moreInfo.classList.toggle("more-info_disabled");

//     });
// });


// function toggleContainer(container) {
//     let isOpen = container.dataset.open;


//     if (isOpen === "true") {
//         container.style.maxHeight = container.scrollHeight + "px";
//         setTimeout(() => {
//             container.style.maxHeight = 0;
//         }, 1);
//         container.dataset.open = false;

//     } else {
//         container.style.maxHeight = 0;
//         setTimeout(() => {
//             container.style.maxHeight = container.scrollHeight + "px";
//         }, 1);
//         container.dataset.open = true;

//         setTimeout(function() {
//             container.style.maxHeight = "none";
//         }, 500);
//     }
// }






// const buttons = document.querySelectorAll("[data-anchor]");

// buttons.forEach((el) => {
//     el.addEventListener("click", function () {
//         const slideId = this.dataset.anchor,
//             slideTimeout = +this.dataset.anchorTimeout,
//             anchorSlide = document.querySelector(`#${slideId}`) || false;

//         if (anchorSlide === false) location.href = `/#${slideId}`;

//         const slideOffset = anchorSlide.getBoundingClientRect().top + window.scrollY;

//         setTimeout(() => {
//             window.scroll({
//                 top: slideOffset,
//                 behavior: "smooth",
//             });
//         }, slideTimeout || 0);
//     });
// });





// const video = document.querySelector(".video");
// const videoPlay = document.querySelector(".video__play");

// videoPlay.addEventListener("mouseenter", () => {
//     video.classList.add("video_hover");
// });
// videoPlay.addEventListener("mouseleave", () => {
//     video.classList.remove("video_hover");
// });






// const steps = document.querySelectorAll(".steps__item");
// const texts = document.querySelectorAll(".steps__description");
// const slides = document.querySelectorAll(".steps__slide");

// steps.forEach((el) => {
//     el.addEventListener("click", function() {

//         this.classList.add("steps__item_active");

//         let siblings = Array.prototype.slice.call(this.parentNode.children);

//         siblings.forEach((sibling, index) => {
//             if (sibling === this) {
//                 texts[index].classList.add("steps__description_active");
//                 slides[index].classList.add("steps__slide_active");
//             } else {
//                 texts[index].classList.remove("steps__description_active");
//                 slides[index].classList.remove("steps__slide_active");
//                 sibling.classList.remove("steps__item_active");
//             }

//         });

//     });
// });




// (() => {
//     const cursor = document.querySelector(".cursor");
//     const cursorInner = document.querySelector(".cursor-inner");
//     const width = cursor.getBoundingClientRect().width;
//     const height = cursor.getBoundingClientRect().height;

//     document.body.addEventListener("mousemove", function (event) {
//         const x = event.x;
//         const y = event.y;

//         setTimeout(() => {
//             setCursorPosition(x, y);
//         }, 100);
//     });
//     document.addEventListener("mouseenter", function (event) {
//         cursor.style.opacity = 1;
//         cursorInner.style.opacity = 1;
//     });
//     document.addEventListener("mouseleave", function (event) {
//         cursorInner.style.opacity = 0;
//     });

//     function setCursorPosition(x, y) {
//         x -= width / 2;
//         y -= height / 2;

//         setTimeout(() => {
//             cursor.style.transform = `translate(${x}px, ${y}px)`;
//         }, 100);
//         cursorInner.style.transform = `translate(${x}px, ${y}px)`;
//     }
// })();
