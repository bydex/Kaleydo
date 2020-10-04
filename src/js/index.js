import "./import/modules";
import "./import/components";

import Glide from '@glidejs/glide';

const imgSlider = new Glide('.gallery__img-wrapper', {
    animationDuration: 0,
    rewindDuration: 0,
});
const infoSlider = new Glide('.gallery__info-wrapper', {});

imgSlider.on(['run.after', 'mount.before'], function () {
    let sliderWrapper = document.querySelector(imgSlider.selector);

    removeIndexClass(sliderWrapper);
    sliderWrapper.classList.add(`gallery-active-${getIndex(imgSlider)}`)

    infoSlider.go(`=${getIndex(imgSlider)}`)
})

infoSlider.mount();
imgSlider.mount();


function getIndex(slider) {
    return slider._i;
}
function removeIndexClass(sliderWrapper) {
    for (let i = 0; i <= 3; i++) {
        sliderWrapper.classList.remove(`gallery-active-${i}`);
    }
}
