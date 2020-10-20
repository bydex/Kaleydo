import "./import/modules";
import "./import/components";

// import "element-closest-polyfill";
// import "nodelist-foreach-polyfill";
// import "svgxuse";
import Glide from "@glidejs/glide";
import Rellax from 'rellax/rellax';
import maskInput from 'vanilla-text-mask';
import WOW from 'wow.js';



let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


new WOW().init();

const inputTel = document.querySelectorAll("input[type='tel']"),
    phoneMask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


if (inputTel !== undefined) {
    inputTel.forEach((el) => {
        maskInput({
            inputElement: el,
            mask: phoneMask
        });
    })
}



let slicePhone = (val) => {
    let underscore = val.indexOf('_');

    if (underscore === -1) {
        return val;
    } else {
        return val.slice(0,underscore);
    }
};
const isTel = (tel) => {
    if (slicePhone(tel.value).length === 16)
        return true;
    else
        return false;
}

const form = document.querySelector('#form form');
const inputs = form.querySelectorAll('input');

inputs.forEach((input) => {
    input.addEventListener('input', function() {
        let isFilled = !!this.value.length;

        if (isFilled) {
            this.classList.add('input-wrapper__input_filled');
        } else {
            this.classList.remove('input-wrapper__input_filled');
        }
    })
})

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let tel     = this.querySelector('input[type="tel"]'),
        name    = this.querySelector('[data-input-name]'),
        slide  = form.querySelector('.gallery__info-slides .glide__slide--active [data-price]'),
        title = form.querySelector('.gallery__title_active');


    let formData = new FormData();

    if (name && name.value === null || name.value === '' || name.value.length === 0) {
        name.closest('.input-wrapper').classList.add('input-wrapper_error');
        return;
    } else if (name && name.value.length !== 0) {
        name.closest('.input-wrapper').classList.remove('input-wrapper_error');
        formData.append("Имя", name.value);
    }
    if (tel && isTel(tel) === false) {
        tel.closest('.input-wrapper').classList.add('input-wrapper_error');
        return;
    } else if (tel && isTel(tel)) {
        tel.closest('.input-wrapper').classList.remove('input-wrapper_error');
        formData.append("Номер телефона", tel.value);
    }

    formData.append("Название продукта", title.textContent);
    formData.append("Цена", slide.textContent);


    let url = `https://api.telegram.org/bot1228056654:AAGp2hpsXamGiPB3sFBe4e-c2xCs0-IBL14/sendMessage`;
    let data = {
        "chat_id": "439338402",
        "text": `Имя: ${name.value}\nНомер телефона: ${tel.value}\nНазвание продукта: ${title.textContent}\nЦена: ${slide.textContent}`  ,
    };

    fetch(url, {
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
    })
        .then(function (response) {
            console.log("sended");
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });

    fetch("mail.php", {
        body: formData,
        method: "post",
    }).then(function() {
        window.location = (lang === 'ru') ? './thanks.html' : './thanks-en.html';
        // this.querySelectorAll('.label-box__label.active').forEach((inputWrap) => {
        //     inputWrap.classList.remove('active');
        // })
        // burger.modalSectionTo('thanks')
    })
})




if (window.innerWidth > 991) {
    const rellax = new Rellax('.rellax', {
        speed: -2,
        center: true,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false,
    });
}


const navHeight = 60;

let imgSlider;

imgSlider = new Glide(".header__gallery-wrapper .gallery__img-wrapper", {
    animationDuration: 0,
    rewindDuration: 0,
    autoplay: 2000,
    hoverpause: true,
});
const infoSlider = new Glide(".header__gallery-wrapper .gallery__info-wrapper", {
    animationDuration: 0,
    rewindDuration: 0,
    touchAngle: 0
});

const infoModalSlider = new Glide("#form .glide", {
    animationDuration: 0,
    rewindDuration: 0,
    touchAngle: 0
});

let titles = document.querySelectorAll('#form .gallery__title-wrapper .gallery__title');

if (document.querySelector('header .gallery')) {
    imgSlider.on(["run.after", "mount.before"], function () {
        let sliderWrapper = document.querySelector(imgSlider.selector);

        removeIndexClass(sliderWrapper);
        sliderWrapper.classList.add(`gallery-active-${getIndex(imgSlider)}`);

        infoSlider.go(`=${getIndex(imgSlider)}`);
    });

    imgSlider.on(["run.after", "mount.after"], function () {
        titles.forEach((el) => el.classList.remove('gallery__title_active'));
        titles[getIndex(imgSlider)].classList.add('gallery__title_active');
        infoModalSlider.go(`=${getIndex(imgSlider)}`);
    });
}
    infoModalSlider.on(["run.after", "mount.after"], function () {
        titles.forEach((el) => el.classList.remove('gallery__title_active'));
        titles[getIndex(infoModalSlider)].classList.add('gallery__title_active');
    });
if (document.querySelector('header .gallery')) {
    infoSlider.mount();
}
    infoModalSlider.mount();
if (document.querySelector('header .gallery')) {
    imgSlider.mount();
}
function getIndex(slider) {
    return slider._i;
}
function removeIndexClass(sliderWrapper) {
    for (let i = 0; i <= 3; i++) {
        sliderWrapper.classList.remove(`gallery-active-${i}`);
    }
}







const moreInfoToggle = document.querySelectorAll(".more-info__top");

moreInfoToggle.forEach((el) => {
    el.addEventListener("click", function () {
        const moreInfo = this.closest(".more-info");
        const moreInfoDropdown = moreInfo.querySelector(".more-info__dropdown");

        toggleContainer(moreInfoDropdown);
        moreInfo.classList.toggle("more-info_disabled");

        if (!!this.closest('.steps')) {
            this.closest(".steps").classList.toggle('steps_enabled');
        }

    });
});

const dataStepsOpen = document.querySelector('[data-steps-open]');
dataStepsOpen.addEventListener('click', function() {
    const steps = document.querySelector('#steps');
    const moreInfo = steps.querySelector('.more-info');
    const moreInfoDropdown = moreInfo.querySelector('.more-info__dropdown');

    moreInfoDropdown.style.maxHeight = 0;
    setTimeout(() => {
        moreInfoDropdown.style.maxHeight = moreInfoDropdown.scrollHeight + "px";
    }, 1);
    moreInfoDropdown.dataset.open = true;

    setTimeout(function() {
        moreInfoDropdown.style.maxHeight = "none";
        }, 500);
    moreInfo.classList.remove("more-info_disabled");

    if (!!this.closest(".steps")) {
      this.closest(".steps").classList.remove("steps_enabled");
    }

})


function toggleContainer(container) {
    let isOpen = container.dataset.open;


    if (isOpen === "true") {
        container.style.maxHeight = container.scrollHeight + "px";
        setTimeout(() => {
            container.style.maxHeight = 0;
        }, 1);
        container.dataset.open = false;

    } else {
        container.style.maxHeight = 0;
        setTimeout(() => {
            container.style.maxHeight = container.scrollHeight + "px";
        }, 1);
        container.dataset.open = true;

        setTimeout(function() {
            container.style.maxHeight = "none";
        }, 500);
    }
}






const buttons = document.querySelectorAll("[data-anchor]");

buttons.forEach((el) => {
    el.addEventListener("click", function () {
        const slideId = this.dataset.anchor,
            slideTimeout = +this.dataset.anchorTimeout,
            anchorSlide = document.querySelector(`#${slideId}`) || false;

        if (anchorSlide === false) location.href = `/#${slideId}`;

        const slideOffset = anchorSlide.getBoundingClientRect().top + window.scrollY - navHeight;

        setTimeout(() => {
            window.scroll({
                top: slideOffset,
                behavior: "smooth",
            });
        }, slideTimeout || 0);
    });
});





const videoWrapper = document.querySelector(".video");

if (!!videoWrapper) {
    const videoPlay = videoWrapper.querySelector(".video__play");
    const video = videoWrapper.querySelector('.video__video');
    const sources = video.querySelectorAll('source');

    videoPlay.addEventListener("mouseenter", () => {
        videoWrapper.classList.add("video_hover");
    });
    videoPlay.addEventListener("mouseleave", () => {
        videoWrapper.classList.remove("video_hover");
    });

    videoPlay.addEventListener("click", function() {
        document.body.classList.toggle('video_active');
        videoWrapper.classList.toggle('video_active');

        if (videoWrapper.classList.contains('video_active')) {
            video.play();
        } else {
            video.pause();
        }
    })

    video.addEventListener('ended', function() {
        document.body.classList.toggle('video_active');
        videoWrapper.classList.toggle('video_active');
    })


    document.addEventListener("DOMContentLoaded", function() {
      var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

      if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(video) {
            if (video.isIntersecting) {
              for (var source in video.target.children) {
                var videoSource = video.target.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                  videoSource.src = videoSource.dataset.src;
                }
              }

              video.target.load();
              video.target.classList.remove("lazy");
              lazyVideoObserver.unobserve(video.target);

              if (document.querySelector("#about video") === video.target) {
                    video.target.play();
              }
            }
          });
        });

        lazyVideos.forEach(function(lazyVideo) {
          lazyVideoObserver.observe(lazyVideo);
        });
      }
    });
}

const steps = document.querySelectorAll(".steps__item");
const texts = document.querySelectorAll(".steps__description");
const slides = document.querySelectorAll(".steps__slide");

steps.forEach((el) => {
    el.addEventListener("click", function() {

        this.classList.add("steps__item_active");

        let siblings = Array.prototype.slice.call(this.parentNode.children);

        siblings.forEach((sibling, index) => {
            if (sibling === this) {
                texts[index].classList.add("steps__description_active");
                slides[index].classList.add("steps__slide_active");
            } else {
                texts[index].classList.remove("steps__description_active");
                slides[index].classList.remove("steps__slide_active");
                sibling.classList.remove("steps__item_active");
            }

        });

    });
});




(() => {
    if (window.innerWidth > 991) {
        const cursor = document.querySelector(".cursor");
        const cursorInner = document.querySelector(".cursor-inner");
        const widthCursor = cursor.getBoundingClientRect().width;
        const heightCursor = cursor.getBoundingClientRect().height;
        const widthCursorInner = cursorInner.getBoundingClientRect().width;
        const heightCursorInner = cursorInner.getBoundingClientRect().height;

        document.body.addEventListener("mousemove", function (event) {
            const x = event.x;
            const y = event.y;

            setTimeout(() => {
                setCursorPosition(x, y);
            }, 100);
        });
        document.addEventListener("mouseenter", function (event) {
            cursor.style.opacity = 1;
            cursorInner.style.opacity = 1;
        });
        document.addEventListener("mouseleave", function (event) {
            cursorInner.style.opacity = 0;
            cursor.style.opacity = 0;
        });

        function setCursorPosition(x, y) {
            let xDot = x - widthCursorInner / 2;
            let yDot = y - heightCursorInner / 2;


            x -= widthCursor / 2;
            y -= heightCursor / 2;


            setTimeout(() => {
                cursor.style.transform = `translate(${x}px, ${y}px)`;
            }, 100);
            cursorInner.style.transform = `translate(${xDot}px, ${yDot}px)`;
        }
    }
})();




const navRow = document.querySelector('.nav-row');

window.addEventListener("scroll", setNavRowStatus);
setNavRowStatus();

function setNavRowStatus() {
    const offsetTop = window.pageYOffset;
    const hasClass = navRow.classList.contains('nav-row_active');

    if (offsetTop > 0 && !hasClass) {
        navRow.classList.add('nav-row_active');
        document.body.classList.add('body-nav_active');
    } else if (offsetTop === 0 && hasClass) {
        navRow.classList.remove('nav-row_active');
        document.body.classList.remove('body-nav_active');
    }
}



const hamburger = document.querySelector('.hamburger');
const callForm = document.querySelector('[data-call-form]');
const menu = document.querySelector('#menu');
const offer = document.querySelector('#form');

const dataCallModal = document.querySelectorAll('[data-id]');

hamburger.addEventListener('click', function() {

    if (!isActive()) {
        openModal(menu);
    } else {
        closeModal();
    }
})

callForm.addEventListener('click', function() {
    if (menu.classList.contains('modal-b_active')) {
        closeModal();
    }

    openModal(offer);
})

dataCallModal.forEach((el) => {
    el.addEventListener('click', function(e) {
        e.preventDefault();

        let modal = document.querySelector(`#${this.dataset.id}`);

        if (menu.classList.contains('modal-b_active')) closeModal();

        openModal(modal);
    })
})


const closeModalButtons = document.querySelectorAll('[data-close-modal]');

closeModalButtons.forEach((el) => {
    el.addEventListener('click', function() {
        closeModal();
    })
})

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 27) {
        closeModal();
    }
})

const btnOffer = document.querySelectorAll('[data-offer-call]');


btnOffer.forEach((el) => {
    el.addEventListener('click', function() {
        openModal(offer);
    })
})


function isActive() {
    return !!document.querySelector('.modal-b_active');
}
function openModal(modal) {
    if (!!imgSlider) {
        imgSlider.update({
            autoplay: false
        })
    }
    hamburger.classList.add('hamburger_active');
    modal.classList.add('modal-b_active');
    document.querySelector('html').classList.add('modal-active');
}
function closeModal() {
    if (!!imgSlider) {
        imgSlider.update({
            autoplay: 2000
        })
    }
    hamburger.classList.remove('hamburger_active');
    document.querySelectorAll('.modal-b_active').forEach((el) => {
        el.classList.remove('modal-b_active');
    })
    document.querySelector('html').classList.remove('modal-active');
}
