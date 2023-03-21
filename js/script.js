document.addEventListener("DOMContentLoaded", () => {
  //tabs selectors
  const tabs = {
    tabsItem: document.querySelectorAll(".tabheader__item"),
    tabContent: document.querySelectorAll(".tabcontent"),
    tabheader: document.querySelector(".tabheader"),
  };
  //timer selectors
  // const timer = {

  // }

  //tabs
  function hideTabContent() {
    tabs.tabContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show", "fade");
    });

    tabs.tabsItem.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabs.tabContent[i].classList.add("show", "fade");
    tabs.tabContent[i].classList.remove("hide");

    tabs.tabsItem[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabs.tabheader.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.tabsItem.forEach((el, i) => {
        if (el === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer
  const deadline = "2023-05-20";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
  //modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector("[data-close]"); //видалили під час створення нового модального вікна зі сповіщенням

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    // modal.classList.toggle('show');
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show", "fade");
    // modal.classList.toggle('show');
    document.body.style.overflow = "";
  }

  // modalCloseBtn.addEventListener("click", closeModal); //видалили під час створення нового модального вікна зі сповіщенням

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target === modal || target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // испольуем классі для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; //сюди передається масив (...restOperator)
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
           <img src=${this.src} alt=${this.alt}>
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
             <div class="menu__item-cost">Цена:</div>
             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
           </div>
      `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  //XMLHttpRequest

  const forms = document.querySelectorAll("form");

  //текстові повідомлення користувачу
  const message = {
    load: "img/form/spinner.svg",
    success: "Дякую! Ми з Вами скоро зв'яженося",
    failure: "Щось пішло не так...",
  };

  //взяти всі наші форми і підв'язати їх до функції //1 postData()
  forms.forEach((form) => {
    bindPostData(form);
  });

  //lesson 90 async await
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });

    return await res.json();
  };

  //функція яка відповідає за постинг данних
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      //2 submit - спрацьовує кожен раз коли ми пробуємо відправити якусь форму
      e.preventDefault(); // відміняємо стандартну поведінку браузера

      //9 створюємо блок для виведення повідомлення користувачу
      let statusMessage = document.createElement("img");
      statusMessage.src = message.load;
      statusMessage.style.cssText = `display: block;
      margin: 0 auto;
      `;
      // form.appendChild(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  // lesson 85 продовдження роботи з формами, змінюємо оповіщення користувача
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal();

    const thanksMoodal = document.createElement("div");
    thanksMoodal.classList.add("modal__dialog");
    thanksMoodal.innerHTML = `
    <div class ="modal__content">
      <div class = "modal__close" data-close>×</div>
      <div class ="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thanksMoodal);
    setTimeout(() => {
      thanksMoodal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // API - Aplication programming interface (набір даних і можливостей які нам надає якесь готове рішення)
  //DOM API
  // інтерфейс з яким користувач може працювати (наприклад в телефоні налаштування вібро, камери)
  //FETCH API

  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POsT",
  //   body: JSON.stringify({ name: "Alex" }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // lesson 89

  //   fetch("http://localhost:3000/menu")
  //     .then((data) => data.json())
  //     .then((res) => console.log(res));

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
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

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.innerHTML = getZero(slideIndex);
    dots.forEach((dot) => {
      dot.classList.remove("active_dot");
      dot.classList.add("inactive_dots");
    });
    dots[slideIndex - 1].classList.add("active_dot");
    dots[slideIndex - 1].classList.remove("inactive_dots");
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.innerHTML = getZero(slideIndex);

    dots.forEach((dot) => {
      dot.classList.remove("active_dot");
      dot.classList.add("inactive_dots");
    });
    dots[slideIndex - 1].classList.add("active_dot");
    dots[slideIndex - 1].classList.remove("inactive_dots");
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
      const target = event.target,
      slideTo = target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      current.innerHTML = getZero(slideIndex);
      dots.forEach((dot) => {
        dot.classList.remove("active_dot");
        dot.classList.add("inactive_dots");
      });
      dots[slideIndex - 1].classList.add("active_dot");
      dots[slideIndex - 1].classList.remove("inactive_dots");

    })
  })
});
