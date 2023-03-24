import { getZero } from "./timer";

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  //slider
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  total.innerHTML = getZero(slides.length);

  //add style for slidesField
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  //add style for slidesWrapper
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i === 0) {
      dot.classList.add("active_dot");
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function showActiveDot(dots) {
    dots.forEach((dot) => {
      dot.classList.remove("active_dot");
      dot.classList.add("inactive_dots");
    });
    dots[slideIndex - 1].classList.add("active_dot");
    dots[slideIndex - 1].classList.remove("inactive_dots");
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.innerHTML = getZero(slideIndex);

    showActiveDot(dots);
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.innerHTML = getZero(slideIndex);

    showActiveDot(dots);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      const target = event.target,
        slideTo = target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      current.innerHTML = getZero(slideIndex);

      showActiveDot(dots);
    });
  });
}

export default slider;
